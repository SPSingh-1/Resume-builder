import { ResumeData } from '../../../types/resume';

export function ModernTemplate({ data }: { data: ResumeData }) {
  const { personal, education, experience, skills, projects, certifications, languages, settings } = data;
  const primary = settings.primaryColor;
  const accent = settings.accentColor;

  return (
    <div className="flex w-full min-h-full" style={{ color: '#333' }}>
      {/* Left Sidebar */}
      <div className="w-1/3 p-8 text-white" style={{ backgroundColor: primary }}>
        {personal.photoUrl && (
          <div className="mb-8 flex justify-center">
            <img src={personal.photoUrl} alt={personal.name} className="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-lg" />
          </div>
        )}
        
        <div className="space-y-6">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-white/20 pb-1">Contact</h2>
            <div className="space-y-2 text-sm text-white/90">
              {personal.email && <div className="break-all">{personal.email}</div>}
              {personal.phone && <div>{personal.phone}</div>}
              {personal.address && <div>{personal.address}</div>}
              {personal.linkedin && <div className="break-all">{personal.linkedin}</div>}
              {personal.portfolio && <div className="break-all">{personal.portfolio}</div>}
            </div>
          </section>

          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-white/20 pb-1">Skills</h2>
              <div className="flex flex-col gap-2">
                {skills.map(s => (
                  <div key={s.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{s.name}</span>
                    </div>
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-white h-full" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-white/20 pb-1">Languages</h2>
              <div className="space-y-1 text-sm text-white/90">
                {languages.map(l => (
                  <div key={l.id} className="flex justify-between">
                    <span>{l.name}</span>
                    <span className="opacity-70">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8 bg-white">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 leading-tight">{personal.name || 'Your Name'}</h1>
          <p className="text-xl font-medium" style={{ color: primary }}>{personal.jobTitle || 'Job Title'}</p>
          {personal.objective && (
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">{personal.objective}</p>
          )}
        </header>

        <div className="space-y-8">
          {experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider mb-4 text-gray-900 border-b-2 pb-1" style={{ borderColor: accent }}>Experience</h2>
              <div className="space-y-5">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-800">{exp.role}</h3>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-sm font-medium mb-2" style={{ color: primary }}>{exp.company} {exp.location && `| ${exp.location}`}</div>
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider mb-4 text-gray-900 border-b-2 pb-1" style={{ borderColor: accent }}>Education</h2>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-800">{edu.degree} in {edu.field}</h3>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {edu.startDate} – {edu.endDate}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-1">{edu.institution} {edu.grade && `| ${edu.grade}`}</div>
                    {edu.description && <p className="text-sm text-gray-600 leading-relaxed">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider mb-4 text-gray-900 border-b-2 pb-1" style={{ borderColor: accent }}>Projects</h2>
              <div className="space-y-4">
                {projects.map(proj => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-800">{proj.title}</h3>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {proj.startDate} – {proj.endDate}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-1">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <p className="text-xs text-gray-500">Tech: {proj.technologies.join(', ')}</p>
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
