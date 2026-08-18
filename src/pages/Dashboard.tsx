import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/layout/Navbar';
import {
  Flame, Trophy, Clock, Sparkles, Play, BookOpen, Mic, Headphones, Brain,
  ArrowRight, Star, TrendingUp, Calendar, Target, Zap, ChevronRight,
  MessageCircle, Heart, Share2, Rocket
} from 'lucide-react';
import {
  LANGUAGES, RECOMMENDATIONS, LEARNING_HISTORY, ENGLISH_LEVELS,
  COMMUNITY_POSTS
} from '../data/mockData';
import { XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from 'recharts';

export default function Dashboard() {
  const user = useAuthStore(s => s.user);
  const [activeTab, setActiveTab] = useState<'recommend' | 'today' | 'review'>('recommend');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const targetLang = LANGUAGES.find((l: any) => l.code === user?.targetLanguage);
  const currentLevel = ENGLISH_LEVELS[0];
  const weekTotal = LEARNING_HISTORY.reduce((s: number, d: any) => s + d.minutes, 0);
  const weekXp = LEARNING_HISTORY.reduce((s: number, d: any) => s + d.xpEarned, 0);
  const weekWords = LEARNING_HISTORY.reduce((s: number, d: any) => s + d.wordsLearned, 0);
  const xpToNext = (user?.level ?? 1) * 300 - (user?.xp ?? 0);
  const progressInLevel = Math.min(100, Math.round(((user?.xp ?? 0) % 300) / 300 * 100));

  const toggleLike = (id: string) => setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));

  const quickModules = [
    { title: '单词记忆', desc: '今日目标 20 个', icon: BookOpen, color: 'from-violet-500 to-fuchsia-500', to: '/learn/vocabulary' },
    { title: '语法练习', desc: '攻克 5 道难题', icon: Brain, color: 'from-sky-500 to-blue-600', to: '/learn/grammar' },
    { title: '口语跟读', desc: '每日 5 分钟', icon: Mic, color: 'from-orange-500 to-rose-500', to: '/learn/speaking' },
    { title: '听力训练', desc: '进阶模式', icon: Headphones, color: 'from-emerald-500 to-teal-600', to: '/learn/listening' },
  ];

  const colorMap: Record<string, string> = {
    ocean: 'from-sky-500 to-blue-600',
    sunset: 'from-orange-500 to-rose-500',
    jade: 'from-emerald-500 to-teal-600',
    lavender: 'from-violet-500 to-fuchsia-500',
  };

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* ===== HERO WELCOME ===== */}
        <section className="relative bg-ocean-gradient rounded-[28px] p-8 md:p-12 overflow-hidden grain-overlay">
          <div className="deco-circle" style={{ width: 500, height: 500, top: -180, right: -100, background: 'var(--sunset-500)', opacity: 0.22 }} />
          <div className="deco-circle" style={{ width: 400, height: 400, bottom: -120, left: -80, background: 'var(--lavender-400)', opacity: 0.25 }} />
          
          <div className="relative z-10 grid md:grid-cols-3 gap-10 items-center">
            <div className="md:col-span-2 text-white">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-5">
                <Sparkles size={14} className="text-orange-300" />
                <span className="font-sans text-xs font-medium">下午好，欢迎回来 ✨</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {user?.name}<br />
                <span className="bg-gradient-to-r from-orange-300 to-amber-200 bg-clip-text text-transparent">
                  今天也是成为 polyglot 的一天
                </span>
              </h1>
              
              <p className="text-white/75 font-sans mb-8 max-w-lg">
                学习 <b className="text-white">{targetLang?.name}</b> 已坚持 <b className="text-orange-300">{user?.streak} 天</b>，
                继续保持！距离下一级还需 <b className="text-orange-300">{Math.max(0, xpToNext)}</b> XP
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/courses" className="btn-primary shadow-xl shadow-orange-500/30">
                  <Play size={16} fill="currentColor" /> 继续学习 A1 课程
                </Link>
                <Link to="/learn/vocabulary" className="btn-ghost">
                  <Zap size={16} /> 每日挑战
                </Link>
              </div>
            </div>

            {/* Level card */}
            <div className="card-glass-dark p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-5">
                <span className="font-sans text-xs text-white/70">当前等级</span>
                <Trophy size={16} className="text-orange-300" />
              </div>
              <div className="flex items-end gap-3 mb-5">
                <div className="num-display text-6xl bg-gradient-to-br from-orange-300 to-amber-200 bg-clip-text text-transparent">
                  Lv.{user?.level}
                </div>
                <div className="pb-2">
                  <div className="font-sans text-xs text-white/60">Polyglot in progress</div>
                  <div className="font-sans text-sm font-bold text-white/90">{user?.xp?.toLocaleString()} XP</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between font-sans text-xs text-white/70">
                  <span>距离 Lv.{(user?.level ?? 55) + 1}</span>
                  <span>{progressInLevel}%</span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressInLevel}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200 rounded-full shimmer"
                  />
                </div>
                <div className="flex gap-4 pt-3">
                  <div className="flex items-center gap-1.5 text-white/80 font-sans text-xs">
                    <Flame size={13} className="text-orange-400" /> {user?.streak}天连续
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80 font-sans text-xs">
                    <Clock size={13} className="text-sky-300" /> 今日 32min
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== STATS ROW ===== */}
        <section className="grid md:grid-cols-4 gap-5">
          {[
            { l: '本周学习时长', v: `${weekTotal}`, u: '分钟', i: Clock, c: 'from-sky-500 to-blue-600', d: `+15% vs 上周` },
            { l: '本周获得 XP', v: `${weekXp}`, u: '点', i: Sparkles, c: 'from-violet-500 to-fuchsia-500', d: '超越 78% 用户' },
            { l: '新学单词', v: `${weekWords}`, u: '个', i: BookOpen, c: 'from-emerald-500 to-teal-600', d: '掌握度 92%' },
            { l: '平均正确率', v: '89', u: '%', i: Target, c: 'from-orange-500 to-rose-500', d: '稳中有升 ↑' },
          ].map((s, i) => {
            const Icon = s.i;
            return (
              <motion.div key={s.l}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-glass p-6 hover-lift">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.c} flex items-center justify-center mb-5 shadow-md`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className="font-sans text-sm text-slate-500 mb-1">{s.l}</div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <div className="num-display text-4xl text-slate-900">{s.v}</div>
                  <div className="font-sans text-sm text-slate-500">{s.u}</div>
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-sans text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
                  <TrendingUp size={11} /> {s.d}
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* ===== MAIN 2-COL LAYOUT ===== */}
        <section className="grid lg:grid-cols-3 gap-8">
          {/* LEFT - Recommendations & Quick Modules */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Modules */}
            <div>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-900 mb-1">互动学习模块</h2>
                  <p className="font-sans text-sm text-slate-500">每天 15 分钟，四大能力全面提升</p>
                </div>
                <Link to="/courses" className="font-sans text-sm font-bold text-[var(--ocean-600)] hover:underline flex items-center gap-1">
                  全部课程 <ChevronRight size={15} />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                {quickModules.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <motion.div key={m.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="card-glass p-6 hover-lift cursor-pointer group">
                      <Link to={m.to} className="block">
                        <div className="flex items-start justify-between mb-5">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center shadow-lg`}>
                            <Icon size={26} className="text-white" />
                          </div>
                          <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-slate-900 mb-1">{m.title}</h3>
                        <p className="font-sans text-sm text-slate-500">{m.desc}</p>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Personalized Recommendations */}
            <div className="card-glass p-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                    <Rocket size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-slate-900">为你推荐</h2>
                    <p className="font-sans text-xs text-slate-500">基于学习数据智能生成的个性化路径</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 pt-6 mb-6 border-b border-slate-100">
                {([
                  ['recommend', '智能推荐'],
                  ['today', '今日计划'],
                  ['review', '到期复习'],
                ] as const).map(([k, v]) => (
                  <button key={k} onClick={() => setActiveTab(k)}
                    className={`pb-4 font-sans text-sm font-bold transition relative
                      ${activeTab === k ? 'tab-active text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
                    {v}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {RECOMMENDATIONS.map((r: any, i: number) => {
                    const IconMap: Record<string, any> = { lesson: BookOpen, review: Sparkles, speaking: Mic, challenge: Zap };
                    const I = IconMap[r.type] || Star;
                    return (
                      <motion.div
                        key={r.id + activeTab}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 15 }}
                        transition={{ duration: 0.35, delay: i * 0.08 }}
                        className="flex items-center gap-5 p-5 rounded-2xl border border-slate-100 hover:bg-slate-50/60 hover:border-[var(--ocean-100)] cursor-pointer transition group">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorMap[r.color]} flex items-center justify-center flex-shrink-0 shadow-md`}>
                          <span className="text-2xl">{r.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`tag tag-${r.color}`} style={{ fontSize: 10 }}>
                              <I size={10} /> {r.type === 'lesson' ? '课程' : r.type === 'review' ? '复习' : r.type === 'speaking' ? '口语' : '挑战'}
                            </span>
                            <h4 className="font-sans font-bold text-slate-900 truncate">{r.title}</h4>
                          </div>
                          <p className="font-sans text-sm text-slate-500 mb-1.5 truncate">{r.description}</p>
                          <p className="font-sans text-xs text-[var(--ocean-600)] flex items-center gap-1">
                            <Sparkles size={11} /> {r.reason}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0 hidden sm:block">
                          <div className="flex items-center gap-3 mb-2 font-sans text-xs text-slate-500 justify-end">
                            <span className="flex items-center gap-1"><Clock size={11} /> {r.duration}分钟</span>
                            <span className="flex items-center gap-1"><Star size={11} className="text-orange-500" fill="currentColor" /> +{r.xp}XP</span>
                          </div>
                          <button className="btn-ocean !py-2 !px-4 text-xs">
                            开始 <ArrowRight size={13} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Course Progress (分级课程体系) */}
            <div className="card-glass p-8">
              <div className="flex items-center justify-between mb-7">
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-900 mb-1">分级课程进度</h2>
                  <p className="font-sans text-sm text-slate-500">{currentLevel?.name} · {currentLevel?.title} · {currentLevel?.units.length} 单元</p>
                </div>
                <Link to="/courses" className="btn-outline !py-2.5 !px-5 text-sm">
                  课程详情 <ChevronRight size={15} />
                </Link>
              </div>

              <div className="space-y-6">
                {currentLevel?.units.slice(0, 3).map((unit: any, ui: number) => (
                  <div key={unit.id}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--ocean-50)] to-white border border-[var(--ocean-100)] flex items-center justify-center text-2xl shadow-sm">
                          {unit.icon}
                        </div>
                        <div>
                          <h4 className="font-sans font-bold text-slate-900">Unit {ui + 1} · {unit.title}</h4>
                          <div className="font-sans text-xs text-slate-500">{unit.completed} / {unit.total} 课时完成</div>
                        </div>
                      </div>
                      <span className="num-display text-xl text-slate-800">{Math.round(unit.completed / unit.total * 100)}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${unit.completed / unit.total * 100}%` }} />
                    </div>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {unit.lessons.map((l: any, li: number) => (
                        <div key={l.id} className={`w-10 h-10 rounded-lg flex items-center justify-center font-sans text-xs font-bold transition
                          ${l.completed ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md shadow-emerald-200' :
                            l.locked ? 'bg-slate-100 text-slate-300' :
                            'bg-white border-2 border-[var(--sunset-300)] text-[var(--sunset-600)]'}
                          ${!l.completed && !l.locked && li === unit.completed ? 'animate-pulse-ring' : ''}`}
                          title={l.title}>
                          {l.completed ? '✓' : li + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - Activity, Leaderboard, Community */}
          <div className="space-y-8">
            {/* Weekly Chart */}
            <div className="card-glass p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-sans font-bold text-slate-900 flex items-center gap-2">
                  <Calendar size={17} className="text-[var(--ocean-600)]" /> 本周学习时长
                </h3>
                <span className="tag tag-ocean text-xs">{weekTotal} 分钟</span>
              </div>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={LEARNING_HISTORY} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradTime" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f97316" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#f97316" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'Inter' }} tickFormatter={d => d.slice(8)} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: 14, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', fontFamily: 'Inter', fontSize: 12 }}
                      formatter={(v: any) => [`${v} 分钟`, '学习时长']}
                      labelFormatter={d => `日期 ${d}`}
                    />
                    <Area type="monotone" dataKey="minutes" stroke="#f97316" strokeWidth={3} fill="url(#gradTime)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* XP Chart */}
            <div className="card-glass p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-sans font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles size={17} className="text-violet-600" /> 每日 XP 获得
                </h3>
                <span className="tag tag-lavender text-xs">周 +{weekXp}</span>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={LEARNING_HISTORY} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'Inter' }} tickFormatter={d => d.slice(8)} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: 14, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', fontFamily: 'Inter', fontSize: 12 }}
                      formatter={(v: any) => [`+${v} XP`, '获得经验']}
                    />
                    <Bar dataKey="xpEarned" radius={[8, 8, 0, 0]}>
                      <defs>
                        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#36a9f7" />
                        </linearGradient>
                      </defs>
                      <Bar dataKey="xpEarned" fill="url(#barGrad)" radius={[8, 8, 0, 0]} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Daily Streak */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-rose-600 rounded-[24px] p-7 text-white overflow-hidden shadow-xl shadow-orange-500/30">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="font-sans text-xs text-white/75 mb-1">连续学习</div>
                    <div className="num-display text-6xl">{user?.streak}<span className="text-2xl ml-1">天</span></div>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center animate-float">
                    <Flame size={32} />
                  </div>
                </div>
                <p className="font-sans text-sm text-white/85 mb-5">
                  坚持就是胜利！再坚持 <b>15</b> 天即可解锁「三月学者」徽章 🎖️
                </p>
                <div className="flex gap-1.5">
                  {['一', '二', '三', '四', '五', '六', '日'].map((d, i) => (
                    <div key={d} className="flex-1 text-center">
                      <div className="text-[10px] font-sans text-white/60 mb-1.5">{d}</div>
                      <div className={`w-full h-10 rounded-lg flex items-center justify-center text-sm font-bold
                        ${i < 5 ? 'bg-white/30 backdrop-blur' : i === 5 ? 'bg-white text-orange-600 shadow-lg animate-pulse-ring' : 'bg-white/10 border border-white/15'}`}>
                        {i < 5 ? '✓' : i === 5 ? '🔥' : '○'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Community Feed */}
            <div className="card-glass p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-sans font-bold text-slate-900 flex items-center gap-2">
                  <MessageCircle size={17} className="text-[var(--ocean-600)]" /> 社区动态
                </h3>
                <Link to="/community" className="text-xs font-sans font-bold text-[var(--ocean-600)] hover:underline">查看全部 →</Link>
              </div>
              <div className="space-y-5">
                {COMMUNITY_POSTS.slice(0, 2).map((p: any) => (
                  <div key={p.id} className="pb-5 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-100 to-white border border-slate-200 flex items-center justify-center text-lg">
                        {p.author.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-sans font-bold text-sm text-slate-800">{p.author.name}</span>
                          <span className="tag tag-ocean" style={{ fontSize: 10, padding: '2px 8px' }}>Lv.{p.author.level}</span>
                        </div>
                        <div className="text-[11px] font-sans text-slate-400">{p.createdAt}</div>
                      </div>
                    </div>
                    <p className="font-sans text-sm text-slate-700 leading-relaxed mb-3 line-clamp-3">{p.content}</p>
                    <div className="flex items-center gap-4 text-xs font-sans text-slate-500">
                      <button onClick={() => toggleLike(p.id)} className="flex items-center gap-1.5 hover:text-rose-500 transition">
                        <Heart size={13} fill={(likedPosts[p.id] || p.liked) ? '#f43f5e' : 'none'} className={(likedPosts[p.id] || p.liked) ? 'text-rose-500' : ''} />
                        {p.likes + ((likedPosts[p.id] ? 1 : 0))}
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-[var(--ocean-600)] transition">
                        <MessageCircle size={13} /> {p.comments}
                      </button>
                      <button className="ml-auto flex items-center gap-1.5 hover:text-slate-700">
                        <Share2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
