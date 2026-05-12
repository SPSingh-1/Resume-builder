import { useResume } from '../../../hooks/useResume';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { Plus, Trash2 } from 'lucide-react';

export function ProjectsForm() {
  const { resume, updateResume } = useResume();
  const projects = resume.projects;

  const handleAdd = () => {
    updateResume(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: Math.random().toString(), title: '', description: '', technologies: [], githubUrl: '', liveUrl: '', startDate: '', endDate: '' }
      ]
    }));
  };

  const handleRemove = (id: string) => {
    updateResume(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const handleChange = (id: string, field: string, value: string) => {
    updateResume(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const handleTechChange = (id: string, value: string) => {
    updateResume(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, technologies: value.split(',').map(t => t.trim()).filter(Boolean) } : p)
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">Highlight your best work.</p>
        </div>
        <Button onClick={handleAdd} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      <div className="space-y-6">
        {projects.map((proj) => (
          <div key={proj.id} className="p-4 border rounded-xl bg-card relative group">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemove(proj.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="space-y-2 sm:col-span-2">
                <Label>Project Title</Label>
                <Input value={proj.title} onChange={e => handleChange(proj.id, 'title', e.target.value)} placeholder="E-commerce Platform" />
              </div>

              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="month" value={proj.startDate} onChange={e => handleChange(proj.id, 'startDate', e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="month" value={proj.endDate} onChange={e => handleChange(proj.id, 'endDate', e.target.value)} />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Technologies (comma separated)</Label>
                <Input value={proj.technologies.join(', ')} onChange={e => handleTechChange(proj.id, e.target.value)} placeholder="React, Node.js, MongoDB" />
              </div>

              <div className="space-y-2">
                <Label>GitHub URL</Label>
                <Input value={proj.githubUrl} onChange={e => handleChange(proj.id, 'githubUrl', e.target.value)} placeholder="github.com/..." />
              </div>

              <div className="space-y-2">
                <Label>Live URL</Label>
                <Input value={proj.liveUrl} onChange={e => handleChange(proj.id, 'liveUrl', e.target.value)} placeholder="https://..." />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Description</Label>
                <Textarea 
                  value={proj.description} 
                  onChange={e => handleChange(proj.id, 'description', e.target.value)} 
                  placeholder="Describe the project and your role..." 
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="text-center p-8 border border-dashed rounded-xl text-muted-foreground">
            No projects added yet.
          </div>
        )}
      </div>
    </div>
  );
}
