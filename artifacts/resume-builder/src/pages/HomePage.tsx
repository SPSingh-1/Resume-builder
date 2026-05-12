import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Navbar } from '../components/layout/Navbar';
import { Button } from '../components/ui/button';
import { FileText, Layout, Share2, Sparkles, Download, Palette } from 'lucide-react';

export default function HomePage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 md:py-32 flex flex-col items-center justify-center text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-6">
              <Sparkles className="w-3 h-3 mr-1" />
              Build a professional resume in minutes
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Your next career move starts here.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Create, edit, and share beautiful, professional resumes. Live preview, multiple templates, and absolute control over your design.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/builder">
                <Button size="lg" className="h-12 px-8 text-base">
                  Create Resume
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/50 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Everything you need</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Powerful tools designed to help you stand out from the crowd.
              </p>
            </div>

            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                { icon: Layout, title: "Beautiful Templates", desc: "Choose from 6 professionally designed templates tailored for different industries." },
                { icon: Sparkles, title: "Live Preview", desc: "See your changes instantly as you type. What you see is exactly what you get." },
                { icon: Share2, title: "Easy Sharing", desc: "Generate a secure, temporary link to share your resume with recruiters instantly." },
                { icon: Download, title: "PDF Export", desc: "Download high-quality, ATS-friendly PDF versions of your resume." },
                { icon: Palette, title: "Customizable", desc: "Tweak colors, fonts, and layouts to match your personal brand perfectly." },
                { icon: FileText, title: "Data Privacy", desc: "Your data stays in your browser. No accounts required, no tracking." }
              ].map((feature, i) => (
                <motion.div key={i} variants={item} className="bg-card p-6 rounded-xl border shadow-sm">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-8 text-center text-muted-foreground">
        <p>© {new Date().getFullYear()} Lumina Resume. Built with care.</p>
      </footer>
    </div>
  );
}
