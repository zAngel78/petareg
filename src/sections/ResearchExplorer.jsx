import { useState, useMemo } from 'react';
import { Search, Filter, Download, Grid3x3, List, TrendingUp, Users, Instagram, Music, ExternalLink, X, CheckCircle2, XCircle, BarChart3, Target, Zap, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResearchExplorer({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedPlatform, setSelectedPlatform] = useState('all'); // 'all', 'instagram', 'tiktok'
  const [sortBy, setSortBy] = useState('followers'); // 'followers', 'name', 'engagement'
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort universities
  const filteredUniversities = useMemo(() => {
    let filtered = data.universities.filter(uni => {
      const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           uni.shortName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPlatform = selectedPlatform === 'all' ||
                             (selectedPlatform === 'instagram' && uni.instagram.followers > 0) ||
                             (selectedPlatform === 'tiktok' && uni.tiktok.active);
      
      return matchesSearch && matchesPlatform;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'followers') {
        return b.instagram.followers - a.instagram.followers;
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return filtered;
  }, [data.universities, searchTerm, selectedPlatform, sortBy]);

  // Toggle university for comparison
  const toggleCompare = (uni) => {
    if (selectedForCompare.find(u => u.id === uni.id)) {
      setSelectedForCompare(selectedForCompare.filter(u => u.id !== uni.id));
    } else if (selectedForCompare.length < 4) {
      setSelectedForCompare([...selectedForCompare, uni]);
    }
  };

  // Export data
  const exportData = () => {
    const csvContent = [
      ['University', 'Instagram Followers', 'Instagram Posts', 'TikTok Status', 'TikTok Followers'],
      ...data.universities.map(uni => [
        uni.name,
        uni.instagram.followers,
        uni.instagram.posts || 'N/A',
        uni.tiktok.active ? 'Active' : 'Inactive',
        uni.tiktok.followers || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'yu-research-data.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="section-title mb-2">Research Explorer</h2>
          <p className="text-lab-400 text-sm">Interactive exploration of all research data and insights</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30">
            <span className="text-xs font-mono text-accent-cyan">{filteredUniversities.length} / {data.universities.length} universities</span>
          </div>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="lab-card p-4 bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lab-500" />
              <input
                type="text"
                placeholder="Search universities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-lab-800/50 border border-lab-700 rounded-lg text-sm text-lab-200 placeholder-lab-500 focus:outline-none focus:border-accent-cyan transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lab-500 hover:text-lab-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Platform Filter */}
          <div className="flex items-center gap-2 p-1 bg-lab-800/50 rounded-lg">
            <button
              onClick={() => setSelectedPlatform('all')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                selectedPlatform === 'all'
                  ? 'bg-accent-cyan text-white'
                  : 'text-lab-400 hover:text-lab-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedPlatform('instagram')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1 ${
                selectedPlatform === 'instagram'
                  ? 'bg-pink-500 text-white'
                  : 'text-lab-400 hover:text-lab-200'
              }`}
            >
              <Instagram className="w-3 h-3" />
              Instagram
            </button>
            <button
              onClick={() => setSelectedPlatform('tiktok')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1 ${
                selectedPlatform === 'tiktok'
                  ? 'bg-purple-500 text-white'
                  : 'text-lab-400 hover:text-lab-200'
              }`}
            >
              <Music className="w-3 h-3" />
              TikTok
            </button>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-lab-800/50 border border-lab-700 rounded-lg text-xs text-lab-200 focus:outline-none focus:border-accent-cyan"
          >
            <option value="followers">Sort by Followers</option>
            <option value="name">Sort by Name</option>
          </select>

          {/* View Mode */}
          <div className="flex items-center gap-1 p-1 bg-lab-800/50 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all ${
                viewMode === 'grid'
                  ? 'bg-accent-cyan text-white'
                  : 'text-lab-400 hover:text-lab-200'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all ${
                viewMode === 'list'
                  ? 'bg-accent-cyan text-white'
                  : 'text-lab-400 hover:text-lab-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Compare Mode */}
          <button
            onClick={() => {
              setCompareMode(!compareMode);
              if (compareMode) setSelectedForCompare([]);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              compareMode
                ? 'bg-accent-purple text-white'
                : 'bg-lab-800/50 text-lab-300 hover:bg-lab-800 border border-lab-700'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Compare {compareMode && `(${selectedForCompare.length}/4)`}
          </button>

          {/* Export */}
          <button
            onClick={exportData}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-accent-green/10 text-accent-green hover:bg-accent-green/20 transition-all flex items-center gap-2 border border-accent-green/30"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Comparison View */}
      <AnimatePresence>
        {compareMode && selectedForCompare.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lab-card p-6 bg-gradient-to-br from-accent-purple/10 to-accent-blue/5 border-accent-purple/30"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="subsection-title">Comparison View</h3>
              <button
                onClick={() => setSelectedForCompare([])}
                className="text-xs text-lab-500 hover:text-lab-300"
              >
                Clear All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-lab-800">
                    <th className="text-left py-3 px-4 metric-label">Metric</th>
                    {selectedForCompare.map(uni => (
                      <th key={uni.id} className="text-center py-3 px-4">
                        <div className="font-semibold text-lab-200">{uni.shortName}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-lab-800/50">
                    <td className="py-3 px-4 text-lab-400">Instagram Followers</td>
                    {selectedForCompare.map(uni => (
                      <td key={uni.id} className="py-3 px-4 text-center">
                        <span className="font-mono text-accent-cyan">{uni.instagram.followers.toLocaleString()}</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-lab-800/50">
                    <td className="py-3 px-4 text-lab-400">Instagram Posts</td>
                    {selectedForCompare.map(uni => (
                      <td key={uni.id} className="py-3 px-4 text-center">
                        <span className="font-mono text-lab-300">{uni.instagram.posts?.toLocaleString() || 'N/A'}</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-lab-800/50">
                    <td className="py-3 px-4 text-lab-400">TikTok Status</td>
                    {selectedForCompare.map(uni => (
                      <td key={uni.id} className="py-3 px-4 text-center">
                        {uni.tiktok.active ? (
                          <span className="text-accent-green">✓ Active</span>
                        ) : (
                          <span className="text-accent-red">✗ Inactive</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-lab-400">TikTok Followers</td>
                    {selectedForCompare.map(uni => (
                      <td key={uni.id} className="py-3 px-4 text-center">
                        <span className="font-mono text-lab-300">{uni.tiktok.followers?.toLocaleString() || 'N/A'}</span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Universities Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUniversities.map((uni) => {
            const isYU = uni.id === 'yu';
            const isSelected = selectedForCompare.find(u => u.id === uni.id);
            
            return (
              <motion.div
                key={uni.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`lab-card p-5 hover:scale-105 transition-all cursor-pointer ${
                  isYU ? 'border-accent-cyan bg-accent-cyan/5' : ''
                } ${isSelected ? 'ring-2 ring-accent-purple' : ''}`}
                onClick={() => compareMode && toggleCompare(uni)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-lab-100 mb-1">{uni.shortName}</h3>
                    <p className="text-xs text-lab-500">{uni.name}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {isYU && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30">
                        TARGET
                      </span>
                    )}
                    {compareMode && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isSelected
                          ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30'
                          : 'bg-lab-800/50 text-lab-500 border border-lab-700'
                      }`}>
                        {isSelected ? '✓ Selected' : 'Select'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Instagram */}
                <div className="mb-3 p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Instagram className="w-4 h-4 text-pink-500" />
                    <span className="text-xs font-semibold text-lab-300">Instagram</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-lab-500">Followers</p>
                      <p className="font-mono font-bold text-accent-cyan">{(uni.instagram.followers / 1000).toFixed(1)}K</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-lab-500">Posts</p>
                      <p className="font-mono text-lab-300">{uni.instagram.posts?.toLocaleString() || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* TikTok */}
                <div className="mb-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Music className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-semibold text-lab-300">TikTok</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {uni.tiktok.active ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-accent-green" />
                          <span className="text-xs text-accent-green">Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-accent-red" />
                          <span className="text-xs text-accent-red">Inactive</span>
                        </>
                      )}
                    </div>
                    {uni.tiktok.followers && (
                      <div className="text-right">
                        <p className="font-mono text-accent-purple">{(uni.tiktok.followers / 1000).toFixed(1)}K</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-2">
                  {uni.instagram.url && (
                    <a
                      href={uni.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-lab-800/50 hover:bg-lab-800 text-xs text-lab-300 hover:text-accent-cyan transition-all border border-lab-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Instagram className="w-3 h-3" />
                      View
                    </a>
                  )}
                  {uni.tiktok.url && (
                    <a
                      href={uni.tiktok.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-lab-800/50 hover:bg-lab-800 text-xs text-lab-300 hover:text-accent-purple transition-all border border-lab-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Music className="w-3 h-3" />
                      View
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="lab-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-lab-800 bg-lab-900/50">
                <th className="text-left py-3 px-4 metric-label">University</th>
                <th className="text-right py-3 px-4 metric-label">IG Followers</th>
                <th className="text-right py-3 px-4 metric-label">IG Posts</th>
                <th className="text-center py-3 px-4 metric-label">TikTok</th>
                <th className="text-right py-3 px-4 metric-label">TT Followers</th>
                <th className="text-center py-3 px-4 metric-label">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUniversities.map((uni) => {
                const isYU = uni.id === 'yu';
                const isSelected = selectedForCompare.find(u => u.id === uni.id);
                
                return (
                  <tr
                    key={uni.id}
                    className={`border-b border-lab-800/50 hover:bg-lab-800/30 transition-colors ${
                      isYU ? 'bg-accent-cyan/5' : ''
                    } ${isSelected ? 'bg-accent-purple/10' : ''}`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${isYU ? 'text-accent-cyan' : 'text-lab-200'}`}>
                          {uni.shortName}
                        </span>
                        {isYU && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent-cyan/20 text-accent-cyan">
                            TARGET
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="data-point">{uni.instagram.followers.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-mono text-lab-300">{uni.instagram.posts?.toLocaleString() || 'N/A'}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {uni.tiktok.active ? (
                        <span className="status-indicator status-success text-[10px]">Active</span>
                      ) : (
                        <span className="status-indicator status-critical text-[10px]">Inactive</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-mono text-lab-300">{uni.tiktok.followers?.toLocaleString() || 'N/A'}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        {compareMode && (
                          <button
                            onClick={() => toggleCompare(uni)}
                            className={`px-2 py-1 rounded text-[10px] font-semibold transition-all ${
                              isSelected
                                ? 'bg-accent-purple text-white'
                                : 'bg-lab-800 text-lab-400 hover:text-lab-200'
                            }`}
                          >
                            {isSelected ? '✓' : '+'}
                          </button>
                        )}
                        <a
                          href={uni.instagram.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded hover:bg-lab-800 text-lab-500 hover:text-accent-cyan transition-all"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* No Results */}
      {filteredUniversities.length === 0 && (
        <div className="lab-card p-12 text-center">
          <Search className="w-12 h-12 text-lab-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-lab-300 mb-2">No universities found</h3>
          <p className="text-sm text-lab-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

