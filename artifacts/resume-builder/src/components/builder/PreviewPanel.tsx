import { useState, useRef, useEffect } from 'react';
import { useResume } from '../../hooks/useResume';
import { ResumePreview } from '../preview/ResumePreview';
import { Button } from '../ui/button';
import { ZoomIn, ZoomOut, Maximize, Printer } from 'lucide-react';

export function PreviewPanel() {
  const { resume } = useResume();
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const fitToScreen = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 64; // padding
      const containerHeight = containerRef.current.clientHeight - 64;
      const A4_WIDTH = 794; // 210mm in pixels at ~96dpi
      const A4_HEIGHT = 1123; // 297mm

      const scaleWidth = containerWidth / A4_WIDTH;
      const scaleHeight = containerHeight / A4_HEIGHT;
      
      // Use the smaller scale to fit entirely, max 1.5
      setScale(Math.min(scaleWidth, scaleHeight, 1.5));
    }
  };

  // Initial fit
  useEffect(() => {
    fitToScreen();
    window.addEventListener('resize', fitToScreen);
    return () => window.removeEventListener('resize', fitToScreen);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full bg-muted/30 relative">
      {/* Top Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-background/80 backdrop-blur-md border shadow-sm rounded-full p-1">
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full" onClick={() => setScale(s => Math.max(0.2, s - 0.1))}>
          <ZoomOut className="w-4 h-4" />
        </Button>
        <span className="text-xs font-medium w-12 text-center">{Math.round(scale * 100)}%</span>
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full" onClick={() => setScale(s => Math.min(2, s + 0.1))}>
          <ZoomIn className="w-4 h-4" />
        </Button>
        <div className="w-[1px] h-4 bg-border mx-1" />
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full" onClick={fitToScreen}>
          <Maximize className="w-4 h-4" />
        </Button>
        <div className="w-[1px] h-4 bg-border mx-1" />
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full" onClick={handlePrint} title="Print">
          <Printer className="w-4 h-4" />
        </Button>
      </div>

      {/* Preview Container */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto flex items-start justify-center p-8 pt-20 custom-scrollbar"
      >
        {/* We wrap the resume in a scaled container */}
        <div 
          className="transition-transform duration-200 ease-out origin-top flex justify-center"
          style={{ transform: `scale(${scale})` }}
        >
          <div 
            id="resume-preview-content"
            className="bg-white text-black shadow-2xl print:shadow-none"
            style={{ 
              width: '210mm', 
              minHeight: '297mm', // A4 aspect
            }}
          >
            <ResumePreview data={resume} />
          </div>
        </div>
      </div>
    </div>
  );
}
