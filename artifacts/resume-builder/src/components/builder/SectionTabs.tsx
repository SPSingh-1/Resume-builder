import { ScrollArea } from '../ui/scroll-area';
import { 
  User, GraduationCap, Briefcase, Code, FolderGit2, 
  Award, Trophy, Globe2, Heart, Users, Settings2 
} from 'lucide-react';
import { cn } from '../../lib/utils';

const TABS = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'languages', label: 'Languages', icon: Globe2 },
  { id: 'interests', label: 'Interests', icon: Heart },
  { id: 'references', label: 'References', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings2 },
];

interface SectionTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function SectionTabs({ activeTab, onTabChange }: SectionTabsProps) {
  return (
    <div className="w-16 sm:w-48 md:w-56 flex-shrink-0 border-r bg-muted/10 h-full flex flex-col">
      <ScrollArea className="flex-1">
        <div className="p-2 flex flex-col gap-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors w-full text-left",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
                title={tab.label}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="hidden sm:block text-sm font-medium truncate">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
