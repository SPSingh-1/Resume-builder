import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { ResumeData, defaultResumeData } from '../types/resume';
import { sampleData } from '../lib/sampleData';

interface ResumeContextType {
  resume: ResumeData;
  updateResume: (data: ResumeData | ((prev: ResumeData) => ResumeData)) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  resetResume: () => void;
  loadSampleData: () => void;
}

export const ResumeContext = createContext<ResumeContextType | null>(null);

const STORAGE_KEY = 'resume-builder-data';
const MAX_HISTORY = 50;

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resume, setResume] = useState<ResumeData>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse stored resume data', e);
        }
      }
    }
    return defaultResumeData;
  });

  const [history, setHistory] = useState<ResumeData[]>([resume]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const skipHistoryRef = useRef(false);

  // Debounced storage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
    }, 500);
    return () => clearTimeout(timer);
  }, [resume]);

  const updateResume = useCallback((data: ResumeData | ((prev: ResumeData) => ResumeData)) => {
    setResume(prev => {
      const next = typeof data === 'function' ? data(prev) : data;
      
      if (!skipHistoryRef.current) {
        setHistory(prevHistory => {
          const newHistory = prevHistory.slice(0, currentIndex + 1);
          newHistory.push(next);
          if (newHistory.length > MAX_HISTORY) {
            newHistory.shift();
          }
          return newHistory;
        });
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, MAX_HISTORY - 1));
      }
      
      return next;
    });
  }, [currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      skipHistoryRef.current = true;
      setCurrentIndex(prev => prev - 1);
      setResume(history[currentIndex - 1]);
      setTimeout(() => { skipHistoryRef.current = false; }, 0);
    }
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      skipHistoryRef.current = true;
      setCurrentIndex(prev => prev + 1);
      setResume(history[currentIndex + 1]);
      setTimeout(() => { skipHistoryRef.current = false; }, 0);
    }
  }, [currentIndex, history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const resetResume = useCallback(() => {
    updateResume(defaultResumeData);
  }, [updateResume]);

  const loadSampleData = useCallback(() => {
    updateResume(sampleData);
  }, [updateResume]);

  return (
    <ResumeContext.Provider value={{
      resume,
      updateResume,
      undo,
      redo,
      canUndo: currentIndex > 0,
      canRedo: currentIndex < history.length - 1,
      resetResume,
      loadSampleData
    }}>
      {children}
    </ResumeContext.Provider>
  );
}
