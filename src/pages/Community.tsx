import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import {
  Users, Heart, MessageCircle, Share2, Bookmark, Send, Search,
  Filter, Sparkles, Trophy, ChevronRight, Globe2, Star,
  Flame, Award, Plus, Image, Smile, Hash, MoreHorizontal
} from 'lucide-react';
import { COMMUNITY_POSTS, LANGUAGES } from '../data/mockData';
import { useAuthStore } from '../store/authStore';

export default function Community() {
  const user = useAuthStore(s => s.user);
  const [tab, setTab] = useState<'feed' | 'hot' | 'following'>('feed');
  const [filterLang, setFilterLang] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState(COMMUNITY_POSTS);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const toggleLike = (id: string) => setPosts((ps: any[]) => ps.map((p: any) => {
    if (p.id !== id) return p;
    const liked = !p.liked;
    return { ...p, liked, likes: p.likes + (liked ? 1 : -1) };
  }));

  const trendingTags = ['#学习方法', '#考试心得', '#日语', '#英语', '#韩语', '#口语经验', '#背单词', '#每日打卡', '#求助', '#文化分享'];

  const hotUsers = [
    { n: '小美', a: '🌸', l: 28, posts: 156, fans: '2.4万' },
    { n: 'Alex', a: '🧑‍💼', l: 45, posts: 289, fans: '5.1万' },
    { n: '语者', a: '📖', l: 62, posts: 421, fans: '12.8万' },
    { n: 'Pierre', a: '🥐', l: 33, posts: 189, fans: '1.9万' },
    { n: 'Hinata', a: '🌸', l: 51, posts: 267, fans: '3.7万' },
  ];

  const filtered = posts.filter((p: any) => {
    if (filterLang !== 'all' && p.language !== filterLang) return false;
    if (search && !p.content.includes(search) && !p.tags.some((t: any) => t.includes(search))) return false;
    return true;
  }).sort((a: any, b: any) => tab === 'hot' ? b.likes - a.likes : 0);

  const submit = () => {
    if (!newContent.trim()) return;
    const np = {
      id: 'u' + Date.now(),
      author: { name: user?.name ?? '我', avatar: user?.avatar ?? '😊', level: user?.level ?? 1 },
      content: newContent,
      language: user?.targetLanguage ?? 'en',
      tags: selectedTag ? [selectedTag.replace('#', '')] : ['日常分享'],
      likes: 0, comments: 0,
      createdAt: '刚刚',
      liked: false,
    };
    setPosts([np, ...posts]);
    setNewContent(''); setSelectedTag(''); setShowNewPost(false);
  };

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-violet-600 via-indigo-700 to-[var(--ocean-800)] relative overflow-hidden">
        <div className="deco-circle" style={{ width: 500, height: 500, top: -150, right: -100, background: '#f97316', opacity: 0.18 }} />
        <div className="deco-circle" style={{ width: 400, height: 400, bottom: -100, left: -80, background: '#ec4899', opacity: 0.18 }} />

        <div className="max-w-7xl mx-auto px-6 py-14 relative z-10 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
              <Users size={15} className="text-orange-300" />
              <span className="font-sans text-xs font-medium">学习社区 · 52万+ 学习者</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
              与同路人一起，<span className="bg-gradient-to-r from-orange-300 via-pink-200 to-violet-200 bg-clip-text text-transparent">走得更远</span>
            </h1>
            <p className="text-white/75 font-sans text-lg max-w-2xl mb-8">
              分享学习心得、提问解答、组队打卡，在真实的交流中让语言能力自然生长
            </p>

            {/* Search */}
            <div className="flex flex-wrap gap-4 max-w-2xl items-stretch">
              <div className="flex-1 relative min-w-[260px]">
                <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full !pl-12 !py-3.5 rounded-2xl bg-white/95 backdrop-blur border-0 input-field placeholder:text-slate-400"
                  placeholder="搜索话题、内容或标签..." />
              </div>
              <button onClick={() => setShowNewPost(true)} className="btn-primary !py-3.5 !px-6 shadow-xl shadow-orange-500/30">
                <Plus size={18} /> 发布动态
              </button>
            </div>
          </motion.div>
        </div>
        <div className="divider-wave absolute bottom-0 left-0 right-0" style={{ transform: 'scaleY(-1)', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 60' preserveAspectRatio='none'%3E%3Cpath fill='%23FBF8F3' d='M0,32L80,37.3C160,43,320,53,480,48C640,43,800,21,960,21.3C1120,21,1280,43,1360,53.3L1440,64L1440,60L0,60Z'/%3E%3C/svg%3E")` }} />
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* ===== LEFT SIDEBAR - Filters ===== */}
          <aside className="lg:col-span-1 space-y-6 hidden lg:block">
            {/* Tabs */}
            <div className="card-glass p-2">
              {([
                ['feed', '最新动态', Globe2],
                ['hot', '热门话题', Flame],
                ['following', '关注的人', Star],
              ] as const).map(([k, v, Icon]) => (
                <button key={k} onClick={() => setTab(k)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-semibold transition
                    ${tab === k ? 'bg-gradient-to-r from-[var(--ocean-500)] to-[var(--ocean-700)] text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <Icon size={17} /> {v}
                </button>
              ))}
            </div>

            {/* Language Filter */}
            <div className="card-glass p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-sans font-bold text-sm text-slate-800 flex items-center gap-1.5"><Filter size={14} /> 按语言筛选</h4>
                {filterLang !== 'all' && <button onClick={() => setFilterLang('all')} className="text-[10px] font-sans text-slate-400 hover:text-slate-600">清除</button>}
              </div>
              <div className="space-y-1.5">
                <button onClick={() => setFilterLang('all')}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition
                    ${filterLang === 'all' ? 'bg-[var(--ocean-50)] text-[var(--ocean-700)]' : 'hover:bg-slate-50 text-slate-600'}`}>
                  <span className="w-8 flex items-center justify-center">🌐</span>
                  <span className="font-sans text-sm font-semibold">全部语言</span>
                </button>
                {LANGUAGES.map((l: any) => (
                  <button key={l.code} onClick={() => setFilterLang(l.code)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition
                      ${filterLang === l.code ? 'bg-[var(--ocean-50)] text-[var(--ocean-700)]' : 'hover:bg-slate-50 text-slate-600'}`}>
                    <span className="w-8 text-xl">{l.flag}</span>
                    <span className="font-sans text-sm font-semibold flex-1 text-left">{l.name}</span>
                    <span className="font-sans text-[10px] text-slate-400">{l.learners > 10000 ? (l.learners / 10000).toFixed(0) + '万' : l.learners}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hot Users */}
            <div className="card-glass p-6">
              <div className="flex items-center gap-2 mb-5">
                <Trophy size={16} className="text-orange-500" />
                <h4 className="font-sans font-bold text-sm text-slate-800">本周活跃达人</h4>
              </div>
              <div className="space-y-4">
                {hotUsers.map((u, i) => (
                  <div key={u.n} className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-white border border-slate-200 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition">
                      {u.a}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-sans text-sm font-bold text-slate-800 truncate">{u.n}</span>
                        <span className="tag tag-ocean" style={{ fontSize: 9, padding: '1px 6px' }}>Lv.{u.l}</span>
                      </div>
                      <div className="font-sans text-[10px] text-slate-400">
                        {u.posts} 动态 · {u.fans}粉丝
                      </div>
                    </div>
                    {i < 3 && <div className="num-display text-lg flex-shrink-0" style={{ color: i === 0 ? '#f59e0b' : i === 1 ? '#94a3b8' : i === 2 ? '#d97706' : '#cbd5e1' }}>{i + 1}</div>}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ===== CENTER - FEED ===== */}
          <main className="lg:col-span-2 space-y-5">
            {/* New Post Composer */}
            <div className="card-glass p-5">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--ocean-500)] to-[var(--ocean-700)] flex items-center justify-center text-xl flex-shrink-0">
                  {user?.avatar || '😊'}
                </div>
                <div className="flex-1 min-w-0">
                  <button onClick={() => setShowNewPost(true)} className="w-full text-left input-field cursor-text text-slate-400 font-sans">
                    分享你的学习心得、提问或打卡记录...
                  </button>
                  {showNewPost && (
                    <div className="mt-4">
                      <textarea value={newContent} onChange={e => setNewContent(e.target.value)} rows={4}
                        className="input-field resize-none mb-3" placeholder="想说点什么？" />
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500"><Image size={16} /></button>
                          <button className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500"><Smile size={16} /></button>
                          <div className="flex gap-1.5 ml-2 max-w-xs overflow-x-auto">
                            {trendingTags.slice(0, 6).map(t => (
                              <button key={t} onClick={() => setSelectedTag(t)}
                                className={`whitespace-nowrap text-[10px] font-sans font-bold px-2.5 py-1 rounded-full transition
                                  ${selectedTag === t ? 'bg-[var(--ocean-600)] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setShowNewPost(false)} className="btn-outline !py-2 !px-4 text-sm">取消</button>
                          <button onClick={submit} className="btn-primary !py-2 !px-5 text-sm" disabled={!newContent.trim()}>
                            <Send size={14} /> 发布
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs (mobile) */}
            <div className="flex lg:hidden gap-1.5 p-1.5 card-glass">
              {([['feed', '最新'], ['hot', '热门']] as const).map(([k, v]) => (
                <button key={k} onClick={() => setTab(k as any)}
                  className={`flex-1 py-2.5 rounded-xl font-sans text-sm font-bold transition ${tab === k ? 'bg-[var(--ocean-600)] text-white shadow-md' : 'text-slate-500'}`}>
                  {v}
                </button>
              ))}
            </div>

            {/* Posts */}
            <AnimatePresence initial={false}>
              {filtered.map((p: any, i: number) => {
                const langTag = LANGUAGES.find((l: any) => l.code === p.language);
                return (
                  <motion.article key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="card-glass p-6 hover-lift">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3.5">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-white border border-slate-200 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                          {p.author.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-sans font-bold text-slate-900">{p.author.name}</span>
                            <span className="tag tag-ocean" style={{ fontSize: 10, padding: '2px 8px' }}>Lv.{p.author.level}</span>
                            {langTag && <span className="font-sans text-xs" title={langTag.name}>{langTag.flag}</span>}
                          </div>
                          <div className="font-sans text-xs text-slate-400">{p.createdAt} · 👁 约 {200 + p.likes * 5 + Math.floor(Math.random() * 500)} 浏览</div>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400">
                        <MoreHorizontal size={17} />
                      </button>
                    </div>

                    <p className="font-sans text-slate-800 leading-[1.85] text-[15px] mb-5 whitespace-pre-line">
                      {p.content}
                    </p>

                    {p.tags.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap mb-5">
                        {p.tags.map((t: string) => (
                          <span key={t} className="tag tag-lavender cursor-pointer hover:opacity-80 transition" style={{ fontSize: 11 }}>
                            <Hash size={10} /> {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <button onClick={() => toggleLike(p.id)}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition
                            ${p.liked ? 'bg-rose-50 text-rose-600' : 'text-slate-500 hover:bg-slate-50 hover:text-rose-600'}`}>
                          <Heart size={16} fill={p.liked ? '#f43f5e' : 'none'} />
                          <span className="font-sans text-sm font-bold">{p.likes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[var(--ocean-600)] transition">
                          <MessageCircle size={16} />
                          <span className="font-sans text-sm font-bold">{p.comments}</span>
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-emerald-600 transition">
                          <Share2 size={16} />
                        </button>
                      </div>
                      <button className="w-9 h-9 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-[var(--ocean-600)] flex items-center justify-center transition">
                        <Bookmark size={16} />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="card-glass p-16 text-center">
                <div className="text-6xl mb-5">🔍</div>
                <h4 className="font-display text-2xl font-bold text-slate-900 mb-2">暂无相关动态</h4>
                <p className="font-sans text-slate-500 mb-6">换个搜索词或筛选条件试试吧</p>
                <button onClick={() => { setSearch(''); setFilterLang('all'); }} className="btn-outline">清除筛选</button>
              </div>
            )}
          </main>

          {/* ===== RIGHT SIDEBAR ===== */}
          <aside className="lg:col-span-1 space-y-6 hidden lg:block">
            {/* Trending Tags */}
            <div className="card-glass p-6">
              <div className="flex items-center gap-2 mb-5">
                <Sparkles size={16} className="text-violet-500" />
                <h4 className="font-sans font-bold text-sm text-slate-800">热门话题</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((t, i) => (
                  <button key={t} onClick={() => setSearch(t.replace('#', ''))}
                    className={`font-sans text-xs font-bold px-3 py-2 rounded-full transition hover:scale-105
                      ${i < 3 ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/20' : 'bg-slate-100 text-slate-700 hover:bg-[var(--ocean-50)] hover:text-[var(--ocean-700)]'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Weekly Challenge */}
            <div className="card-glass p-6 relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-violet-50">
              <div className="deco-circle" style={{ width: 200, height: 200, top: -50, right: -40, background: '#f97316', opacity: 0.15 }} />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Award size={18} className="text-orange-500" />
                  <span className="font-sans font-bold text-sm text-slate-800">本周挑战</span>
                </div>
                <div className="font-display text-2xl font-bold text-slate-900 mb-1.5 leading-tight">
                  #30天口语打卡
                </div>
                <p className="font-sans text-xs text-slate-500 mb-5">
                  坚持每日口语练习，赢取限定徽章 + 1000 XP
                </p>
                <div className="flex items-center justify-between text-xs font-sans mb-2">
                  <span className="text-slate-500">我的进度</span>
                  <span className="font-bold text-orange-600">15 / 30 天</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden mb-5">
                  <div className="h-full w-1/2 bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500 rounded-full shimmer" />
                </div>
                <div className="flex items-center gap-3 mb-5">
                  {['🌞', '🌸', '✨', '🍀', '🦋'].map((e, i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-white border-2 border-white shadow flex items-center justify-center text-lg -ml-1 first:ml-0 relative z-10" style={{ zIndex: 10 - i }}>{e}</div>
                  ))}
                  <span className="font-sans text-xs text-slate-500">1,283人参与</span>
                </div>
                <button className="w-full btn-ocean !py-3 justify-center text-sm">
                  立即参与 <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Study Buddies */}
            <div className="card-glass p-6">
              <div className="flex items-center gap-2 mb-5">
                <Users size={16} className="text-emerald-500" />
                <h4 className="font-sans font-bold text-sm text-slate-800">推荐学习伙伴</h4>
              </div>
              <div className="space-y-4">
                {hotUsers.slice(1, 4).map(u => (
                  <div key={u.n} className="flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition cursor-pointer">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-slate-100 to-white border border-slate-200 flex items-center justify-center text-xl flex-shrink-0">
                      {u.a}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-sans font-bold text-sm text-slate-800 mb-0.5">{u.n}</div>
                      <div className="font-sans text-[10px] text-slate-400 flex items-center gap-2">
                        <span className="flex items-center gap-0.5"><Flame size={10} className="text-orange-500" /> Lv.{u.l}</span>
                        <span>· 日语 · 韩语</span>
                      </div>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-[var(--ocean-50)] hover:bg-[var(--ocean-100)] text-[var(--ocean-700)] flex items-center justify-center transition">
                      <Plus size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
