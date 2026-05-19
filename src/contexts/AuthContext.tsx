import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@/types';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserProfile } from '@/api/moodify';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, name?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Synchronize Auth Session with Firebase Authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // 1. Fetch fresh JWT ID Token
          const idToken = await firebaseUser.getIdToken(true);
          localStorage.setItem('moodify_auth_token', idToken);
          setToken(idToken);

          // 2. Fetch/Lazy-provision user profile with UUID mapping in the backend
          const profile = await getUserProfile('me');
          const loggedUser = { 
            id: profile.id, 
            email: firebaseUser.email || '' 
          };
          
          setUser(loggedUser);
          localStorage.setItem('moodify_user', JSON.stringify(loggedUser));
        } catch (err) {
          console.error('[Moodify Auth] Session restoration failed:', err);
          logout();
        }
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem('moodify_auth_token');
        localStorage.removeItem('moodify_user');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      // 1. Authenticate with Firebase Email/Password API
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const firebaseUser = userCredential.user;
      
      // 2. Retrieve ID token and save it to storage
      const idToken = await firebaseUser.getIdToken();
      localStorage.setItem('moodify_auth_token', idToken);
      setToken(idToken);
      
      // 3. Resolve the deterministic database UUID and profile from the backend
      const profile = await getUserProfile('me');
      const loggedUser = { 
        id: profile.id, 
        email: firebaseUser.email || email 
      };
      
      setUser(loggedUser);
      localStorage.setItem('moodify_user', JSON.stringify(loggedUser));
    } catch (err: any) {
      console.error('[Firebase Auth] Login failed:', err);
      // Map Firebase SDK error to match legacy backend error format expected by LoginModal
      let cleanMessage = err.message || 'Failed to login';
      if (err.code === 'auth/invalid-credential') {
        cleanMessage = 'Invalid email or password';
      } else if (err.code === 'auth/user-not-found') {
        cleanMessage = 'User account not found';
      } else if (err.code === 'auth/wrong-password') {
        cleanMessage = 'Incorrect password';
      } else if (err.code === 'auth/invalid-email') {
        cleanMessage = 'Invalid email address';
      }
      throw {
        response: {
          data: {
            detail: cleanMessage.replace('Firebase: ', '')
          }
        }
      };
    }
  };

  const register = async (email: string, pass: string, name?: string) => {
    try {
      // 1. Create a new user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const firebaseUser = userCredential.user;
      
      // 2. Set the display name in Firebase Auth profile if provided
      if (name) {
        await updateProfile(firebaseUser, { displayName: name });
      }
      
      // 3. Retrieve ID token and save it to storage
      const idToken = await firebaseUser.getIdToken();
      localStorage.setItem('moodify_auth_token', idToken);
      setToken(idToken);
      
      // 4. Lazy-provision backend profile in the DB and get user's UUID
      const profile = await getUserProfile('me');
      const loggedUser = { 
        id: profile.id, 
        email: firebaseUser.email || email 
      };
      
      setUser(loggedUser);
      localStorage.setItem('moodify_user', JSON.stringify(loggedUser));
    } catch (err: any) {
      console.error('[Firebase Auth] Registration failed:', err);
      // Map Firebase SDK error to match legacy backend error format expected by RegisterModal
      let cleanMessage = err.message || 'Failed to create account';
      if (err.code === 'auth/email-already-in-use') {
        cleanMessage = 'Email address is already registered';
      } else if (err.code === 'auth/weak-password') {
        cleanMessage = 'Password is too weak. Make it at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        cleanMessage = 'Invalid email address';
      }
      throw {
        response: {
          data: {
            detail: cleanMessage.replace('Firebase: ', '')
          }
        }
      };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('[Firebase Auth] Sign out failed:', err);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('moodify_auth_token');
      localStorage.removeItem('moodify_user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
