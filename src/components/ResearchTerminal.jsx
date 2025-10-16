import { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';

export default function ResearchTerminal({ data }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'YU Research Terminal v1.0.0 initialized...' },
    { type: 'system', text: 'Type "help" for available commands' },
  ]);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: () => ({
      type: 'output',
      text: `Available commands:
  analyze [university]  - Show analysis for a university
  compare [uni1] [uni2] - Compare two universities
  stats                 - Show overall statistics
  recommend             - Get recommendations
  gap                   - Show competitive gaps
  clear                 - Clear terminal
  help                  - Show this message`
    }),

    analyze: (args) => {
      const uniName = args[0]?.toLowerCase();
      const uni = data.universities.find(u =>
        u.shortName.toLowerCase() === uniName || u.id === uniName
      );

      if (!uni) {
        return { type: 'error', text: `University "${uniName}" not found. Try: yu, nyu, columbia, rutgers, brandeis, maryland` };
      }

      return {
        type: 'output',
        text: `
${uni.name} (${uni.shortName})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Instagram: ${uni.instagram.followers.toLocaleString()} followers
           ${uni.instagram.posts || 'N/A'} posts
           ${uni.instagram.handle}

TikTok:    ${uni.tiktok.active ? 'Active ✓' : 'Inactive ✗'}
           ${uni.tiktok.followers ? uni.tiktok.followers.toLocaleString() + ' followers' : ''}
           ${uni.tiktok.handle || 'No account'}
${uni.note ? '\nNote: ' + uni.note : ''}`
      };
    },

    compare: (args) => {
      const uni1Name = args[0]?.toLowerCase();
      const uni2Name = args[1]?.toLowerCase();

      const uni1 = data.universities.find(u =>
        u.shortName.toLowerCase() === uni1Name || u.id === uni1Name
      );
      const uni2 = data.universities.find(u =>
        u.shortName.toLowerCase() === uni2Name || u.id === uni2Name
      );

      if (!uni1 || !uni2) {
        return { type: 'error', text: 'Invalid universities. Usage: compare [uni1] [uni2]' };
      }

      const diff = uni1.instagram.followers - uni2.instagram.followers;
      const multiplier = (uni1.instagram.followers / uni2.instagram.followers).toFixed(2);

      return {
        type: 'output',
        text: `
${uni1.shortName} vs ${uni2.shortName}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Instagram Followers:
  ${uni1.shortName}: ${uni1.instagram.followers.toLocaleString()}
  ${uni2.shortName}: ${uni2.instagram.followers.toLocaleString()}
  Difference: ${Math.abs(diff).toLocaleString()} (${multiplier}x)

TikTok:
  ${uni1.shortName}: ${uni1.tiktok.active ? '✓ Active' : '✗ Inactive'}
  ${uni2.shortName}: ${uni2.tiktok.active ? '✓ Active' : '✗ Inactive'}

Winner: ${uni1.instagram.followers > uni2.instagram.followers ? uni1.shortName : uni2.shortName}`
      };
    },

    stats: () => {
      const avgFollowers = Math.round(
        data.universities.reduce((acc, u) => acc + u.instagram.followers, 0) / data.universities.length
      );
      const maxFollowers = Math.max(...data.universities.map(u => u.instagram.followers));
      const tiktokActive = data.universities.filter(u => u.tiktok.active).length;

      return {
        type: 'output',
        text: `
Overall Statistics
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Universities: ${data.universities.length}
Avg Followers:      ${avgFollowers.toLocaleString()}
Max Followers:      ${maxFollowers.toLocaleString()} (NYU)
TikTok Active:      ${tiktokActive}/${data.universities.length}

Instagram Benchmarks:
  Optimal Engagement: ${data.benchmarks.instagram.averageEngagement}%
  Posting Frequency:  ${data.benchmarks.instagram.optimalPostingFrequency.min}-${data.benchmarks.instagram.optimalPostingFrequency.max}/week
  Best Time:          ${data.benchmarks.instagram.bestTime}`
      };
    },

    recommend: () => {
      const topRec = data.recommendations[0];
      return {
        type: 'output',
        text: `
Top Recommendation (Priority: ${topRec.priority.toUpperCase()})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Action: ${topRec.action}

Rationale: ${topRec.rationale}

Expected Impact: ${topRec.expectedImpact}
Timeframe: ${topRec.timeframe}
Resources: ${topRec.resources}

For all recommendations, navigate to Action Protocol section.`
      };
    },

    gap: () => {
      return {
        type: 'output',
        text: `
Competitive Gaps
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Instagram:
  vs Average:  ${data.gaps.instagram.followers.vsAverage.toLocaleString()}
  vs Leader:   ${data.gaps.instagram.followers.vsLeader.toLocaleString()}
  vs Brandeis: ${data.gaps.instagram.closestCompetitor.difference.toLocaleString()}

TikTok:
  Status:      ${data.gaps.tiktok.presence ? 'Active' : 'NOT ACTIVE ⚠️'}
  Competitors: ${data.gaps.tiktok.competitorsActive}/${data.universities.length} active
  Potential:   ${data.gaps.tiktok.potentialGrowth} growth`
      };
    },

    clear: () => {
      setHistory([
        { type: 'system', text: 'Terminal cleared.' },
        { type: 'system', text: 'Type "help" for available commands' },
      ]);
      return null;
    }
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Add command to history
    setHistory(prev => [...prev, { type: 'input', text: `> ${trimmedCmd}` }]);

    // Parse command
    const [commandName, ...args] = trimmedCmd.split(' ');
    const command = commands[commandName.toLowerCase()];

    if (command) {
      const result = command(args);
      if (result) {
        setHistory(prev => [...prev, result]);
      }
    } else {
      setHistory(prev => [...prev, {
        type: 'error',
        text: `Command "${commandName}" not found. Type "help" for available commands.`
      }]);
    }

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    }
  };

  return (
    <div className="lab-card p-0 overflow-hidden font-mono text-sm">
      <div className="bg-lab-900 px-4 py-2 flex items-center gap-2 border-b border-lab-800">
        <Terminal className="w-4 h-4 text-accent-cyan" />
        <span className="text-lab-300 font-semibold">Research Terminal</span>
        <div className="ml-auto flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-accent-red"></div>
          <div className="w-3 h-3 rounded-full bg-accent-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-accent-green"></div>
        </div>
      </div>

      <div
        ref={terminalRef}
        className="bg-lab-950 p-4 h-96 overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, idx) => (
          <div
            key={idx}
            className={`mb-1 ${
              entry.type === 'input' ? 'text-accent-cyan' :
              entry.type === 'error' ? 'text-accent-red' :
              entry.type === 'system' ? 'text-accent-yellow' :
              'text-lab-300'
            }`}
          >
            <pre className="whitespace-pre-wrap font-mono text-xs">{entry.text}</pre>
          </div>
        ))}

        <div className="flex items-center gap-2 text-accent-cyan">
          <span>{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-lab-100"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
