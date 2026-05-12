import { useResume } from '../../../hooks/useResume';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { Plus, Trash2 } from 'lucide-react';

export function AchievementsForm() {
  const { resume, updateResume } = useResume();
  const achievements = resume.achievements;

  const handleAdd = () => {
    updateResume(prev => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        { id: Math.random().toString(), title: '', description: '', date: '' }
      ]
    }));
  };

  const handleRemove = (id: string) => {
    updateResume(prev => ({
      ...prev,
      achievements: prev.achievements.filter(a => a.id !== id)
    }));
  };

  const handleChange = (id: string, field: string, value: string) => {
    updateResume(prev => ({
      ...prev,
      achievements: prev.achievements.map(a => a.id === id ? { ...a, [field]: value } : a)
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Achievements & Awards</h2>
          <p className="text-muted-foreground">Showcase your notable accomplishments.</p>
        </div>
        <Button onClick={handleAdd} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Achievement
        </Button>
      </div>

      <div className="space-y-6">
        {achievements.map((ach) => (
          <div key={ach.id} className="p-4 border rounded-xl bg-card relative group">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemove(ach.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={ach.title} onChange={e => handleChange(ach.id, 'title', e.target.value)} placeholder="Employee of the Year" />
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="month" value={ach.date} onChange={e => handleChange(ach.id, 'date', e.target.value)} />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Description</Label>
                <Textarea 
                  value={ach.description} 
                  onChange={e => handleChange(ach.id, 'description', e.target.value)} 
                  placeholder="Details about the achievement..." 
                />
              </div>
            </div>
          </div>
        ))}
        {achievements.length === 0 && (
          <div className="text-center p-8 border border-dashed rounded-xl text-muted-foreground">
            No achievements added yet.
          </div>
        )}
      </div>
    </div>
  );
}
