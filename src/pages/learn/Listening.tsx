import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import {
  Headphones, Play, Pause, Volume2, Check, X, Sparkles,
  ArrowRight, RotateCcw, Trophy, HelpCircle, Rewind, ChevronRight,
  MessageCircleQuestion, Star, Clock, Eye, EyeOff
} from 'lucide-react';
import { LISTENING_QUESTIONS } from '../../data/mockData';

export default function Listening() {
  const [questions] = useState(LISTENING_QUESTIONS);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState<number[]>([]);
  const [showText, setShowText] = useState(false);
  const [score, setScore] = useState(0);
  const [sessionXP, setSessionXP] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const q = questions[current];
  const total = questions.length;
  const correct = selected === q?.correctIndex;
  const hasPlayed = played.includes(current);

  const playAudio = () => {
    setIsPlaying(true);
    if (!hasPlayed) setPlayed(p => [...p, current]);
    setTimeout(() => setIsPlaying(false), 4000);
  };

  const handleSelect = (i: number) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    if (i === q.correctIndex) {
      setScore(s => s + 1);
      setSessionXP(x => x + (hasPlayed && played.filter(x => x === current).length === 1 ? 25 : 20));
    }
  };

  const next = () => {
    if (current >= total - 1) setShowResult(true);
    else {
      setCurrent(c => c + 1);
      setSelected(null);
      setRevealed(false);
      setShowText(false);
    }
  };

  const reset = () => {
    setCurrent(0); setSelected(null); setRevealed(false); setShowText(false);
    setScore(0); setSessionXP(0); setShowResult(false); setPlayed([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link to="/dashboard" className="font-sans text-sm font-semibold text-slate-500 hover:text-slate-800">← 返回学习中心</Link>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 flex items-center gap-2">
              <Clock size={14} className="text-slate-400" />
              <span className="font-sans text-xs font-bold text-slate-700">进度 {current + 1}/{total}</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20 flex items-center gap-1.5">
              <Sparkles size={14} />
              <span className="font-sans text-xs font-bold">+{sessionXP} XP</span>
            </div>
          </div>
        </div>

        <div className="card-glass p-7 mb-8">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                <Headphones size={22} className="text-white" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-slate-900">沉浸式听力训练</h1>
                <p className="font-sans text-xs text-slate-500">
                  场景对话 · 新闻播报 · 逐题精析
                  {!hasPlayed && <span className="ml-2 tag tag-sunset" style={{ fontSize: 10 }}>首听 +25 XP</span>}
                </p>
              </div>
            </div>
            <div className="num-display text-3xl text-slate-900">{score}<span className="text-xl text-slate-400">/{total}</span></div>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${(current + 1) / total * 100}%` }}
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 shimmer rounded-full transition-all"
            />
          </div>
        </div>

        {!showResult ? (
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -25 }} transition={{ duration: 0.45 }}>
              {/* Audio Player */}
              <div className="card-glass p-8 md:p-10 mb-6 shadow-xl relative overflow-hidden">
                <div className="deco-circle" style={{ width: 350, height: 350, top: -100, right: -80, background: '#10b981', opacity: 0.1 }} />
                
                <div className="flex items-center gap-2 mb-8">
                  <MessageCircleQuestion size={18} className="text-emerald-600" />
                  <span className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider">Listen and Answer</span>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-8">
                  <button onClick={playAudio}
                    className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-2xl shadow-emerald-500/35 flex-shrink-0 group
                      ${isPlaying ? 'animate-pulse-ring' : ''}`}>
                    <div className={`absolute inset-3 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center group-hover:scale-105 transition
                      ${isPlaying ? 'animate-float-slow' : ''}`}>
                      {isPlaying ? <Pause size={32} className="text-white ml-1" /> : <Play size={32} className="text-white ml-1" fill="currentColor" />}
                    </div>
                  </button>

                  <div className="flex-1 w-full">
                    {/* Waveform */}
                    <div className="flex items-end justify-center gap-1 h-16 md:h-20 mb-4">
                      {[...Array(48)].map((_, i) => (
                        <motion.div key={i}
                          animate={isPlaying ? { height: [10, 30 + Math.random() * 65, 15 + Math.random() * 35, 45] } : {}}
                          transition={isPlaying ? { duration: 0.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.01 } : { duration: 0.3 }}
                          className="w-1.5 rounded-full bg-gradient-to-t from-emerald-500 via-teal-400 to-sky-400"
                          style={{ height: isPlaying ? 20 : 8 + Math.sin(i * 0.6) * 15 }} />
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="font-sans text-sm font-semibold text-slate-700">
                        {isPlaying ? (
                          <span className="text-emerald-600 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 正在播放...
                          </span>
                        ) : (
                          <span className="text-slate-500">点击播放音频</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="w-9 h-9 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500">
                          <Rewind size={15} />
                        </button>
                        <button onClick={playAudio} className="w-9 h-9 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500">
                          <Volume2 size={15} />
                        </button>
                        <span className="ml-2 font-sans text-xs font-bold text-slate-400">00:12</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Toggle */}
                <div className="border-t border-dashed border-slate-200 pt-6">
                  <button onClick={() => setShowText(s => !s)}
                    className="flex items-center gap-2 font-sans text-xs font-semibold text-slate-500 hover:text-[var(--ocean-600)] mb-4">
                    {showText ? <EyeOff size={14} /> : <Eye size={14} />}
                    {showText ? '隐藏听力原文' : '查看听力原文（辅助）'}
                  </button>

                  <AnimatePresence>
                    {showText && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="grid md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                          <div className="font-sans text-[10px] font-bold text-slate-400 mb-2 uppercase">ENGLISH</div>
                          <p className="font-sans text-sm text-slate-700 leading-relaxed italic">"{q?.text}"</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-[var(--ocean-50)] border border-[var(--ocean-100)]">
                          <div className="font-sans text-[10px] font-bold text-[var(--ocean-600)] mb-2 uppercase">中文</div>
                          <p className="font-sans text-sm text-slate-700 leading-relaxed">{q?.translation}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Question */}
              <div className="card-glass p-8 mb-6 shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle size={16} className="text-[var(--ocean-600)]" />
                  <span className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider">Question · 请作答</span>
                </div>

                <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 mb-8 leading-snug">
                  {q?.question}
                </h3>

                <div className="space-y-3.5">
                  {q?.options.map((opt, i) => {
                    const isCorrect = i === q.correctIndex;
                    const isSelected = i === selected;
                    let state: 'idle' | 'correct' | 'wrong' | 'dim' = 'idle';
                    if (revealed) {
                      if (isCorrect) state = 'correct';
                      else if (isSelected) state = 'wrong';
                      else state = 'dim';
                    }

                    return (
                      <button key={i} onClick={() => handleSelect(i)} disabled={revealed}
                        className={`w-full p-5 md:p-5 rounded-2xl text-left transition-all group flex items-center gap-4
                          ${state === 'correct' ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-400 shadow-lg shadow-emerald-100' :
                            state === 'wrong' ? 'bg-gradient-to-r from-rose-50 to-red-50 border-2 border-rose-400 shadow-lg shadow-rose-100' :
                            state === 'dim' ? 'bg-slate-50 border-2 border-slate-100 opacity-50' :
                            'bg-white border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 hover:shadow-md'}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-sans font-bold flex-shrink-0 transition
                          ${state === 'correct' ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md' :
                            state === 'wrong' ? 'bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-md' :
                            'bg-slate-100 text-slate-600 group-hover:bg-emerald-500 group-hover:text-white'}`}>
                          {state === 'correct' ? <Check size={17} /> : state === 'wrong' ? <X size={17} /> : String.fromCharCode(65 + i)}
                        </div>
                        <span className={`font-sans font-semibold flex-1
                          ${state === 'correct' ? 'text-emerald-900' : state === 'wrong' ? 'text-rose-900' : 'text-slate-800'}`}>
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {revealed && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end mb-4">
                  <div className={`tag ${correct ? 'tag-jade' : 'tag-sunset'}`}>
                    {correct ? `✓ 回答正确 · +${hasPlayed ? 25 : 20} XP` : '× 回答错误 · 查看正确选项'}
                  </div>
                </motion.div>
              )}

              <div className="flex justify-end">
                <button onClick={next} disabled={!revealed}
                  className={`btn-ocean !py-4 !px-8 text-base ${!revealed ? 'opacity-40 cursor-not-allowed !translate-y-0 !shadow-none' : ''}`}>
                  {current >= total - 1 ? (<>查看报告 <Trophy size={17} /></>) : (<>下一题 <ChevronRight size={17} /></>)}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, type: 'spring' }}
            className="card-glass p-12 text-center relative overflow-hidden">
            <div className="deco-circle" style={{ width: 450, height: 450, top: -160, right: -120, background: '#10b981', opacity: 0.1 }} />
            <div className="deco-circle" style={{ width: 350, height: 350, bottom: -100, left: -80, background: '#0ea5e9', opacity: 0.1 }} />

            <div className="relative z-10">
              <div className="text-7xl mb-6 animate-float-slow">
                {score / total >= 0.8 ? '🎧🏆' : score / total >= 0.6 ? '🎧🌟' : '🎧💪'}
              </div>
              <h2 className="font-display text-4xl font-bold text-slate-900 mb-3">
                {score / total >= 0.8 ? '听力高手！' : score / total >= 0.6 ? '听力稳步提升中！' : '精听是进步的关键'}
              </h2>
              <p className="font-sans text-slate-500 mb-10 max-w-md mx-auto">
                坚持每天磨耳朵，语感会在不知不觉中产生质的飞跃 🎶
              </p>

              <div className="grid sm:grid-cols-4 gap-4 mb-10">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200">
                  <div className="num-display text-5xl text-slate-900 mb-1">{Math.round(score / total * 100)}</div>
                  <div className="font-sans text-xs text-slate-500">正确率 %</div>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
                  <Check size={18} className="text-emerald-500 mx-auto mb-2" />
                  <div className="num-display text-5xl text-slate-900 mb-1">{score}</div>
                  <div className="font-sans text-xs text-slate-500">答对</div>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200">
                  <Star size={18} className="text-orange-500 mx-auto mb-2" fill="currentColor" />
                  <div className="num-display text-5xl text-slate-900 mb-1">首听率</div>
                  <div className="font-sans text-xs text-slate-500">{Math.round(played.length / total * 100)}%</div>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-fuchsia-200">
                  <Sparkles size={18} className="text-fuchsia-500 mx-auto mb-2" />
                  <div className="num-display text-5xl text-slate-900 mb-1">+{sessionXP}</div>
                  <div className="font-sans text-xs text-slate-500">获得 XP</div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={reset} className="btn-outline"><RotateCcw size={16} /> 再练一轮</button>
                <Link to="/dashboard" className="btn-primary">返回中心 <ArrowRight size={16} /></Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
