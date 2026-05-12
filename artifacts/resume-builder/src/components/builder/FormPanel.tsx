import { useState } from 'react';
import { useResume } from '../../hooks/useResume';
import { SectionTabs } from './SectionTabs';
import { PersonalForm } from './form/PersonalForm';
import { EducationForm } from './form/EducationForm';
import { ExperienceForm } from './form/ExperienceForm';
import { SkillsForm } from './form/SkillsForm';
import { ProjectsForm } from './form/ProjectsForm';
import { CertificationsForm } from './form/CertificationsForm';
import { AchievementsForm } from './form/AchievementsForm';
import { LanguagesForm } from './form/LanguagesForm';
import { InterestsForm } from './form/InterestsForm';
import { ReferencesForm } from './form/ReferencesForm';
import { SettingsForm } from './form/SettingsForm';
import { Button } from '../ui/button';
import { Undo, Redo, FileDown, Share, RefreshCw, Wand2 } from 'lucide-react';
import { downloadPDF } from '../../lib/pdf';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

interface FormPanelProps {
  onShare: () => void;
}

export function FormPanel({ onShare }: FormPanelProps) {
  const [activeTab, setActiveTab] = useState('personal');
  const { resume, undo, redo, canUndo, canRedo, resetResume, loadSampleData } = useResume();

  const handleDownload = () => {
    const filename = `Resume_${resume.personal.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    downloadPDF('resume-preview-content', filename);
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'personal': return <PersonalForm />;
      case 'education': return <EducationForm />;
      case 'experience': return <ExperienceForm />;
      case 'skills': return <SkillsForm />;
      case 'projects': return <ProjectsForm />;
      case 'certifications': return <CertificationsForm />;
      case 'achievements': return <AchievementsForm />;
      case 'languages': return <LanguagesForm />;
      case 'interests': return <InterestsForm />;
      case 'references': return <ReferencesForm />;
      case 'settings': return <SettingsForm />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full border-r bg-card/50">
      <div className="p-4 border-b flex flex-wrap gap-2 items-center justify-between bg-card">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadSampleData} className="gap-2">
            <Wand2 className="w-4 h-4" />
            <span className="hidden sm:inline">Sample Data</span>
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your current resume data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetResume} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Yes, reset resume
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="flex gap-1 sm:gap-2">
          <div className="flex items-center mr-2 border rounded-md">
            <Button variant="ghost" size="icon" onClick={undo} disabled={!canUndo} className="h-8 w-8 rounded-none rounded-l-md border-r">
              <Undo className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={redo} disabled={!canRedo} className="h-8 w-8 rounded-none rounded-r-md">
              <Redo className="w-4 h-4" />
            </Button>
          </div>
          
          <Button variant="secondary" size="sm" onClick={onShare} className="gap-2">
            <Share className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button size="sm" onClick={handleDownload} className="gap-2">
            <FileDown className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <SectionTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20">
          <div className="max-w-2xl mx-auto">
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
}
