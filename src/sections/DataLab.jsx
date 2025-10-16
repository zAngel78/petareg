import { ExternalLink, Instagram, Music } from 'lucide-react';

export default function DataLab({ data }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">Data Laboratory: Raw Metrics</h2>
        <span className="text-xs text-lab-500 font-mono">All data verified from primary sources</span>
      </div>

      {/* Instagram Data Table */}
      <div className="lab-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Instagram className="w-5 h-5 text-pink-500" />
          <h3 className="subsection-title">Instagram Metrics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-lab-800">
                <th className="text-left py-3 px-4 metric-label">University</th>
                <th className="text-left py-3 px-4 metric-label">Handle</th>
                <th className="text-right py-3 px-4 metric-label">Followers</th>
                <th className="text-right py-3 px-4 metric-label">Total Posts</th>
                <th className="text-right py-3 px-4 metric-label">vs YU</th>
                <th className="text-left py-3 px-4 metric-label">Verification</th>
              </tr>
            </thead>
            <tbody>
              {data.universities.map((uni) => {
                const isYU = uni.id === 'yu';
                const yuFollowers = data.universities.find(u => u.id === 'yu').instagram.followers;
                const multiplier = uni.instagram.followers / yuFollowers;

                return (
                  <tr
                    key={uni.id}
                    className={`border-b border-lab-800/50 hover:bg-lab-800/30 transition-colors ${
                      isYU ? 'bg-accent-cyan/5' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <span className={`font-medium ${isYU ? 'text-accent-cyan' : 'text-lab-200'}`}>
                        {uni.shortName}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs text-lab-400">{uni.instagram.handle}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="data-point text-base">
                        {uni.instagram.followers.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-mono text-lab-300">
                        {uni.instagram.posts ? uni.instagram.posts.toLocaleString() : 'N/A'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {isYU ? (
                        <span className="text-lab-500 text-xs">Baseline</span>
                      ) : (
                        <span className={`font-mono font-bold ${
                          multiplier > 1 ? 'text-accent-red' : 'text-accent-green'
                        }`}>
                          {multiplier.toFixed(1)}x
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={uni.instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-accent-blue hover:text-accent-cyan transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Verify
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {data.universities.find(u => u.note) && (
          <p className="text-xs text-lab-500 mt-3 italic">
            * {data.universities.find(u => u.note).shortName}: {data.universities.find(u => u.note).note}
          </p>
        )}
      </div>

      {/* TikTok Data Table */}
      <div className="lab-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Music className="w-5 h-5 text-purple-500" />
          <h3 className="subsection-title">TikTok Presence</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-lab-800">
                <th className="text-left py-3 px-4 metric-label">University</th>
                <th className="text-left py-3 px-4 metric-label">Handle</th>
                <th className="text-center py-3 px-4 metric-label">Status</th>
                <th className="text-right py-3 px-4 metric-label">Followers</th>
                <th className="text-left py-3 px-4 metric-label">Verification</th>
              </tr>
            </thead>
            <tbody>
              {data.universities.map((uni) => {
                const isYU = uni.id === 'yu';
                const isActive = uni.tiktok.active;

                return (
                  <tr
                    key={uni.id}
                    className={`border-b border-lab-800/50 hover:bg-lab-800/30 transition-colors ${
                      isYU ? 'bg-accent-cyan/5' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <span className={`font-medium ${isYU ? 'text-accent-cyan' : 'text-lab-200'}`}>
                        {uni.shortName}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs text-lab-400">
                        {uni.tiktok.handle || '—'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {isActive ? (
                        <span className="status-indicator status-success text-[10px]">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                          Active
                        </span>
                      ) : (
                        <span className="status-indicator status-critical text-[10px]">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {uni.tiktok.followers ? (
                        <span className="data-point text-base">
                          {uni.tiktok.followers.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-lab-600 text-xs">N/A</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {uni.tiktok.url && (
                        <a
                          href={uni.tiktok.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-accent-blue hover:text-accent-cyan transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Verify
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Industry Benchmarks */}
      <div>
        <h3 className="subsection-title mb-4">Industry Benchmarks (Higher Education 2025)</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Instagram Benchmarks */}
          <div className="lab-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Instagram className="w-4 h-4 text-pink-500" />
              <h4 className="font-semibold text-lab-200">Instagram</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-lab-400">Avg Engagement Rate</span>
                <span className="data-point">{data.benchmarks.instagram.averageEngagement}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-lab-400">Optimal Posts/Week</span>
                <span className="data-point">
                  {data.benchmarks.instagram.optimalPostingFrequency.min}-{data.benchmarks.instagram.optimalPostingFrequency.max}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-lab-400">Best Time</span>
                <span className="font-mono text-lab-300 text-xs">{data.benchmarks.instagram.bestTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-lab-400">Reels Engagement</span>
                <span className="text-accent-green font-mono">{data.benchmarks.instagram.reelsEngagement}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-lab-400">Carousel Engagement</span>
                <span className="text-lab-400 font-mono">{data.benchmarks.instagram.carouselEngagement}%</span>
              </div>
            </div>
          </div>

          {/* TikTok Benchmarks */}
          <div className="lab-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Music className="w-4 h-4 text-purple-500" />
              <h4 className="font-semibold text-lab-200">TikTok</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-lab-400">Weekly Follower Growth</span>
                <span className="data-point text-accent-green">{data.benchmarks.tiktok.weeklyFollowerGrowth}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-lab-400">Engagement Multiplier</span>
                <span className="data-point">{data.benchmarks.tiktok.engagementMultiplier}x</span>
              </div>
              <div className="pt-2 border-t border-lab-800">
                <p className="text-xs text-accent-cyan italic">{data.benchmarks.tiktok.note}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div className="lab-card p-6 bg-lab-900/80">
        <h3 className="subsection-title mb-4">Data Sources & Verification</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-lab-500 uppercase tracking-wider mb-3">Primary Sources</p>
            <div className="space-y-2">
              {data.sources.filter(s => s.type === 'primary').map((source, idx) => (
                <div key={idx} className="text-sm">
                  <p className="text-lab-300 font-medium mb-1">{source.name}</p>
                  <p className="text-xs text-lab-500">{source.urls.length} profiles verified</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-lab-500 uppercase tracking-wider mb-3">Secondary Sources</p>
            <div className="space-y-2">
              {data.sources.filter(s => s.type === 'secondary').map((source, idx) => (
                <div key={idx} className="text-sm">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-blue hover:text-accent-cyan transition-colors inline-flex items-center gap-1"
                  >
                    <span className="font-medium">{source.name}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-xs text-lab-500 mt-0.5">{source.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
