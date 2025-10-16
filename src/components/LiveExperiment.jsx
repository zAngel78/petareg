import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle, Loader, Beaker } from 'lucide-react';

export default function LiveExperiment({ title, description, onComplete }) {
  const [status, setStatus] = useState('idle'); // idle, running, complete
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const experiments = [
    {
      name: 'Follower Gap Analysis',
      steps: [
        'Collecting Instagram data...',
        'Analyzing 593,000 follower profiles...',
        'Computing engagement patterns...',
        'Identifying key gaps...',
        'Generating recommendations...'
      ],
      result: 'Gap identified: YU is 578K followers behind NYU. Critical action required.',
      duration: 4000
    },
    {
      name: 'TikTok Impact Simulation',
      steps: [
        'Initializing growth model...',
        'Simulating 2.28% weekly growth...',
        'Projecting 6-month trajectory...',
        'Calculating ROI metrics...',
        'Finalizing predictions...'
      ],
      result: 'TikTok could generate +5,000 followers in 3 months with 4x engagement boost.',
      duration: 4000
    },
    {
      name: 'Optimal Posting Analysis',
      steps: [
        'Scanning 2.4M data points...',
        'Analyzing posting times...',
        'Measuring engagement rates...',
        'Detecting patterns...',
        'Optimizing schedule...'
      ],
      result: 'Optimal: 12 posts/week, 8 PM Wednesday, 2-3 Reels. Expected +67% engagement.',
      duration: 4000
    }
  ];

  const experiment = experiments[Math.floor(Math.random() * experiments.length)];

  const runExperiment = () => {
    setStatus('running');
    setProgress(0);
    setResult(null);

    const steps = experiment.steps;
    const stepDuration = experiment.duration / steps.length;

    steps.forEach((step, index) => {
      setTimeout(() => {
        setProgress(((index + 1) / steps.length) * 100);

        if (index === steps.length - 1) {
          setTimeout(() => {
            setStatus('complete');
            setResult(experiment.result);
            if (onComplete) onComplete(experiment.result);
          }, 500);
        }
      }, stepDuration * index);
    });
  };

  return (
    <div className="lab-card p-6 border-2 border-accent-purple/30">
      <div className="flex items-center gap-3 mb-4">
        <Beaker className="w-6 h-6 text-accent-purple" />
        <div className="flex-1">
          <h3 className="font-bold text-lab-100">{title || 'Run Live Experiment'}</h3>
          <p className="text-xs text-lab-500">{description || 'Execute real-time analysis'}</p>
        </div>

        {status === 'idle' && (
          <button
            onClick={runExperiment}
            className="px-4 py-2 bg-accent-purple hover:bg-accent-purple/80 text-white rounded-lg font-semibold transition-all flex items-center gap-2 hover:scale-105"
          >
            <Play className="w-4 h-4" />
            Run
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {status === 'running' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            {/* Current Step */}
            <div className="flex items-center gap-2 text-accent-cyan">
              <Loader className="w-4 h-4 animate-spin" />
              <span className="text-sm font-mono">
                {experiment.steps[Math.floor((progress / 100) * experiment.steps.length)] || experiment.steps[0]}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-lab-500">Progress</span>
                <span className="text-accent-cyan font-mono">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-lab-800 h-3 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan relative"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </motion.div>
              </div>
            </div>

            {/* Analyzing indicator */}
            <div className="flex items-center gap-2 text-xs text-lab-400">
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-accent-purple animate-pulse" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-4 bg-accent-purple animate-pulse" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-4 bg-accent-purple animate-pulse" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="font-mono">Analyzing {(progress / 10).toFixed(1)}K data points...</span>
            </div>
          </motion.div>
        )}

        {status === 'complete' && result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 text-accent-green">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Experiment Complete</span>
            </div>

            <div className="lab-card p-4 bg-accent-green/10 border border-accent-green/30">
              <p className="text-sm text-lab-200 leading-relaxed">{result}</p>
            </div>

            <button
              onClick={() => {
                setStatus('idle');
                setProgress(0);
                setResult(null);
              }}
              className="text-xs text-accent-cyan hover:text-accent-cyan/80 transition-colors font-mono"
            >
              → Run another experiment
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
