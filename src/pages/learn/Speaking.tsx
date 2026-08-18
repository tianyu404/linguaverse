import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import {
  Mic, Volume2, Pause, Square, Sparkles, ChevronRight,
  ArrowRight, RotateCcw, Trophy, Target, Star, RefreshCw, Clock
} from 'lucide-react';
import { SPEAKING_PROMPTS } from '../../data/mockData';

type Stage = 'idle' | 'playing' | 'recording' | 'processing' | 'result';

export default function Speaking() {
  const [prompts] = useState(SPEAKING_PROMPTS);
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<Stage>('idle');
  const [recordingTime, setRecordingTime] = useState(0);
  const [sessionXP, setSessionXP] = useState(0);
  const [scores, setScores] = useState<{ pronunciation: number; fluency: number; rhythm: number; overall: number } | null>(null);
  const [scoresList, setScoresList] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const p = prompts[index];
  const total = prompts.length;

  // Recording timer
  useEffect(() => {
    let t: any;
    if (stage === 'recording') {
      t = setInterval(() => setRecordingTime(x => x + 0.1), 100);
    }
    return () => clearInterval(t);
  }, [stage]);

  // Countdown timer
  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) {
      startRecording();
      return;
    }
    const t = setTimeout(() => setCountdown(c => c! - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const playModel = () => {
    setAudioPlaying(true);
    setTimeout(() => setAudioPlaying(false), 2800);
  };

  const prepareRecord = () => setCountdown(3);
  const startRecording = () => { setCountdown(null); setStage('recording'); setRecordingTime(0); };
  const stopRecording = () => {
    setStage('processing');
    setTimeout(() => {
      // Simulated scoring
      const base = 60 + Math.floor(Math.random() * 38);
      const pronunciation = base;
      const fluency = Math.min(100, base - 5 + Math.floor(Math.random() * 15));
      const rhythm = Math.min(100, base + Math.floor(Math.random() * 10));
      const overall = Math.round((pronunciation + fluency + rhythm) / 3);
      setScores({ pronunciation, fluency, rhythm, overall });
      setScoresList(s => [...s, overall]);
      setSessionXP(x => x + overall >= 85 ? 35 : overall >= 70 ? 25 : 15);
      setStage('result');
    }, 1800);
  };

  const next = () => {
    if (index >= total - 1) {
      setShowResult(true);
    } else {
      setIndex(i => i + 1);
      setStage('idle');
      setScores(null);
      setRecordingTime(0);
    }
  };

  const retry = () => { setStage('idle'); setScores(null); setRecordingTime(0); };

  const reset = () => {
    setIndex(0); setStage('idle'); setRecordingTime(0); setScores(null);
    setScoresList([]); setSessionXP(0); setShowResult(false);
  };

  const getDifficulty = (d: string) => d === 'easy' ? { label: '简单', tag: 'jade' } : d === 'medium' ? { label: '中等', tag: 'ocean' } : { label: '挑战', tag: 'sunset' };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link to="/dashboard" className="font-sans text-sm font-semibold text-slate-500 hover:text-slate-800">← 返回学习中心</Link>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 flex items-center gap-2">
              <Clock size={14} className="text-slate-400" />
              <span className="font-sans text-xs font-bold text-slate-700">第 {index + 1} / {total} 句</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/20 flex items-center gap-1.5">
              <Sparkles size={14} />
              <span className="font-sans text-xs font-bold">+{sessionXP} XP</span>
            </div>
          </div>
        </div>

        {!showResult ? (
          <AnimatePresence mode="wait">
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}>
              {/* Prompt Card */}
              <div className="card-glass p-8 md:p-12 mb-8 relative overflow-hidden shadow-xl">
                <div className="deco-circle" style={{ width: 300, height: 300, top: -80, right: -60, background: '#f97316', opacity: 0.08 }} />

                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-md shadow-orange-500/30">
                      <Mic size={22} className="text-white" />
                    </div>
                    <div>
                      <h1 className="font-display text-2xl font-bold text-slate-900">AI 口语跟读</h1>
                      <p className="font-sans text-xs text-slate-500">{p?.prompt}</p>
                    </div>
                  </div>
                  <span className={`tag tag-${getDifficulty(p.difficulty).tag}`}>
                    <Target size={11} /> {getDifficulty(p.difficulty).label}
                  </span>
                </div>

                {/* Target Sentence */}
                <div className="relative rounded-3xl bg-gradient-to-br from-[var(--cream)] to-white border-2 border-orange-100 p-8 mb-6">
                  <button onClick={playModel} className="absolute top-5 right-5 w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--ocean-500)] to-[var(--ocean-700)] text-white flex items-center justify-center shadow-lg shadow-[var(--ocean-500)]/30 hover:scale-105 transition">
                    {audioPlaying ? <Pause size={18} /> : <Volume2 size={18} />}
                  </button>
                  
                  <div className="font-sans text-xs font-semibold text-orange-600 mb-4 flex items-center gap-1.5">
                    <Star size={12} fill="currentColor" /> 原声示范
                  </div>
                  
                  <h2 className={`font-display text-3xl md:text-4xl font-bold text-slate-900 mb-5 leading-tight ${audioPlaying ? 'text-[var(--ocean-700)]' : ''} transition-colors`}>
                    "{p?.targetSentence}"
                  </h2>
                  
                  <div className="font-sans text-sm text-slate-500 italic mb-6 pb-6 border-b border-dashed border-slate-200">
                    / {p?.phonetic} /
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="font-sans text-xs font-bold text-slate-400 pt-0.5">中文释义</span>
                    <p className="font-sans text-base text-slate-700 leading-relaxed">{p?.translation}</p>
                  </div>

                  {/* Audio waveform simulation */}
                  {audioPlaying && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex items-end justify-center gap-1 h-12">
                      {[...Array(28)].map((_, i) => (
                        <motion.div key={i}
                          animate={{ height: [20, 40 + Math.random() * 60, 25 + Math.random() * 35, 45], opacity: [0.4, 0.9, 0.7, 0.5] }}
                          transition={{ duration: 0.6, delay: i * 0.03, repeat: Infinity, repeatType: 'reverse' }}
                          className={`w-1.5 rounded-full bg-gradient-to-t from-orange-500 to-rose-400`} style={{ height: 20 }} />
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* ====== Interaction Zone ====== */}
                <div className="flex flex-col items-center justify-center py-8">
                  {countdown !== null ? (
                    <div className="text-center">
                      <div className="font-sans text-sm text-slate-500 mb-5">准备朗读...</div>
                      <motion.div key={countdown} initial={{ scale: 1.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="num-display text-9xl text-transparent bg-gradient-to-br from-orange-500 to-rose-500 bg-clip-text mb-4">
                        {countdown}
                      </motion.div>
                    </div>
                  ) : stage === 'idle' && (
                    <div className="space-y-6">
                      <button onClick={prepareRecord}
                        className="relative w-28 h-28 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-2xl shadow-orange-500/40 hover:scale-105 transition-all group animate-pulse-ring">
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-orange-400 to-rose-400 group-hover:from-orange-300 group-hover:to-rose-300 transition flex items-center justify-center">
                          <Mic size={38} className="text-white" />
                        </div>
                      </button>
                      <div className="text-center">
                        <p className="font-sans font-bold text-slate-800 mb-1">点击开始录音</p>
                        <p className="font-sans text-xs text-slate-500">大声朗读示范句子，AI 为你实时评分</p>
                      </div>
                    </div>
                  )}

                  {stage === 'recording' && (
                    <div className="space-y-6 text-center w-full">
                      <div className="flex items-end justify-center gap-1 h-16 mb-4">
                        {[...Array(42)].map((_, i) => (
                          <motion.div key={i}
                            animate={{ height: [10, 30 + Math.random() * 70, 15 + Math.random() * 40, 50 + Math.random() * 30] }}
                            transition={{ duration: 0.45, repeat: Infinity, repeatType: 'reverse', delay: i * 0.01 }}
                            className="w-1.5 rounded-full bg-gradient-to-t from-rose-500 via-orange-400 to-amber-300" />
                        ))}
                      </div>
                      <div className="font-sans text-sm font-bold text-orange-600 mb-4 flex items-center justify-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                        正在录音 · {recordingTime.toFixed(1)}s
                      </div>
                      <button onClick={stopRecording} className="btn-primary !bg-gradient-to-r !from-rose-500 !to-red-600 !shadow-rose-500/30 !py-4 !px-8 text-base">
                        <Square size={16} fill="currentColor" /> 完成录音
                      </button>
                    </div>
                  )}

                  {stage === 'processing' && (
                    <div className="space-y-5 text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-100 via-violet-100 to-rose-100 flex items-center justify-center animate-spin-slow relative">
                        <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                          <RefreshCw size={28} className="text-[var(--ocean-600)] animate-spin" />
                        </div>
                      </div>
                      <div>
                        <div className="font-sans font-bold text-lg text-slate-800 mb-1">AI 评分中...</div>
                        <div className="font-sans text-xs text-slate-500">正在从发音、流利度、节奏三个维度评估</div>
                      </div>
                    </div>
                  )}

                  {stage === 'result' && scores && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full">
                      <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
                        <div className="text-center">
                          <div className="relative w-36 h-36 mx-auto">
                            <svg className="w-36 h-36 -rotate-90">
                              <circle cx="72" cy="72" r="64" stroke="#f1f5f9" strokeWidth="10" fill="none" />
                              <motion.circle cx="72" cy="72" r="64"
                                initial={{ strokeDasharray: 0, strokeDashoffset: 0 }}
                                animate={{ strokeDasharray: 402, strokeDashoffset: 402 - (402 * scores.overall / 100) }}
                                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                                stroke={scores.overall >= 85 ? 'url(#g1)' : scores.overall >= 70 ? 'url(#g2)' : 'url(#g3)'} strokeWidth="10" fill="none" strokeLinecap="round" />
                              <defs>
                                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                                  <stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#14b8a6" />
                                </linearGradient>
                                <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                                  <stop offset="0%" stopColor="#0c8be8" /><stop offset="100%" stopColor="#6366f1" />
                                </linearGradient>
                                <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1">
                                  <stop offset="0%" stopColor="#f97316" /><stop offset="100%" stopColor="#ef4444" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <div className="num-display text-5xl">{scores.overall}</div>
                              <div className="font-sans text-[10px] font-bold text-slate-500">综合得分</div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 flex-1 min-w-[240px] max-w-md">
                          {[
                            { k: 'pronunciation', l: '发音准确度', v: scores.pronunciation },
                            { k: 'fluency', l: '流利度', v: scores.fluency },
                            { k: 'rhythm', l: '节奏韵律', v: scores.rhythm },
                          ].map(s => (
                            <div key={s.k}>
                              <div className="flex justify-between font-sans text-xs mb-1.5">
                                <span className="font-semibold text-slate-600">{s.l}</span>
                                <span className="font-bold text-slate-900">{s.v}</span>
                              </div>
                              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${s.v}%` }} transition={{ duration: 0.8, delay: 0.3 }}
                                  className="h-full rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {scores.overall >= 90 && <span className="tag tag-jade">🌟 完美发音！</span>}
                        {scores.overall >= 80 && scores.overall < 90 && <span className="tag tag-ocean">💯 非常地道！</span>}
                        {scores.overall >= 70 && scores.overall < 80 && <span className="tag tag-lavender">👍 不错哦！</span>}
                        {scores.overall < 70 && <span className="tag tag-sunset">💪 继续加油！</span>}
                        <span className="tag tag-ocean">+{scores.overall >= 85 ? 35 : scores.overall >= 70 ? 25 : 15} XP</span>
                      </div>

                      <div className="flex flex-wrap justify-center gap-3">
                        <button onClick={retry} className="btn-outline">
                          <RotateCcw size={15} /> 再试一次
                        </button>
                        <button onClick={next} className="btn-primary">
                          {index >= total - 1 ? '查看总结' : '下一句'} <ChevronRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Progress */}
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div animate={{ width: `${(index + (stage === 'result' ? 1 : 0)) / total * 100}%` }}
                  className="h-full bg-gradient-to-r from-orange-500 to-rose-500 shimmer rounded-full transition-all" />
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          // FINAL RESULT
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, type: 'spring' }}
            className="card-glass p-12 text-center relative overflow-hidden">
            <div className="deco-circle" style={{ width: 400, height: 400, top: -150, right: -100, background: '#f97316', opacity: 0.12 }} />
            <div className="deco-circle" style={{ width: 350, height: 350, bottom: -100, left: -80, background: '#ec4899', opacity: 0.1 }} />

            <div className="relative z-10">
              <div className="text-7xl mb-6 animate-float-slow">🎤✨</div>
              <h2 className="font-display text-4xl font-bold text-slate-900 mb-3">本轮口语练习完成！</h2>
              <p className="font-sans text-slate-500 mb-10 max-w-md mx-auto">
                每一次开口都是突破，敢说就是学好语言的第一步 💬
              </p>

              <div className="grid sm:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200">
                  <Sparkles size={18} className="text-orange-500 mx-auto mb-2" />
                  <div className="num-display text-4xl text-slate-900 mb-1">+{sessionXP}</div>
                  <div className="font-sans text-xs text-slate-500">本轮 XP</div>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
                  <Trophy size={18} className="text-emerald-500 mx-auto mb-2" />
                  <div className="num-display text-4xl text-slate-900 mb-1">{scoresList.length ? Math.round(scoresList.reduce((a, b) => a + b, 0) / scoresList.length) : 0}</div>
                  <div className="font-sans text-xs text-slate-500">平均得分</div>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200">
                  <Star size={18} className="text-sky-500 mx-auto mb-2" fill="currentColor" />
                  <div className="num-display text-4xl text-slate-900 mb-1">{scoresList.filter(s => s >= 85).length}</div>
                  <div className="font-sans text-xs text-slate-500">优秀句子</div>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-fuchsia-200">
                  <Mic size={18} className="text-fuchsia-500 mx-auto mb-2" />
                  <div className="num-display text-4xl text-slate-900 mb-1">{total}</div>
                  <div className="font-sans text-xs text-slate-500">练习句数</div>
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
