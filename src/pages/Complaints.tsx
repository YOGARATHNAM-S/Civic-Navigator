import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  Filter,
  Camera,
  X
} from 'lucide-react';
import { dbService } from '../services/dbService';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const categories = [
  { id: 'electricity', name: 'Electricity' },
  { id: 'water', name: 'Water' },
  { id: 'roads', name: 'Roads' },
  { id: 'garbage', name: 'Garbage' },
  { id: 'traffic', name: 'Traffic' },
  { id: 'property_tax', name: 'Property Tax' },
  { id: 'other', name: 'Other' },
];

export default function Complaints() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: ''
  });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const data = await dbService.getMyComplaints();
    setComplaints(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dbService.addComplaint(formData);
    setIsFormOpen(false);
    setFormData({ category: '', title: '', description: '', location: '' });
    fetchComplaints();
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending': return 'text-amber-600 bg-amber-500/10 border-amber-500/20';
      case 'in_progress': return 'text-indigo-600 bg-indigo-500/10 border-indigo-500/20';
      case 'resolved': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20';
      case 'rejected': return 'text-rose-600 bg-rose-500/10 border-rose-500/20';
      default: return 'text-slate-600 bg-white/20 border-white/20';
    }
  };

  return (
    <div className="space-y-8 min-h-0">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">Citizen Grievances</h1>
          <p className="text-slate-500 text-sm mt-1">Namma Bengaluru official report & tracking system.</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-3 bg-indigo-600 text-white px-6 py-3 rounded-[20px] font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95 group"
        >
          <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" />
          Report Issue
        </button>
      </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-24 space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-600"></div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Loading your history...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Summary Stats */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/60 backdrop-blur-xl p-8 rounded-[40px] border border-white shadow-xl shadow-indigo-900/5"
            >
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Tracking Summary</h2>
              <div className="space-y-4">
                {[
                  { label: 'Open Cases', count: complaints.filter(c => c.status !== 'resolved').length, icon: Clock, color: 'text-amber-500', bgColor: 'bg-amber-100/50' },
                  { label: 'Resolved', count: complaints.filter(c => c.status === 'resolved').length, icon: CheckCircle2, color: 'text-emerald-500', bgColor: 'bg-emerald-100/50' },
                ].map(stat => (
                  <div key={stat.label} className="flex items-center justify-between p-5 bg-white/40 rounded-[24px] border border-white/40 group hover:bg-white transition-all">
                    <div className="flex items-center gap-4">
                      <div className={cn("p-2.5 rounded-xl shadow-sm transition-transform group-hover:scale-110", stat.bgColor)}>
                        <stat.icon className={cn("h-5 w-5", stat.color)} />
                      </div>
                      <span className="text-sm font-bold text-slate-600">{stat.label}</span>
                    </div>
                    <span className="text-2xl font-black text-slate-900">{stat.count}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-indigo-950 p-10 rounded-[40px] shadow-2xl relative overflow-hidden group"
            >
              <div className="relative z-10 text-white">
                <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-black">Official Hotline</p>
                <h3 className="text-3xl font-black mt-3 flex items-center gap-3">
                   1533 <span className="text-sm opacity-30">/</span> 1912
                </h3>
                <p className="text-xs mt-6 text-indigo-100/60 leading-relaxed font-medium">
                  Direct official escalation for critical public infrastructure failure.
                </p>
                <button className="mt-8 w-full py-3 bg-indigo-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-500 transition-colors">
                  Call Emergency
                </button>
              </div>
              <AlertCircle className="absolute -bottom-6 -right-6 h-36 w-36 text-indigo-900/40" />
            </motion.div>
          </div>

          {/* Complaints List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2 px-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Application Records</h3>
              <button className="text-[10px] text-indigo-600 hover:text-indigo-800 flex items-center gap-2 font-black uppercase tracking-widest transition-all">
                <Filter className="h-3 w-3" /> Filter Results
              </button>
            </div>
            
            <div className="space-y-4">
              {complaints.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/40 backdrop-blur-md border border-white/60 rounded-[40px] p-20 text-center space-y-8"
                >
                  <div className="bg-white border border-white shadow-xl p-8 rounded-full w-fit mx-auto relative group">
                    <div className="absolute inset-0 bg-indigo-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                    <AlertCircle className="h-12 w-12 text-slate-200 group-hover:text-indigo-400 transition-colors relative z-10" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-black text-slate-800 italic">No reports found</p>
                    <p className="text-sm text-slate-400 max-w-xs mx-auto">Your civic contribution starts with a single report. Help us clean the city.</p>
                  </div>
                  <button 
                    onClick={() => setIsFormOpen(true)}
                    className="px-8 py-3 bg-white border border-white rounded-2xl text-[10px] font-bold uppercase tracking-widest text-indigo-600 hover:shadow-lg transition-all"
                  >
                    Create First Report
                  </button>
                </motion.div>
              ) : (
                complaints.map((c, i) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={c.id} 
                    className="bg-white/60 backdrop-blur-xl p-6 rounded-[32px] border border-white/60 shadow-md hover:shadow-xl hover:border-indigo-200 transition-all group flex items-start justify-between cursor-pointer"
                  >
                    <div className="flex gap-6">
                      <div className="w-16 h-16 rounded-[24px] bg-white border border-white shadow-sm flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-all duration-500 overflow-hidden relative">
                         <div className="absolute inset-0 bg-indigo-600 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-[24px]" />
                        <span className="text-2xl drop-shadow-sm group-hover:scale-110 transition-transform group-hover:invert relative z-10">
                          {c.category === 'electricity' ? '⚡' : c.category === 'water' ? '💧' : c.category === 'garbage' ? '♻️' : c.category === 'roads' ? '🛣️' : '📁'}
                        </span>
                      </div>
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "text-[9px] uppercase font-black px-2.5 py-1 rounded-full border tracking-[0.1em] backdrop-blur-md transition-colors",
                            getStatusStyle(c.status)
                          )}>
                            {c.status.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] text-slate-300 font-mono font-bold"># {c.id.slice(-6).toUpperCase()}</span>
                        </div>
                        <h4 className="font-black text-slate-800 text-lg leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{c.title}</h4>
                        <div className="flex items-center gap-5 pt-1">
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold bg-white/40 px-3 py-1 rounded-full border border-white/40">
                            <MapPin className="h-3 w-3 text-indigo-400" />
                            {c.location || 'BENGALURU'}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            <Clock className="h-3 w-3" />
                            {c.createdAt?.toDate?.()?.toLocaleDateString() || 'VALIDATING'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-white/80 rounded-2xl border border-white/60 group-hover:bg-indigo-600 group-hover:border-indigo-500 group-hover:text-white transition-all shadow-sm">
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Complaint Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-indigo-950/20 backdrop-blur-md"
              onClick={() => setIsFormOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white/90 backdrop-blur-2xl w-full max-w-xl rounded-[40px] shadow-2xl relative overflow-hidden border border-white/60 p-2"
            >
              <div className="bg-white/60 rounded-[36px] overflow-hidden">
                <div className="p-8 border-b border-white/20 flex items-center justify-between bg-white/20">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 italic">Report a Grievance</h3>
                    <p className="text-xs text-slate-500 font-medium">Connect with Namma Bengaluru officials.</p>
                  </div>
                  <button 
                    onClick={() => setIsFormOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Service Type</label>
                      <select 
                        required
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-white border border-white rounded-2xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm transition-all appearance-none"
                      >
                        <option value="">Select Service</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Incident Ward</label>
                      <input 
                        required
                        placeholder="Street, Ward No."
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                        className="w-full bg-white border border-white rounded-2xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Subject</label>
                    <input 
                      required
                      placeholder="Title of the issue"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-white border border-white rounded-2xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Brief Description</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Describe the issue, landmarks..."
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-white border border-white rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm transition-all resize-none"
                    />
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-white/50 border border-white rounded-2xl py-4 text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-white transition-all shadow-sm">
                      <Camera className="h-4 w-4" /> Evidence
                    </button>
                    <button type="submit" className="flex-1 bg-indigo-600 text-white rounded-2xl py-4 text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-95">
                      Submit Citizen Report
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
