import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { MapPin, ShieldCheck, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      // Enforce Google Login only as per Firebase Integration skill
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: 'citizen',
          createdAt: serverTimestamp(),
        });
      }
    } catch (err: any) {
      console.error("Auth Error:", err.code, err.message);
      
      if (err.code === 'auth/popup-blocked') {
        setError("The login popup was blocked by your browser. Please allow popups for this site or open in a new tab.");
      } else if (err.code === 'auth/cancelled-popup-request') {
        setError("Another login popup was already open. Please complete that one or refresh.");
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError("Sign-in window was closed. Please try again.");
      } else {
        setError("Failed to sign in. Please check your connection or try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[family-name:--background-image-glass-gradient] flex items-center justify-center p-6 sm:p-12 font-sans overflow-hidden">
      <div className="w-full max-w-5xl h-[600px] flex rounded-[40px] shadow-2xl overflow-hidden border border-white/40">
        
        {/* Left branding */}
        <div className="hidden lg:flex w-1/2 bg-indigo-950 p-12 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-xl shadow-indigo-500/30">
                <MapPin className="text-white h-7 w-7" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight italic">CivicNav <span className="text-indigo-500">BLR</span></span>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h1 className="text-5xl font-black text-white leading-tight">
                An intelligent <br/> voice for <span className="text-indigo-500">Bengaluru.</span>
              </h1>
              <p className="text-indigo-100/40 text-base max-w-sm leading-relaxed">
                Connect with government services through real-time AI assistance.
              </p>
            </motion.div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-8">
             {[
               { icon: ShieldCheck, title: 'Secure', desc: 'Firebase Authentication' },
               { icon: Sparkles, title: 'Intelligent', desc: 'Gemini 3.0 Powered' },
             ].map((feat, i) => (
               <div key={i} className="space-y-2">
                  <feat.icon className="h-5 w-5 text-indigo-500" />
                  <h4 className="text-white font-bold text-[10px] tracking-widest uppercase">{feat.title}</h4>
               </div>
             ))}
          </div>

          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Right login box */}
        <div className="flex-1 bg-white/40 backdrop-blur-3xl flex items-center justify-center p-12">
          <div className="w-full max-w-sm space-y-10">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">Citizen Portal</h2>
              <p className="text-slate-500 text-sm mt-1">Sign in to navigate civic services.</p>
            </div>

            <div className="space-y-6">
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl text-xs font-medium flex items-start gap-3"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-4 py-4 bg-white/80 border border-white rounded-[24px] font-bold text-slate-700 hover:bg-white transition-all shadow-xl shadow-indigo-900/5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
                ) : (
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5 group-hover:scale-110 transition-transform" />
                )}
                {isLoading ? 'Connecting...' : 'Sign in with Google'}
              </button>
              
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/20"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold"><span className="bg-transparent px-4 text-slate-400">Public Services</span></div>
              </div>

              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
                Official Access
              </button>
            </div>

            <p className="text-[10px] text-slate-400 text-center lg:text-left leading-relaxed">
              Securing our city together. By continuing, you agree to our terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
