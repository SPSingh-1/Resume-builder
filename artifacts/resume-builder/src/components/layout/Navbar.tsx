import { Link } from 'wouter';
import { Moon, Sun, FileText } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../ui/button';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
            <FileText className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">Lumina Resume</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/builder">
            <Button variant="ghost" className="hidden sm:inline-flex">Builder</Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link href="/builder">
            <Button>Create Resume</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
