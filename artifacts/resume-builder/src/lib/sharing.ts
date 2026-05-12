import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { getFirebaseDb } from './firebase';
import { ResumeData } from '../types/resume';

export async function saveSharedResume(resumeData: ResumeData): Promise<string | null> {
  const db = getFirebaseDb();
  if (!db) return null;

  const id = Math.random().toString(36).substring(2, 14);
  const now = Date.now();
  const expiresAt = now + 24 * 60 * 60 * 1000;

  try {
    await setDoc(doc(db, "shared_resumes", id), {
      id,
      data: resumeData,
      createdAt: now,
      expiresAt
    });

    const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
    return `${window.location.origin}${basePath}/share/${id}`;
  } catch (error) {
    console.error("Error saving shared resume:", error);
    return null;
  }
}

export async function getSharedResume(id: string): Promise<{ data?: ResumeData, expired?: boolean, notFound?: boolean }> {
  const db = getFirebaseDb();
  if (!db) return { notFound: true };

  try {
    const docRef = doc(db, "shared_resumes", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { notFound: true };
    }

    const docData = docSnap.data();
    if (Date.now() > docData.expiresAt) {
      return { expired: true };
    }

    return { data: docData.data as ResumeData };
  } catch (error) {
    console.error("Error getting shared resume:", error);
    return { notFound: true };
  }
}
