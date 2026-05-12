import { useState } from 'react';
import { useResume } from '../hooks/useResume';
import { Navbar } from '../components/layout/Navbar';
import { FormPanel } from '../components/builder/FormPanel';
import { PreviewPanel } from '../components/builder/PreviewPanel';
import { ShareDialog } from '../components/share/ShareDialog';

export default function BuilderPage() {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      
      {/* Tools / Action Bar is inside FormPanel/PreviewPanel now, but we can do a secondary top bar if needed. We'll handle actions within panels for better layout. */}
      
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[45%_55%] overflow-hidden h-[calc(100vh-64px)]">
        <FormPanel onShare={() => setIsShareOpen(true)} />
        <PreviewPanel />
      </main>

      <ShareDialog open={isShareOpen} onOpenChange={setIsShareOpen} />
    </div>
  );
}
