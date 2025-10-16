import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radar, Satellite, Globe, Zap, TrendingUp, AlertTriangle, 
  Target, Radio, Cpu, Activity, BarChart3, Eye, Sparkles,
  ChevronRight, Play, Pause, RotateCw, Maximize2, Download,
  Instagram, Music, Users, Heart, MessageCircle, Share2
} from 'lucide-react';

export default function CommandCenter({ data }) {
  const [isScanning, setIsScanning] = useState(true);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [radarAngle, setRadarAngle] = useState(0);
  const [liveMetrics, setLiveMetrics] = useState({
    totalReach: 0,
    engagement: 0,
    growth: 0
  });
  const [activeSignals, setActiveSignals] = useState([]);
  const [hologramMode, setHologramMode] = useState(true);

  // Radar scanning animation
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setRadarAngle(prev => (prev + 2) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  // Live metrics simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics({
        totalReach: Math.floor(Math.random() * 1000000) + 1200000,
        engagement: (Math.random() * 5 + 2).toFixed(2),
        growth: (Math.random() * 3 + 1).toFixed(2)
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Generate random signals
  useEffect(() => {
    const interval = setInterval(() => {
      const newSignal = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: ['instagram', 'tiktok', 'engagement'][Math.floor(Math.random() * 3)],
        strength: Math.random() * 100
      };
      setActiveSignals(prev => [...prev.slice(-10), newSignal]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Calculate university positions in a circle
  const getUniversityPosition = (index, total) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radius = 35; // percentage
    return {
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle)
    };
  };

  const getSignalColor = (type) => {
    switch(type) {
      case 'instagram': return '#ec4899';
      case 'tiktok': return '#a855f7';
      case 'engagement': return '#06b6d4';
      default: return '#10b981';
    }
  };

  return (
    <div className="space-y-4">
      {/* Command Center Header */}
      <div className="lab-card p-6 bg-gradient-to-br from-lab-900 via-lab-950 to-black border-2 border-accent-cyan/30 relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-accent-cyan blur-2xl animate-pulse" />
                <div className="relative p-4 rounded-2xl bg-gradient-to-br from-accent-cyan/30 to-accent-blue/30 border-2 border-accent-cyan/50">
                  <Radar className="w-10 h-10 text-accent-cyan" style={{ transform: `rotate(${radarAngle}deg)` }} />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-1">
                  <span className="bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple bg-clip-text text-transparent">
                    RESEARCH COMMAND CENTER
                  </span>
                </h2>
                <p className="text-sm text-lab-400 font-mono flex items-center gap-2">
                  <Radio className="w-3 h-3 animate-pulse text-accent-green" />
                  Real-time Intelligence & Analytics System
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsScanning(!isScanning)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                  isScanning
                    ? 'bg-accent-green text-black'
                    : 'bg-lab-800 text-lab-300'
                }`}
              >
                {isScanning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isScanning ? 'SCANNING' : 'PAUSED'}
              </button>
              <button
                onClick={() => setHologramMode(!hologramMode)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                  hologramMode
                    ? 'bg-accent-purple text-white'
                    : 'bg-lab-800 text-lab-300'
                }`}
              >
                <Eye className="w-4 h-4" />
                {hologramMode ? '3D MODE' : '2D MODE'}
              </button>
            </div>
          </div>

          {/* Live Metrics Bar */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-blue/10 border border-accent-cyan/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Satellite className="w-4 h-4 text-accent-cyan" />
                <span className="text-xs text-lab-400 uppercase tracking-wider">Total Reach</span>
              </div>
              <p className="text-2xl font-bold font-mono text-accent-cyan">{liveMetrics.totalReach.toLocaleString()}</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-accent-green">
                <TrendingUp className="w-3 h-3" />
                <span>+{liveMetrics.growth}%</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-accent-green/20 to-accent-cyan/10 border border-accent-green/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-accent-green" />
                <span className="text-xs text-lab-400 uppercase tracking-wider">Engagement</span>
              </div>
              <p className="text-2xl font-bold font-mono text-accent-green">{liveMetrics.engagement}%</p>
              <div className="mt-2 h-1 bg-lab-800 rounded-full overflow-hidden">
                <div className="h-full bg-accent-green" style={{ width: `${liveMetrics.engagement * 20}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-blue/10 border border-accent-purple/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-accent-purple" />
                <span className="text-xs text-lab-400 uppercase tracking-wider">Active Platforms</span>
              </div>
              <p className="text-2xl font-bold font-mono text-accent-purple">{data.universities.filter(u => u.tiktok.active).length}/6</p>
              <div className="mt-2 text-xs text-lab-500">TikTok Coverage</div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-accent-yellow/20 to-accent-red/10 border border-accent-yellow/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4 text-accent-yellow" />
                <span className="text-xs text-lab-400 uppercase tracking-wider">AI Status</span>
              </div>
              <p className="text-2xl font-bold font-mono text-accent-yellow">94%</p>
              <div className="mt-2 text-xs text-accent-green flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                OPERATIONAL
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Radar Display */}
      <div className="grid grid-cols-3 gap-4">
        {/* Radar Visualization */}
        <div className="col-span-2 lab-card p-6 bg-gradient-to-br from-lab-900 to-black border-2 border-accent-cyan/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-purple/5" />
          
          <div className="relative z-10 mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-lab-100 flex items-center gap-2">
                <Globe className="w-5 h-5 text-accent-cyan" />
                Social Media Radar
              </h3>
              <div className="flex items-center gap-2 text-xs text-lab-500">
                <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                <span className="font-mono">LIVE TRACKING</span>
              </div>
            </div>
          </div>

          {/* Radar Circle */}
          <div className="relative aspect-square max-h-[500px] mx-auto">
            {/* Radar background circles */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="radarGradient">
                  <stop offset="0%" stopColor="rgba(6, 182, 212, 0.1)" />
                  <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
                </radialGradient>
              </defs>
              
              {/* Concentric circles */}
              {[20, 40, 60, 80].map((r, i) => (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r={r / 2}
                  fill="none"
                  stroke="rgba(6, 182, 212, 0.2)"
                  strokeWidth="0.5"
                />
              ))}
              
              {/* Cross lines */}
              <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="0.5" />
              
              {/* Radar sweep */}
              {isScanning && (
                <line
                  x1="50"
                  y1="50"
                  x2={50 + 40 * Math.cos((radarAngle * Math.PI) / 180)}
                  y2={50 + 40 * Math.sin((radarAngle * Math.PI) / 180)}
                  stroke="rgba(6, 182, 212, 0.8)"
                  strokeWidth="1"
                  strokeLinecap="round"
                >
                  <animate
                    attributeName="opacity"
                    values="1;0.3;1"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </line>
              )}

              {/* Universities as radar blips */}
              {data.universities.map((uni, index) => {
                const pos = getUniversityPosition(index, data.universities.length);
                const isYU = uni.id === 'yu';
                const size = Math.log(uni.instagram.followers + 1) / 5;
                
                return (
                  <g key={uni.id}>
                    {/* Pulse effect */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={size}
                      fill={isYU ? 'rgba(239, 68, 68, 0.3)' : 'rgba(6, 182, 212, 0.3)'}
                      className="animate-pulse"
                    />
                    {/* Main blip */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={size * 0.6}
                      fill={isYU ? '#ef4444' : '#06b6d4'}
                      className="cursor-pointer transition-all hover:r-4"
                      onClick={() => setSelectedUniversity(uni)}
                    />
                    {/* Label */}
                    <text
                      x={pos.x}
                      y={pos.y - size - 2}
                      textAnchor="middle"
                      className="text-[3px] fill-lab-300 font-mono"
                    >
                      {uni.shortName}
                    </text>
                  </g>
                );
              })}

              {/* Active signals */}
              {activeSignals.map(signal => (
                <circle
                  key={signal.id}
                  cx={signal.x}
                  cy={signal.y}
                  r="0.5"
                  fill={getSignalColor(signal.type)}
                  opacity={signal.strength / 100}
                >
                  <animate
                    attributeName="r"
                    from="0.5"
                    to="3"
                    dur="2s"
                    repeatCount="1"
                  />
                  <animate
                    attributeName="opacity"
                    from={signal.strength / 100}
                    to="0"
                    dur="2s"
                    repeatCount="1"
                  />
                </circle>
              ))}
            </svg>

            {/* Center indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 rounded-full bg-accent-cyan shadow-lg shadow-accent-cyan/50 animate-pulse" />
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-cyan" />
              <span className="text-lab-400">Universities</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-red" />
              <span className="text-lab-400">YU (Target)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-500" />
              <span className="text-lab-400">Instagram Signal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-lab-400">TikTok Signal</span>
            </div>
          </div>
        </div>

        {/* University Detail Panel */}
        <div className="lab-card p-6 bg-gradient-to-br from-lab-900 to-black border-2 border-accent-purple/20">
          <h3 className="text-lg font-bold text-lab-100 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent-purple" />
            Intelligence Report
          </h3>

          <AnimatePresence mode="wait">
            {selectedUniversity ? (
              <motion.div
                key={selectedUniversity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {/* University Header */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-accent-cyan/10 to-accent-blue/5 border border-accent-cyan/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-xl text-lab-100">{selectedUniversity.shortName}</h4>
                    {selectedUniversity.id === 'yu' && (
                      <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-accent-red text-white">
                        TARGET
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-lab-500">{selectedUniversity.name}</p>
                </div>

                {/* Instagram Stats */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500/10 to-pink-500/5 border border-pink-500/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Instagram className="w-4 h-4 text-pink-500" />
                    <span className="text-sm font-semibold text-lab-200">Instagram</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-lab-500">Followers</span>
                      <span className="font-mono font-bold text-pink-500">
                        {selectedUniversity.instagram.followers.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-lab-500">Posts</span>
                      <span className="font-mono text-lab-300">
                        {selectedUniversity.instagram.posts?.toLocaleString() || 'N/A'}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-lab-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                        style={{ 
                          width: `${(selectedUniversity.instagram.followers / Math.max(...data.universities.map(u => u.instagram.followers))) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* TikTok Stats */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Music className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-semibold text-lab-200">TikTok</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-lab-500">Status</span>
                      <span className={`font-mono text-xs ${selectedUniversity.tiktok.active ? 'text-accent-green' : 'text-accent-red'}`}>
                        {selectedUniversity.tiktok.active ? '● ACTIVE' : '● INACTIVE'}
                      </span>
                    </div>
                    {selectedUniversity.tiktok.followers && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-lab-500">Followers</span>
                        <span className="font-mono font-bold text-purple-500">
                          {selectedUniversity.tiktok.followers.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  {selectedUniversity.instagram.url && (
                    <a
                      href={selectedUniversity.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg bg-lab-800/50 hover:bg-lab-800 transition-all border border-lab-700 group"
                    >
                      <span className="text-sm text-lab-300 group-hover:text-accent-cyan">View Instagram</span>
                      <ChevronRight className="w-4 h-4 text-lab-600 group-hover:text-accent-cyan" />
                    </a>
                  )}
                  {selectedUniversity.tiktok.url && (
                    <a
                      href={selectedUniversity.tiktok.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg bg-lab-800/50 hover:bg-lab-800 transition-all border border-lab-700 group"
                    >
                      <span className="text-sm text-lab-300 group-hover:text-accent-purple">View TikTok</span>
                      <ChevronRight className="w-4 h-4 text-lab-600 group-hover:text-accent-purple" />
                    </a>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <Target className="w-16 h-16 text-lab-700 mb-4" />
                <p className="text-lab-500 text-sm">Click on a university blip</p>
                <p className="text-lab-600 text-xs mt-1">to view detailed intelligence</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Signal Activity Stream */}
      <div className="lab-card p-6 bg-gradient-to-br from-lab-900 to-black border-2 border-accent-green/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-lab-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent-green" />
            Live Signal Activity
          </h3>
          <div className="flex items-center gap-2 text-xs text-accent-green">
            <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="font-mono">{activeSignals.length} ACTIVE SIGNALS</span>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3">
          {data.universities.map(uni => {
            const signals = activeSignals.filter(s => Math.random() > 0.5).length;
            return (
              <div
                key={uni.id}
                className="p-3 rounded-lg bg-lab-800/30 border border-lab-700 hover:border-accent-cyan/50 transition-all cursor-pointer"
                onClick={() => setSelectedUniversity(uni)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-lab-200">{uni.shortName}</span>
                  <div className="flex items-center gap-1">
                    {uni.instagram.followers > 0 && (
                      <div className="w-2 h-2 rounded-full bg-pink-500" />
                    )}
                    {uni.tiktok.active && (
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-lab-500">
                  <Radio className="w-3 h-3" />
                  <span>{signals} signals</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
      `}</style>
    </div>
  );
}

