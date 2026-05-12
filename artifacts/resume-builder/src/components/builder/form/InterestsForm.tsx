import { useResume } from '../../../hooks/useResume';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

export function InterestsForm() {
  const { resume, updateResume } = useResume();
  const interests = resume.interests || [];

  const handleChange = (value: string) => {
    updateResume(prev => ({
      ...prev,
      interests: value.split(',').map(t => t.trim()).filter(Boolean)
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Interests & Hobbies</h2>
        <p className="text-muted-foreground">What do you enjoy outside of work?</p>
      </div>

      <div className="space-y-4 bg-card p-6 border rounded-xl">
        <div className="space-y-2">
          <Label>Interests (comma separated)</Label>
          <Input 
            value={interests.join(', ')} 
            onChange={e => handleChange(e.target.value)} 
            placeholder="Photography, Hiking, Open Source..." 
          />
        </div>
        
        {interests.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {interests.map((interest, i) => (
              <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                {interest}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
