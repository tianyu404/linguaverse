import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import {
  BarChart3, TrendingUp, Flame, BookOpen, Calendar, Clock,
  Brain, Award, ChevronRight, Sparkles
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { LEARNING_HISTORY, ENGLISH_LEVELS, LANGUAGES } from '../data/mockData';
import {
  Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ComposedChart
} from 'recharts';

export default function Progress() {
  const user = useAuthStore(s => s.user);
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');

  const weekMin = LEARNING_HISTORY.reduce((s: number, d: any) => s + d.minutes, 0);
  const weekXp = LEARNING_HISTORY.reduce((s: number, d: any) => s + d.xpEarned, 0);
  const weekWords = LEARNING_HISTORY.reduce((s: number, d: any) => s + d.wordsLearned, 0);

  const targetLang = LANGUAGES.find((l: any) => l.code === user?.targetLanguage);
  const levelData = ENGLISH_LEVELS[0];
  const overallLessons = levelData.completedLessons;
  const totalLessons = ENGLISH_LEVELS.reduce((s: number, l: any) => s + l.totalLessons, 0);

  // Radar data
  const skillsData = [
    { skill: '词汇', value: 82, full: 100 },
    { skill: '语法', value: 76, full: 100 },
    { skill: '口语', value: 65, full: 100 },
    { skill: '听力', value: 71, full: 100 },
    { skill: '阅读', value: 88, full: 100 },
    { skill: '写作', value: 58, full: 100 },
  ];

  // Distribution
  const distribution = [
    { name: '词汇学习', value: 35, color: '#a855f7' },
    { name: '语法练习', value: 22, color: '#0c8be8' },
    { name: '口语训练', value: 18, color: '#f97316' },
    { name: '听力训练', value: 20, color: '#10b981' },
    { name: '阅读写作', value: 5, color: '#ec4899' },
  ];

  // Monthly data
  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'][i],
    minutes: 320 + Math.floor(Math.random() * 480),
    xp: 500 + Math.floor(Math.random() * 900),
  }));

  const viewData: any[] = period === 'week' ? LEARNING_HISTORY : monthlyData.slice(0, period === 'month' ? 8 : 12);

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <Navbar />

      {/* Header */}
      <section className="bg-ocean-gradient relative overflow-hidden">
        <div className="deco-circle" style={{ width: 500, height: 500, top: -150, right: -100, background: 'var(--sunset-400)', opacity: 0.2 }} />
        <div className="deco-circle" style={{ width: 400, height: 400, bottom: -100, left: -80, background: 'var(--lavender-400)', opacity: 0.22 }} />
        
        <div className="max-w-7xl mx-auto px-6 py-14 relative z-10 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
              <BarChart3 size={15} className="text-orange-300" />
              <span className="font-sans text-xs font-medium">学习进度报告</span>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  你的努力，<span className="bg-gradient-to-r from-orange-300 to-amber-200 bg-clip-text text-transparent">都有记录</span>
                </h1>
                <p className="text-white/75 font-sans text-lg max-w-2xl">
                  坚持学习 <b className="text-orange-300">{user?.streak} 天</b>，
                  累计获得 <b className="text-orange-300">{user?.xp?.toLocaleString()} XP</b>，
                  已超越 <b className="text-orange-300">78%</b> 的同学
                </p>
              </div>
              <Link to="/dashboard" className="btn-ghost">
                ← 返回学习中心
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="divider-wave absolute bottom-0 left-0 right-0" style={{ transform: 'scaleY(-1)' }} />
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        {/* ===== TOP STATS ===== */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { l: '累计学习时长', v: '96.5', u: '小时', d: '本周 +4h 12m', i: Clock, c: 'from-sky-500 to-blue-600' },
            { l: '累计获得 XP', v: (user?.xp ?? 0).toLocaleString(), u: '点', d: '距下一级还需 750 XP', i: Sparkles, c: 'from-violet-500 to-fuchsia-500' },
            { l: '掌握单词量', v: '1,247', u: '个', d: '较上月 + 238', i: BookOpen, c: 'from-emerald-500 to-teal-600' },
            { l: '连续学习天数', v: String(user?.streak), u: '天', d: '历史最长 58 天', i: Flame, c: 'from-orange-500 to-rose-500' },
          ].map((s, i) => {
            const Icon = s.i;
            return (
              <motion.div key={s.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-glass p-7 hover-lift relative overflow-hidden">
                <div className={`absolute w-24 h-24 rounded-full bg-gradient-to-br ${s.c} opacity-[0.08] -right-8 -top-8`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.c} flex items-center justify-center mb-5 shadow-md relative z-10`}>
                  <Icon size={21} className="text-white" />
                </div>
                <div className="font-sans text-sm text-slate-500 mb-1">{s.l}</div>
                <div className="flex items-baseline gap-1.5 mb-3">
                  <div className="num-display text-4xl text-slate-900">{s.v}</div>
                  <div className="font-sans text-sm text-slate-500">{s.u}</div>
                </div>
                <div className="flex items-center gap-1 text-xs font-sans text-emerald-600 font-semibold bg-emerald-50 inline-flex px-2.5 py-1 rounded-full">
                  <TrendingUp size={11} /> {s.d}
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* ===== TIME + XP CHARTS ===== */}
        <section className="grid lg:grid-cols-2 gap-6">
          <div className="card-glass p-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-1">学习时长趋势</h3>
                <p className="font-sans text-xs text-slate-500">一周累计 {weekMin} 分钟 · 日均 {Math.round(weekMin / 7)} 分钟</p>
              </div>
              <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl">
                {(['week', 'month', 'year'] as const).map(p => (
                  <button key={p} onClick={() => setPeriod(p)}
                    className={`px-3.5 py-1.5 rounded-lg font-sans text-xs font-bold transition
                      ${period === p ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                    {p === 'week' ? '本周' : p === 'month' ? '近月' : '全年'}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={viewData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="timeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0c8be8" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#0c8be8" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey={period === 'week' ? 'date' : 'month'} tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'Inter' }}
                    tickFormatter={d => period === 'week' ? d.slice(5) : d} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 14, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', fontFamily: 'Inter', fontSize: 12 }}
                    formatter={(v: any) => [`${v} 分钟`, '学习时长']}
                  />
                  <Area type="monotone" dataKey="minutes" stroke="#0c8be8" strokeWidth={3} fill="url(#timeGrad)" activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-glass p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-1">每日 XP 获得</h3>
                <p className="font-sans text-xs text-slate-500">本周累计 +{weekXp} XP</p>
              </div>
              <span className="tag tag-lavender">持续增长</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={LEARNING_HISTORY} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="xpBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'Inter' }}
                    tickFormatter={d => d.slice(5)} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 14, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', fontFamily: 'Inter', fontSize: 12 }}
                    formatter={(v: any) => [`+${v} XP`, '获得经验']}
                  />
                  <Bar dataKey="xpEarned" fill="url(#xpBar)" radius={[10, 10, 0, 0]} />
                  <Line type="monotone" dataKey="accuracy" stroke="#f97316" strokeWidth={2.5} dot={{ fill: '#f97316', r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-2 text-xs font-sans">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gradient-to-b from-violet-500 to-fuchsia-400" /> XP 获得</div>
              <div className="flex items-center gap-2"><span className="w-3 h-0.5 bg-orange-500" /> 正确率趋势</div>
            </div>
          </div>
        </section>

        {/* ===== SKILLS RADAR + DISTRIBUTION ===== */}
        <section className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 card-glass p-8">
            <div className="mb-6">
              <h3 className="font-display text-xl font-bold text-slate-900 mb-1">六维能力雷达图</h3>
              <p className="font-sans text-xs text-slate-500">综合评估你在六大语言能力上的表现</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillsData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 13, fill: '#475569', fontFamily: 'Inter', fontWeight: 600 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <Radar name="能力值" dataKey="value" stroke="#0c8be8" strokeWidth={3} fill="#0c8be8" fillOpacity={0.25} />
                  <Radar name="目标值" dataKey="full" stroke="#f97316" strokeWidth={1.5} fill="#f97316" fillOpacity={0.06} strokeDasharray="5 5" />
                  <Legend wrapperStyle={{ fontFamily: 'Inter', fontSize: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-4">
              {skillsData.map(s => (
                <div key={s.skill} className="text-center p-3 rounded-xl bg-slate-50">
                  <div className="num-display text-2xl mb-0.5 text-slate-900">{s.value}</div>
                  <div className="font-sans text-xs text-slate-500">{s.skill}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 card-glass p-8">
            <div className="mb-6">
              <h3 className="font-display text-xl font-bold text-slate-900 mb-1">学习时间分布</h3>
              <p className="font-sans text-xs text-slate-500">各项练习模块投入占比</p>
            </div>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={distribution} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={4}
                    dataKey="value" stroke="none">
                    {distribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: 14, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', fontFamily: 'Inter', fontSize: 12 }}
                    formatter={(v: any) => [`${v}%`, '时间占比']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5 mt-2">
              {distribution.map(d => (
                <div key={d.name} className="flex items-center justify-between text-sm font-sans">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-md" style={{ background: d.color }} />
                    <span className="text-slate-700 font-semibold">{d.name}</span>
                  </div>
                  <span className="text-slate-500 font-bold">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== COURSE PROGRESS + CALENDAR HEATMAP ===== */}
        <section className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card-glass p-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-1">分级课程完成进度</h3>
                <p className="font-sans text-xs text-slate-500">
                  {targetLang?.flag} {targetLang?.name} · {overallLessons}/{totalLessons} 总课时
                </p>
              </div>
              <Link to="/courses" className="font-sans text-xs font-bold text-[var(--ocean-600)] hover:underline flex items-center gap-1">
                查看课程 <ChevronRight size={12} />
              </Link>
            </div>

            <div className="space-y-5">
              {ENGLISH_LEVELS.map((lv: any, _i: number) => {
                const pct = lv.totalLessons ? Math.round(lv.completedLessons / lv.totalLessons * 100) : 0;
                return (
                  <div key={lv.id}>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm
                          ${lv.unlocked ? 'bg-gradient-to-br from-[var(--ocean-500)] to-[var(--ocean-700)] text-white' : 'bg-slate-100 text-slate-400'}`}>
                          {lv.name}
                        </div>
                        <div>
                          <div className="font-sans font-bold text-sm text-slate-800">{lv.title}</div>
                          <div className="font-sans text-xs text-slate-400">{lv.completedLessons}/{lv.totalLessons} 课时</div>
                        </div>
                      </div>
                      <span className="num-display text-lg text-slate-700">{pct}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${pct}%`, opacity: lv.unlocked ? 1 : 0.3 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-glass p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-1">本月学习日历</h3>
                <p className="font-sans text-xs text-slate-500"><Calendar size={11} className="inline mr-1" /> 8月 · 已打卡 {user?.streak} 天</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5 mb-4 text-center">
              {['一', '二', '三', '四', '五', '六', '日'].map(d => (
                <div key={d} className="font-sans text-[10px] font-bold text-slate-400 py-1">{d}</div>
              ))}
              {/* Empty slots */}
              {[...Array(5)].map((_, i) => <div key={`e${i}`} />)}
              {/* 31 days */}
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const intensity = day <= 17 ? [0.25, 0.5, 0.75, 1][Math.floor(Math.random() * 4)] : 0;
                const active = intensity > 0;
                return (
                  <div key={day} className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-sans font-bold transition
                    ${day === 17 ? 'bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/30' :
                      active ? `bg-gradient-to-br from-[var(--ocean-${Math.round(intensity * 4) + 2}00)] to-[var(--ocean-${Math.round(intensity * 4) + 3}00)] text-white` :
                      'bg-slate-50 text-slate-300'}`}>
                    {day}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[10px] font-sans text-slate-400 pt-4 border-t border-slate-100">
              <span>更少</span>
              <div className="flex gap-1">
                <div className="w-4 h-4 rounded bg-slate-50 border border-slate-100" />
                <div className="w-4 h-4 rounded bg-[var(--ocean-200)]" />
                <div className="w-4 h-4 rounded bg-[var(--ocean-400)]" />
                <div className="w-4 h-4 rounded bg-[var(--ocean-600)]" />
                <div className="w-4 h-4 rounded bg-[var(--ocean-800)]" />
              </div>
              <span>更多</span>
            </div>
          </div>
        </section>

        {/* ===== WORDS LEARNED + INSIGHTS ===== */}
        <section className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card-glass p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Brain size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-0.5">每日单词掌握趋势</h3>
                <p className="font-sans text-xs text-slate-500">本周共掌握 {weekWords} 个 · 平均每日 {Math.round(weekWords / 7)} 个</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={LEARNING_HISTORY} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'Inter' }}
                    tickFormatter={d => d.slice(5)} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 14, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', fontFamily: 'Inter', fontSize: 12 }}
                    formatter={(v: any) => [`${v} 个`, '新学单词']}
                  />
                  <Bar dataKey="wordsLearned" radius={[10, 10, 0, 0]}>
                    <defs>
                      <linearGradient id="wordGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#14b8a6" />
                      </linearGradient>
                    </defs>
                    <Bar dataKey="wordsLearned" fill="url(#wordGrad)" radius={[10, 10, 0, 0]} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-glass p-8 bg-gradient-to-br from-[var(--cream)] via-white to-[var(--ocean-50)] relative overflow-hidden">
            <div className="deco-circle" style={{ width: 260, height: 260, top: -80, right: -60, background: '#a855f7', opacity: 0.08 }} />
            
            <div className="flex items-center gap-3 mb-7 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center">
                <Award size={18} className="text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900">学习洞察</h3>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="p-4 rounded-2xl bg-white/80 backdrop-blur border border-orange-100">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🌅</span>
                  <div>
                    <div className="font-sans text-xs font-bold text-orange-700 mb-1">最佳学习时段</div>
                    <p className="font-sans text-sm text-slate-700 leading-relaxed">
                      你在 <b>早上 7-9 点</b> 的记忆效率最高，建议将<b>单词记忆</b>安排在此时段
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 backdrop-blur border border-sky-100">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🎯</span>
                  <div>
                    <div className="font-sans text-xs font-bold text-[var(--ocean-700)] mb-1">提升建议</div>
                    <p className="font-sans text-sm text-slate-700 leading-relaxed">
                      <b>口语</b>是当前相对薄弱项，建议每日增加 5 分钟 <Link to="/learn/speaking" className="text-[var(--ocean-600)] underline">跟读练习</Link>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 backdrop-blur border border-emerald-100">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🔥</span>
                  <div>
                    <div className="font-sans text-xs font-bold text-emerald-700 mb-1">坚持奖励</div>
                    <p className="font-sans text-sm text-slate-700 leading-relaxed">
                      再坚持 <b>15 天</b> 即可解锁「月度冠军」成就，获赠 <b>+500 XP</b>！
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
