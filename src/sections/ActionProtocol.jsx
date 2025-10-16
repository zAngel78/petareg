import { Target, Zap, Clock, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ActionProtocol({ data }) {
  const priorityColors = {
    immediate: { bg: 'bg-accent-red/10', border: 'border-accent-red', text: 'text-accent-red' },
    high: { bg: 'bg-accent-yellow/10', border: 'border-accent-yellow', text: 'text-accent-yellow' },
    medium: { bg: 'bg-accent-blue/10', border: 'border-accent-blue', text: 'text-accent-blue' }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="section-title mb-2">Action Protocol</h2>
        <p className="text-lab-400">Data-driven recommendations prioritized by impact and feasibility</p>
      </div>

      {/* Priority Matrix */}
      <div className="grid grid-cols-3 gap-4">
        {['immediate', 'high', 'medium'].map((priority) => {
          const recs = data.recommendations.filter(r => r.priority === priority);
          const colors = priorityColors[priority];

          return (
            <div key={priority} className="lab-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${colors.bg} border-2 ${colors.border}`} />
                <h3 className={`uppercase text-sm font-bold tracking-wider ${colors.text}`}>
                  {priority} Priority
                </h3>
              </div>
              <div className="space-y-2">
                {recs.map(rec => (
                  <div key={rec.id} className="text-sm">
                    <p className="font-medium text-lab-200">{rec.action}</p>
                    <p className="text-xs text-lab-500 mt-1">{rec.category}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Action Plans */}
      <div className="space-y-4">
        {data.recommendations.map((rec, idx) => {
          const colors = priorityColors[rec.priority];

          return (
            <div key={rec.id} className={`lab-card p-6 border-l-4 ${colors.border}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-bold ${colors.text} font-mono`}>
                      ACTION #{rec.id}
                    </span>
                    <span className={`status-indicator ${colors.bg} ${colors.text} border ${colors.border}`}>
                      {rec.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-lab-100 mb-2">{rec.action}</h3>
                  <p className="text-sm text-lab-400">{rec.rationale}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-lab-500 mb-1">Expected Impact</p>
                  <span className={`text-lg font-bold font-mono ${colors.text}`}>{rec.expectedImpact}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-4 pt-4 border-t border-lab-800">
                {/* Implementation Steps */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-accent-cyan" />
                    <h4 className="font-semibold text-sm text-lab-200">Implementation Steps</h4>
                  </div>
                  <div className="space-y-2">
                    {rec.implementation.map((step, stepIdx) => (
                      <div key={stepIdx} className="flex items-start gap-2">
                        <span className="text-xs font-mono text-accent-cyan mt-0.5">{stepIdx + 1}.</span>
                        <p className="text-sm text-lab-300">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-accent-green" />
                    <h4 className="font-semibold text-sm text-lab-200">Key Metrics</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-lab-500" />
                        <span className="text-xs text-lab-500">Timeframe</span>
                      </div>
                      <span className="font-mono text-sm text-accent-cyan">{rec.timeframe}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-3 h-3 text-lab-500" />
                        <span className="text-xs text-lab-500">Resources</span>
                      </div>
                      <span className="font-mono text-sm text-lab-300">{rec.resources}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-lab-500" />
                        <span className="text-xs text-lab-500">Priority</span>
                      </div>
                      <span className={`font-mono text-sm font-bold ${colors.text}`}>
                        {rec.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Execution Timeline */}
      <div className="lab-card p-6">
        <h3 className="subsection-title mb-4">Recommended Execution Timeline</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-24 text-right">
              <span className="text-xs text-lab-500 uppercase tracking-wider">Week 1</span>
            </div>
            <ArrowRight className="w-4 h-4 text-lab-600" />
            <div className="flex-1 lab-card p-3 bg-accent-red/10 border border-accent-red/30">
              <p className="text-sm font-medium text-lab-200">Establish TikTok Presence</p>
              <p className="text-xs text-lab-500 mt-1">Create account, initial content strategy, first 3 posts</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-24 text-right">
              <span className="text-xs text-lab-500 uppercase tracking-wider">Week 1-2</span>
            </div>
            <ArrowRight className="w-4 h-4 text-lab-600" />
            <div className="flex-1 lab-card p-3 bg-accent-red/10 border border-accent-red/30">
              <p className="text-sm font-medium text-lab-200">Launch Instagram Reels Strategy</p>
              <p className="text-xs text-lab-500 mt-1">Produce 2-3 Reels/week, track engagement</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-24 text-right">
              <span className="text-xs text-lab-500 uppercase tracking-wider">Week 2-4</span>
            </div>
            <ArrowRight className="w-4 h-4 text-lab-600" />
            <div className="flex-1 lab-card p-3 bg-accent-yellow/10 border border-accent-yellow/30">
              <p className="text-sm font-medium text-lab-200">Optimize Posting Frequency</p>
              <p className="text-xs text-lab-500 mt-1">Scale to 8-12 posts/week, A/B test timing</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-24 text-right">
              <span className="text-xs text-lab-500 uppercase tracking-wider">Week 4-8</span>
            </div>
            <ArrowRight className="w-4 h-4 text-lab-600" />
            <div className="flex-1 lab-card p-3 bg-accent-blue/10 border border-accent-blue/30">
              <p className="text-sm font-medium text-lab-200">Competitive Analysis & Refinement</p>
              <p className="text-xs text-lab-500 mt-1">Study top performers, adjust strategy, measure results</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Criteria */}
      <div className="lab-card p-6 bg-lab-900/80">
        <h3 className="subsection-title mb-4">Success Criteria (6-Month Targets)</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 lab-card bg-lab-900/50">
            <p className="metric-label mb-2">Instagram Followers</p>
            <p className="metric-value text-accent-green">25,000</p>
            <p className="text-xs text-lab-500 mt-2">+67% growth</p>
          </div>
          <div className="text-center p-4 lab-card bg-lab-900/50">
            <p className="metric-label mb-2">TikTok Followers</p>
            <p className="metric-value text-accent-cyan">5,000</p>
            <p className="text-xs text-lab-500 mt-2">New baseline</p>
          </div>
          <div className="text-center p-4 lab-card bg-lab-900/50">
            <p className="metric-label mb-2">Engagement Rate</p>
            <p className="metric-value text-accent-purple">3.5%</p>
            <p className="text-xs text-lab-500 mt-2">Above industry avg</p>
          </div>
          <div className="text-center p-4 lab-card bg-lab-900/50">
            <p className="metric-label mb-2">Active Platforms</p>
            <p className="metric-value text-accent-yellow">6</p>
            <p className="text-xs text-lab-500 mt-2">Full presence</p>
          </div>
        </div>
      </div>
    </div>
  );
}
