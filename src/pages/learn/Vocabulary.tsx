import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import {
  ChevronRight, Volume2, Star, Sparkles, RotateCcw,
  Check, X, Brain, ArrowRight, Heart, Bookmark, Shuffle, Clock
} from 'lucide-react';
import { SAMPLE_WORDS } from '../../data/mockData';
import type { Word } from '../../types';

type Status = 'learning' | 'known' | 'review';

export default function Vocabulary() {
  const [cards, setCards] = useState<(Word & { status: Status })[]>(
    SAMPLE_WORDS.map(w => ({ ...w, status: 'learning' as Status }))
  );
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionXP, setSessionXP] = useState(0);
  const [known, setKnown] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const current = cards[index];
  const total = cards.length;
  const progress = Math.round(index / total * 100);

  const handle = (action: 'known' | 'review') => {
    const updated = [...cards];
    updated[index] = { ...updated[index], status: action };
    setCards(updated);

    if (action === 'known') {
      setKnown(k => k + 1);
      setSessionXP(x => x + 10);
    }

    setTimeout(() => {
      if (index >= total - 1) {
        setShowResult(true);
      } else {
        setIndex(i => i + 1);
        setFlipped(false);
      }
    }, 250);
  };

  const reset = () => {
    setCards(SAMPLE_WORDS.map(w => ({ ...w, status: 'learning' })));
    setIndex(0); setFlipped(false); setSessionXP(0); setKnown(0); setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-orange-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Session Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link to="/dashboard" className="font-sans text-sm font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1">
            ← 返回学习中心
          </Link>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 flex items-center gap-2">
              <Clock size={14} className="text-slate-400" />
              <span className="font-sans text-xs font-bold text-slate-700">今日: 18 分钟</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/20 flex items-center gap-2">
              <Sparkles size={14} />
              <span className="font-sans text-xs font-bold">+{sessionXP} XP</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="card-glass p-6 mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-md">
                <Brain size={22} className="text-white" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-slate-900">智能单词记忆</h1>
                <p className="font-sans text-xs text-slate-500">艾宾浩斯间隔重复 · 8 个核心词汇 · 已掌握 {known}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="num-display text-3xl text-slate-900">{index + 1}<span className="text-xl text-slate-400">/{total}</span></div>
            </div>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 rounded-full shimmer transition-all"
            />
          </div>
        </div>

        {!showResult ? (
          <>
            {/* Flashcard */}
            <div className="h-[460px] mb-10 perspective-1000">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index + String(flipped)}
                  initial={{ opacity: 0, rotateY: flipped ? -90 : 90, scale: 0.9 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: flipped ? 90 : -90, scale: 0.9 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 120, damping: 18 }}
                  onClick={() => setFlipped(f => !f)}
                  className="h-full cursor-pointer group"
                >
                  <div className="h-full relative">
                    {!flipped ? (
                      // FRONT - Word
                      <div className="h-full bg-white rounded-[32px] shadow-2xl p-12 flex flex-col items-center justify-center text-center border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-500" />
                        <div className="absolute top-8 right-8 flex gap-2">
                          <button className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-rose-50 flex items-center justify-center text-slate-400 hover:text-rose-500 transition">
                            <Heart size={18} />
                          </button>
                          <button className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-[var(--ocean-50)] flex items-center justify-center text-slate-400 hover:text-[var(--ocean-600)] transition">
                            <Bookmark size={18} />
                          </button>
                        </div>

                        <span className="tag tag-lavender mb-8">{current.partOfSpeech}</span>

                        <h2 className="font-display text-6xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight group-hover:scale-105 transition-transform duration-500">
                          {current.word}
                        </h2>

                        <button className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--ocean-50)] to-white border border-[var(--ocean-100)] hover:shadow-md transition mb-10 group/btn">
                          <Volume2 size={18} className="text-[var(--ocean-600)] group-hover/btn:scale-110 transition" />
                          <span className="font-sans text-sm font-semibold text-slate-700">{current.pronunciation}</span>
                        </button>

                        <div className="animate-bounce mt-auto">
                          <div className="flex flex-col items-center gap-1">
                            <span className="font-sans text-xs font-semibold text-slate-400">点击卡片查看释义</span>
                            <ChevronRight size={16} className="text-slate-300 rotate-90" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      // BACK - Meaning
                      <div className="h-full rounded-[32px] shadow-2xl p-12 flex flex-col items-center justify-center text-center relative overflow-hidden grain-overlay"
                        style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #fff7ed 50%, #f0f7ff 100%)' }}>
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 via-rose-500 to-violet-500" />
                        
                        <span className="tag tag-jade mb-6">中文释义</span>
                        <h3 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-10 leading-tight">
                          {current.translation}
                        </h3>

                        <div className="w-full max-w-lg bg-white/70 backdrop-blur rounded-2xl p-6 border border-white/80 mb-8">
                          <div className="font-sans text-xs text-slate-400 mb-2">📖 Example · 例句</div>
                          <p className="font-sans text-lg text-slate-800 mb-3 italic leading-relaxed">
                            "{current.example}"
                          </p>
                          <p className="font-sans text-sm text-slate-500">{current.exampleTranslation}</p>
                        </div>

                        <div className="flex items-center gap-2 font-sans text-xs text-slate-400">
                          <RotateCcw size={13} /> 点击卡片返回单词
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <button onClick={() => handle('review')}
                className="flex items-center justify-center gap-3 py-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-rose-300 hover:bg-rose-50/30 transition-all group shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-white border border-slate-200 flex items-center justify-center group-hover:from-rose-100 group-hover:to-rose-50 group-hover:border-rose-200 transition">
                  <X size={22} className="text-slate-400 group-hover:text-rose-500 transition" />
                </div>
                <div className="text-left">
                  <div className="font-sans font-bold text-lg text-slate-900">还不认识</div>
                  <div className="font-sans text-xs text-slate-500">稍后再来复习 · +5 XP</div>
                </div>
              </button>

              <button onClick={() => handle('known')}
                className="flex items-center justify-center gap-3 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white transition-all group shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center group-hover:scale-110 transition">
                  <Check size={22} className="text-white" />
                </div>
                <div className="text-left">
                  <div className="font-sans font-bold text-lg">记住了 ✓</div>
                  <div className="font-sans text-xs text-white/80">掌握牢固 · +10 XP</div>
                </div>
              </button>
            </div>

            {/* Bottom tools */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <button onClick={reset} className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 flex items-center gap-1.5 font-sans text-xs font-semibold text-slate-600">
                <Shuffle size={13} /> 重新打乱
              </button>
              <button onClick={() => setFlipped(f => !f)} className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 flex items-center gap-1.5 font-sans text-xs font-semibold text-slate-600">
                <RotateCcw size={13} /> 翻转卡片
              </button>
            </div>
          </>
        ) : (
          // ====== RESULT SCREEN ======
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: 'spring' }}
            className="card-glass p-12 text-center overflow-hidden relative">
            <div className="deco-circle" style={{ width: 400, height: 400, top: -150, right: -100, background: '#a855f7', opacity: 0.1 }} />
            <div className="deco-circle" style={{ width: 350, height: 350, bottom: -100, left: -80, background: '#f97316', opacity: 0.1 }} />

            <div className="relative z-10">
              <div className="text-8xl mb-6 animate-float-slow">🎉</div>
              <h2 className="font-display text-4xl font-bold text-slate-900 mb-3">本轮完成！</h2>
              <p className="font-sans text-slate-500 mb-10 max-w-md mx-auto">
                坚持每天背单词，量变终将引起质变 💪
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-fuchsia-100">
                  <Sparkles size={18} className="text-fuchsia-500 mx-auto mb-2" />
                  <div className="num-display text-4xl text-slate-900 mb-1">+{sessionXP}</div>
                  <div className="font-sans text-xs text-slate-500">获得 XP</div>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                  <Check size={18} className="text-emerald-500 mx-auto mb-2" />
                  <div className="num-display text-4xl text-slate-900 mb-1">{known}/{total}</div>
                  <div className="font-sans text-xs text-slate-500">掌握新单词</div>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-rose-50 border border-orange-100">
                  <Star size={18} className="text-orange-500 mx-auto mb-2" fill="currentColor" />
                  <div className="num-display text-4xl text-slate-900 mb-1">{Math.round(known / total * 100)}%</div>
                  <div className="font-sans text-xs text-slate-500">记忆正确率</div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={reset} className="btn-outline">
                  <RotateCcw size={16} /> 再练一轮
                </button>
                <Link to="/dashboard" className="btn-primary">
                  返回中心 <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
