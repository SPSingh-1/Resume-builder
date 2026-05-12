import { useResume } from '../../../hooks/useResume';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Plus, Trash2 } from 'lucide-react';

export function LanguagesForm() {
  const { resume, updateResume } = useResume();
  const languages = resume.languages || [];

  const handleAdd = () => {
    updateResume(prev => ({
      ...prev,
      languages: [
        ...(prev.languages || []),
        { id: Math.random().toString(), name: '', proficiency: 'Fluent' }
      ]
    }));
  };

  const handleRemove = (id: string) => {
    updateResume(prev => ({
      ...prev,
      languages: (prev.languages || []).filter(l => l.id !== id)
    }));
  };

  const handleChange = (id: string, field: string, value: string) => {
    updateResume(prev => ({
      ...prev,
      languages: (prev.languages || []).map(l => l.id === id ? { ...l, [field]: value } : l)
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Languages</h2>
          <p className="text-muted-foreground">What languages do you speak?</p>
        </div>
        <Button onClick={handleAdd} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Language
        </Button>
      </div>

      <div className="space-y-4">
        {languages.map((lang) => (
          <div key={lang.id} className="p-4 border rounded-xl bg-card flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label>Language</Label>
              <Input value={lang.name} onChange={e => handleChange(lang.id, 'name', e.target.value)} placeholder="English" />
            </div>
            
            <div className="flex-1 space-y-2">
              <Label>Proficiency</Label>
              <Input value={lang.proficiency} onChange={e => handleChange(lang.id, 'proficiency', e.target.value)} placeholder="Native, Fluent, etc." />
            </div>

            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleRemove(lang.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        {languages.length === 0 && (
          <div className="text-center p-8 border border-dashed rounded-xl text-muted-foreground">
            No languages added yet.
          </div>
        )}
      </div>
    </div>
  );
}
