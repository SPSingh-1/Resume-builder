import { ResumeData } from '../../../types/resume';

export function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personal, education, experience, skills, projects, settings } = data;
  const accent = settings.accentColor;

  return (
    <div className="p-12 w-full min-h-full bg-white text-gray-800 font-sans" style={{ color: '#222' }}>
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-light tracking-tight mb-2 text-black">{personal.name || 'Your Name'}</h1>
        <p className="text-xl tracking-widest uppercase mb-4" style={{ color: accent }}>{personal.jobTitle || 'Job Title'}</p>
        
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.address && <span>{personal.address}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
        
        {personal.objective && (
          <p className="mt-6 text-sm leading-relaxed max-w-3xl mx-auto text-gray-600">{personal.objective}</p>
        )}
      </header>

      <div className="space-y-10">
        {experience.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 border-b pb-2">Experience</h2>
            <div className="space-y-8">
              {experience.map(exp => (
                <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: accent }}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-lg text-black">{exp.role}</h3>
                    <span className="text-sm text-gray-500">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-600 mb-3">{exp.company} {exp.location && `• ${exp.location}`}</div>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 border-b pb-2">Education</h2>
            <div className="space-y-6">
              {education.map(edu => (
                <div key={edu.id} className="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-black">{edu.degree} in {edu.field}</h3>
                    <div className="text-sm text-gray-600">{edu.institution} {edu.grade && `• ${edu.grade}`}</div>
                    {edu.description && <p className="text-sm mt-2 text-gray-600 max-w-xl">{edu.description}</p>}
                  </div>
                  <div className="text-sm text-gray-500 mt-1 sm:mt-0 whitespace-nowrap">
                    {edu.startDate} — {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 border-b pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill.id} className="px-3 py-1 bg-gray-50 border text-sm text-gray-700 rounded-md">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
