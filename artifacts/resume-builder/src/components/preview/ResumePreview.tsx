import { ResumeData } from '../../../types/resume';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { CorporateTemplate } from './templates/CorporateTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { ATSTemplate } from './templates/ATSTemplate';
import { DarkTemplate } from './templates/DarkTemplate';

export function ResumePreview({ data, scale = 1 }: { data: ResumeData, scale?: number }) {
  const template = data.settings.template || 'modern';
  
  const fontStyles = {
    fontFamily: data.settings.fontFamily,
    fontSize: `${data.settings.fontSize}px`
  };

  const renderTemplate = () => {
    switch (template) {
      case 'minimal': return <MinimalTemplate data={data} />;
      case 'corporate': return <CorporateTemplate data={data} />;
      case 'creative': return <CreativeTemplate data={data} />;
      case 'ats': return <ATSTemplate data={data} />;
      case 'dark': return <DarkTemplate data={data} />;
      case 'modern':
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden text-left" style={{ ...fontStyles }}>
      {renderTemplate()}
    </div>
  );
}
