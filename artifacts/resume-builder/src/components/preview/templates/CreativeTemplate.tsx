import { ResumeData } from '../../../types/resume';
import { Mail, Phone, Linkedin } from 'lucide-react';

export function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personal, education, experience, skills, projects, settings } = data;
  const primary = settings.primaryColor;
  const accent = settings.accentColor;

  return (
    <div className="p-8 w-full min-h-full bg-slate-50 text-slate-800 font-sans">
      <div className="bg-white rounded-3xl p-8 shadow-xl relative overflow-hidden h-full">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: primary }}></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/3 -translate-x-1/3" style={{ backgroundColor: accent }}></div>

        <div className="relative z-10">
          <header className="flex items-center gap-8 mb-12 border-b-2 border-slate-100 pb-8">
            {personal.photoUrl && (
              <img src={personal.photoUrl} alt={personal.name} className="w-32 h-32 rounded-2xl object-cover shadow-lg transform -rotate-3" />
            )}
            <div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-2">{personal.name || 'Your Name'}</h1>
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${primary}, ${accent})` }}>
                {personal.jobTitle || 'Job Title'}
              </p>
              <div className="flex flex-wrap gap-4 mt-4 text-sm font-medium text-slate-500">
                {personal.email && <span className="flex items-center gap-1"><Mail className="w-4 h-4"/> {personal.email}</span>}
                {personal.phone && <span className="flex items-center gap-1"><Phone className="w-4 h-4"/> {personal.phone}</span>}
                {personal.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-4 h-4"/> in/ {personal.linkedin.split('/').pop()}</span>}
              </div>
            </div>
          </header>

          <div className="grid grid-cols-3 gap-12">
            <div className="col-span-2 space-y-10">
              {personal.objective && (
                <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-1 rounded-full" style={{ backgroundColor: primary }}></span> About Me
                  </h2>
                  <p className="text-slate-600 leading-relaxed">{personal.objective}</p>
                </section>
              )}

              {experience.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-1 rounded-full" style={{ backgroundColor: primary }}></span> Experience
                  </h2>
                  <div className="space-y-8">
                    {experience.map(exp => (
                      <div key={exp.id} className="relative">
                        <div className="absolute left-[-24px] top-1.5 w-3 h-3 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: primary }}></div>
                        <div className="border-l-2 border-slate-200 pl-6 ml-[-18px] pb-2">
                          <h3 className="font-bold text-lg text-slate-800">{exp.role}</h3>
                          <div className="text-sm font-medium mb-3" style={{ color: accent }}>{exp.company} • {exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="col-span-1 space-y-10">
              {skills.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-1 rounded-full" style={{ backgroundColor: accent }}></span> Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <span key={skill.id} className="px-3 py-1.5 rounded-xl text-sm font-medium text-white shadow-sm" style={{ backgroundColor: primary }}>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {education.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-1 rounded-full" style={{ backgroundColor: accent }}></span> Education
                  </h2>
                  <div className="space-y-6">
                    {education.map(edu => (
                      <div key={edu.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <h3 className="font-bold text-slate-800">{edu.degree}</h3>
                        <div className="text-sm text-slate-600 mb-2">{edu.field}</div>
                        <div className="text-xs font-medium uppercase tracking-wider" style={{ color: primary }}>{edu.institution}</div>
                        <div className="text-xs text-slate-500 mt-1">{edu.startDate} – {edu.endDate}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
