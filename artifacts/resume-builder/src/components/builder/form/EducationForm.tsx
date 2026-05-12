import { useResume } from '../../../hooks/useResume';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { Plus, Trash2, GripVertical } from 'lucide-react';

export function EducationForm() {
  const { resume, updateResume } = useResume();
  const education = resume.education;

  const handleAdd = () => {
    updateResume(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Math.random().toString(), institution: '', degree: '', field: '', startDate: '', endDate: '', grade: '', description: '' }
      ]
    }));
  };

  const handleRemove = (id: string) => {
    updateResume(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  const handleChange = (id: string, field: string, value: string) => {
    updateResume(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Education</h2>
          <p className="text-muted-foreground">Add your educational background.</p>
        </div>
        <Button onClick={handleAdd} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Education
        </Button>
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={edu.id} className="p-4 border rounded-xl bg-card relative group">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemove(edu.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="space-y-2 sm:col-span-2">
                <Label>Institution</Label>
                <Input value={edu.institution} onChange={e => handleChange(edu.id, 'institution', e.target.value)} placeholder="University Name" />
              </div>
              
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input value={edu.degree} onChange={e => handleChange(edu.id, 'degree', e.target.value)} placeholder="Bachelor of Science" />
              </div>

              <div className="space-y-2">
                <Label>Field of Study</Label>
                <Input value={edu.field} onChange={e => handleChange(edu.id, 'field', e.target.value)} placeholder="Computer Science" />
              </div>

              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="month" value={edu.startDate} onChange={e => handleChange(edu.id, 'startDate', e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="month" value={edu.endDate} onChange={e => handleChange(edu.id, 'endDate', e.target.value)} />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Grade / GPA</Label>
                <Input value={edu.grade} onChange={e => handleChange(edu.id, 'grade', e.target.value)} placeholder="3.8 GPA" />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Description</Label>
                <Textarea value={edu.description} onChange={e => handleChange(edu.id, 'description', e.target.value)} placeholder="Relevant coursework, honors, etc..." />
              </div>
            </div>
          </div>
        ))}
        {education.length === 0 && (
          <div className="text-center p-8 border border-dashed rounded-xl text-muted-foreground">
            No education added yet. Click the button above to add one.
          </div>
        )}
      </div>
    </div>
  );
}
