import { useResume } from '../../../hooks/useResume';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { Switch } from '../../ui/switch';
import { Plus, Trash2 } from 'lucide-react';

export function ExperienceForm() {
  const { resume, updateResume } = useResume();
  const experience = resume.experience;

  const handleAdd = () => {
    updateResume(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: Math.random().toString(), company: '', role: '', startDate: '', endDate: '', current: false, description: '', location: '' }
      ]
    }));
  };

  const handleRemove = (id: string) => {
    updateResume(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }));
  };

  const handleChange = (id: string, field: string, value: string | boolean) => {
    updateResume(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Work Experience</h2>
          <p className="text-muted-foreground">List your relevant work experience.</p>
        </div>
        <Button onClick={handleAdd} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Experience
        </Button>
      </div>

      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={exp.id} className="p-4 border rounded-xl bg-card relative group">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemove(exp.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="space-y-2 sm:col-span-2">
                <Label>Job Title / Role</Label>
                <Input value={exp.role} onChange={e => handleChange(exp.id, 'role', e.target.value)} placeholder="Senior Software Engineer" />
              </div>
              
              <div className="space-y-2">
                <Label>Company</Label>
                <Input value={exp.company} onChange={e => handleChange(exp.id, 'company', e.target.value)} placeholder="Acme Inc" />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={exp.location} onChange={e => handleChange(exp.id, 'location', e.target.value)} placeholder="New York, NY (Remote)" />
              </div>

              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="month" value={exp.startDate} onChange={e => handleChange(exp.id, 'startDate', e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="month" value={exp.endDate} onChange={e => handleChange(exp.id, 'endDate', e.target.value)} disabled={exp.current} />
              </div>

              <div className="flex items-center space-x-2 sm:col-span-2">
                <Switch id={`current-${exp.id}`} checked={exp.current} onCheckedChange={(c) => handleChange(exp.id, 'current', c)} />
                <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Description</Label>
                <Textarea 
                  value={exp.description} 
                  onChange={e => handleChange(exp.id, 'description', e.target.value)} 
                  placeholder="Describe your responsibilities and achievements..." 
                  className="min-h-[120px]"
                />
              </div>
            </div>
          </div>
        ))}
        {experience.length === 0 && (
          <div className="text-center p-8 border border-dashed rounded-xl text-muted-foreground">
            No experience added yet. Click the button above to add one.
          </div>
        )}
      </div>
    </div>
  );
}
