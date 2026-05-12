import { ResumeData } from '../../../types/resume';

export function CorporateTemplate({ data }: { data: ResumeData }) {
  const { personal, education, experience, skills, projects, settings } = data;
  const primary = settings.primaryColor;

  return (
    <div className="w-full min-h-full bg-white text-gray-800 flex flex-col">
      <header className="p-8 text-center text-white" style={{ backgroundColor: primary }}>
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{personal.name || 'Your Name'}</h1>
        <p className="text-lg font-medium opacity-90 mb-4">{personal.jobTitle || 'Job Title'}</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm opacity-80">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.address && <span>• {personal.address}</span>}
          {personal.linkedin && <span>• {personal.linkedin}</span>}
        </div>
      </header>

      <div className="p-8 space-y-6 flex-1">
        {personal.objective && (
          <section className="mb-6">
            <p className="text-sm text-gray-700 leading-relaxed text-justify">{personal.objective}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-300 pb-1 mb-4 flex items-center gap-2">
              <span className="w-4 h-4 bg-gray-900 block" style={{ backgroundColor: primary }}></span>
              Professional Experience
            </h2>
            <div className="space-y-5">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-800 text-base">{exp.role}</h3>
                    <span className="text-sm font-semibold text-gray-600">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-600 mb-2 italic">{exp.company} {exp.location && `— ${exp.location}`}</div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-300 pb-1 mb-4 flex items-center gap-2">
              <span className="w-4 h-4 bg-gray-900 block" style={{ backgroundColor: primary }}></span>
              Education
            </h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800 text-base">{edu.degree} in {edu.field}</h3>
                    <div className="text-sm text-gray-600">{edu.institution} {edu.grade && `— ${edu.grade}`}</div>
                  </div>
                  <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-300 pb-1 mb-4 flex items-center gap-2">
              <span className="w-4 h-4 bg-gray-900 block" style={{ backgroundColor: primary }}></span>
              Core Competencies
            </h2>
            <div className="text-sm text-gray-700 leading-relaxed">
              {skills.map(s => s.name).join(' • ')}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
