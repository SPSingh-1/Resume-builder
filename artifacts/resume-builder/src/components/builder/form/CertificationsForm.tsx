import { useResume } from '../../../hooks/useResume';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Plus, Trash2 } from 'lucide-react';

export function CertificationsForm() {
  const { resume, updateResume } = useResume();
  const certs = resume.certifications;

  const handleAdd = () => {
    updateResume(prev => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { id: Math.random().toString(), name: '', issuer: '', date: '', credentialUrl: '' }
      ]
    }));
  };

  const handleRemove = (id: string) => {
    updateResume(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id)
    }));
  };

  const handleChange = (id: string, field: string, value: string) => {
    updateResume(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => c.id === id ? { ...c, [field]: value } : c)
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Certifications</h2>
          <p className="text-muted-foreground">Add your professional certificates.</p>
        </div>
        <Button onClick={handleAdd} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Certification
        </Button>
      </div>

      <div className="space-y-6">
        {certs.map((cert) => (
          <div key={cert.id} className="p-4 border rounded-xl bg-card relative group">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemove(cert.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="space-y-2 sm:col-span-2">
                <Label>Certification Name</Label>
                <Input value={cert.name} onChange={e => handleChange(cert.id, 'name', e.target.value)} placeholder="AWS Solutions Architect" />
              </div>

              <div className="space-y-2">
                <Label>Issuer</Label>
                <Input value={cert.issuer} onChange={e => handleChange(cert.id, 'issuer', e.target.value)} placeholder="Amazon Web Services" />
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" value={cert.date} onChange={e => handleChange(cert.id, 'date', e.target.value)} />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Credential URL</Label>
                <Input value={cert.credentialUrl} onChange={e => handleChange(cert.id, 'credentialUrl', e.target.value)} placeholder="https://..." />
              </div>
            </div>
          </div>
        ))}
        {certs.length === 0 && (
          <div className="text-center p-8 border border-dashed rounded-xl text-muted-foreground">
            No certifications added yet.
          </div>
        )}
      </div>
    </div>
  );
}
