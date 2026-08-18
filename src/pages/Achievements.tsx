import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import {
  Trophy, Crown, Medal, Award, Lock, Star, Sparkles, Flame, ChevronRight,
  Gift, Rocket, Zap, Target, BookOpen, Mic, TrendingUp, Crown as CrownIcon, Calendar
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { ACHIEVEMENTS, LEADERBOARD } from '../data/mockData';
import type { Achievement } from '../types';

export default function Achievements() {
  const user = useAuthStore(s => s.user);
  const [tab, setTab] = useState<'badges' | 'leaderboard' | 'rewards'>('badges');
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [leaderPeriod, setLeaderPeriod] = useState<'week' | 'month' | 'all'>('week');

  const unlocked = ACHIEVEMENTS.filter((a: any) => a.unlocked).length;
  const totalXP = ACHIEVEMENTS.filter((a: any) => a.unlocked).reduce((s: number, a: any) => s + a.xpReward, 0);
  const tierColors: Record<Achievement['tier'], { bg: string; text: string; border: string; label: string }> = {
    bronze: { bg: 'from-amber-700 via-orange-800 to-amber-900', text: 'text-amber-900', border: 'border-amber-300', label: '青铜' },
    silver: { bg: 'from-slate-300 via-slate-400 to-slate-500', text: 'text-slate-600', border: 'border-slate-300', label: '白银' },
    gold: { bg: 'from-amber-300 via-amber-400 to-yellow-500', text: 'text-amber-700', border: 'border-amber-300', label: '黄金' },
    platinum: { bg: 'from-sky-300 via-cyan-400 to-blue-500', text: 'text-sky-700', border: 'border-sky-300', label: '铂金' },
  };

  const filtered = ACHIEVEMENTS.filter((a: any) => filter === 'all' ? true : filter === 'unlocked' ? a.unlocked : !a.unlocked);

  const ranked = LEADERBOARD.slice().sort((a: any, b: any) => b.xp - a.xp).map((e: any, i: number) => ({ ...e, rank: i + 1 }));
  const userRank = ranked.find((e: any) => e.isUser);

  const rewardPacks = [
    { t: '连续7天', d: '坚持每日学习7天即可领取', r: '100 XP + 🌱 初心者徽章', icon: Flame, c: 'from-emerald-500 to-teal-600', progress: 100, claimed: true },
    { t: '百词成就', d: '累计掌握100个新单词', r: '200 XP + 专属头像框', icon: BookOpen, c: 'from-violet-500 to-fuchsia-500', progress: 100, claimed: true },
    { t: '月度冠军', d: '月累计学习时长超2000分钟', r: '1000 XP + 💎 铂金限定徽章', icon: Trophy, c: 'from-orange-500 to-amber-500', progress: 72, claimed: false },
    { t: '口语达人', d: '累计完成50次口语训练', r: '500 XP + 证书 + ⭐ 论坛高亮', icon: Mic, c: 'from-rose-500 to-pink-500', progress: 45, claimed: false },
    { t: 'Polyglot', d: '解锁3种及以上语言课程', r: '1000 XP + 🏆 多语言者称号', icon: Zap, c: 'from-indigo-500 to-blue-600', progress: 33, claimed: false },
    { t: '年度学者', d: '年度累计学习365天', r: '5000 XP + 实物周边 + 奖学金', icon: Crown, c: 'from-amber-400 to-amber-600', progress: 18, claimed: false },
  ];

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <Navbar />

      {/* Header */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #78350f 0%, #b45309 25%, #d97706 55%, #f59e0b 100%)' }}>
        <div className="deco-circle" style={{ width: 500, height: 500, top: -150, right: -100, background: '#fff7ed', opacity: 0.12 }} />
        <div className="deco-circle" style={{ width: 400, height: 400, bottom: -100, left: -80, background: '#fbbf24', opacity: 0.15 }} />

        <div className="max-w-7xl mx-auto px-6 py-14 relative z-10 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
              <Trophy size={15} className="text-amber-200" />
              <span className="font-sans text-xs font-medium">成就中心 · 激励每一份努力</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
              每一份坚持，<span className="bg-gradient-to-r from-amber-100 via-yellow-200 to-orange-200 bg-clip-text text-transparent">都值得被嘉奖</span>
            </h1>
            <p className="text-white/80 font-sans text-lg max-w-2xl mb-10">
              8 大成就等级 · 56 枚专属徽章 · 排行榜实时对战
              · 你的每一次进步都会被看见、被奖励
            </p>

            <div className="grid sm:grid-cols-4 gap-4 max-w-4xl">
              <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Award size={16} className="text-amber-200" />
                  <span className="font-sans text-xs text-white/70">已解锁徽章</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <div className="num-display text-4xl">{unlocked}</div>
                  <span className="font-sans text-sm text-white/60">/ {ACHIEVEMENTS.length}</span>
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-yellow-200" />
                  <span className="font-sans text-xs text-white/70">成就奖励 XP</span>
                </div>
                <div className="num-display text-4xl">+{totalXP.toLocaleString()}</div>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={16} className="text-orange-200" />
                  <span className="font-sans text-xs text-white/70">全服排名</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <div className="num-display text-4xl">#{userRank?.rank ?? '---'}</div>
                  <span className="font-sans text-sm text-white/60">/ 52万</span>
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Flame size={16} className="text-orange-200" />
                  <span className="font-sans text-xs text-white/70">当前连续</span>
                </div>
                <div className="num-display text-4xl">{user?.streak}<span className="text-xl ml-0.5">天</span></div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="divider-wave absolute bottom-0 left-0 right-0" style={{ transform: 'scaleY(-1)' }} />
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* TABS */}
        <div className="card-glass p-2 inline-flex gap-1.5 flex-wrap">
          {([
            ['badges', '成就墙', Medal],
            ['leaderboard', '排行榜', CrownIcon],
            ['rewards', '奖励中心', Gift],
          ] as const).map(([k, v, Icon]) => (
            <button key={k} onClick={() => setTab(k)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-sans font-bold text-sm transition
                ${tab === k ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-orange-500/25' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Icon size={17} /> {v}
            </button>
          ))}
        </div>

        {tab === 'badges' && (
          <>
            {/* Tier legend + Filter */}
            <div className="flex flex-wrap items-center justify-between gap-4 card-glass p-5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-sans text-xs font-bold text-slate-500 mr-2">成就等级:</span>
                {(['bronze', 'silver', 'gold', 'platinum'] as const).map(t => (
                  <div key={t} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${tierColors[t].border} bg-white`}>
                    <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${tierColors[t].bg} shadow-sm`} />
                    <span className={`font-sans text-[11px] font-bold ${tierColors[t].text}`}>{tierColors[t].label}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl">
                {([
                  ['all', '全部'],
                  ['unlocked', '已获得'],
                  ['locked', '待解锁'],
                ] as const).map(([k, v]) => (
                  <button key={k} onClick={() => setFilter(k)}
                    className={`px-4 py-1.5 rounded-lg font-sans text-xs font-bold transition
                      ${filter === k ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Badges grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filtered.map((a: any, i: number) => {
                const tc = tierColors[a.tier as Achievement['tier']];
                return (
                  <motion.div key={a.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className={`card-glass p-6 text-center relative overflow-hidden group hover-lift
                      ${!a.unlocked ? 'opacity-70' : ''}`}>
                    {/* Tier ribbon */}
                    <div className={`absolute top-4 right-4 font-sans text-[10px] font-bold px-2.5 py-1 rounded-full bg-gradient-to-br ${tc.bg} text-white shadow-md`}>
                      {tc.label}
                    </div>

                    <div className={`relative w-28 h-28 mx-auto mb-6`}>
                      {a.unlocked && (
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${tc.bg} blur-xl opacity-40 animate-float-slow`} />
                      )}
                      <div className={`relative w-28 h-28 rounded-full flex items-center justify-center text-5xl shadow-inner
                        ${a.unlocked
                          ? `bg-gradient-to-br ${tc.bg} shadow-xl ring-4 ring-white`
                          : 'bg-gradient-to-br from-slate-100 to-slate-200 grayscale'}`}>
                        {a.unlocked ? (
                          <span className="drop-shadow-lg" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}>{a.icon}</span>
                        ) : (
                          <Lock size={28} className="text-slate-400" />
                        )}
                      </div>
                      {a.unlocked && (
                        <div className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center">
                          <Star size={16} fill="#f59e0b" color="#f59e0b" />
                        </div>
                      )}
                    </div>

                    <h3 className="font-display text-xl font-bold text-slate-900 mb-2">{a.title}</h3>
                    <p className="font-sans text-xs text-slate-500 mb-5 leading-relaxed px-2">{a.description}</p>

                    {/* Progress bar */}
                    {!a.unlocked && (
                      <div className="mb-4">
                        <div className="flex justify-between font-sans text-[10px] font-bold text-slate-500 mb-1.5">
                          <span>完成进度</span><span>{a.progress}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shimmer"
                            style={{ width: `${a.progress}%` }} />
                        </div>
                      </div>
                    )}

                    <div className={`flex items-center justify-center gap-1.5 font-sans text-xs font-bold py-2 rounded-xl
                      ${a.unlocked ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-orange-700 border border-orange-100' : 'bg-slate-50 text-slate-400'}`}>
                      {a.unlocked ? (<><Star size={12} fill="currentColor" /> 已获得 +{a.xpReward} XP</>) : (<>解锁奖励 +{a.xpReward} XP</>)}
                    </div>

                    {a.unlocked && a.unlockedAt && (
                      <div className="mt-3 font-sans text-[10px] text-slate-400 flex items-center justify-center gap-1">
                        <Calendar size={10} /> {a.unlockedAt} 解锁
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </>
        )}

        {tab === 'leaderboard' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Podium */}
            <div className="lg:col-span-2 space-y-6">
              {/* Top 3 podium */}
              <div className="card-glass p-8 relative overflow-hidden">
                <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
                  <h3 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                    <Trophy size={24} className="text-amber-500" /> 排行榜 TOP 100
                  </h3>
                  <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl">
                    {([
                      ['week', '本周榜'],
                      ['month', '本月榜'],
                      ['all', '总榜'],
                    ] as const).map(([k, v]) => (
                      <button key={k} onClick={() => setLeaderPeriod(k)}
                        className={`px-4 py-1.5 rounded-lg font-sans text-xs font-bold transition
                          ${leaderPeriod === k ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Podium */}
                <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12 items-end">
                  {/* 2nd */}
                  <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 flex items-center justify-center text-4xl md:text-5xl mb-3 shadow-xl ring-4 ring-white relative">
                      {ranked[1]?.avatar}
                      <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 text-white flex items-center justify-center shadow-md">
                        <Medal size={15} />
                      </div>
                    </div>
                    <div className="font-sans font-bold text-slate-800 mb-1 truncate">{ranked[1]?.name}</div>
                    <div className="font-sans text-xs text-slate-500 mb-2">Lv.{ranked[1]?.level}</div>
                    <div className="num-display text-2xl text-slate-700 mb-3">{ranked[1]?.xp.toLocaleString()} XP</div>
                    <div className="h-24 md:h-32 rounded-t-2xl bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 text-white flex items-start justify-center pt-4 shadow-lg">
                      <div className="num-display text-4xl md:text-5xl opacity-90">2</div>
                    </div>
                  </motion.div>

                  {/* 1st */}
                  <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center">
                    <div className="text-4xl mb-2 animate-float-slow">👑</div>
                    <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 flex items-center justify-center text-5xl md:text-6xl mb-3 shadow-2xl ring-4 ring-white relative">
                      {ranked[0]?.avatar}
                      <div className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-white flex items-center justify-center shadow-md">
                        <Crown size={17} />
                      </div>
                    </div>
                    <div className="font-sans font-bold text-lg text-slate-900 mb-1">{ranked[0]?.name}</div>
                    <div className="font-sans text-xs text-slate-500 mb-2">🔥 {ranked[0]?.streak} 天连续 · Lv.{ranked[0]?.level}</div>
                    <div className="num-display text-3xl text-amber-700 mb-3">{ranked[0]?.xp.toLocaleString()} XP</div>
                    <div className="h-32 md:h-44 rounded-t-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 text-white flex items-start justify-center pt-4 shadow-xl">
                      <div className="num-display text-5xl md:text-6xl opacity-95">1</div>
                    </div>
                  </motion.div>

                  {/* 3rd */}
                  <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-br from-orange-300 via-orange-400 to-amber-700 flex items-center justify-center text-4xl md:text-5xl mb-3 shadow-xl ring-4 ring-white relative">
                      {ranked[2]?.avatar}
                      <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-700 text-white flex items-center justify-center shadow-md">
                        <Award size={15} />
                      </div>
                    </div>
                    <div className="font-sans font-bold text-slate-800 mb-1 truncate">{ranked[2]?.name}</div>
                    <div className="font-sans text-xs text-slate-500 mb-2">Lv.{ranked[2]?.level}</div>
                    <div className="num-display text-2xl text-amber-800 mb-3">{ranked[2]?.xp.toLocaleString()} XP</div>
                    <div className="h-20 md:h-28 rounded-t-2xl bg-gradient-to-br from-orange-400 via-amber-600 to-amber-800 text-white flex items-start justify-center pt-4 shadow-lg">
                      <div className="num-display text-4xl md:text-5xl opacity-90">3</div>
                    </div>
                  </motion.div>
                </div>

                {/* List */}
                <div className="space-y-2.5">
                  {ranked.slice(3).map((e: any, i: number) => (
                    <motion.div key={e.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.04 }}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition
                        ${e.isUser
                          ? 'bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-2 border-orange-300 shadow-md shadow-orange-200/50'
                          : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-lg flex-shrink-0
                        ${e.rank <= 10 ? 'bg-gradient-to-br from-[var(--ocean-50)] to-white text-[var(--ocean-700)]' : 'bg-slate-50 text-slate-500'}
                        ${e.isUser ? 'ring-2 ring-orange-300' : ''}`}>
                        {e.rank}
                      </div>
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-slate-100 to-white border border-slate-200 flex items-center justify-center text-2xl flex-shrink-0">
                        {e.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-sans font-bold text-slate-900 truncate">{e.name}</span>
                          {e.isUser && <span className="tag tag-sunset" style={{ fontSize: 10 }}>我</span>}
                        </div>
                        <div className="flex items-center gap-3 text-xs font-sans text-slate-500">
                          <span className="flex items-center gap-1"><Flame size={11} className="text-orange-500" /> 连续 {e.streak} 天</span>
                          <span>Lv.{e.level}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="num-display text-xl text-slate-900">{e.xp.toLocaleString()}</div>
                        <div className="font-sans text-[10px] text-slate-400">XP</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* User rank card */}
              <div className="space-y-6">
                <div className="card-glass p-7 bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden">
                  <div className="deco-circle" style={{ width: 200, height: 200, top: -50, right: -50, background: '#f59e0b', opacity: 0.12 }} />
                  <div className="flex items-center gap-2 mb-5 relative z-10">
                    <Rocket size={18} className="text-orange-500" />
                    <h4 className="font-display text-lg font-bold text-slate-900">我的排名</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div className="p-4 rounded-2xl bg-white/80 border border-orange-100 text-center">
                      <div className="font-sans text-xs text-slate-500 mb-1">当前排名</div>
                      <div className="num-display text-4xl text-orange-600">#{userRank?.rank}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/80 border border-emerald-100 text-center">
                      <div className="font-sans text-xs text-slate-500 mb-1">超越用户</div>
                      <div className="num-display text-4xl text-emerald-600">89%</div>
                    </div>
                  </div>
                  <div className="mt-5 p-4 rounded-2xl bg-white/80 border border-slate-100 relative z-10">
                    <div className="flex items-center justify-between font-sans text-xs font-bold text-slate-500 mb-2">
                      <span>距离 TOP 100 还需</span>
                      <span className="text-orange-600">+2,250 XP</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-[62%] bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 shimmer rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="card-glass p-7">
                  <div className="flex items-center gap-2 mb-5">
                    <Target size={18} className="text-violet-500" />
                    <h4 className="font-display text-lg font-bold text-slate-900">本周榜单奖励</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      { r: '🥇 第1名', rew: '10,000 XP + 「年度之星」限定徽章 + 实物奖励' },
                      { r: '🥈 第2名', rew: '5,000 XP + 黄金会员月卡' },
                      { r: '🥉 第3名', rew: '2,500 XP + 专属头像框 90 天' },
                      { r: 'Top 10', rew: '1,000 XP + 社区称号 30 天' },
                      { r: 'Top 100', rew: '500 XP + 10 种子弹笔记' },
                    ].map(p => (
                      <div key={p.r} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition">
                        <span className="font-sans text-sm font-bold text-slate-800 whitespace-nowrap">{p.r}</span>
                        <span className="font-sans text-xs text-slate-500 leading-relaxed">{p.rew}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'rewards' && (
          <div className="space-y-8">
            {/* Reward packs */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewardPacks.map((r, i) => {
                const Icon = r.icon;
                return (
                  <motion.div key={r.t}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.07 }}
                    className="card-glass p-7 relative overflow-hidden group hover-lift">
                    <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${r.c}`} />

                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${r.c} flex items-center justify-center mb-6 shadow-lg relative z-10 group-hover:scale-110 transition-transform`}>
                      <Icon size={28} className="text-white" />
                      {r.claimed && (
                        <div className="absolute -right-1 -top-1 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center">
                          <Star size={14} fill="#10b981" color="#10b981" />
                        </div>
                      )}
                    </div>

                    <div className={`font-sans text-xs font-bold mb-2 ${r.claimed ? 'text-emerald-600' : 'text-slate-500'}`}>
                      {r.claimed ? '✓ 已达成并领取' : '进行中...'}
                    </div>
                    <h3 className="font-display text-xl font-bold text-slate-900 mb-2">{r.t}</h3>
                    <p className="font-sans text-sm text-slate-500 mb-4 leading-relaxed">{r.d}</p>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border border-orange-100 mb-5">
                      <div className="font-sans text-[10px] font-bold text-orange-600 mb-1 flex items-center gap-1"><Gift size={11} /> 达成奖励</div>
                      <div className="font-sans text-sm font-bold text-slate-800">{r.r}</div>
                    </div>

                    <div className="mb-5">
                      <div className="flex justify-between font-sans text-xs font-bold text-slate-500 mb-2">
                        <span>当前进度</span>
                        <span className={r.progress === 100 ? 'text-emerald-600' : 'text-slate-700'}>{r.progress}%</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full bg-gradient-to-r ${r.c} shimmer transition-all`} style={{ width: `${r.progress}%` }} />
                      </div>
                    </div>

                    <button disabled={r.claimed || r.progress < 100}
                      className={`w-full py-3.5 rounded-xl font-sans text-sm font-bold transition-all flex items-center justify-center gap-2
                        ${r.claimed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default' :
                          r.progress === 100 ? 'bg-gradient-to-r ' + r.c + ' text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5' :
                          'bg-slate-50 text-slate-400 border border-slate-100 cursor-not-allowed'}`}>
                      {r.claimed && <><Star size={15} fill="currentColor" /> 已领取</>}
                      {!r.claimed && r.progress === 100 && <>立即领取 <ChevronRight size={15} /></>}
                      {!r.claimed && r.progress < 100 && <><Lock size={15} /> 尚未达成</>}
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* VIP / Premium section */}
            <div className="card-glass p-10 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
              <div className="deco-circle" style={{ width: 500, height: 500, top: -180, right: -100, background: '#f59e0b', opacity: 0.18 }} />
              <div className="deco-circle" style={{ width: 400, height: 400, bottom: -150, left: -100, background: '#a855f7', opacity: 0.18 }} />

              <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 font-sans text-xs font-bold mb-6 shadow-md">
                    <Crown size={14} /> LinguaVerse Premium
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold mb-5 leading-tight">
                    解锁专属奖励，<br />
                    <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-300 bg-clip-text text-transparent">
                      加速学习进程
                    </span>
                  </h2>
                  <p className="text-white/70 font-sans text-lg mb-8 leading-relaxed">
                    2倍 XP 加成 · 无限 AI 口语评分 · 精编考试题库 ·
                    1 对 1 外教批改 · 专属学习顾问
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <button className="px-8 py-4 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500 text-slate-900 font-sans font-bold shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:-translate-y-0.5 transition-all">
                      ¥39/月 升级会员
                    </button>
                    <span className="font-sans text-sm text-white/60">年付 ¥299 省 ¥169</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ['✨', '2倍 XP', '学习更快升级'],
                    ['🎤', '无限口语评分', 'AI 逐音节纠正'],
                    ['📚', '全部考试题库', 'JLPT / IELTS / DELE'],
                    ['🎯', '专属学习计划', '老师 1v1 定制'],
                  ].map(b => (
                    <div key={b[1]} className="p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/10">
                      <div className="text-3xl mb-3">{b[0]}</div>
                      <div className="font-display font-bold text-lg mb-1">{b[1]}</div>
                      <div className="font-sans text-xs text-white/60">{b[2]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pb-12" />
      </div>
    </div>
  );
}
