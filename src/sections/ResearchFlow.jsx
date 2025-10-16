import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Database, BarChart3, Lightbulb, Target, TrendingUp, 
  AlertTriangle, Instagram, Music, Users, CheckCircle2, XCircle,
  ArrowRight, Download, Maximize2, GitBranch, Zap
} from 'lucide-react';

export default function ResearchFlow({ data }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredConnection, setHoveredConnection] = useState(null);

  // Define flowchart nodes with positions
  const nodes = {
    // Start
    start: {
      id: 'start',
      type: 'start',
      title: 'Research Initiated',
      subtitle: 'YU Benchmarking Project',
      x: 50,
      y: 5,
      icon: Zap,
      color: 'cyan',
      connects: ['data-collection']
    },

    // Data Collection
    'data-collection': {
      id: 'data-collection',
      type: 'process',
      title: 'Data Collection',
      subtitle: '6 Universities',
      x: 50,
      y: 18,
      icon: Search,
      color: 'blue',
      metrics: ['2,260 IG posts', '3 TikTok accounts', '4 data sources'],
      connects: ['instagram-analysis', 'tiktok-analysis']
    },

    // Instagram Analysis
    'instagram-analysis': {
      id: 'instagram-analysis',
      type: 'process',
      title: 'Instagram Analysis',
      subtitle: 'Follower & Engagement Data',
      x: 25,
      y: 35,
      icon: Instagram,
      color: 'pink',
      metrics: ['593K NYU followers', '15K YU followers', '39.5x gap'],
      connects: ['gap-identification']
    },

    // TikTok Analysis
    'tiktok-analysis': {
      id: 'tiktok-analysis',
      type: 'process',
      title: 'TikTok Analysis',
      subtitle: 'Platform Presence',
      x: 75,
      y: 35,
      icon: Music,
      color: 'purple',
      metrics: ['3/6 active', 'YU: Inactive', '2.28% weekly growth'],
      connects: ['gap-identification']
    },

    // Gap Identification
    'gap-identification': {
      id: 'gap-identification',
      type: 'decision',
      title: 'Critical Gaps?',
      subtitle: 'Analysis Results',
      x: 50,
      y: 50,
      icon: AlertTriangle,
      color: 'yellow',
      connects: ['findings-critical', 'findings-opportunities']
    },

    // Critical Findings
    'findings-critical': {
      id: 'findings-critical',
      type: 'data',
      title: 'Critical Findings',
      subtitle: '2 High Priority',
      x: 25,
      y: 63,
      icon: AlertTriangle,
      color: 'red',
      metrics: ['Instagram gap: -578K', 'No TikTok presence'],
      connects: ['strategy-immediate']
    },

    // Opportunities
    'findings-opportunities': {
      id: 'findings-opportunities',
      type: 'data',
      title: 'Opportunities',
      subtitle: '2 Medium Priority',
      x: 75,
      y: 63,
      icon: Lightbulb,
      color: 'green',
      metrics: ['Reels: 2.5x engagement', 'Optimal time: Wed 8PM'],
      connects: ['strategy-high']
    },

    // Immediate Strategy
    'strategy-immediate': {
      id: 'strategy-immediate',
      type: 'process',
      title: 'Immediate Actions',
      subtitle: 'Priority: CRITICAL',
      x: 25,
      y: 78,
      icon: Zap,
      color: 'red',
      metrics: ['Launch TikTok', 'Increase Reels 2-3/week'],
      connects: ['projection']
    },

    // High Priority Strategy
    'strategy-high': {
      id: 'strategy-high',
      type: 'process',
      title: 'High Priority Actions',
      subtitle: 'Priority: HIGH',
      x: 75,
      y: 78,
      icon: Target,
      color: 'yellow',
      metrics: ['8-12 posts/week', 'Study competitors'],
      connects: ['projection']
    },

    // Projection
    'projection': {
      id: 'projection',
      type: 'process',
      title: 'Growth Projection',
      subtitle: '6-Month Forecast',
      x: 50,
      y: 93,
      icon: TrendingUp,
      color: 'green',
      metrics: ['Target: 25K followers', '+67% growth', '3.5% engagement'],
      connects: ['end']
    },

    // End
    end: {
      id: 'end',
      type: 'end',
      title: 'Implementation',
      subtitle: 'Action Protocol',
      x: 50,
      y: 105,
      icon: CheckCircle2,
      color: 'green',
      connects: []
    }
  };

  // Generate connections
  const connections = [];
  Object.values(nodes).forEach(node => {
    node.connects.forEach(targetId => {
      const target = nodes[targetId];
      if (target) {
        connections.push({
          from: node.id,
          to: target.id,
          fromX: node.x,
          fromY: node.y,
          toX: target.x,
          toY: target.y,
          color: node.color
        });
      }
    });
  });

  const getNodeColor = (color) => {
    const colors = {
      cyan: { bg: 'from-accent-cyan/20 to-accent-blue/10', border: 'border-accent-cyan', text: 'text-accent-cyan', dot: 'bg-accent-cyan', glow: 'shadow-accent-cyan/50' },
      blue: { bg: 'from-accent-blue/20 to-accent-cyan/10', border: 'border-accent-blue', text: 'text-accent-blue', dot: 'bg-accent-blue', glow: 'shadow-accent-blue/50' },
      pink: { bg: 'from-pink-500/20 to-purple-500/10', border: 'border-pink-500', text: 'text-pink-500', dot: 'bg-pink-500', glow: 'shadow-pink-500/50' },
      purple: { bg: 'from-accent-purple/20 to-accent-blue/10', border: 'border-accent-purple', text: 'text-accent-purple', dot: 'bg-accent-purple', glow: 'shadow-accent-purple/50' },
      yellow: { bg: 'from-accent-yellow/20 to-accent-red/10', border: 'border-accent-yellow', text: 'text-accent-yellow', dot: 'bg-accent-yellow', glow: 'shadow-accent-yellow/50' },
      red: { bg: 'from-accent-red/20 to-accent-yellow/10', border: 'border-accent-red', text: 'text-accent-red', dot: 'bg-accent-red', glow: 'shadow-accent-red/50' },
      green: { bg: 'from-accent-green/20 to-accent-cyan/10', border: 'border-accent-green', text: 'text-accent-green', dot: 'bg-accent-green', glow: 'shadow-accent-green/50' }
    };
    return colors[color] || colors.cyan;
  };

  const getNodeShape = (type) => {
    switch(type) {
      case 'start':
      case 'end':
        return 'rounded-full';
      case 'decision':
        return 'rotate-45';
      case 'data':
        return 'rounded-lg skew-x-12';
      default:
        return 'rounded-xl';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="lab-card p-6 bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="section-title mb-2 flex items-center gap-3">
              <GitBranch className="w-8 h-8 text-accent-cyan" />
              Research Flow Diagram
            </h2>
            <p className="text-lab-400 text-sm">Interactive flowchart visualization of the complete research process</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30">
              <span className="text-xs font-mono text-accent-cyan">{Object.keys(nodes).length} nodes</span>
            </div>
            <button className="px-4 py-2 rounded-lg bg-accent-green/10 hover:bg-accent-green/20 text-accent-green border border-accent-green/30 font-semibold text-sm flex items-center gap-2 transition-all">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Flowchart Canvas */}
      <div className="lab-card p-8 bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative" style={{ minHeight: '1200px' }}>
          {/* SVG for connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              {/* Arrow markers */}
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="rgba(6, 182, 212, 0.6)" />
              </marker>
              
              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Draw connections */}
            {connections.map((conn, idx) => {
              const isHovered = hoveredConnection === `${conn.from}-${conn.to}`;
              const isSelected = selectedNode === conn.from || selectedNode === conn.to;
              
              return (
                <g key={idx}>
                  {/* Connection line */}
                  <line
                    x1={`${conn.fromX}%`}
                    y1={`${conn.fromY + 3}%`}
                    x2={`${conn.toX}%`}
                    y2={`${conn.toY - 3}%`}
                    stroke={isHovered || isSelected ? 'rgba(6, 182, 212, 0.8)' : 'rgba(6, 182, 212, 0.3)'}
                    strokeWidth={isHovered || isSelected ? '3' : '2'}
                    markerEnd="url(#arrowhead)"
                    filter={isHovered || isSelected ? 'url(#glow)' : ''}
                    className="transition-all duration-300"
                  />
                  
                  {/* Animated dot */}
                  {(isHovered || isSelected) && (
                    <circle r="3" fill="#06b6d4">
                      <animateMotion
                        dur="2s"
                        repeatCount="indefinite"
                        path={`M ${conn.fromX} ${conn.fromY + 3} L ${conn.toX} ${conn.toY - 3}`}
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {Object.values(nodes).map((node) => {
            const Icon = node.icon;
            const isSelected = selectedNode === node.id;
            const colors = getNodeColor(node.color);
            
            return (
              <motion.div
                key={node.id}
                className="absolute"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isSelected ? 20 : 10
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: isSelected ? 1.1 : 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`cursor-pointer transition-all duration-300 ${
                    node.type === 'decision' ? 'w-40 h-40' : 
                    node.type === 'start' || node.type === 'end' ? 'w-36 h-36' : 
                    'w-48'
                  }`}
                  onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
                  onMouseEnter={() => {
                    node.connects.forEach(targetId => {
                      setHoveredConnection(`${node.id}-${targetId}`);
                    });
                  }}
                  onMouseLeave={() => setHoveredConnection(null)}
                >
                  {/* Node container */}
                  <div className={`
                    relative p-4 bg-gradient-to-br ${colors.bg} 
                    border-2 ${colors.border} ${getNodeShape(node.type)}
                    ${isSelected ? `shadow-2xl ${colors.glow}` : 'shadow-lg'}
                    backdrop-blur-sm hover:border-opacity-100 transition-all
                    ${node.type === 'decision' ? 'flex items-center justify-center' : ''}
                  `}>
                    {/* Icon */}
                    <div className={`flex justify-center mb-2 ${node.type === 'decision' ? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}`}>
                      <div className={`p-2 rounded-lg bg-lab-800/50 ${colors.text}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Content */}
                    {node.type !== 'decision' && (
                      <>
                        <h3 className={`font-bold text-sm text-lab-100 text-center mb-1 ${node.type === 'start' || node.type === 'end' ? 'text-base' : ''}`}>
                          {node.title}
                        </h3>
                        <p className="text-xs text-lab-500 text-center mb-2">{node.subtitle}</p>
                        
                        {node.metrics && (
                          <div className="space-y-1 mt-2 pt-2 border-t border-lab-700/50">
                            {node.metrics.map((metric, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                                <span className="text-xs text-lab-400">{metric}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}

                    {node.type === 'decision' && (
                      <div className="text-center -rotate-45">
                        <h3 className="font-bold text-sm text-lab-100 mb-1">{node.title}</h3>
                        <p className="text-xs text-lab-500">{node.subtitle}</p>
                      </div>
                    )}

                    {/* Pulse effect for selected */}
                    {isSelected && (
                      <div className={`absolute inset-0 ${getNodeShape(node.type)} border-2 ${colors.border} animate-ping opacity-75`} />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-4">
        {/* Node Types */}
        <div className="lab-card p-6 bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm">
          <h3 className="subsection-title mb-4">Node Types</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent-cyan/20 border-2 border-accent-cyan flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent-cyan" />
              </div>
              <div>
                <p className="text-sm font-semibold text-lab-200">Start/End</p>
                <p className="text-xs text-lab-500">Process boundaries</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent-blue/20 border-2 border-accent-blue flex items-center justify-center">
                <Database className="w-5 h-5 text-accent-blue" />
              </div>
              <div>
                <p className="text-sm font-semibold text-lab-200">Process</p>
                <p className="text-xs text-lab-500">Action or operation</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg rotate-45 bg-accent-yellow/20 border-2 border-accent-yellow flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-accent-yellow -rotate-45" />
              </div>
              <div>
                <p className="text-sm font-semibold text-lab-200">Decision</p>
                <p className="text-xs text-lab-500">Branching point</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg skew-x-12 bg-accent-green/20 border-2 border-accent-green flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-accent-green -skew-x-12" />
              </div>
              <div>
                <p className="text-sm font-semibold text-lab-200">Data</p>
                <p className="text-xs text-lab-500">Information output</p>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Node Details */}
        <div className="lab-card p-6 bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm">
          <h3 className="subsection-title mb-4">Node Details</h3>
          {selectedNode ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {(() => {
                const node = nodes[selectedNode];
                const Icon = node.icon;
                const colors = getNodeColor(node.color);
                return (
                  <>
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${colors.bg} border ${colors.border}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className={`w-6 h-6 ${colors.text}`} />
                        <div>
                          <h4 className="font-bold text-lab-100">{node.title}</h4>
                          <p className="text-xs text-lab-500">{node.subtitle}</p>
                        </div>
                      </div>
                      {node.metrics && (
                        <div className="space-y-2 pt-3 border-t border-lab-700/50">
                          {node.metrics.map((metric, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle2 className={`w-4 h-4 ${colors.text}`} />
                              <span className="text-sm text-lab-300">{metric}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-lab-500">
                      <p className="mb-1">Type: <span className="text-lab-300 font-mono">{node.type}</span></p>
                      <p>Connections: <span className="text-lab-300 font-mono">{node.connects.length}</span></p>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <GitBranch className="w-12 h-12 text-lab-700 mb-3" />
              <p className="text-lab-500 text-sm">Click on any node</p>
              <p className="text-lab-600 text-xs">to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="lab-card p-6 bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-lab-800/30 border border-lab-700">
            <Users className="w-6 h-6 text-accent-cyan mx-auto mb-2" />
            <p className="text-xs text-lab-500 mb-1">Universities</p>
            <p className="text-2xl font-bold text-accent-cyan">6</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-lab-800/30 border border-lab-700">
            <AlertTriangle className="w-6 h-6 text-accent-red mx-auto mb-2" />
            <p className="text-xs text-lab-500 mb-1">Critical Gaps</p>
            <p className="text-2xl font-bold text-accent-red">2</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-lab-800/30 border border-lab-700">
            <Target className="w-6 h-6 text-accent-green mx-auto mb-2" />
            <p className="text-xs text-lab-500 mb-1">Strategies</p>
            <p className="text-2xl font-bold text-accent-green">{data.recommendations.length}</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-lab-800/30 border border-lab-700">
            <TrendingUp className="w-6 h-6 text-accent-purple mx-auto mb-2" />
            <p className="text-xs text-lab-500 mb-1">Growth Target</p>
            <p className="text-2xl font-bold text-accent-purple">+67%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
