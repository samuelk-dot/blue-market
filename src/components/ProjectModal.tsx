import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../types/site';
import { ACCENT_CONFIGS } from '../data/initialContent';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  accentClass: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, accentClass }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media visual banner */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950 rounded-t-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <p className="text-xs font-mono-code text-neutral-400 mb-1">{project.metrics}</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">{project.title}</h2>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 font-mono-code mb-2">
              System Overview
            </h3>
            <p className="text-neutral-200 text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Impact callout */}
          <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono-code">
                Engineering Impact
              </p>
              <p className="text-sm text-neutral-200 mt-0.5">
                {project.impact}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono-code mb-3">
              Technologies & Architecture
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 text-xs font-medium rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white rounded-lg transition-colors ${accentClass}`}
                >
                  <span>Launch Live System</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-700"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Inspect Code</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs text-neutral-400 hover:text-white transition-colors px-3 py-2"
            >
              Close Viewer (ESC)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
