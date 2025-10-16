import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Microscope, Database, BarChart3, Brain, Target, ChevronRight, Zap, Activity, AlertTriangle } from 'lucide-react';
import researchData from './data/researchData';
import './index.css';

// Import sections
import ResearchOverview from './sections/ResearchOverview';
import ResearchFlow from './sections/ResearchFlow';
import CommandCenter from './sections/CommandCenter';
import DataLab from './sections/DataLab';
import VisualAnalysis from './sections/VisualAnalysis';
import StatisticalInsights from './sections/StatisticalInsights';
import ActionProtocol from './sections/ActionProtocol';
import AdminPanel from './sections/AdminPanel';

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [warRoomMode, setWarRoomMode] = useState(false);
  const [dataPoints, setDataPoints] = useState(2400000);
  const [showChangelog, setShowChangelog] = useState(true);

  // Simulate live data
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => prev + Math.floor(Math.random() * 100));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const flowSteps = [
    { id: 0, label: 'Research Overview', icon: Microscope, component: ResearchOverview },
    { id: 1, label: 'Research Flow', icon: Activity, component: ResearchFlow },
    { id: 2, label: 'Command Center', icon: Zap, component: CommandCenter },
    { id: 3, label: 'Data Lab', icon: Database, component: DataLab },
    { id: 4, label: 'Visual Analysis', icon: BarChart3, component: VisualAnalysis },
    { id: 5, label: 'Statistical Insights', icon: Brain, component: StatisticalInsights },
    { id: 6, label: 'Action Protocol', icon: Target, component: ActionProtocol },
    { id: 7, label: 'Admin Panel', icon: Database, component: AdminPanel }
  ];

  const researchProgress = ((activeSection + 1) / flowSteps.length) * 100;
  const ActiveComponent = flowSteps[activeSection].component;

  return (
    <div className="min-h-screen bg-lab-950 text-lab-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-lab-800 bg-lab-950/95 backdrop-blur-md">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center">
                <Microscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold glow-text">YU Benchmarking Research Lab</h1>
                <p className="text-xs text-lab-400 font-mono">Phase 1: Initial Findings</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              {/* War Room Toggle */}
              <button
                onClick={() => setWarRoomMode(!warRoomMode)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  warRoomMode
                    ? 'bg-accent-red text-white animate-pulse'
                    : 'bg-lab-800 text-lab-300 hover:bg-lab-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  {warRoomMode ? 'WAR ROOM' : 'Normal Mode'}
                </div>
              </button>

              {/* Live Data Counter */}
              <div className="text-right">
                <p className="text-xs text-lab-400 flex items-center gap-1">
                  <Activity className="w-3 h-3 animate-pulse text-accent-green" />
                  Data Points
                </p>
                <p className="text-sm font-mono text-accent-cyan">{dataPoints.toLocaleString()}</p>
              </div>

              <div className="text-right">
                <p className="text-xs text-lab-400">Researcher</p>
                <p className="text-sm font-medium">Angel Ramirez</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-lab-400">Client</p>
                <p className="text-sm font-medium">Stephany Nayz</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-lab-400">Date</p>
                <p className="text-sm font-mono">{researchData.metadata.date}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* War Room Alert Banner */}
      {warRoomMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-0 right-0 z-50 bg-gradient-to-r from-accent-red via-accent-yellow to-accent-red p-3 border-b-2 border-accent-red"
        >
          <div className="max-w-[1800px] mx-auto px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                <span className="text-black font-bold text-sm uppercase tracking-wider">
                  🚨 WAR ROOM MODE ACTIVE - CRITICAL ISSUES ONLY
                </span>
              </div>
              <div className="flex items-center gap-4 text-black font-mono text-xs">
                <span>Critical Gaps: 2</span>
                <span>Immediate Actions: 2</span>
                <span>Time Sensitive: YES</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scientific Flow Navigation */}
      <div className={`fixed ${warRoomMode ? 'top-[104px]' : 'top-20'} left-0 right-0 z-40 border-b backdrop-blur-sm transition-all ${
        warRoomMode ? 'border-accent-red bg-accent-red/10' : 'border-lab-800 bg-lab-900/80'
      }`}>
        <div className="max-w-[1800px] mx-auto px-6 py-3">
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-lab-400">Research Progress</span>
              <span className="font-mono text-accent-cyan">{Math.round(researchProgress)}%</span>
            </div>
            <div className="w-full bg-lab-800 h-1.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${researchProgress}%` }}
                className={`h-full ${
                  warRoomMode
                    ? 'bg-gradient-to-r from-accent-red to-accent-yellow'
                    : 'bg-gradient-to-r from-accent-cyan to-accent-green'
                }`}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {flowSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeSection === step.id;
              const isPassed = activeSection > step.id;

              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setActiveSection(step.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
                      ${isActive
                        ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30'
                        : isPassed
                        ? 'bg-accent-green/10 text-accent-green border border-accent-green/20 hover:bg-accent-green/20'
                        : 'bg-lab-800/50 text-lab-400 border border-lab-700 hover:bg-lab-800 hover:text-lab-300'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{step.label}</span>
                    {isPassed && (
                      <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                    )}
                  </button>
                  {index < flowSteps.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-lab-600 mx-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={`${warRoomMode ? 'pt-[180px]' : 'pt-36'} pb-12 px-6 transition-all`}>
        <div className="max-w-[1800px] mx-auto">
          {/* War Room Critical Dashboard */}
          {warRoomMode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-6 rounded-xl bg-gradient-to-br from-accent-red/20 to-accent-yellow/10 border-2 border-accent-red/50 shadow-2xl shadow-accent-red/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-accent-red animate-pulse" />
                <div>
                  <h2 className="text-2xl font-bold text-accent-red">CRITICAL SITUATION ROOM</h2>
                  <p className="text-sm text-lab-400">Immediate attention required - Priority actions only</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Critical Findings */}
                <div className="p-4 rounded-lg bg-lab-900/80 border-2 border-accent-red/50">
                  <h3 className="font-bold text-accent-red mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    CRITICAL GAPS
                  </h3>
                  <div className="space-y-2">
                    {researchData.keyFindings
                      .filter(f => f.type === 'critical')
                      .map(finding => (
                        <div key={finding.id} className="p-3 rounded-lg bg-accent-red/10 border border-accent-red/30">
                          <p className="font-semibold text-lab-100 text-sm mb-1">{finding.title}</p>
                          <p className="text-xs text-lab-400">{finding.description}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs text-accent-red font-mono">Priority: {finding.priority}</span>
                            <span className="text-xs text-accent-yellow font-mono">Impact: {finding.impact}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Immediate Actions */}
                <div className="p-4 rounded-lg bg-lab-900/80 border-2 border-accent-yellow/50">
                  <h3 className="font-bold text-accent-yellow mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    IMMEDIATE ACTIONS
                  </h3>
                  <div className="space-y-2">
                    {researchData.recommendations
                      .filter(r => r.priority === 'immediate')
                      .map(rec => (
                        <div key={rec.id} className="p-3 rounded-lg bg-accent-yellow/10 border border-accent-yellow/30">
                          <p className="font-semibold text-lab-100 text-sm mb-1">{rec.action}</p>
                          <p className="text-xs text-lab-400 mb-2">{rec.rationale}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-accent-cyan font-mono">Impact: {rec.expectedImpact}</span>
                            <span className="text-xs text-accent-green font-mono">{rec.timeframe}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-accent-red/20 border border-accent-red/30 text-center">
                  <p className="text-xs text-lab-400 mb-1">Instagram Gap</p>
                  <p className="text-2xl font-bold text-accent-red">-578K</p>
                </div>
                <div className="p-3 rounded-lg bg-accent-red/20 border border-accent-red/30 text-center">
                  <p className="text-xs text-lab-400 mb-1">TikTok Status</p>
                  <p className="text-2xl font-bold text-accent-red">INACTIVE</p>
                </div>
                <div className="p-3 rounded-lg bg-accent-yellow/20 border border-accent-yellow/30 text-center">
                  <p className="text-xs text-lab-400 mb-1">Growth Potential</p>
                  <p className="text-2xl font-bold text-accent-yellow">+67%</p>
                </div>
                <div className="p-3 rounded-lg bg-accent-green/20 border border-accent-green/30 text-center">
                  <p className="text-xs text-lab-400 mb-1">Time to Act</p>
                  <p className="text-2xl font-bold text-accent-green">NOW</p>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ActiveComponent data={researchData} />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-lab-800 bg-lab-900/50 py-6">
        <div className="max-w-[1800px] mx-auto px-6">
          <div className="flex items-center justify-between text-sm text-lab-400">
            <p className="font-mono">
              YU Benchmarking Research Lab v1.0.0
            </p>
            <div className="flex items-center gap-4">
              <span className="status-indicator status-success">
                <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                Research Active
              </span>
              <span className="font-mono">{researchData.metadata.status}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Changelog Modal */}
      {showChangelog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl mx-4 bg-lab-900 border-2 border-accent-cyan rounded-xl shadow-2xl shadow-accent-cyan/20"
          >
            {/* Header */}
            <div className="border-b border-lab-800 bg-gradient-to-r from-accent-cyan/20 to-accent-blue/20 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-accent-cyan glow-text">Changelog v1.0.0</h2>
                    <p className="text-sm text-lab-400">Latest Dashboard Updates</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChangelog(false)}
                  className="p-2 hover:bg-lab-800 rounded-lg transition"
                >
                  <ChevronRight className="w-6 h-6 text-lab-400 rotate-45" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-lab-700 scrollbar-track-lab-900">
              {/* Latest Update */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                  <span className="text-xs font-mono text-accent-cyan">Recent Update - October 2025</span>
                </div>

                <div className="space-y-4">
                  {/* Feature 1 */}
                  <div className="p-4 rounded-lg bg-lab-800/50 border border-lab-700">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-cyan/20 flex items-center justify-center flex-shrink-0">
                        <Database className="w-4 h-4 text-accent-cyan" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lab-100 mb-1">Research File Admin Dashboard</h3>
                        <p className="text-sm text-lab-400 mb-2">
                          New research file management system with preview capabilities for PDFs, PNG images,
                          Excel files, and LaTeX documents. Backend deployed on Render to serve all documentation.
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 rounded bg-accent-cyan/20 text-accent-cyan text-xs font-mono">
                            React + Vite
                          </span>
                          <span className="px-2 py-1 rounded bg-accent-blue/20 text-accent-blue text-xs font-mono">
                            Node.js + Express
                          </span>
                          <span className="px-2 py-1 rounded bg-accent-green/20 text-accent-green text-xs font-mono">
                            TailwindCSS
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="p-4 rounded-lg bg-lab-800/50 border border-lab-700">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-4 h-4 text-accent-blue" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lab-100 mb-1">Enhanced Data Visualization</h3>
                        <p className="text-sm text-lab-400 mb-2">
                          Complete preview system for all 14 generated charts (PNG) with qualitative and quantitative analysis.
                          Professional dark interface with corporate slate theme.
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 rounded bg-accent-purple/20 text-accent-purple text-xs font-mono">
                            14 Charts
                          </span>
                          <span className="px-2 py-1 rounded bg-accent-cyan/20 text-accent-cyan text-xs font-mono">
                            25 Documents
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="p-4 rounded-lg bg-lab-800/50 border border-lab-700">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center flex-shrink-0">
                        <Target className="w-4 h-4 text-accent-green" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lab-100 mb-1">Cloud Backend API</h3>
                        <p className="text-sm text-lab-400 mb-2">
                          Backend server deployed on Render (https://nomassi-1.onrender.com) with endpoints for
                          file preview and download. CORS configured for cross-origin access.
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 rounded bg-accent-green/20 text-accent-green text-xs font-mono">
                            ✓ Deployed
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Developer Info */}
              <div className="mt-6 pt-6 border-t border-lab-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-lab-400 mb-1">Developed by</p>
                    <p className="text-lg font-bold text-accent-cyan glow-text">Angel Ramirez</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-lab-400 mb-1">Client</p>
                    <p className="text-lg font-bold text-lab-100">Stephany Nayz - Yeshiva University</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-lab-800 px-6 py-4 bg-lab-950/50">
              <button
                onClick={() => setShowChangelog(false)}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-blue text-white font-bold hover:shadow-lg hover:shadow-accent-cyan/50 transition"
              >
                Start Exploring
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App;
