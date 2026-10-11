import React, { useState } from 'react';
import { ArrowUpRight, Plus, ExternalLink, Layers } from 'lucide-react';
import { ProjectItem } from '../types/site';
import { ProjectModal } from './ProjectModal';
import { ACCENT_CONFIGS } from '../data/initialContent';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  themeAccent: string;
  onOpenDevStudio: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  themeAccent,
  onOpenDevStudio,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'systems' | 'web' | 'fullstack'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const accent = ACCENT_CONFIGS[themeAccent] || ACCENT_CONFIGS.cobalt;

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="work" className="py-20 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono-code">
              Selected Works & Case Studies
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Production systems designed for reliability and speed.
            </h2>
          </div>

          {/* Functional filter segmented control */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveFilter('systems')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'systems'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Cloud & Systems
            </button>
            <button
              onClick={() => setActiveFilter('web')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'web'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Web & PWA
            </button>
            <button
              onClick={() => setActiveFilter('fullstack')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'fullstack'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Full-Stack Pipelines
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {filteredProjects.map((project, index) => {
            const isMarquee = index === 0;

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group relative rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between ${
                  isMarquee ? 'lg:col-span-8' : 'lg:col-span-4'
                }`}
              >
                {/* Visual Asset Container */}
                <div className={`relative w-full overflow-hidden bg-neutral-950 ${isMarquee ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />
                  
                  {/* Subtle hover prompt */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-2 rounded-lg bg-neutral-950/80 text-white backdrop-blur-md flex items-center gap-1 text-xs">
                      <span>Inspect Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Zero-Pill Unboxed Metadata with typographic separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 font-mono-code">
                      <span>{project.category.toUpperCase()}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-neutral-300 font-medium">{project.metrics}</span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-neutral-300 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Clean unboxed tags with typographic dot separators */}
                  <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                    <div className="truncate pr-3">
                      {project.tags.join('  ·  ')}
                    </div>
                    <span className="text-neutral-300 font-medium whitespace-nowrap flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>View</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add project / Customizer tile */}
          <div 
            onClick={onOpenDevStudio}
            className="lg:col-span-4 rounded-2xl bg-neutral-900/40 border border-dashed border-neutral-800 hover:border-neutral-700 transition-colors p-8 flex flex-col items-center justify-center text-center gap-3 cursor-pointer group min-h-[280px]"
          >
            <div className="w-12 h-12 rounded-xl bg-neutral-800/80 group-hover:bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <p className="font-display text-base font-semibold text-white">Add or Edit Projects</p>
              <p className="text-xs text-neutral-400 max-w-xs mt-1">
                Customize titles, case study data, live URLs and tech stack in the Dev Studio.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        accentClass={accent.primary}
      />
    </section>
  );
};
