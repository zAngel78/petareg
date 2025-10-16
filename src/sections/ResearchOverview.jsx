import { useState } from 'react';
import { AlertTriangle, TrendingDown, TrendingUp, Activity, CheckCircle2, XCircle } from 'lucide-react';
import CompetitorModal from '../components/CompetitorModal';
import ResearchTerminal from '../components/ResearchTerminal';
import EinsteinAI from '../components/EinsteinAI';
import LiveExperiment from '../components/LiveExperiment';

export default function ResearchOverview({ data }) {
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (uni) => {
    setSelectedUniversity(uni);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <CompetitorModal
        university={selectedUniversity}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        allUniversities={data.universities}
      />
      {/* Research Metadata */}
      <div className="lab-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Research Metadata</h2>
          <span className="status-indicator status-info">
            <Activity className="w-3 h-3" />
            {data.metadata.phase}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="metric-label">Date</p>
            <p className="font-mono text-lg text-lab-200">{data.metadata.date}</p>
          </div>
          <div>
            <p className="metric-label">Researcher</p>
            <p className="font-mono text-lg text-lab-200">{data.metadata.researcher}</p>
          </div>
          <div>
            <p className="metric-label">Client</p>
            <p className="font-mono text-lg text-lab-200">{data.metadata.client}</p>
          </div>
          <div>
            <p className="metric-label">Status</p>
            <p className="font-mono text-lg text-accent-green">{data.metadata.status}</p>
          </div>
        </div>
      </div>

      {/* Key Findings Summary */}
      <div>
        <h2 className="section-title mb-4">Key Findings Summary</h2>
        <div className="grid grid-cols-4 gap-4">
          {data.keyFindings.map((finding) => {
            const isCritical = finding.type === 'critical';
            const isWarning = finding.type === 'warning';

            return (
              <div key={finding.id} className="lab-card lab-card-hover p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className={`status-indicator ${
                    isCritical ? 'status-critical' :
                    isWarning ? 'status-warning' :
                    'status-success'
                  }`}>
                    {isCritical && <AlertTriangle className="w-3 h-3" />}
                    {isWarning && <TrendingDown className="w-3 h-3" />}
                    {!isCritical && !isWarning && <TrendingUp className="w-3 h-3" />}
                    Priority {finding.priority}
                  </span>
                </div>
                <h3 className="subsection-title mb-2">{finding.title}</h3>
                <p className="text-sm text-lab-400 mb-3">{finding.description}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-lab-500">Current:</span>
                    <span className="data-point">{finding.metric.current}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-lab-500">Target:</span>
                    <span className="text-accent-green font-mono">{finding.metric.target}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-lab-500">Timeframe:</span>
                    <span className="font-mono text-lab-300">{finding.metric.timeframe}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* University Competitive Landscape */}
      <div>
        <h2 className="section-title mb-4">Competitive Landscape</h2>
        <p className="text-sm text-lab-400 mb-4">Click any university for detailed analysis</p>
        <div className="grid grid-cols-6 gap-3">
          {data.universities.map((uni) => {
            const isYU = uni.id === 'yu';
            const hasInstagram = uni.instagram.followers > 0;
            const hasTikTok = uni.tiktok.active;

            return (
              <div
                key={uni.id}
                onClick={() => openModal(uni)}
                className={`lab-card lab-card-hover p-4 cursor-pointer ${
                  isYU ? 'border-accent-cyan bg-accent-cyan/5' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm">{uni.shortName}</h3>
                  {isYU && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30">
                      TARGET
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-[10px] text-lab-500 uppercase tracking-wider mb-1">Instagram</p>
                    <div className="flex items-center gap-2">
                      {hasInstagram ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-accent-green" />
                          <span className="font-mono text-xs text-lab-200">
                            {(uni.instagram.followers / 1000).toFixed(1)}K
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-accent-red" />
                          <span className="font-mono text-xs text-lab-500">N/A</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] text-lab-500 uppercase tracking-wider mb-1">TikTok</p>
                    <div className="flex items-center gap-2">
                      {hasTikTok ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-accent-green" />
                          <span className="font-mono text-xs text-lab-200">
                            {uni.tiktok.followers ? `${(uni.tiktok.followers / 1000).toFixed(1)}K` : 'Active'}
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-accent-red" />
                          <span className="font-mono text-xs text-lab-500">None</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Critical Gaps */}
      <div>
        <h2 className="section-title mb-4">Critical Gaps Identified</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="lab-card lab-card-hover p-5 border-l-4 border-accent-red">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="w-5 h-5 text-accent-red" />
              <h3 className="subsection-title">Instagram Followers</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-lab-400">vs Average</span>
                <span className="data-point text-accent-red">
                  {data.gaps.instagram.followers.vsAverage.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-lab-400">vs Leader (NYU)</span>
                <span className="data-point text-accent-red">
                  {data.gaps.instagram.followers.vsLeader.toLocaleString()}
                </span>
              </div>
              <div className="pt-2 border-t border-lab-800">
                <p className="text-xs text-lab-500">Closest Competitor:</p>
                <p className="text-sm text-accent-yellow">
                  {data.gaps.instagram.closestCompetitor.name} ({data.gaps.instagram.closestCompetitor.difference.toLocaleString()} diff)
                </p>
              </div>
            </div>
          </div>

          <div className="lab-card lab-card-hover p-5 border-l-4 border-accent-yellow">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-accent-yellow" />
              <h3 className="subsection-title">TikTok Presence</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-lab-400">Current Status</span>
                <span className="text-accent-red font-mono text-sm">Not Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-lab-400">Competitors Active</span>
                <span className="data-point text-accent-green">
                  {data.gaps.tiktok.competitorsActive} / 5
                </span>
              </div>
              <div className="pt-2 border-t border-lab-800">
                <p className="text-xs text-lab-500">Potential Weekly Growth:</p>
                <p className="text-sm text-accent-cyan font-mono">
                  {data.gaps.tiktok.potentialGrowth}
                </p>
              </div>
            </div>
          </div>

          <div className="lab-card lab-card-hover p-5 border-l-4 border-accent-blue">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-accent-blue" />
              <h3 className="subsection-title">Platform Diversification</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-lab-400">Recommended</span>
                <span className="data-point">{data.gaps.platforms.recommended}</span>
              </div>
              <div className="pt-2 border-t border-lab-800">
                <p className="text-xs text-lab-500 mb-1">Missing Platforms:</p>
                <div className="space-y-1">
                  {data.gaps.platforms.missing.map((platform, idx) => (
                    <p key={idx} className="text-xs text-accent-yellow">• {platform}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Einstein AI */}
      <EinsteinAI data={data} />

      {/* Live Experiments */}
      <div className="grid grid-cols-2 gap-4">
        <LiveExperiment
          title="Run Gap Analysis"
          description="Analyze competitive positioning"
        />
        <LiveExperiment
          title="Simulate TikTok Impact"
          description="Project growth with TikTok"
        />
      </div>

      {/* Research Terminal */}
      <ResearchTerminal data={data} />

      {/* Research Status */}
      <div className="lab-card p-6 bg-lab-900/80">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="subsection-title mb-2">Next Phase</h3>
            <p className="text-sm text-lab-400">{data.nextPhase.deliverable}</p>
          </div>
          <div className="text-right">
            <p className="metric-label">Timeline</p>
            <p className="font-mono text-lg text-accent-cyan">{data.nextPhase.timeline}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-lab-800">
          <p className="text-xs text-lab-500 mb-2">Pending Tasks:</p>
          <div className="grid grid-cols-3 gap-2">
            {data.nextPhase.tasks.map((task, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-lab-300">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                <span>{task}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
