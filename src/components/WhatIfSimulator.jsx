import { useState } from 'react';
import { Sliders, TrendingUp, Calculator, Play, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function WhatIfSimulator({ currentFollowers = 15000 }) {
  const [postsPerWeek, setPostsPerWeek] = useState(8);
  const [reelsPerWeek, setReelsPerWeek] = useState(2);
  const [hasTikTok, setHasTikTok] = useState(false);

  // Calculate projected growth
  const calculateGrowth = () => {
    const baseGrowth = 0.005; // 0.5% weekly base
    const postBonus = (postsPerWeek / 12) * 0.003; // Bonus por frecuencia
    const reelsBonus = (reelsPerWeek / 3) * 0.008; // Reels tienen 2x impacto
    const tiktokBonus = hasTikTok ? 0.0228 : 0; // 2.28% growth

    const weeklyGrowth = baseGrowth + postBonus + reelsBonus + tiktokBonus;

    const projections = [];
    let current = currentFollowers;

    for (let month = 0; month <= 6; month++) {
      projections.push({
        month: `M${month}`,
        monthLabel: `Month ${month}`,
        followers: Math.round(current),
        engagement: ((2.99 + (reelsBonus * 100) + (tiktokBonus * 50)) * 100) / 100,
        baseline: currentFollowers + (currentFollowers * 0.005 * 4 * month) // Conservative baseline
      });
      current *= Math.pow(1 + weeklyGrowth, 4); // 4 weeks per month
    }

    return projections;
  };

  const projections = calculateGrowth();
  const sixMonthTarget = projections[6].followers;
  const totalGrowth = ((sixMonthTarget - currentFollowers) / currentFollowers * 100).toFixed(1);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-lab-900/95 backdrop-blur-md border border-lab-700 rounded-lg p-4 shadow-2xl">
          <p className="font-semibold text-lab-100 mb-2">{payload[0]?.payload?.monthLabel}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 text-sm mb-1">
              <span className="text-lab-400">{entry.name}:</span>
              <span className="font-mono font-bold" style={{ color: entry.color }}>
                {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="lab-card p-6 bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent-cyan/20">
            <Calculator className="w-6 h-6 text-accent-cyan" />
          </div>
          <div>
            <h3 className="section-title">Growth Projection Simulator</h3>
            <p className="text-xs text-lab-500">Interactive scenario modeling based on strategy variables</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-green/10 border border-accent-green/30">
          <Play className="w-3 h-3 text-accent-green" />
          <span className="text-xs font-mono text-accent-green">LIVE SIMULATION</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-lab-800/30 border border-lab-700/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-accent-cyan" />
                <label className="text-sm font-semibold text-lab-200">Instagram Posts/Week</label>
              </div>
              <span className="font-mono text-2xl font-bold text-accent-cyan">{postsPerWeek}</span>
            </div>
            <input
              type="range"
              min="2"
              max="28"
              value={postsPerWeek}
              onChange={(e) => setPostsPerWeek(Number(e.target.value))}
              className="w-full h-2 bg-lab-800 rounded-lg appearance-none cursor-pointer accent-accent-cyan slider-thumb"
              style={{
                background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((postsPerWeek - 2) / 26) * 100}%, #1e293b ${((postsPerWeek - 2) / 26) * 100}%, #1e293b 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-lab-500 mt-2">
              <span>2 (min)</span>
              <span className="text-accent-cyan">12 (optimal)</span>
              <span>28 (max)</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-lab-800/30 border border-lab-700/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-accent-purple" />
                <label className="text-sm font-semibold text-lab-200">Reels/Week</label>
              </div>
              <span className="font-mono text-2xl font-bold text-accent-purple">{reelsPerWeek}</span>
            </div>
            <input
              type="range"
              min="0"
              max="7"
              value={reelsPerWeek}
              onChange={(e) => setReelsPerWeek(Number(e.target.value))}
              className="w-full h-2 bg-lab-800 rounded-lg appearance-none cursor-pointer accent-accent-purple"
              style={{
                background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(reelsPerWeek / 7) * 100}%, #1e293b ${(reelsPerWeek / 7) * 100}%, #1e293b 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-lab-500 mt-2">
              <span>0</span>
              <span className="text-accent-purple">3 (recommended)</span>
              <span>7</span>
            </div>
          </div>

          <div>
            <div 
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all border-2 ${
                hasTikTok 
                  ? 'bg-accent-green/10 border-accent-green/50 hover:bg-accent-green/20' 
                  : 'bg-lab-800/30 border-lab-700/50 hover:border-lab-600'
              }`}
              onClick={() => setHasTikTok(!hasTikTok)}
            >
              <div>
                <p className="font-semibold text-lab-200 mb-1">Launch TikTok Platform</p>
                <p className="text-xs text-lab-500">+2.28% weekly growth boost • 4x engagement multiplier</p>
              </div>
              <div className={`w-14 h-7 rounded-full transition-all duration-300 ${hasTikTok ? 'bg-accent-green shadow-lg shadow-accent-green/50' : 'bg-lab-700'} relative`}>
                <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-md ${hasTikTok ? 'translate-x-7' : ''}`} />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="p-5 rounded-lg bg-gradient-to-br from-accent-cyan/10 to-accent-blue/5 border border-accent-cyan/30">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-accent-cyan" />
              <h4 className="font-semibold text-sm text-lab-200">Projection Summary</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-lab-400">Current Followers</span>
                <span className="font-mono font-bold text-lab-200">{currentFollowers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-lab-400">6-Month Projection</span>
                <span className="font-mono font-bold text-accent-green text-lg">{sixMonthTarget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-lab-700/50">
                <span className="text-sm font-semibold text-lab-300">Total Growth</span>
                <span className="text-accent-cyan font-mono font-bold text-xl">+{totalGrowth}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-lab-400">Projected Engagement</span>
                <span className="font-mono font-bold text-accent-purple">{projections[6].engagement.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={projections} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="projectionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                stroke="#94a3b8" 
                fontSize={11} 
                fontFamily="JetBrains Mono"
                tick={{ fill: '#94a3b8' }}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={11} 
                fontFamily="JetBrains Mono"
                tick={{ fill: '#94a3b8' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }}
                iconType="circle"
              />
              <Area
                type="monotone"
                dataKey="baseline"
                fill="url(#baselineGradient)"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Conservative Baseline"
              />
              <Area
                type="monotone"
                dataKey="followers"
                fill="url(#projectionGradient)"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ fill: '#06b6d4', r: 4, strokeWidth: 2, stroke: '#0f172a' }}
                name="Optimized Strategy"
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="lab-card p-3 bg-lab-900/50 text-center">
              <p className="text-[10px] text-lab-500 uppercase tracking-wider mb-1">Month 3</p>
              <p className="data-point text-sm">{projections[3].followers.toLocaleString()}</p>
            </div>
            <div className="lab-card p-3 bg-lab-900/50 text-center">
              <p className="text-[10px] text-lab-500 uppercase tracking-wider mb-1">Month 6</p>
              <p className="data-point text-sm text-accent-green">{projections[6].followers.toLocaleString()}</p>
            </div>
            <div className="lab-card p-3 bg-lab-900/50 text-center">
              <p className="text-[10px] text-lab-500 uppercase tracking-wider mb-1">Growth Rate</p>
              <p className="data-point text-sm text-accent-cyan">+{totalGrowth}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations based on settings */}
      <div className="mt-6 pt-6 border-t border-lab-800">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-accent-yellow" />
          <h4 className="font-semibold text-sm text-lab-200">Dynamic Recommendations</h4>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {postsPerWeek < 8 && (
            <div className="status-indicator status-warning text-xs">
              ⚠️ Increase posting frequency for better results
            </div>
          )}
          {reelsPerWeek < 2 && (
            <div className="status-indicator status-warning text-xs">
              ⚠️ Add more Reels for 2.5x engagement boost
            </div>
          )}
          {!hasTikTok && (
            <div className="status-indicator status-critical text-xs">
              🚨 Enable TikTok for 2.28% weekly growth
            </div>
          )}
          {postsPerWeek >= 8 && reelsPerWeek >= 2 && hasTikTok && (
            <div className="status-indicator status-success text-xs col-span-3">
              ✅ Optimal strategy! This will maximize growth potential
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
