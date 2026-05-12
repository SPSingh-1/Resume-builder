import { useResume } from '../../../hooks/useResume';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Plus, Trash2 } from 'lucide-react';

export function ReferencesForm() {
  const { resume, updateResume } = useResume();
  const references = resume.references || [];

  const handleAdd = () => {
    updateResume(prev => ({
      ...prev,
      references: [
        ...(prev.references || []),
        { id: Math.random().toString(), name: '', role: '', company: '', email: '', phone: '' }
      ]
    }));
  };

  const handleRemove = (id: string) => {
    updateResume(prev => ({
      ...prev,
      references: (prev.references || []).filter(r => r.id !== id)
    }));
  };

  const handleChange = (id: string, field: string, value: string) => {
    updateResume(prev => ({
      ...prev,
      references: (prev.references || []).map(r => r.id === id ? { ...r, [field]: value } : r)
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">References</h2>
          <p className="text-muted-foreground">Add professional references.</p>
        </div>
        <Button onClick={handleAdd} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Reference
        </Button>
      </div>

      <div className="space-y-6">
        {references.map((ref) => (
          <div key={ref.id} className="p-4 border rounded-xl bg-card relative group">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemove(ref.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={ref.name} onChange={e => handleChange(ref.id, 'name', e.target.value)} placeholder="Jane Smith" />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={ref.role} onChange={e => handleChange(ref.id, 'role', e.target.value)} placeholder="Engineering Manager" />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Company</Label>
                <Input value={ref.company} onChange={e => handleChange(ref.id, 'company', e.target.value)} placeholder="TechNova Solutions" />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={ref.email} onChange={e => handleChange(ref.id, 'email', e.target.value)} placeholder="jane@example.com" />
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={ref.phone} onChange={e => handleChange(ref.id, 'phone', e.target.value)} placeholder="+1 234 567 890" />
              </div>
            </div>
          </div>
        ))}
        {references.length === 0 && (
          <div className="text-center p-8 border border-dashed rounded-xl text-muted-foreground">
            No references added yet.
          </div>
        )}
      </div>
    </div>
  );
}
