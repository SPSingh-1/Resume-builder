import { useEffect, useState } from 'react';
import { useParams, Link } from 'wouter';
import { getSharedResume } from '../lib/sharing';
import { ResumeData } from '../types/resume';
import { ResumePreview } from '../components/preview/ResumePreview';
import { Navbar } from '../components/layout/Navbar';
import { Button } from '../components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';

export default function SharePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ResumeData | null>(null);
  const [error, setError] = useState<'expired' | 'not-found' | null>(null);

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      const res = await getSharedResume(id);
      if (res.expired) {
        setError('expired');
      } else if (res.notFound) {
        setError('not-found');
      } else if (res.data) {
        setData(res.data);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p>Loading resume...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="bg-card border rounded-xl p-8 max-w-md w-full text-center shadow-sm">
            <div className="mx-auto w-12 h-12 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {error === 'expired' ? 'Link Expired' : 'Resume Not Found'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {error === 'expired' 
                ? 'This shared resume link has expired. Links are only valid for 24 hours for privacy reasons.'
                : 'We could not find a resume at this link. It may have been deleted or never existed.'}
            </p>
            <Link href="/">
              <Button className="w-full">Create Your Own Resume</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />
      
      <main className="flex-1 container max-w-5xl mx-auto py-8 px-4 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card p-4 rounded-xl border shadow-sm">
          <div>
            <h1 className="font-semibold text-lg">{data?.personal.name}'s Resume</h1>
            <p className="text-sm text-muted-foreground">Shared via Lumina Resume</p>
          </div>
          <Link href="/">
            <Button>Create Your Own Resume</Button>
          </Link>
        </div>

        <div className="bg-card shadow-md rounded-xl overflow-hidden border flex justify-center p-4 sm:p-8">
          {data && (
            <div className="w-full max-w-[210mm] bg-white text-black shadow-lg">
              <ResumePreview data={data} scale={1} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
