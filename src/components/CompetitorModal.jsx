import { X, ExternalLink, TrendingUp, Users, BarChart3, Instagram, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import AnimatedCounter from './AnimatedCounter';

export default function CompetitorModal({ university, isOpen, onClose, allUniversities }) {
  if (!isOpen || !university) return null;

  const yuData = allUniversities.find(u => u.id === 'yu');
  const comparisonData = [
    {
      metric: 'Followers',
      [university.shortName]: university.instagram.followers / 1000,
      'YU': yuData.instagram.followers / 1000
    },
    {
      metric: 'Posts',
      [university.shortName]: university.instagram.posts || 0,
      'YU': yuData.instagram.posts
    },
    {
      metric: 'TikTok',
      [university.shortName]: university.tiktok.active ? 100 : 0,
      'YU': yuData.tiktok.active ? 100 : 0
    }
  ];

  const radarData = [
    { subject: 'Reach', A: (university.instagram.followers / 600000) * 100, fullMark: 100 },
    { subject: 'Content', A: university.instagram.posts ? (university.instagram.posts / 3000) * 100 : 50, fullMark: 100 },
    { subject: 'TikTok', A: university.tiktok.active ? 80 : 0, fullMark: 100 },
    { subject: 'Engagement', A: 75, fullMark: 100 },
    { subject: 'Frequency', A: 60, fullMark: 100 },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="lab-card p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: university.color }}
                >
                  {university.shortName[0]}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-lab-50">{university.name}</h2>
                  <p className="text-sm text-lab-400 font-mono">Competitor Deep Dive Analysis</p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-lab-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-lab-400" />
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="lab-card p-5 bg-gradient-to-br from-pink-500/10 to-transparent border-pink-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Instagram className="w-4 h-4 text-pink-500" />
                <p className="metric-label">Instagram Followers</p>
              </div>
              <p className="metric-value text-pink-400">
                <AnimatedCounter value={university.instagram.followers} />
              </p>
              <a
                href={university.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-accent-blue hover:text-accent-cyan transition-colors mt-2"
              >
                <ExternalLink className="w-3 h-3" />
                View Profile
              </a>
            </div>

            <div className="lab-card p-5 bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Music className="w-4 h-4 text-purple-500" />
                <p className="metric-label">TikTok Status</p>
              </div>
              <p className="metric-value text-purple-400">
                {university.tiktok.active ? (
                  <>
                    {university.tiktok.followers ? (
                      <AnimatedCounter value={university.tiktok.followers} />
                    ) : (
                      'Active'
                    )}
                  </>
                ) : (
                  'Inactive'
                )}
              </p>
              {university.tiktok.url && (
                <a
                  href={university.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-accent-blue hover:text-accent-cyan transition-colors mt-2"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Profile
                </a>
              )}
            </div>

            <div className="lab-card p-5 bg-gradient-to-br from-cyan-500/10 to-transparent border-cyan-500/20">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-cyan-500" />
                <p className="metric-label">Total Posts</p>
              </div>
              <p className="metric-value text-cyan-400">
                {university.instagram.posts ? (
                  <AnimatedCounter value={university.instagram.posts} />
                ) : (
                  'N/A'
                )}
              </p>
            </div>

            <div className="lab-card p-5 bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <p className="metric-label">vs YU</p>
              </div>
              <p className="metric-value text-green-400">
                {(university.instagram.followers / yuData.instagram.followers).toFixed(1)}x
              </p>
              <p className="text-xs text-lab-500 mt-1">
                {((university.instagram.followers / yuData.instagram.followers - 1) * 100).toFixed(0)}% more
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Comparison Chart */}
            <div className="lab-card p-5">
              <h3 className="subsection-title mb-4">Head-to-Head Comparison</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="metric" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                  <Bar dataKey={university.shortName} fill={university.color} radius={[8, 8, 0, 0]} />
                  <Bar dataKey="YU" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Radar Chart */}
            <div className="lab-card p-5">
              <h3 className="subsection-title mb-4">Performance Radar</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" fontSize={10} />
                  <Radar name={university.shortName} dataKey="A" stroke={university.color} fill={university.color} fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights */}
          <div className="lab-card p-5 bg-lab-900/50">
            <h3 className="subsection-title mb-3">Key Insights</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-1.5 flex-shrink-0" />
                <p className="text-sm text-lab-300">
                  <span className="font-semibold">{university.shortName}</span> has{' '}
                  <span className="text-accent-cyan font-mono">
                    {(university.instagram.followers / yuData.instagram.followers).toFixed(1)}x
                  </span>{' '}
                  more Instagram followers than YU
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-purple mt-1.5 flex-shrink-0" />
                <p className="text-sm text-lab-300">
                  TikTok presence: <span className={`font-semibold ${university.tiktok.active ? 'text-accent-green' : 'text-accent-red'}`}>
                    {university.tiktok.active ? 'Active' : 'Inactive'}
                  </span>
                </p>
              </div>
              {university.instagram.posts && (
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-yellow mt-1.5 flex-shrink-0" />
                  <p className="text-sm text-lab-300">
                    Content volume: <span className="font-mono text-accent-yellow">{university.instagram.posts.toLocaleString()}</span> total posts
                    {university.instagram.posts > yuData.instagram.posts && (
                      <span className="text-lab-500"> ({((university.instagram.posts / yuData.instagram.posts - 1) * 100).toFixed(0)}% more than YU)</span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
