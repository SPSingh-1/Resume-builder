import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Loader2, Copy, Check } from 'lucide-react';
import QRCode from 'react-qr-code';
import { saveSharedResume } from '../../lib/sharing';
import { useResume } from '../../hooks/useResume';

export function ShareDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const { resume } = useResume();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Auto-generate on open
  const handleOpen = async (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (isOpen && !url) {
      setLoading(true);
      setError(null);
      const shareUrl = await saveSharedResume(resume);
      if (shareUrl) {
        setUrl(shareUrl);
      } else {
        setError('Configure Firebase to enable sharing. See the settings for how to set up your VITE_FIREBASE_* environment variables.');
      }
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (url) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Resume</DialogTitle>
          <DialogDescription>
            Anyone with this link can view your resume.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-4 gap-6">
          {loading && (
            <div className="flex flex-col items-center text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin mb-2" />
              Generating secure link...
            </div>
          )}

          {error && (
            <div className="text-center text-sm text-destructive bg-destructive/10 p-4 rounded-md">
              {error}
            </div>
          )}

          {url && !loading && (
            <>
              <div className="bg-white p-4 rounded-xl shadow-sm border">
                <QRCode value={url} size={150} />
              </div>

              <div className="w-full flex space-x-2">
                <Input value={url} readOnly className="flex-1 bg-muted/50" />
                <Button variant="secondary" onClick={copyToClipboard} className="w-24">
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                For your privacy, this link automatically expires in 24 hours.
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
