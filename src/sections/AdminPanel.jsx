import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Unlock, Upload, FolderOpen, File, FileText, Image, 
  Database, Plus, Edit, Trash2, Save, X, Search, Filter,
  Download, Eye, Calendar, User, Tag, CheckCircle2, AlertCircle,
  FileJson, FileSpreadsheet, FilePlus, FolderPlus, MoreVertical
} from 'lucide-react';

export default function AdminPanel({ data }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('files'); // 'files', 'data', 'upload'
  const [selectedFolder, setSelectedFolder] = useState('root');
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showNewFileModal, setShowNewFileModal] = useState(false);

  // Mock file system structure
  const [fileSystem, setFileSystem] = useState({
    root: {
      name: 'Research Files',
      type: 'folder',
      children: ['universities', 'benchmarks', 'findings', 'media']
    },
    universities: {
      name: 'Universities Data',
      type: 'folder',
      parent: 'root',
      children: ['yu-data', 'nyu-data', 'columbia-data', 'competitors']
    },
    'yu-data': {
      name: 'YU_Instagram_Analysis.json',
      type: 'file',
      parent: 'universities',
      size: '45 KB',
      modified: '2025-10-13',
      author: 'Angel Ramirez',
      status: 'published',
      content: {
        followers: 15000,
        posts: 2260,
        engagement: 2.5,
        lastUpdated: '2025-10-13'
      }
    },
    'nyu-data': {
      name: 'NYU_Social_Media.json',
      type: 'file',
      parent: 'universities',
      size: '52 KB',
      modified: '2025-10-12',
      author: 'Angel Ramirez',
      status: 'published',
      content: {
        instagram: { followers: 593000, posts: 2613 },
        tiktok: { followers: 112400, active: true }
      }
    },
    'columbia-data': {
      name: 'Columbia_Analysis.xlsx',
      type: 'file',
      parent: 'universities',
      size: '128 KB',
      modified: '2025-10-11',
      author: 'Research Team',
      status: 'draft'
    },
    competitors: {
      name: 'Competitor_Comparison.csv',
      type: 'file',
      parent: 'universities',
      size: '34 KB',
      modified: '2025-10-10',
      author: 'Angel Ramirez',
      status: 'published'
    },
    benchmarks: {
      name: 'Industry Benchmarks',
      type: 'folder',
      parent: 'root',
      children: ['hootsuite-report', 'rivaliq-data', 'sprout-stats']
    },
    'hootsuite-report': {
      name: 'Hootsuite_2025_Benchmarks.pdf',
      type: 'file',
      parent: 'benchmarks',
      size: '2.4 MB',
      modified: '2025-10-09',
      author: 'External Source',
      status: 'published'
    },
    'rivaliq-data': {
      name: 'RivalIQ_Higher_Ed_Report.json',
      type: 'file',
      parent: 'benchmarks',
      size: '156 KB',
      modified: '2025-10-08',
      author: 'External Source',
      status: 'published'
    },
    'sprout-stats': {
      name: 'Sprout_Social_Benchmarks.xlsx',
      type: 'file',
      parent: 'benchmarks',
      size: '89 KB',
      modified: '2025-10-07',
      author: 'External Source',
      status: 'published'
    },
    findings: {
      name: 'Research Findings',
      type: 'folder',
      parent: 'root',
      children: ['key-findings', 'recommendations', 'projections']
    },
    'key-findings': {
      name: 'Critical_Gaps_Analysis.md',
      type: 'file',
      parent: 'findings',
      size: '12 KB',
      modified: '2025-10-13',
      author: 'Angel Ramirez',
      status: 'published'
    },
    recommendations: {
      name: 'Action_Recommendations.json',
      type: 'file',
      parent: 'findings',
      size: '28 KB',
      modified: '2025-10-13',
      author: 'Angel Ramirez',
      status: 'published'
    },
    projections: {
      name: 'Growth_Projections_6M.xlsx',
      type: 'file',
      parent: 'findings',
      size: '67 KB',
      modified: '2025-10-12',
      author: 'Angel Ramirez',
      status: 'draft'
    },
    media: {
      name: 'Media Assets',
      type: 'folder',
      parent: 'root',
      children: ['screenshots', 'charts', 'logos']
    },
    screenshots: {
      name: 'Instagram_Screenshots',
      type: 'folder',
      parent: 'media',
      children: []
    },
    charts: {
      name: 'Data_Visualizations',
      type: 'folder',
      parent: 'media',
      children: []
    },
    logos: {
      name: 'University_Logos',
      type: 'folder',
      parent: 'media',
      children: []
    }
  });

  // Authentication
  const handleLogin = () => {
    if (password === 'admin123' || password === 'research2025') {
      setIsAuthenticated(true);
    }
  };

  // Get files in current folder
  const getCurrentFiles = () => {
    const folder = fileSystem[selectedFolder];
    if (!folder || !folder.children) return [];
    
    return folder.children
      .map(childId => ({ id: childId, ...fileSystem[childId] }))
      .filter(file => 
        searchTerm === '' || 
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  // Get file icon
  const getFileIcon = (file) => {
    if (file.type === 'folder') return FolderOpen;
    const ext = file.name.split('.').pop().toLowerCase();
    switch(ext) {
      case 'json': return FileJson;
      case 'xlsx':
      case 'csv': return FileSpreadsheet;
      case 'pdf': return FileText;
      case 'png':
      case 'jpg':
      case 'jpeg': return Image;
      default: return File;
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const badges = {
      published: { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle2 },
      draft: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: AlertCircle },
      archived: { color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', icon: X }
    };
    return badges[status] || badges.draft;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lab-card p-8 max-w-md w-full bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm border-2 border-accent-cyan/30"
        >
          <div className="text-center mb-6">
            <div className="inline-flex p-4 rounded-full bg-accent-cyan/20 mb-4">
              <Lock className="w-12 h-12 text-accent-cyan" />
            </div>
            <h2 className="text-2xl font-bold text-lab-100 mb-2">Admin Access Required</h2>
            <p className="text-sm text-lab-400">Enter password to access the research management panel</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-lab-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 bg-lab-800/50 border border-lab-700 rounded-lg text-lab-200 placeholder-lab-500 focus:outline-none focus:border-accent-cyan transition-all"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full px-4 py-3 rounded-lg bg-accent-cyan hover:bg-accent-cyan/80 text-black font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-5 h-5" />
              Access Admin Panel
            </button>

            <div className="pt-4 border-t border-lab-800">
              <p className="text-xs text-lab-600 text-center">Demo credentials:</p>
              <p className="text-xs text-lab-500 text-center font-mono mt-1">admin123 or research2025</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="lab-card p-6 bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm border-2 border-accent-cyan/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-accent-cyan/20 border border-accent-cyan/30">
              <Database className="w-8 h-8 text-accent-cyan" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-lab-100 mb-1">Research Management Panel</h2>
              <p className="text-sm text-lab-400">Manage files, data, and research content</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent-green/10 border border-accent-green/30">
              <User className="w-4 h-4 text-accent-green" />
              <span className="text-sm text-accent-green font-medium">Angel Ramirez</span>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 rounded-lg bg-accent-red/10 hover:bg-accent-red/20 text-accent-red border border-accent-red/30 font-semibold text-sm transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mt-6 border-t border-lab-800 pt-4">
          <button
            onClick={() => setActiveTab('files')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              activeTab === 'files'
                ? 'bg-accent-cyan text-black'
                : 'bg-lab-800/50 text-lab-400 hover:text-lab-200'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            File Explorer
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              activeTab === 'data'
                ? 'bg-accent-cyan text-black'
                : 'bg-lab-800/50 text-lab-400 hover:text-lab-200'
            }`}
          >
            <Database className="w-4 h-4" />
            Data Manager
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'bg-accent-cyan text-black'
                : 'bg-lab-800/50 text-lab-400 hover:text-lab-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            Upload Center
          </button>
        </div>
      </div>

      {/* File Explorer Tab */}
      {activeTab === 'files' && (
        <div className="grid grid-cols-4 gap-4">
          {/* Sidebar */}
          <div className="lab-card p-4 bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lab-200">Folders</h3>
              <button className="p-1.5 rounded-lg bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan transition-all">
                <FolderPlus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {Object.entries(fileSystem)
                .filter(([_, item]) => item.type === 'folder' && item.parent === 'root')
                .map(([id, folder]) => (
                  <button
                    key={id}
                    onClick={() => setSelectedFolder(id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedFolder === id
                        ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30'
                        : 'text-lab-400 hover:bg-lab-800/50 hover:text-lab-200'
                    }`}
                  >
                    <FolderOpen className="w-4 h-4" />
                    <span className="truncate">{folder.name}</span>
                  </button>
                ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-3 space-y-4">
            {/* Toolbar */}
            <div className="lab-card p-4 bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lab-500" />
                  <input
                    type="text"
                    placeholder="Search files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-lab-800/50 border border-lab-700 rounded-lg text-sm text-lab-200 placeholder-lab-500 focus:outline-none focus:border-accent-cyan transition-all"
                  />
                </div>
                <button
                  onClick={() => setShowNewFileModal(true)}
                  className="px-4 py-2 rounded-lg bg-accent-green/10 hover:bg-accent-green/20 text-accent-green border border-accent-green/30 font-semibold text-sm flex items-center gap-2 transition-all"
                >
                  <FilePlus className="w-4 h-4" />
                  New File
                </button>
                <button className="px-4 py-2 rounded-lg bg-lab-800/50 hover:bg-lab-800 text-lab-300 border border-lab-700 font-semibold text-sm flex items-center gap-2 transition-all">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            {/* File List */}
            <div className="lab-card p-6 bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm">
              <div className="space-y-2">
                {getCurrentFiles().map((file) => {
                  const Icon = getFileIcon(file);
                  const statusBadge = file.status ? getStatusBadge(file.status) : null;
                  const StatusIcon = statusBadge?.icon;

                  return (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all cursor-pointer ${
                        selectedFile?.id === file.id
                          ? 'bg-accent-cyan/10 border-accent-cyan/30'
                          : 'bg-lab-800/30 border-lab-700/50 hover:border-lab-600'
                      }`}
                      onClick={() => setSelectedFile(file)}
                    >
                      <Icon className={`w-8 h-8 ${file.type === 'folder' ? 'text-accent-yellow' : 'text-accent-cyan'}`} />
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-lab-200 mb-1">{file.name}</h4>
                        <div className="flex items-center gap-3 text-xs text-lab-500">
                          {file.size && <span>{file.size}</span>}
                          {file.modified && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {file.modified}
                            </span>
                          )}
                          {file.author && (
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {file.author}
                            </span>
                          )}
                        </div>
                      </div>

                      {statusBadge && (
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-medium ${statusBadge.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {file.status}
                        </div>
                      )}

                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-lg hover:bg-lab-700 text-lab-400 hover:text-accent-cyan transition-all">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-lab-700 text-lab-400 hover:text-accent-blue transition-all">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-lab-700 text-lab-400 hover:text-accent-green transition-all">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-lab-700 text-lab-400 hover:text-accent-red transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}

                {getCurrentFiles().length === 0 && (
                  <div className="text-center py-12">
                    <FolderOpen className="w-16 h-16 text-lab-700 mx-auto mb-4" />
                    <p className="text-lab-500">No files found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Data Manager Tab */}
      {activeTab === 'data' && (
        <div className="lab-card p-6 bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm">
          <h3 className="subsection-title mb-4">Research Data Editor</h3>
          <div className="grid grid-cols-2 gap-6">
            {/* Universities */}
            <div className="p-4 rounded-lg bg-lab-800/30 border border-lab-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-lab-200">Universities</h4>
                <button className="p-1.5 rounded-lg bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan transition-all">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {data.universities.slice(0, 3).map(uni => (
                  <div key={uni.id} className="flex items-center justify-between p-3 rounded-lg bg-lab-900/50">
                    <span className="text-sm text-lab-300">{uni.name}</span>
                    <button className="text-accent-cyan hover:text-accent-cyan/80">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Findings */}
            <div className="p-4 rounded-lg bg-lab-800/30 border border-lab-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-lab-200">Key Findings</h4>
                <button className="p-1.5 rounded-lg bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan transition-all">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {data.keyFindings.slice(0, 3).map(finding => (
                  <div key={finding.id} className="flex items-center justify-between p-3 rounded-lg bg-lab-900/50">
                    <span className="text-sm text-lab-300 truncate">{finding.title}</span>
                    <button className="text-accent-cyan hover:text-accent-cyan/80">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-4 rounded-lg bg-lab-800/30 border border-lab-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-lab-200">Recommendations</h4>
                <button className="p-1.5 rounded-lg bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan transition-all">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {data.recommendations.slice(0, 3).map(rec => (
                  <div key={rec.id} className="flex items-center justify-between p-3 rounded-lg bg-lab-900/50">
                    <span className="text-sm text-lab-300 truncate">{rec.action}</span>
                    <button className="text-accent-cyan hover:text-accent-cyan/80">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Benchmarks */}
            <div className="p-4 rounded-lg bg-lab-800/30 border border-lab-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-lab-200">Benchmarks</h4>
                <button className="p-1.5 rounded-lg bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan transition-all">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-lab-900/50">
                  <span className="text-sm text-lab-300">Instagram Engagement</span>
                  <span className="text-sm font-mono text-accent-cyan">{data.benchmarks.instagram.averageEngagement}%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-lab-900/50">
                  <span className="text-sm text-lab-300">TikTok Growth</span>
                  <span className="text-sm font-mono text-accent-cyan">{data.benchmarks.tiktok.weeklyFollowerGrowth}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Center Tab */}
      {activeTab === 'upload' && (
        <div className="lab-card p-6 bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto">
            <div className="border-2 border-dashed border-lab-700 rounded-xl p-12 text-center hover:border-accent-cyan transition-all cursor-pointer">
              <Upload className="w-16 h-16 text-lab-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-lab-200 mb-2">Upload Research Files</h3>
              <p className="text-sm text-lab-500 mb-4">Drag and drop files here or click to browse</p>
              <button className="px-6 py-3 rounded-lg bg-accent-cyan hover:bg-accent-cyan/80 text-black font-semibold transition-all">
                Select Files
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <h4 className="font-semibold text-lab-300">Accepted File Types:</h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: 'JSON', icon: FileJson, color: 'yellow' },
                  { type: 'Excel/CSV', icon: FileSpreadsheet, color: 'green' },
                  { type: 'PDF', icon: FileText, color: 'red' },
                  { type: 'Images', icon: Image, color: 'purple' },
                  { type: 'Markdown', icon: FileText, color: 'blue' },
                  { type: 'Text', icon: File, color: 'cyan' }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-lab-800/30 border border-lab-700">
                      <Icon className={`w-5 h-5 text-accent-${item.color}`} />
                      <span className="text-sm text-lab-300">{item.type}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

