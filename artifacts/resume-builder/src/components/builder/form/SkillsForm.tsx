import { useResume } from '../../../hooks/useResume';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Slider } from '../../ui/slider';
import { Button } from '../../ui/button';
import { Plus, Trash2 } from 'lucide-react';

export function SkillsForm() {
  const { resume, updateResume } = useResume();
  const skills = resume.skills;

  const handleAdd = () => {
    updateResume(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        { id: Math.random().toString(), name: '', level: 50, category: 'Technical' }
      ]
    }));
  };

  const handleRemove = (id: string) => {
    updateResume(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  const handleChange = (id: string, field: string, value: string | number) => {
    updateResume(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
          <p className="text-muted-foreground">Add your technical and soft skills.</p>
        </div>
        <Button onClick={handleAdd} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Skill
        </Button>
      </div>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="p-4 border rounded-xl bg-card flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label>Skill Name</Label>
              <Input value={skill.name} onChange={e => handleChange(skill.id, 'name', e.target.value)} placeholder="React" />
            </div>
            
            <div className="flex-1 space-y-2">
              <Label>Category</Label>
              <Input value={skill.category} onChange={e => handleChange(skill.id, 'category', e.target.value)} placeholder="Languages, Frameworks..." />
            </div>

            <div className="flex-1 space-y-4 pb-2">
              <div className="flex justify-between">
                <Label>Proficiency ({skill.level}%)</Label>
              </div>
              <Slider 
                value={[skill.level]} 
                onValueChange={(v) => handleChange(skill.id, 'level', v[0])}
                max={100}
                step={5}
              />
            </div>

            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleRemove(skill.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        {skills.length === 0 && (
          <div className="text-center p-8 border border-dashed rounded-xl text-muted-foreground">
            No skills added yet.
          </div>
        )}
      </div>
    </div>
  );
}
