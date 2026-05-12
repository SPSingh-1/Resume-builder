import { ResumeData } from '../../../types/resume';

export function DarkTemplate({ data }: { data: ResumeData }) {
  const { personal, education, experience, skills, projects, settings } = data;
  const primary = settings.primaryColor;

  return (
    <div className="p-10 w-full min-h-full bg-zinc-950 text-zinc-300 font-sans">
      <header className="border-b border-zinc-800 pb-8 mb-8">
        <h1 className="text-5xl font-bold tracking-tight text-white mb-2">{personal.name || 'Your Name'}</h1>
        <p className="text-xl font-medium" style={{ color: primary }}>{personal.jobTitle || 'Job Title'}</p>
        
        <div className="flex flex-wrap gap-4 mt-6 text-sm text-zinc-400">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.address && <span>• {personal.address}</span>}
          {personal.linkedin && <span>• {personal.linkedin}</span>}
        </div>
      </header>

      {personal.objective && (
        <section className="mb-10">
          <p className="text-zinc-400 leading-relaxed text-lg max-w-4xl">{personal.objective}</p>
        </section>
      )}

      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-2 space-y-10">
          {experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">Experience</h2>
              <div className="space-y-8">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-lg text-zinc-100">{exp.role}</h3>
                      <span className="text-sm font-mono text-zinc-500">{exp.startDate} / {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <div className="text-sm font-medium mb-3" style={{ color: primary }}>{exp.company} {exp.location && `• ${exp.location}`}</div>
                    <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">Education</h2>
              <div className="space-y-6">
                {education.map(edu => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-zinc-100">{edu.degree}</h3>
                      <span className="text-sm font-mono text-zinc-500">{edu.startDate} / {edu.endDate}</span>
                    </div>
                    <div className="text-sm text-zinc-400 mb-1">{edu.field} • {edu.institution}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-1 space-y-10">
          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">Skills</h2>
              <div className="space-y-4">
                {skills.map(skill => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-sm mb-2 text-zinc-300">
                      <span>{skill.name}</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${skill.level}%`, backgroundColor: primary }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">Projects</h2>
              <div className="space-y-6">
                {projects.map(proj => (
                  <div key={proj.id}>
                    <h3 className="font-bold text-zinc-100 mb-1">{proj.title}</h3>
                    <p className="text-xs text-zinc-400 mb-2">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {proj.technologies.map((t, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-zinc-900 text-zinc-400 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
