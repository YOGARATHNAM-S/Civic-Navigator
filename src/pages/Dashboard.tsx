import { 
  Users, 
  FileCheck, 
  Activity, 
  MapPin, 
  TrendingUp, 
  ArrowUpRight 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from 'recharts';
import { motion } from 'motion/react';
import { auth } from '../lib/firebase';
import { cn } from '../lib/utils';

const data = [
  { name: 'Mon', solved: 45, reported: 60 },
  { name: 'Tue', solved: 52, reported: 70 },
  { name: 'Wed', solved: 48, reported: 65 },
  { name: 'Thu', solved: 61, reported: 75 },
  { name: 'Fri', solved: 55, reported: 80 },
  { name: 'Sat', solved: 67, reported: 85 },
  { name: 'Sun', solved: 70, reported: 90 },
];

export default function Dashboard() {
  const user = auth.currentUser;

  return (
    <div className="space-y-8 min-h-0">
      {/* Quick Insights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Property Tax (24-25)', value: '₹0.00', sub: 'Paid', icon: Users, color: 'text-indigo-600', bgColor: 'bg-indigo-100', status: 'PAID', statusColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
          { label: 'BESCOM Status', value: 'Healthy', sub: 'No Outages', icon: Activity, color: 'text-emerald-600', bgColor: 'bg-emerald-100', status: 'ACTIVE', statusColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
          { label: 'Civic Grievances', value: 'Track', sub: 'Recent', icon: FileCheck, color: 'text-rose-600', bgColor: 'bg-rose-100', status: 'OPEN', statusColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-white/60 backdrop-blur-xl p-8 rounded-[40px] border border-white/60 shadow-xl shadow-indigo-900/5 transition-all hover:translate-y-[-4px] hover:shadow-2xl hover:bg-white group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={cn("p-3 rounded-2xl transition-transform group-hover:scale-110 shadow-sm", stat.bgColor, stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className={cn("text-[10px] font-black px-3 py-1 rounded-full border uppercase tracking-wider backdrop-blur-md", stat.statusColor)}>
                {stat.status}
              </span>
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-2 tracking-tight italic">
              {stat.value} <span className="text-sm font-medium text-slate-400 ml-1 not-italic">{stat.sub}</span>
            </h3>
          </motion.div>
        ))}
      </section>

      {/* Main Area */}
      <div className="flex flex-col lg:flex-row gap-8 min-h-0">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 bg-white/40 backdrop-blur-2xl rounded-[48px] border border-white/60 shadow-2xl p-10 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -mr-20 -mt-20"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 relative z-10">
             <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight italic">Resolution Analytics</h3>
                <p className="text-sm text-slate-500 font-medium">Real-time civic impact monitoring</p>
             </div>
             <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] bg-white/40 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/40 shadow-sm">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-lg shadow-indigo-200"></div> Resolved</div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div> Reported</div>
             </div>
          </div>
          
          <div className="h-72 mt-4 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" strokeOpacity={0.4} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 800, letterSpacing: '0.1em'}} 
                  dy={15}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(255,255,255,0.85)', 
                    backdropFilter: 'blur(16px)', 
                    border: '1px solid rgba(255,255,255,0.6)', 
                    borderRadius: '24px', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '12px 16px'
                  }}
                  itemStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="solved" 
                  stroke="#4f46e5" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorSolved)" 
                  animationDuration={2000}
                />
                <Area 
                  type="monotone" 
                  dataKey="reported" 
                  stroke="#cbd5e1" 
                  strokeWidth={2}
                  strokeDasharray="6 6"
                  fill="transparent" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Announcements/Feed */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full lg:w-96 flex flex-col gap-6"
        >
           <div className="bg-indigo-950 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden flex-1 group border border-white/10">
             <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-500/20 blur-[80px] group-hover:scale-125 transition-transform duration-700"></div>
             <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-purple-500/10 blur-[80px] group-hover:scale-125 transition-transform duration-700"></div>
             
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-8 relative z-10">Civic Bulletins</h3>
             
             <div className="space-y-8 relative z-10">
               {[
                 { tag: 'METRO UPDATE', tagColor: 'text-indigo-400', title: 'Pink Line testing starts next week at MG Road.' },
                 { tag: 'WATER ADVISORY', tagColor: 'text-amber-400', title: 'Pressure reduction in East Zone on Wednesday.' },
                 { tag: 'LOK ADALAT', tagColor: 'text-emerald-400', title: 'Task clearance camp this Saturday at BBMP.' },
               ].map((item, i) => (
                 <motion.div 
                   whileHover={{ x: 6 }}
                   key={i} 
                   className="cursor-pointer group/item"
                 >
                   <div className="flex items-center gap-2 mb-2">
                      <div className={cn("w-1.5 h-1.5 rounded-full bg-current", item.tagColor)}></div>
                      <p className={cn("text-[9px] font-black tracking-widest uppercase", item.tagColor)}>{item.tag}</p>
                   </div>
                   <p className="text-base font-bold leading-snug text-indigo-50 group-hover/item:text-white transition-colors">{item.title}</p>
                 </motion.div>
               ))}
             </div>
             
             <button className="w-full mt-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/20 transition-all active:scale-95">
               View Live Updates
             </button>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
