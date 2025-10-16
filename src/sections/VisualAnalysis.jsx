import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart, ComposedChart } from 'recharts';
import EngagementHeatmap from '../components/EngagementHeatmap';
import { TrendingUp, Users, Target } from 'lucide-react';

export default function VisualAnalysis({ data }) {
  // Instagram Followers Chart Data
  const instagramData = data.universities.map(uni => ({
    name: uni.shortName,
    followers: uni.instagram.followers,
    posts: uni.instagram.posts || 0,
    color: uni.color,
    isYU: uni.id === 'yu'
  })).sort((a, b) => b.followers - a.followers);

  // Benchmark Comparison Data
  const benchmarkData = [
    { metric: 'Instagram', optimal: 4.52, minimum: 2.99, current: 2.5 },
    { metric: 'Facebook', optimal: 2.97, minimum: 2.0, current: 2.2 },
    { metric: 'Twitter', optimal: 2.61, minimum: 1.5, current: 1.8 },
    { metric: 'LinkedIn', optimal: 2.95, minimum: 2.0, current: 2.1 },
  ];

  // TikTok Status
  const tiktokData = data.universities.map(uni => ({
    name: uni.shortName,
    active: uni.tiktok.active ? 100 : 0,
    followers: uni.tiktok.followers || 0
  }));

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-lab-900/95 backdrop-blur-md border border-lab-700 rounded-lg p-4 shadow-2xl">
          <p className="font-semibold text-lab-100 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 text-sm">
              <span className="text-lab-400">{entry.name}:</span>
              <span className="font-mono font-bold" style={{ color: entry.color }}>
                {typeof entry.value === 'number' && entry.value > 1000 
                  ? entry.value.toLocaleString() 
                  : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="section-title">Visual Analysis</h2>
        <div className="flex items-center gap-2 text-sm text-lab-400">
          <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
          <span className="font-mono">Live Data Visualization</span>
        </div>
      </div>

      {/* Instagram Followers Comparison - Professional Style */}
      <div className="lab-card p-6 bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="subsection-title mb-1">Instagram Followers Distribution</h3>
            <p className="text-xs text-lab-500">Competitive landscape analysis across peer institutions</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-lab-800/50 border border-lab-700">
            <Users className="w-4 h-4 text-accent-cyan" />
            <span className="text-xs font-mono text-lab-300">Total: {instagramData.reduce((acc, u) => acc + u.followers, 0).toLocaleString()}</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={instagramData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="yuBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8" 
              fontSize={12}
              fontFamily="Inter"
              tick={{ fill: '#94a3b8' }}
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={12}
              fontFamily="JetBrains Mono"
              tick={{ fill: '#94a3b8' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} />
            <Bar 
              dataKey="followers" 
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
              maxBarSize={80}
            >
              {instagramData.map((entry, index) => (
                <Bar 
                  key={`bar-${index}`}
                  fill={entry.isYU ? "url(#yuBarGradient)" : "url(#barGradient)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-6 grid grid-cols-6 gap-3">
          {instagramData.map(uni => (
            <div key={uni.name} className={`text-center p-3 rounded-lg transition-all hover:scale-105 ${
              uni.isYU ? 'bg-accent-red/10 border border-accent-red/30' : 'bg-lab-800/30 border border-lab-700/50'
            }`}>
              <p className="text-xs text-lab-500 mb-1">{uni.name}</p>
              <p className="data-point text-base font-bold">{(uni.followers / 1000).toFixed(1)}K</p>
              {uni.posts > 0 && (
                <p className="text-[10px] text-lab-600 mt-1">{uni.posts.toLocaleString()} posts</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Gap Analysis Visual - Professional */}
      <div className="grid grid-cols-2 gap-4">
        <div className="lab-card p-6 bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-accent-red" />
            <h3 className="subsection-title">Competitive Gap Analysis</h3>
          </div>
          <div className="space-y-5">
            {[
              { label: 'vs NYU (Leader)', value: data.gaps.instagram.followers.vsLeader, max: 600000, color: 'from-accent-red via-orange-500 to-accent-yellow' },
              { label: 'vs Average', value: Math.abs(data.gaps.instagram.followers.vsAverage), max: 150000, color: 'from-accent-yellow via-orange-400 to-accent-red' },
              { label: 'vs Brandeis (Closest)', value: data.gaps.instagram.closestCompetitor.difference, max: 25000, color: 'from-accent-cyan via-accent-blue to-accent-purple' }
            ].map((gap, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-lab-800/30 border border-lab-700/50 hover:border-lab-600 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-lab-300">{gap.label}</span>
                  <span className="font-mono font-bold text-accent-red">-{gap.value.toLocaleString()}</span>
                </div>
                <div className="w-full bg-lab-800 h-3 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-full bg-gradient-to-r ${gap.color} transition-all duration-1000 ease-out shadow-lg`}
                    style={{ width: `${(gap.value / gap.max) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1.5 text-xs text-lab-600">
                  <span>0</span>
                  <span>{((gap.value / gap.max) * 100).toFixed(1)}%</span>
                  <span>{(gap.max / 1000).toFixed(0)}K</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lab-card p-6 bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-accent-purple" />
            <h3 className="subsection-title">Platform Adoption Status</h3>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={tiktokData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="activeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.9} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis type="number" stroke="#94a3b8" fontSize={11} fontFamily="JetBrains Mono" />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" width={70} fontSize={11} fontFamily="Inter" />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} />
              <Bar dataKey="active" fill="url(#activeGradient)" radius={[0, 8, 8, 0]} maxBarSize={35} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 rounded-lg bg-lab-800/30 border border-lab-700/50">
            <div className="flex items-center justify-between">
              <span className="text-xs text-lab-500">Active TikTok Accounts:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-accent-green">{tiktokData.filter(d => d.active > 0).length}</span>
                <span className="text-lab-600">/</span>
                <span className="font-mono text-lab-400">{tiktokData.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benchmarks Visualization - Professional Area Chart */}
      <div className="lab-card p-6 bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="subsection-title mb-1">Industry Benchmarks: Engagement Rates</h3>
            <p className="text-xs text-lab-500">Higher education social media performance standards (2025)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-accent-green" />
              <span className="text-xs text-lab-400">Optimal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-accent-yellow" />
              <span className="text-xs text-lab-400">Minimum</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-accent-cyan" />
              <span className="text-xs text-lab-400">Current</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={benchmarkData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="optimalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="minimumGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis 
              dataKey="metric" 
              stroke="#94a3b8" 
              fontSize={12}
              fontFamily="Inter"
              tick={{ fill: '#94a3b8' }}
            />
            <YAxis 
              stroke="#94a3b8" 
              domain={[0, 5]} 
              fontSize={12}
              fontFamily="JetBrains Mono"
              tick={{ fill: '#94a3b8' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            <Area 
              type="monotone" 
              dataKey="optimal" 
              fill="url(#optimalGradient)" 
              stroke="#10b981" 
              strokeWidth={3}
              name="Optimal Range"
            />
            <Area 
              type="monotone" 
              dataKey="minimum" 
              fill="url(#minimumGradient)" 
              stroke="#f59e0b" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Minimum Effective"
            />
            <Line 
              type="monotone" 
              dataKey="current" 
              stroke="#06b6d4" 
              strokeWidth={2.5}
              dot={{ fill: '#06b6d4', r: 5, strokeWidth: 2, stroke: '#0f172a' }}
              name="YU Current"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Engagement Heatmap */}
      <EngagementHeatmap />

      {/* Key Metrics Summary - Professional Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="lab-card p-6 text-center bg-gradient-to-br from-accent-cyan/10 to-accent-blue/5 border-accent-cyan/30 hover:border-accent-cyan/50 transition-all hover:scale-105">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full bg-accent-cyan/20">
              <Target className="w-6 h-6 text-accent-cyan" />
            </div>
          </div>
          <p className="metric-label mb-2">Instagram Optimal Posts/Week</p>
          <p className="metric-value text-accent-cyan">
            {data.benchmarks.instagram.optimalPostingFrequency.min}-{data.benchmarks.instagram.optimalPostingFrequency.max}
          </p>
          <p className="text-xs text-lab-500 mt-2">For maximum engagement</p>
        </div>
        <div className="lab-card p-6 text-center bg-gradient-to-br from-accent-green/10 to-accent-cyan/5 border-accent-green/30 hover:border-accent-green/50 transition-all hover:scale-105">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full bg-accent-green/20">
              <TrendingUp className="w-6 h-6 text-accent-green" />
            </div>
          </div>
          <p className="metric-label mb-2">Reels Engagement Rate</p>
          <p className="metric-value text-accent-green">{data.benchmarks.instagram.reelsEngagement}%</p>
          <p className="text-xs text-lab-500 mt-2">2.5x higher than static</p>
        </div>
        <div className="lab-card p-6 text-center bg-gradient-to-br from-accent-purple/10 to-accent-blue/5 border-accent-purple/30 hover:border-accent-purple/50 transition-all hover:scale-105">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full bg-accent-purple/20">
              <Users className="w-6 h-6 text-accent-purple" />
            </div>
          </div>
          <p className="metric-label mb-2">TikTok Weekly Growth</p>
          <p className="metric-value text-accent-purple">{data.benchmarks.tiktok.weeklyFollowerGrowth}%</p>
          <p className="text-xs text-lab-500 mt-2">Fastest growing platform</p>
        </div>
        <div className="lab-card p-6 text-center bg-gradient-to-br from-accent-yellow/10 to-accent-red/5 border-accent-yellow/30 hover:border-accent-yellow/50 transition-all hover:scale-105">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full bg-accent-yellow/20">
              <TrendingUp className="w-6 h-6 text-accent-yellow" />
            </div>
          </div>
          <p className="metric-label mb-2">TikTok Engagement Multiplier</p>
          <p className="metric-value text-accent-yellow">{data.benchmarks.tiktok.engagementMultiplier}x</p>
          <p className="text-xs text-lab-500 mt-2">vs other platforms</p>
        </div>
      </div>
    </div>
  );
}
