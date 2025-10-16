import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, TrendingUp, AlertTriangle, Lightbulb, Zap, Target, BarChart3 } from 'lucide-react';

export default function EinsteinAI({ data }) {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const aiInsights = [
    {
      id: 1,
      type: 'critical',
      icon: AlertTriangle,
      title: 'Critical Gap Detected',
      text: 'NYU has 39.5x more Instagram followers than YU. This represents a 3,853% difference in digital reach. Immediate action required to close this competitive gap.',
      confidence: 98,
      color: 'text-accent-red',
      bgColor: 'from-accent-red/20 to-accent-red/5',
      actionable: true,
      priority: 'HIGH'
    },
    {
      id: 2,
      type: 'opportunity',
      icon: TrendingUp,
      title: 'High-Impact Opportunity',
      text: 'TikTok adoption could yield 2.28% weekly growth - 4x higher engagement than other platforms. This represents the fastest path to audience expansion.',
      confidence: 94,
      color: 'text-accent-green',
      bgColor: 'from-accent-green/20 to-accent-green/5',
      actionable: true,
      priority: 'HIGH'
    },
    {
      id: 3,
      type: 'insight',
      icon: Lightbulb,
      title: 'Cross-Platform Synergy',
      text: 'Universities with TikTok presence average 4.8x more Instagram followers. Strong cross-platform correlation detected. Multi-channel strategy recommended.',
      confidence: 91,
      color: 'text-accent-cyan',
      bgColor: 'from-accent-cyan/20 to-accent-cyan/5',
      actionable: true,
      priority: 'MEDIUM'
    },
    {
      id: 4,
      type: 'recommendation',
      icon: Sparkles,
      title: 'Content Optimization Strategy',
      text: 'Instagram Reels generate 2.5x more engagement (1.99% vs 0.80%). Posting at 8 PM Wednesday maximizes reach by 45%. Shift content strategy accordingly.',
      confidence: 96,
      color: 'text-accent-purple',
      bgColor: 'from-accent-purple/20 to-accent-purple/5',
      actionable: true,
      priority: 'HIGH'
    },
    {
      id: 5,
      type: 'prediction',
      icon: Brain,
      title: 'Growth Trajectory Analysis',
      text: 'With optimal strategy implementation, YU can reach 25,000 followers in 6 months - a 67% growth rate. Conservative estimate with 95% confidence interval.',
      confidence: 89,
      color: 'text-accent-yellow',
      bgColor: 'from-accent-yellow/20 to-accent-yellow/5',
      actionable: false,
      priority: 'INFO'
    }
  ];

  const currentInsightData = aiInsights[currentInsight];

  // Typing effect
  useEffect(() => {
    setIsTyping(true);
    setDisplayedText('');
    let index = 0;
    const text = currentInsightData.text;

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [currentInsight]);

  // Auto-cycle insights
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setIsProcessing(true);
      setTimeout(() => {
        setCurrentInsight((prev) => (prev + 1) % aiInsights.length);
        setIsProcessing(false);
      }, 300);
    }, 10000);

    return () => clearInterval(cycleInterval);
  }, []);

  const Icon = currentInsightData.icon;

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'HIGH': return 'text-accent-red';
      case 'MEDIUM': return 'text-accent-yellow';
      case 'INFO': return 'text-accent-cyan';
      default: return 'text-lab-400';
    }
  };

  return (
    <div className="lab-card p-6 bg-gradient-to-br from-lab-900/90 to-lab-950/90 backdrop-blur-md border-2 border-accent-cyan/30 shadow-2xl shadow-accent-cyan/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-accent-cyan/30 blur-2xl animate-pulse" />
            <div className="relative z-10 p-3 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-blue/20 border border-accent-cyan/30">
              <Brain className="w-8 h-8 text-accent-cyan" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-bold glow-text">Einstein AI</h3>
              <Zap className="w-4 h-4 text-accent-yellow animate-pulse" />
            </div>
            <p className="text-xs text-lab-500 font-mono">Advanced Analytics & Predictive Intelligence Engine</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-green/10 border border-accent-green/30">
            <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse shadow-lg shadow-accent-green/50" />
            <span className="text-xs text-accent-green font-mono font-semibold">ANALYZING</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-lab-500">
            <BarChart3 className="w-3 h-3" />
            <span className="font-mono">{aiInsights.length} insights processed</span>
          </div>
        </div>
      </div>

      {/* Main Insight */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentInsight}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-6"
        >
          <div className={`p-5 rounded-xl bg-gradient-to-br ${currentInsightData.bgColor} border border-lab-700/50`}>
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-xl bg-lab-800/70 backdrop-blur-sm ${currentInsightData.color} shadow-lg`}>
                <Icon className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-xl text-lab-50">{currentInsightData.title}</h4>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${getPriorityColor(currentInsightData.priority)} bg-lab-800/50 border border-current/30`}>
                    {currentInsightData.priority}
                  </span>
                  {currentInsightData.actionable && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold text-accent-green bg-accent-green/10 border border-accent-green/30">
                      ACTIONABLE
                    </span>
                  )}
                </div>
                <p className="text-lab-200 text-sm leading-relaxed">
                  {displayedText}
                  {isTyping && <span className="inline-block w-2 h-4 ml-1 bg-accent-cyan animate-pulse">▊</span>}
                </p>
              </div>
            </div>

            {/* Confidence Meter */}
            <div className="space-y-2 pt-4 border-t border-lab-700/50">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-lab-500" />
                  <span className="text-lab-400 font-medium">AI Confidence Level</span>
                </div>
                <span className="font-mono text-accent-cyan font-bold text-lg">{currentInsightData.confidence}%</span>
              </div>
              <div className="w-full bg-lab-800 h-3 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${currentInsightData.confidence}%` }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-green shadow-lg"
                  style={{
                    boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-lab-600">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
                <span>Very High</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="flex items-center justify-center gap-3 mb-6">
        {aiInsights.map((insight, idx) => {
          const InsightIcon = insight.icon;
          return (
            <button
              key={insight.id}
              onClick={() => setCurrentInsight(idx)}
              className={`group relative transition-all ${
                idx === currentInsight
                  ? 'scale-110'
                  : 'hover:scale-105'
              }`}
              title={insight.title}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                idx === currentInsight
                  ? `${insight.color} bg-lab-800/70 border-2 border-current shadow-lg`
                  : 'text-lab-600 bg-lab-800/30 border border-lab-700/50 hover:border-lab-600'
              }`}>
                <InsightIcon className="w-5 h-5" />
              </div>
              {idx === currentInsight && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-lg shadow-accent-cyan/50" />
              )}
            </button>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 pt-4 border-t border-lab-800">
        <div className="text-center p-3 rounded-lg bg-lab-800/30 hover:bg-lab-800/50 transition-all">
          <div className="flex justify-center mb-1">
            <Lightbulb className="w-4 h-4 text-accent-cyan" />
          </div>
          <p className="text-xs text-lab-500 uppercase tracking-wider mb-1">Insights</p>
          <p className="data-point text-lg">{aiInsights.length}</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-lab-800/30 hover:bg-lab-800/50 transition-all">
          <div className="flex justify-center mb-1">
            <BarChart3 className="w-4 h-4 text-accent-purple" />
          </div>
          <p className="text-xs text-lab-500 uppercase tracking-wider mb-1">Data Points</p>
          <p className="data-point text-lg">2.4M</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-lab-800/30 hover:bg-lab-800/50 transition-all">
          <div className="flex justify-center mb-1">
            <Target className="w-4 h-4 text-accent-green" />
          </div>
          <p className="text-xs text-lab-500 uppercase tracking-wider mb-1">Accuracy</p>
          <p className="data-point text-lg text-accent-green">94%</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-lab-800/30 hover:bg-lab-800/50 transition-all">
          <div className="flex justify-center mb-1">
            <Zap className="w-4 h-4 text-accent-yellow" />
          </div>
          <p className="text-xs text-lab-500 uppercase tracking-wider mb-1">Processing</p>
          <p className="data-point text-lg text-accent-yellow">Real-time</p>
        </div>
      </div>
    </div>
  );
}
