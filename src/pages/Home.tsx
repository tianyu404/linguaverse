import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Brain, Mic, Headphones, Sparkles, Trophy, Users, BookOpen, Star, ChevronRight, Globe2 } from 'lucide-react';
import { LANGUAGES } from '../data/mockData';
import Navbar from '../components/layout/Navbar';

export default function Home() {
  const features = [
    { icon: Brain, title: '智能单词记忆', desc: '基于艾宾浩斯遗忘曲线的科学记忆算法，背词效率提升3倍', color: 'from-violet-500 to-fuchsia-500', tag: 'vocabulary' },
    { icon: BookOpen, title: '系统语法精讲', desc: '从入门到精通，配合海量真题与即时解析，语法不再是难题', color: 'from-sky-500 to-blue-600', tag: 'grammar' },
    { icon: Mic, title: 'AI口语跟读', desc: 'AI智能发音评估，逐音节纠正，地道口音开口就有', color: 'from-orange-500 to-rose-500', tag: 'speaking' },
    { icon: Headphones, title: '沉浸式听力', desc: '真人原声 + 场景听力训练，从入门到新闻无障碍', color: 'from-emerald-500 to-teal-600', tag: 'listening' },
  ];

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative bg-hero-gradient overflow-hidden">
        <div className="deco-circle" style={{ width: 600, height: 600, top: -180, right: -150, background: 'var(--sunset-400)', opacity: 0.2 }} />
        <div className="deco-circle" style={{ width: 500, height: 500, bottom: -150, left: -100, background: 'var(--lavender-400)', opacity: 0.22 }} />
        
        <div className="absolute top-32 left-1/4 text-5xl animate-float-slow opacity-70">🌸</div>
        <div className="absolute top-48 right-1/4 text-4xl animate-float opacity-70" style={{ animationDelay: '0.8s' }}>✨</div>
        <div className="absolute bottom-40 left-1/3 text-5xl animate-float opacity-60" style={{ animationDelay: '1.5s' }}>🍣</div>
        <div className="absolute bottom-32 right-1/3 text-4xl animate-float-slow opacity-70" style={{ animationDelay: '0.3s' }}>🎌</div>

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-40 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
                <Sparkles size={15} className="text-orange-300" />
                <span className="font-sans text-sm font-medium text-white/90">全新 AI 口语评分 · 支持 6 大语种</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-8">
                用一门语言，<br />
                <span className="bg-gradient-to-r from-orange-300 via-amber-200 to-yellow-100 bg-clip-text text-transparent">
                  打开万千世界
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg md:text-xl text-white/75 mb-10 leading-relaxed max-w-xl font-sans">
                LinguaVerse 提供沉浸式多语种学习体验，科学分级的课程体系、
                AI驱动的互动模块和全球社区，让学习外语像探索新大陆一样有趣。
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-wrap gap-4 mb-12">
                <Link to="/register" className="btn-primary text-base py-4 px-8 shadow-2xl shadow-orange-500/30">
                  免费开始学习 <ArrowRight size={18} />
                </Link>
                <button className="btn-ghost text-base py-4 px-8">
                  <Play size={18} fill="currentColor" /> 观看介绍
                </button>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center gap-8">
                <div className="flex -space-x-3">
                  {['🌞','🦋','🌺','🍀','🪐'].map((e, i) => (
                    <div key={i} className="w-11 h-11 rounded-full bg-gradient-to-br from-white/20 to-white/5 border-2 border-[var(--ocean-800)] flex items-center justify-center text-lg backdrop-blur-sm">
                      {e}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex mb-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#fcd34d" color="#fcd34d" />)}
                  </div>
                  <div className="text-white/70 text-sm font-sans">
                    <b className="text-white">4.9 / 5.0</b> · 来自 <b className="text-white">12,000+</b> 位学习者的好评
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Featured Card */}
            <motion.div initial={{ opacity: 0, scale: 0.95, x: 30 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="relative">
                <div className="card-glass-dark p-8 backdrop-blur-2xl shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-blue-500/40">
                        🇬🇧
                      </div>
                      <div>
                        <div className="font-display font-bold text-xl text-white">English</div>
                        <div className="text-white/60 text-xs font-sans">Level A1 · 入门课程</div>
                      </div>
                    </div>
                    <div className="tag tag-sunset">75% 完成</div>
                  </div>

                  <div className="mb-8">
                    <div className="flex justify-between text-sm font-sans text-white/70 mb-2">
                      <span>Unit 2 · 日常对话</span>
                      <span>18 / 24 课时</span>
                    </div>
                    <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-400 to-amber-300 rounded-full shimmer" style={{ width: '75%' }} />
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {[
                      { name: '基础问候语', status: 'done' },
                      { name: '自我介绍', status: 'done' },
                      { name: '点餐对话', status: 'current' },
                      { name: '餐厅场景听力', status: 'locked' },
                    ].map((l, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-sans text-xs font-bold
                          ${l.status === 'done' ? 'bg-emerald-500 text-white' :
                            l.status === 'current' ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white animate-pulse-ring' :
                            'bg-white/10 text-white/40'}`}>
                          {l.status === 'done' ? '✓' : i + 1}
                        </div>
                        <span className={`font-sans text-sm ${l.status === 'locked' ? 'text-white/40' : 'text-white/90'}`}>{l.name}</span>
                        {l.status === 'current' && <span className="ml-auto text-xs font-sans text-orange-300 font-semibold">进行中</span>}
                        {l.status === 'locked' && <span className="ml-auto text-xs">🔒</span>}
                      </div>
                    ))}
                  </div>

                  <button className="btn-primary w-full justify-center">
                    继续学习 · 点餐对话
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Floating mini cards */}
                <div className="absolute -top-6 -left-6 card-glass p-4 flex items-center gap-3 animate-float-slow">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
                    🔥
                  </div>
                  <div>
                    <div className="font-sans font-bold text-xs text-slate-800">连续学习</div>
                    <div className="text-[10px] text-slate-500 font-sans">已坚持 <b className="text-orange-600">45天</b></div>
                  </div>
                </div>

                <div className="absolute -bottom-5 -right-5 card-glass p-4 animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {['🧑‍🎓','👩‍🏫','🎓'].map((e, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-white border-2 border-white flex items-center justify-center text-sm">{e}</div>
                      ))}
                    </div>
                    <div>
                      <div className="font-sans text-xs font-bold text-slate-800">2,431人</div>
                      <div className="text-[10px] text-slate-500 font-sans">今日一起学习</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="divider-wave absolute bottom-0 left-0 right-0" />
      </section>

      {/* ===== LANGUAGES ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative">
        <div className="text-center mb-16">
          <span className="tag tag-ocean mb-5">🗺️ 多语种全覆盖</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-5">
            6 大主流语言<br className="md:hidden" /> 一站式掌握
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-sans text-lg">
            从欧洲的浪漫法语，到东亚的汉字文化圈，精研每一种语言背后的文化与韵味
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LANGUAGES.map((lang: any, i: number) => (
            <motion.div key={lang.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="card-glass p-7 hover-lift cursor-pointer group">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${lang.color} flex items-center justify-center text-4xl shadow-lg`}>
                  {lang.flag}
                </div>
                <Trophy size={18} className="text-slate-300 group-hover:text-orange-500 transition-colors" />
              </div>
              <div className="mb-4">
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-1">{lang.name}</h3>
                <div className="text-slate-500 font-sans text-sm">{lang.nativeName}</div>
              </div>
              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <div>
                  <div className="font-sans text-xs text-slate-400 mb-0.5">在学学员</div>
                  <div className="font-display text-xl font-bold text-slate-800">{(lang.learners / 10000).toFixed(0)}万+</div>
                </div>
                <Link to="/register" className="flex items-center gap-1.5 font-sans text-sm font-bold text-[var(--ocean-600)] group-hover:gap-2.5 transition-all">
                  开始学习 <ChevronRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="relative py-28 bg-gradient-to-b from-white via-sky-50/30 to-[var(--cream)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="tag tag-lavender mb-5">✨ 沉浸式互动学习</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-5">
              四大核心模块<br className="md:hidden" /> 全方位提升语言能力
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-sans text-lg">
              语言学习的每一个环节都精心打磨，让你像学母语一样自然习得
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative bg-white rounded-3xl p-10 border border-slate-100 shadow-sm hover-lift overflow-hidden group">
                  <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br ${f.color} opacity-[0.08] group-hover:opacity-[0.14] transition-opacity`} />
                  
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-7 shadow-lg relative z-10`}>
                    <Icon size={28} className="text-white" />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-3 relative z-10">{f.title}</h3>
                  <p className="text-slate-600 font-sans leading-relaxed mb-8 relative z-10">{f.desc}</p>

                  <div className="flex items-center gap-6 relative z-10">
                    <div className="flex items-center gap-1.5">
                      {[...Array(5)].map((_, k) => (
                        <div key={k} className={`level-dot ${k < 4 ? 'active' : ''}`} />
                      ))}
                    </div>
                    <span className="font-sans text-sm font-semibold text-slate-500">进阶式难度</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF ===== */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {[
            { n: '520K+', l: '全球注册用户', i: Users },
            { n: '1.8亿', l: '累计课时完成', i: BookOpen },
            { n: '96.8%', l: '学习目标达成率', i: Trophy },
            { n: '127个', l: '覆盖国家地区', i: Sparkles },
          ].map((s, i) => {
            const Icon = s.i;
            return (
              <motion.div key={s.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center">
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[var(--ocean-50)] to-[var(--sunset-50)] flex items-center justify-center border border-slate-100">
                  <Icon size={24} className="text-[var(--ocean-700)]" />
                </div>
                <div className="num-display text-5xl text-slate-900 mb-2">{s.n}</div>
                <div className="font-sans text-slate-500">{s.l}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-ocean-gradient rounded-[32px] p-12 md:p-16 overflow-hidden text-center">
          <div className="deco-circle" style={{ width: 400, height: 400, top: -150, right: -80, background: 'var(--sunset-400)', opacity: 0.2 }} />
          <div className="deco-circle" style={{ width: 350, height: 350, bottom: -100, left: -60, background: 'var(--lavender-400)', opacity: 0.25 }} />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              今天，<span className="text-orange-300">就开始</span><br />
              你的第一门外语
            </h2>
            <p className="text-white/75 text-lg mb-10 font-sans max-w-xl mx-auto">
              立即注册，免费获得 7 天完整课程体验 + AI 口语评估机会
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register" className="btn-primary text-base py-4 px-8 !bg-white !text-[var(--ocean-800)] hover:!bg-orange-50 shadow-xl">
                免费注册体验 <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn-ghost text-base py-4 px-8">
                我已有账号
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-slate-950 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <Globe2 size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">LinguaVerse</h3>
                  <p className="text-xs font-sans">LANGUAGE · CULTURE · CONNECTION</p>
                </div>
              </div>
              <p className="font-sans text-sm leading-relaxed max-w-sm mb-5">
                沉浸式多语种在线教育平台，让每个学习者都能自信地开口说外语，与世界自由对话。
              </p>
            </div>
            {[
              { title: '课程体系', items: ['英语课程', '日语课程', '韩语课程', '法语课程', '西语课程'] },
              { title: '学习中心', items: ['单词记忆', '语法练习', '口语跟读', '听力训练', '学习报告'] },
              { title: '关于我们', items: ['品牌故事', '教研团队', '用户协议', '隐私政策', '联系我们'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-sans font-bold text-white mb-5 text-sm">{col.title}</h4>
                <ul className="space-y-3">
                  {col.items.map(it => (
                    <li key={it}>
                      <a className="font-sans text-sm hover:text-white transition-colors cursor-pointer">{it}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-xs font-sans text-slate-500">
            © 2026 LinguaVerse. All rights reserved. Crafted with ♥ for language lovers.
          </div>
        </div>
      </footer>
    </div>
  );
}
