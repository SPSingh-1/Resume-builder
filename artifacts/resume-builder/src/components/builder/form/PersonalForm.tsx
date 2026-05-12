import { useResume } from '../../../hooks/useResume';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { ResumeData } from '../../../types/resume';

export function PersonalForm() {
  const { resume, updateResume } = useResume();
  const personal = resume.personal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateResume((prev) => ({
      ...prev,
      personal: { ...prev.personal, [name]: value }
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateResume(prev => ({
          ...prev,
          personal: { ...prev.personal, photoUrl: reader.result as string }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Personal Details</h2>
        <p className="text-muted-foreground">Start with the basics. Who are you and how can employers reach you?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="photo">Profile Photo</Label>
          <div className="flex items-center gap-4">
            {personal.photoUrl && (
              <img src={personal.photoUrl} alt="Profile" className="w-16 h-16 rounded-full object-cover border" />
            )}
            <Input id="photo" type="file" accept="image/*" onChange={handlePhotoUpload} className="flex-1" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={personal.name} onChange={handleChange} placeholder="John Doe" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input id="jobTitle" name="jobTitle" value={personal.jobTitle} onChange={handleChange} placeholder="Software Engineer" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={personal.email} onChange={handleChange} placeholder="john@example.com" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" value={personal.phone} onChange={handleChange} placeholder="+1 234 567 890" />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" value={personal.address} onChange={handleChange} placeholder="San Francisco, CA" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input id="linkedin" name="linkedin" value={personal.linkedin} onChange={handleChange} placeholder="linkedin.com/in/johndoe" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github">GitHub URL</Label>
          <Input id="github" name="github" value={personal.github} onChange={handleChange} placeholder="github.com/johndoe" />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="portfolio">Portfolio Website</Label>
          <Input id="portfolio" name="portfolio" value={personal.portfolio} onChange={handleChange} placeholder="johndoe.dev" />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="objective">Professional Summary / Objective</Label>
          <Textarea 
            id="objective" 
            name="objective" 
            value={personal.objective} 
            onChange={handleChange} 
            placeholder="A brief summary of your professional background and goals..."
            className="min-h-[120px]"
          />
        </div>
      </div>
    </div>
  );
}
