import { ResumeData } from '../../../types/resume';

export function ATSTemplate({ data }: { data: ResumeData }) {
  const { personal, education, experience, skills, projects, certifications } = data;

  return (
    <div className="p-12 w-full min-h-full bg-white text-black font-serif text-sm leading-relaxed">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold uppercase mb-1">{personal.name || 'Your Name'}</h1>
        <div className="text-sm">
          {personal.address && <span>{personal.address} | </span>}
          {personal.phone && <span>{personal.phone} | </span>}
          {personal.email && <span>{personal.email}</span>}
          {personal.linkedin && <span> | {personal.linkedin}</span>}
        </div>
      </header>

      {personal.objective && (
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase border-b border-black mb-2">Summary</h2>
          <p>{personal.objective}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase border-b border-black mb-2">Experience</h2>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold">
                  <span>{exp.role} - {exp.company}{exp.location && `, ${exp.location}`}</span>
                  <span>{exp.startDate} to {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="mt-1 whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase border-b border-black mb-2">Education</h2>
          <div className="space-y-3">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <span className="font-bold">{edu.degree} in {edu.field}</span>, {edu.institution} {edu.grade && `(GPA: ${edu.grade})`}
                </div>
                <span className="font-bold">{edu.startDate} to {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase border-b border-black mb-2">Projects</h2>
          <div className="space-y-3">
            {projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between font-bold">
                  <span>{proj.title}</span>
                  <span>{proj.startDate} to {proj.endDate}</span>
                </div>
                <p className="mt-1">{proj.description}</p>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className="italic mt-1">Technologies: {proj.technologies.join(', ')}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase border-b border-black mb-2">Skills</h2>
          <p>{skills.map(s => s.name).join(', ')}</p>
        </section>
      )}
    </div>
  );
}
