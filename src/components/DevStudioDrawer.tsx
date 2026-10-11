import React, { useState } from 'react';
import { X, Sliders, Palette, FileText, FolderPlus, Download, Upload, RotateCcw, Check, Copy, Trash2, Plus, Info } from 'lucide-react';
import { SiteConfig, ThemeAccent, ProjectItem } from '../types/site';
import { ACCENT_CONFIGS } from '../data/initialContent';

interface DevStudioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onUpdateConfig: (newConfig: SiteConfig) => void;
  onResetConfig: () => void;
}

export const DevStudioDrawer: React.FC<DevStudioDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  onResetConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'theme' | 'projects' | 'export'>('content');
  const [copiedExport, setCopiedExport] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [newProjectOpen, setNewProjectOpen] = useState(false);

  // New project state form
  const [newProject, setNewProject] = useState<Partial<ProjectItem>>({
    title: '',
    subtitle: '',
    description: '',
    category: 'web',
    metrics: '',
    tags: ['React', 'TypeScript', 'Tailwind'],
    image: '/src/assets/images/project_cloud_analytics_1791453022906.jpg',
    featured: false,
    impact: '',
    techStack: ['React', 'TypeScript']
  });

  if (!isOpen) return null;

  const handleTextChange = (field: keyof SiteConfig, value: any) => {
    onUpdateConfig({
      ...config,
      [field]: value
    });
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;

    const createdProject: ProjectItem = {
      id: `custom-project-${Date.now()}`,
      title: newProject.title || 'Untitled Project',
      subtitle: newProject.subtitle || 'Web Application',
      description: newProject.description || '',
      category: (newProject.category as any) || 'web',
      tags: newProject.tags || ['Web', 'TypeScript'],
      metrics: newProject.metrics || '100% responsive',
      image: newProject.image || '/src/assets/images/project_cloud_analytics_1791453022906.jpg',
      featured: false,
      impact: newProject.impact || 'Built and deployed to production.',
      techStack: newProject.techStack || ['React', 'Tailwind CSS']
    };

    onUpdateConfig({
      ...config,
      projects: [createdProject, ...config.projects]
    });

    setNewProjectOpen(false);
    setNewProject({
      title: '',
      subtitle: '',
      description: '',
      category: 'web',
      metrics: '',
      tags: ['React', 'TypeScript'],
      image: '/src/assets/images/project_cloud_analytics_1791453022906.jpg',
      featured: false,
      impact: '',
      techStack: ['React']
    });
  };

  const handleDeleteProject = (projectId: string) => {
    onUpdateConfig({
      ...config,
      projects: config.projects.filter(p => p.id !== projectId)
    });
  };

  const handleCopyConfigJson = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2000);
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (parsed.developerName && Array.isArray(parsed.projects)) {
        onUpdateConfig(parsed);
        setImportError(null);
        setImportJsonText('');
        alert('Site configuration successfully loaded!');
      } else {
        setImportError('Invalid config structure: developerName and projects array required.');
      }
    } catch (err: any) {
      setImportError('Invalid JSON format: ' + err.message);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl h-full bg-neutral-900 border-l border-neutral-800 flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-neutral-800 text-neutral-200">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">Dev Studio & Customizer</h3>
              <p className="text-xs text-neutral-400">Live in-browser website development tool</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/60 px-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('content')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'content'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Content & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'theme'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Theme & Colors</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'projects'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span>Projects ({config.projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'export'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export & Sync</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: CONTENT */}
          {activeTab === 'content' && (
            <div className="space-y-5 text-xs">
              <div className="p-3.5 rounded-lg bg-blue-950/30 border border-blue-800/40 text-blue-300 text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Changes made here are applied instantly to the live website and saved in your Chrome browser storage.</span>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Developer Name</label>
                <input
                  type="text"
                  value={config.developerName}
                  onChange={(e) => handleTextChange('developerName', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-neutral-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Role Title</label>
                <input
                  type="text"
                  value={config.roleTitle}
                  onChange={(e) => handleTextChange('roleTitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-neutral-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Hero Main Headline</label>
                <textarea
                  rows={2}
                  value={config.heroHeadline}
                  onChange={(e) => handleTextChange('heroHeadline', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-neutral-100 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Hero Subheadline</label>
                <textarea
                  rows={3}
                  value={config.heroSubheadline}
                  onChange={(e) => handleTextChange('heroSubheadline', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-neutral-100 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={config.email}
                    onChange={(e) => handleTextChange('email', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-neutral-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={config.location}
                    onChange={(e) => handleTextChange('location', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-neutral-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Availability Status</label>
                <select
                  value={config.availability}
                  onChange={(e) => handleTextChange('availability', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-neutral-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="Available for high-impact projects">Available for high-impact projects</option>
                  <option value="Consulting & full-time roles">Consulting & full-time roles</option>
                  <option value="Booking Q2/Q3">Booking Q2/Q3</option>
                </select>
              </div>
            </div>
          )}

          {/* TAB 2: THEME */}
          {activeTab === 'theme' && (
            <div className="space-y-6 text-xs">
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Accent Color Palette</h4>
                <p className="text-neutral-400 mb-4">
                  Select an accent to redefine buttons, badges, focal highlights, and gradients across the website.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(ACCENT_CONFIGS) as ThemeAccent[]).map((key) => {
                    const acc = ACCENT_CONFIGS[key];
                    const isSelected = config.themeAccent === key;

                    return (
                      <button
                        key={key}
                        onClick={() => handleTextChange('themeAccent', key)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-neutral-800/90 border-white text-white shadow-md'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-4 h-4 rounded-full ${acc.primary}`} />
                          <span className="font-semibold text-xs">{acc.name}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <p className="font-semibold text-white">Active Palette Preview</p>
                <div className="flex gap-2">
                  <span className={`px-3 py-1.5 rounded-lg text-white font-medium ${ACCENT_CONFIGS[config.themeAccent]?.primary}`}>
                    Primary Button
                  </span>
                  <span className={`px-3 py-1.5 rounded-lg border font-mono-code ${ACCENT_CONFIGS[config.themeAccent]?.badge}`}>
                    Status Metric
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-5 text-xs">
              <div className="flex items-center justify-between">
                <p className="text-neutral-400">Manage case studies and portfolio works.</p>
                <button
                  onClick={() => setNewProjectOpen(!newProjectOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{newProjectOpen ? 'Cancel' : 'New Project'}</span>
                </button>
              </div>

              {/* Add Project Form */}
              {newProjectOpen && (
                <form onSubmit={handleAddProject} className="p-4 rounded-xl bg-neutral-950 border border-neutral-700 space-y-3">
                  <h4 className="font-bold text-white text-sm">Add New Project</h4>
                  
                  <div>
                    <label className="block text-neutral-300 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Distributed Ledger Explorer"
                      value={newProject.title || ''}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Category</label>
                    <select
                      value={newProject.category || 'web'}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                      className="w-full px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-700 text-white"
                    >
                      <option value="web">Web Application</option>
                      <option value="systems">Systems & Telemetry</option>
                      <option value="fullstack">Full-Stack Pipelines</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Description</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="High level overview of what this application does..."
                      value={newProject.description || ''}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-700 text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Metric / Impact Highlight</label>
                    <input
                      type="text"
                      placeholder="e.g. 120k requests/min · 99.9% uptime"
                      value={newProject.metrics || ''}
                      onChange={(e) => setNewProject({ ...newProject, metrics: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-700 text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors mt-2"
                  >
                    Save Project to Portfolio
                  </button>
                </form>
              )}

              {/* Projects List */}
              <div className="space-y-3">
                {config.projects.map((p) => (
                  <div key={p.id} className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white truncate">{p.title}</p>
                      <p className="text-neutral-400 text-[11px] truncate">{p.description}</p>
                      <p className="text-neutral-400 font-mono-code text-[11px] mt-1">{p.metrics}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EXPORT & SYNC */}
          {activeTab === 'export' && (
            <div className="space-y-5 text-xs">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-white">Export & Sync Your Configuration</h4>
                <p className="text-neutral-400">
                  You can copy the entire JSON representation of your customized website or paste a saved JSON schema.
                </p>
              </div>

              <div>
                <button
                  onClick={handleCopyConfigJson}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium border border-neutral-700 transition-colors cursor-pointer"
                >
                  {copiedExport ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedExport ? 'Configuration Copied to Clipboard!' : 'Copy Site Data JSON'}</span>
                </button>
              </div>

              <div className="pt-4 border-t border-neutral-800 space-y-2">
                <label className="block text-neutral-300 font-semibold">Import JSON Configuration</label>
                <textarea
                  rows={4}
                  placeholder="Paste site JSON configuration here..."
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 font-mono-code text-[11px] focus:outline-none focus:border-blue-500"
                />
                {importError && (
                  <p className="text-rose-400 text-[11px]">{importError}</p>
                )}
                <button
                  onClick={handleImportJson}
                  disabled={!importJsonText.trim()}
                  className="w-full py-2 rounded-lg bg-blue-600 disabled:opacity-50 hover:bg-blue-500 text-white font-semibold transition-colors"
                >
                  Load Config
                </button>
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <button
                  onClick={() => {
                    if (confirm('Reset all site customizations to original defaults?')) {
                      onResetConfig();
                    }
                  }}
                  className="flex items-center gap-1.5 text-neutral-400 hover:text-rose-400 transition-colors text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Content to Default</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <span className="text-xs text-neutral-400 font-mono-code">
            Auto-saved in Chrome Storage
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-white text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Done Editing
          </button>
        </div>
      </div>
    </div>
  );
};
