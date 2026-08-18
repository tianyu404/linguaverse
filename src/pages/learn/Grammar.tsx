import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import {
  ChevronRight, Lightbulb, Check, X, Sparkles,
  ArrowRight, RotateCcw, Target, Trophy, HelpCircle, Clock
} from 'lucide-react';
import { GRAMMAR_QUESTIONS } from '../../data/mockData';

export default function Grammar() {
  const [questions] = useState(GRAMMAR_QUESTIONS);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [maxStreak, setMaxStreak] = useState(0);
  const [sessionXP, setSessionXP] = useState(0);

  const q = questions[current];
  const total = questions.length;
  const correct = selected === q?.correctIndex;

  const handleSelect = (i: number) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    if (i === q.correctIndex) {
      setScore(s => s + 1);
      setSessionXP(x => x + 15);
      const ns = correctStreak + 1;
      setCorrectStreak(ns);
      setMaxStreak(m => Math.max(m, ns));
      if (ns > 0 && ns % 3 === 0) setSessionXP(x => x + 10); // streak bonus
    } else {
      setCorrectStreak(0);
    }
  };

  const next = () => {
    if (current >= total - 1) {
      setShowResult(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const reset = () => {
    setCurrent(0); setSelected(null); setRevealed(false);
    setScore(0); setCorrectStreak(0); setMaxStreak(0); setSessionXP(0); setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link to="/dashboard" className="font-sans text-sm font-semibold text-slate-500 hover:text-slate-800">← 返回学习中心</Link>
          <div className="flex items-center gap-3">
            {correctStreak >= 2 && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md flex items-center gap-1.5">
                <Trophy size={14} />
                <span className="font-sans text-xs font-bold">连对 {correctStreak} 题!</span>
              </motion.div>
            )}
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md flex items-center gap-1.5">
              <Sparkles size={14} />
              <span className="font-sans text-xs font-bold">+{sessionXP} XP</span>
            </div>
          </div>
        </div>

        <div className="card-glass p-7 mb-8">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-md">
                <Target size={22} className="text-white" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-slate-900">语法精析练习</h1>
                <p className="font-sans text-xs text-slate-500">
                  <span className="tag tag-ocean mr-2" style={{ fontSize: 10 }}>{q?.topic}</span>
                  当前得分: {score}/{total}
                </p>
              </div>
            </div>
            <div className="num-display text-3xl text-slate-900">{current + 1}<span className="text-xl text-slate-400"> / {total}</span></div>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${(current + 1) / total * 100}%` }}
              className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 shimmer rounded-full transition-all"
            />
          </div>
        </div>

        {!showResult ? (
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -25 }} transition={{ duration: 0.45 }}>
              {/* Question */}
              <div className="card-glass p-8 md:p-12 mb-6 shadow-xl">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle size={18} className="text-[var(--ocean-600)]" />
                  <span className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider">Choose the correct answer</span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 leading-relaxed mb-10">
                  {q?.prompt}
                </h2>

                <div className="space-y-4">
                  {q?.options.map((opt, i) => {
                    const isCorrect = i === q.correctIndex;
                    const isSelected = i === selected;
                    let state: 'idle' | 'correct' | 'wrong' | 'dim' = 'idle';
                    if (revealed) {
                      if (isCorrect) state = 'correct';
                      else if (isSelected) state = 'wrong';
                      else state = 'dim';
                    } else if (isSelected) state = 'correct';

                    return (
                      <button key={i} onClick={() => handleSelect(i)} disabled={revealed}
                        className={`w-full p-5 md:p-6 rounded-2xl text-left transition-all group relative overflow-hidden flex items-start gap-4
                          ${state === 'correct' ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-400 shadow-lg shadow-emerald-100' :
                            state === 'wrong' ? 'bg-gradient-to-r from-rose-50 to-red-50 border-2 border-rose-400 shadow-lg shadow-rose-100' :
                            state === 'dim' ? 'bg-slate-50 border-2 border-slate-100 opacity-50' :
                            'bg-white border-2 border-slate-200 hover:border-[var(--ocean-300)] hover:bg-[var(--ocean-50)]/30 hover:shadow-md'}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-sans font-bold flex-shrink-0 transition
                          ${state === 'correct' ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md' :
                            state === 'wrong' ? 'bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-md' :
                            'bg-slate-100 text-slate-600 group-hover:bg-[var(--ocean-500)] group-hover:text-white'}`}>
                          {state === 'correct' ? <Check size={18} /> : state === 'wrong' ? <X size={18} /> : String.fromCharCode(65 + i)}
                        </div>
                        <span className={`font-sans text-base md:text-lg font-semibold pt-1.5 flex-1
                          ${state === 'correct' ? 'text-emerald-900' : state === 'wrong' ? 'text-rose-900' : 'text-slate-800'}`}>
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {revealed && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.4 }}
                    className={`card-glass p-7 mb-6 border-l-4 overflow-hidden
                      ${correct ? 'border-l-emerald-500' : 'border-l-rose-500'}`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                        ${correct ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white' : 'bg-gradient-to-br from-sky-500 to-blue-600 text-white'}`}>
                        {correct ? <Check size={20} /> : <Lightbulb size={20} />}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-sans font-bold text-lg mb-2 ${correct ? 'text-emerald-800' : 'text-slate-900'}`}>
                          {correct ? '太棒了！回答正确 ✓' : '别灰心，来看正确解析 ✨'}
                        </h4>
                        <p className="font-sans text-slate-700 leading-relaxed">{q?.explanation}</p>
                        <div className="flex items-center gap-3 mt-4 text-xs font-sans text-slate-500">
                          <span className="flex items-center gap-1"><Clock size={12} /> 用时 {Math.floor(Math.random() * 40 + 15)} 秒</span>
                          <span>·</span>
                          <span className="flex items-center gap-1 text-orange-600"><Sparkles size={12} /> +{correct ? 15 : 0} XP</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Button */}
              <div className="flex justify-end">
                <button onClick={next} disabled={!revealed}
                  className={`btn-ocean !py-4 !px-8 text-base transition-all
                    ${!revealed ? 'opacity-40 cursor-not-allowed !translate-y-0 !shadow-none' : ''}`}>
                  {current >= total - 1 ? (
                    <>查看练习报告 <Trophy size={18} /></>
                  ) : (
                    <>下一题 <ChevronRight size={18} /></>
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          // RESULT
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, type: 'spring' }}
            className="card-glass p-12 text-center relative overflow-hidden">
            <div className="deco-circle" style={{ width: 500, height: 500, top: -180, right: -150, background: '#0c8be8', opacity: 0.1 }} />
            <div className="deco-circle" style={{ width: 380, height: 380, bottom: -100, left: -80, background: '#f97316', opacity: 0.12 }} />

            <div className="relative z-10">
              <div className="text-7xl mb-6 animate-float-slow">
                {score / total >= 0.8 ? '🏆' : score / total >= 0.6 ? '🌟' : '💪'}
              </div>
              <h2 className="font-display text-4xl font-bold text-slate-900 mb-3">
                {score / total >= 0.8 ? '语法大师！' : score / total >= 0.6 ? '不错的表现！' : '需要多加练习'}
              </h2>
              <p className="font-sans text-slate-500 mb-10 max-w-md mx-auto">
                {score / total >= 0.8 ? '语法功底相当扎实，继续保持这股势头！' : '每一次错题都是进步的机会，加油！'}
              </p>

              <div className="grid sm:grid-cols-4 gap-4 mb-10">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100">
                  <div className="num-display text-5xl text-slate-900 mb-1">{Math.round(score / total * 100)}</div>
                  <div className="font-sans text-xs text-slate-500">正确率 %</div>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                  <Check size={18} className="text-emerald-500 mx-auto mb-2" />
                  <div className="num-display text-5xl text-slate-900 mb-1">{score}</div>
                  <div className="font-sans text-xs text-slate-500">答对题数</div>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200">
                  <Trophy size={18} className="text-orange-500 mx-auto mb-2" />
                  <div className="num-display text-5xl text-slate-900 mb-1">{maxStreak}</div>
                  <div className="font-sans text-xs text-slate-500">最高连对</div>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-fuchsia-200">
                  <Sparkles size={18} className="text-fuchsia-500 mx-auto mb-2" />
                  <div className="num-display text-5xl text-slate-900 mb-1">+{sessionXP}</div>
                  <div className="font-sans text-xs text-slate-500">本轮 XP</div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={reset} className="btn-outline">
                  <RotateCcw size={16} /> 再来一轮
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
