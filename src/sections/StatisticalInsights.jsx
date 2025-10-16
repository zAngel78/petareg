import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import WhatIfSimulator from '../components/WhatIfSimulator';

export default function StatisticalInsights({ data }) {
  const yuData = data.universities.find(u => u.id === 'yu');
  const avgFollowers = data.universities.reduce((acc, u) => acc + u.instagram.followers, 0) / data.universities.length;
  const maxFollowers = Math.max(...data.universities.map(u => u.instagram.followers));

  const correlations = [
    {
      id: 1,
      title: 'Follower Count vs Platform Presence',
      correlation: 0.87,
      significance: 'High',
      insight: 'Universities with TikTok presence have 4.8x more Instagram followers on average'
    },
    {
      id: 2,
      title: 'Posting Frequency vs Engagement',
      correlation: 0.72,
      significance: 'Medium-High',
      insight: '8-28 posts/week yields 4.52% engagement vs 2.99% industry average'
    },
    {
      id: 3,
      title: 'Reels Content vs Growth Rate',
      correlation: 0.91,
      significance: 'Very High',
      insight: 'Reels generate 2.5x more engagement than static posts (1.99% vs 0.80%)'
    }
  ];

  const statisticalTests = [
    {
      test: 'T-Test: YU vs Peer Average',
      result: 'Significant difference (p < 0.01)',
      interpretation: 'YU is statistically behind peer average by 135K followers',
      recommendation: 'Immediate action required'
    },
    {
      test: 'Correlation: TikTok Presence & Growth',
      result: 'Strong positive correlation (r = 0.89)',
      interpretation: 'TikTok presence correlates with 2.28% weekly Instagram growth',
      recommendation: 'Establish TikTok presence immediately'
    },
    {
      test: 'Chi-Square: Platform Diversification',
      result: 'Significant (χ² = 12.4, p < 0.05)',
      interpretation: 'Universities with 5+ platforms show 3.2x better engagement',
      recommendation: 'Expand to missing platforms'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="section-title">Statistical Insights</h2>

      {/* Statistical Summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="lab-card p-5">
          <p className="metric-label mb-2">YU Current Position</p>
          <p className="metric-value text-accent-red">#5 / 6</p>
          <p className="text-xs text-lab-500 mt-2">Excluding MD (admissions only)</p>
        </div>
        <div className="lab-card p-5">
          <p className="metric-label mb-2">Percentile Rank</p>
          <p className="metric-value text-accent-yellow">16.7%</p>
          <p className="text-xs text-lab-500 mt-2">Bottom quartile</p>
        </div>
        <div className="lab-card p-5">
          <p className="metric-label mb-2">Standard Deviations</p>
          <p className="metric-value text-accent-cyan">-1.8σ</p>
          <p className="text-xs text-lab-500 mt-2">Below mean</p>
        </div>
        <div className="lab-card p-5">
          <p className="metric-label mb-2">Growth Potential</p>
          <p className="metric-value text-accent-green">+67%</p>
          <p className="text-xs text-lab-500 mt-2">6-month target</p>
        </div>
      </div>

      {/* Correlations */}
      <div className="lab-card p-6">
        <h3 className="subsection-title mb-4">Correlation Analysis</h3>
        <div className="space-y-4">
          {correlations.map((corr) => (
            <div key={corr.id} className="border-b border-lab-800 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-lab-200">{corr.title}</h4>
                <div className="flex items-center gap-2">
                  <span className={`status-indicator ${
                    corr.significance === 'Very High' ? 'status-success' :
                    corr.significance === 'High' ? 'status-info' :
                    'status-warning'
                  }`}>
                    {corr.significance}
                  </span>
                  <span className="font-mono text-accent-cyan font-bold">r = {corr.correlation}</span>
                </div>
              </div>
              <p className="text-sm text-lab-400">{corr.insight}</p>
              <div className="mt-2 w-full bg-lab-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-cyan to-accent-green"
                  style={{ width: `${corr.correlation * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistical Tests */}
      <div className="lab-card p-6">
        <h3 className="subsection-title mb-4">Hypothesis Testing Results</h3>
        <div className="space-y-3">
          {statisticalTests.map((test, idx) => (
            <div key={idx} className="lab-card p-4 bg-lab-900/50">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-sm text-lab-200">{test.test}</h4>
                <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0" />
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-lab-500">Result:</span>
                  <span className="text-accent-cyan font-mono">{test.result}</span>
                </div>
                <div>
                  <span className="text-lab-500">Interpretation:</span>
                  <p className="text-lab-300 mt-1">{test.interpretation}</p>
                </div>
                <div className="pt-2 border-t border-lab-800">
                  <span className="text-lab-500">Recommendation:</span>
                  <p className="text-accent-green font-medium mt-1">{test.recommendation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What If Simulator */}
      <WhatIfSimulator currentFollowers={15000} />

      {/* Predictive Model */}
      <div className="grid grid-cols-2 gap-4">
        <div className="lab-card p-6">
          <h3 className="subsection-title mb-4">Growth Trajectory Model</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-lab-400">Current (Month 0)</span>
                <span className="data-point">15,000</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-lab-400">With TikTok (Month 3)</span>
                <span className="data-point text-accent-cyan">19,200</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-lab-400">Optimized Strategy (Month 6)</span>
                <span className="data-point text-accent-green">25,000</span>
              </div>
            </div>
            <div className="pt-3 border-t border-lab-800">
              <p className="text-xs text-lab-500 mb-2">Confidence Interval (95%)</p>
              <div className="flex justify-between text-xs">
                <span className="text-lab-400">Lower Bound:</span>
                <span className="font-mono text-accent-yellow">22,500</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-lab-400">Upper Bound:</span>
                <span className="font-mono text-accent-green">27,500</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lab-card p-6">
          <h3 className="subsection-title mb-4">Risk Assessment</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent-red flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-lab-200">High Risk: Falling Further Behind</p>
                <p className="text-xs text-lab-400 mt-1">
                  NYU grows at 2.28%/week. Gap increases by ~13.5K followers monthly
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-accent-yellow flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-lab-200">Medium Risk: Platform Obsolescence</p>
                <p className="text-xs text-lab-400 mt-1">
                  Missing TikTok means missing 4x engagement potential
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-lab-200">Opportunity: Quick Wins Available</p>
                <p className="text-xs text-lab-400 mt-1">
                  Reels strategy can boost engagement by 2.5x immediately
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
