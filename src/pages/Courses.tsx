import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import {
  ChevronRight, Lock, Check, Star, Clock,
  BookOpen, Play, Award, Target, Lock as LockIcon
} from 'lucide-react';
import { LANGUAGES, ENGLISH_LEVELS, JAPANESE_LEVELS } from '../data/mockData';
import type { LanguageCode, CourseLevel, Lesson } from '../types';

export default function Courses() {
  const [activeLang, setActiveLang] = useState<LanguageCode>('en');
  const [selectedLevel, setSelectedLevel] = useState<string>('en-a1');

  const levels: Record<LanguageCode, CourseLevel[]> = {
    en: ENGLISH_LEVELS,
    ja: JAPANESE_LEVELS,
    ko: ENGLISH_LEVELS.map((l: any) => ({ ...l, id: l.id.replace('en', 'ko') })),
    fr: ENGLISH_LEVELS.map((l: any) => ({ ...l, id: l.id.replace('en', 'fr') })),
    es: ENGLISH_LEVELS.map((l: any) => ({ ...l, id: l.id.replace('en', 'es') })),
    de: ENGLISH_LEVELS.map((l: any) => ({ ...l, id: l.id.replace('en', 'de') })),
    zh: ENGLISH_LEVELS,
  };

  const currentLevels = levels[activeLang] || [];
  const activeLevel = currentLevels.find((l: any) => l.id === selectedLevel) || currentLevels[0];
  const overallProgress = currentLevels.reduce(
    (s: any, l: any) => ({ lessons: s.lessons + l.completedLessons, total: s.total + l.totalLessons }),
    { lessons: 0, total: 0 }
  );

  const typeIcon: Record<Lesson['type'], string> = {
    vocabulary: '📘', grammar: '✏️', speaking: '🎤',
    listening: '🎧', reading: '📖', review: '📝'
  };
  const typeName: Record<Lesson['type'], string> = {
    vocabulary: '词汇', grammar: '语法', speaking: '口语',
    listening: '听力', reading: '阅读', review: '复习'
  };

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <Navbar />

      {/* ===== PAGE HEADER ===== */}
      <section className="bg-ocean-gradient relative overflow-hidden">
        <div className="deco-circle" style={{ width: 500, height: 500, top: -150, right: -100, background: 'var(--sunset-400)', opacity: 0.2 }} />
        <div className="deco-circle" style={{ width: 400, height: 400, bottom: -100, left: -80, background: 'var(--lavender-400)', opacity: 0.22 }} />
        
        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
              <BookOpen size={15} className="text-orange-300" />
              <span className="font-sans text-xs font-medium">分级课程体系</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
              科学分级，<span className="bg-gradient-to-r from-orange-300 to-amber-200 bg-clip-text text-transparent">循序渐进</span><br />
              掌握一门语言的最佳路径
            </h1>
            <p className="text-white/75 font-sans text-lg max-w-2xl mb-8">
              参考 CEFR 国际标准和 JLPT/DELE 等官方考试大纲，为每一种语言量身打造 A1 到 C2 的 6 级进阶体系
            </p>

            <div className="grid sm:grid-cols-4 gap-4 max-w-3xl">
              <div className="card-glass-dark p-4">
                <div className="num-display text-3xl mb-1">6</div>
                <div className="text-white/70 text-xs font-sans">能力级别 (A1-C2)</div>
              </div>
              <div className="card-glass-dark p-4">
                <div className="num-display text-3xl mb-1">182</div>
                <div className="text-white/70 text-xs font-sans">系统化单元</div>
              </div>
              <div className="card-glass-dark p-4">
                <div className="num-display text-3xl mb-1">3,400+</div>
                <div className="text-white/70 text-xs font-sans">精编课时</div>
              </div>
              <div className="card-glass-dark p-4">
                <div className="num-display text-3xl mb-1">{Math.round(overallProgress.lessons / (overallProgress.total || 1) * 100)}%</div>
                <div className="text-white/70 text-xs font-sans">你的总进度</div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="divider-wave absolute bottom-0 left-0 right-0" style={{ transform: 'scaleY(-1)', marginTop: -1 }} />
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* ===== LANGUAGE SWITCHER ===== */}
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-5">选择学习语言</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {LANGUAGES.map((lang: any, i: number) => {
              const active = activeLang === lang.code;
              return (
                <motion.button key={lang.code}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  onClick={() => {
                    setActiveLang(lang.code);
                    const first = levels[lang.code as LanguageCode]?.[0];
                    if (first) setSelectedLevel(first.id);
                  }}
                  className={`p-5 rounded-2xl text-center transition-all relative overflow-hidden group
                    ${active
                      ? 'bg-white shadow-xl border-2 border-transparent'
                      : 'bg-white/60 hover:bg-white border-2 border-transparent hover:border-[var(--ocean-100)] shadow-sm'}`}>
                  {active && <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--ocean-500)] to-[var(--ocean-700)] opacity-[0.04]" />}
                  <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${lang.color} flex items-center justify-center text-3xl shadow-md ${active ? '' : 'group-hover:scale-110 transition-transform'}`}>
                    {lang.flag}
                  </div>
                  <div className={`font-display font-bold text-lg mb-0.5 ${active ? 'text-slate-900' : 'text-slate-700'}`}>{lang.name}</div>
                  <div className="font-sans text-xs text-slate-500 mb-2">{lang.nativeName}</div>
                  {active && <div className="inline-flex items-center gap-1 text-xs font-sans font-bold text-orange-600">
                    <Check size={12} /> 当前学习
                  </div>}
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* ===== LEVELS PROGRESS ===== */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-1">级别进度总览</h2>
              <p className="font-sans text-sm text-slate-500">已解锁：{currentLevels.filter(l => l.unlocked).length} / {currentLevels.length} 级别</p>
            </div>
          </div>

          <div className="card-glass p-8">
            {/* CEFR Bar */}
            <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-3">
              {currentLevels.map((lv, i) => {
                const active = lv.id === selectedLevel;
                const pct = lv.totalLessons ? Math.round(lv.completedLessons / lv.totalLessons * 100) : 0;
                return (
                  <div key={lv.id} className="flex items-center flex-1 min-w-[150px]">
                    <button onClick={() => lv.unlocked && setSelectedLevel(lv.id)}
                      disabled={!lv.unlocked}
                      className={`w-full p-5 rounded-2xl text-left transition-all relative
                        ${!lv.unlocked ? 'bg-slate-50 opacity-60 cursor-not-allowed' :
                          active ? 'bg-gradient-to-br from-[var(--ocean-500)] to-[var(--ocean-700)] text-white shadow-xl shadow-[var(--ocean-500)]/25' :
                          'bg-white border border-slate-200 hover:border-[var(--ocean-300)] cursor-pointer'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`num-display text-3xl ${active ? 'text-white' : 'text-slate-900'}`}>{lv.name}</span>
                        {!lv.unlocked && <LockIcon size={15} className="text-slate-400" />}
                        {lv.unlocked && pct === 100 && <Award size={15} className="text-orange-300" />}
                      </div>
                      <div className={`font-sans text-xs font-semibold mb-2 ${active ? 'text-white/80' : 'text-slate-500'}`}>
                        {lv.title}
                      </div>
                      <div className={`h-1.5 rounded-full overflow-hidden ${active ? 'bg-white/20' : 'bg-slate-100'}`}>
                        <div className={`h-full rounded-full transition-all ${active ? 'bg-gradient-to-r from-orange-300 to-amber-200' : 'bg-gradient-to-r from-[var(--ocean-500)] to-[var(--sunset-400)]'}`}
                          style={{ width: `${pct}%` }} />
                      </div>
                      <div className={`mt-2 text-[10px] font-sans font-bold ${active ? 'text-white/70' : 'text-slate-400'}`}>
                        {lv.completedLessons}/{lv.totalLessons} 课时
                      </div>
                    </button>
                    {i < currentLevels.length - 1 && (
                      <div className="w-6 flex-shrink-0 flex">
                        <ChevronRight size={16} className="mx-auto text-slate-300" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Level Info */}
            {activeLevel && (
              <motion.div key={activeLevel.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--ocean-500)] to-[var(--ocean-700)] flex items-center justify-center">
                      <span className="num-display text-xl text-white">{activeLevel.name}</span>
                    </div>
                    <div>
                      <div className="font-display font-bold text-xl text-slate-900">{activeLevel.title}</div>
                      <div className="font-sans text-xs text-slate-500">{activeLevel.completedLessons}/{activeLevel.totalLessons} 课时</div>
                    </div>
                  </div>
                  <p className="font-sans text-sm text-slate-600 leading-relaxed">{activeLevel.description}</p>
                </div>

                <div className="md:col-span-2 grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-[var(--ocean-50)] border border-[var(--ocean-100)]">
                    <Target size={18} className="text-[var(--ocean-600)] mb-2" />
                    <div className="num-display text-2xl text-slate-900 mb-0.5">{activeLevel.totalLessons}</div>
                    <div className="font-sans text-xs text-slate-500">总课时数</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[var(--sunset-50)] border border-[var(--sunset-200)]">
                    <Clock size={18} className="text-[var(--sunset-600)] mb-2" />
                    <div className="num-display text-2xl text-slate-900 mb-0.5">~{activeLevel.totalLessons * 15}h</div>
                    <div className="font-sans text-xs text-slate-500">预计学时</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[var(--jade-50)] border border-[var(--jade-200)]">
                    <Award size={18} className="text-[var(--jade-600)] mb-2" />
                    <div className="num-display text-2xl text-slate-900 mb-0.5">CEFR</div>
                    <div className="font-sans text-xs text-slate-500">国际对标</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* ===== UNITS & LESSONS ===== */}
        {activeLevel?.units.length ? (
          <section>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-1">
                  {activeLevel.name} · {activeLevel.title} 单元
                </h2>
                <p className="font-sans text-sm text-slate-500">
                  共 {activeLevel.units.length} 个单元 · {activeLevel.totalLessons} 节精讲课
                </p>
              </div>
              <div className="flex gap-2">
                <button className="btn-outline !py-2 !px-4 text-sm">📋 下载课程大纲</button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeLevel.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="space-y-6">
                {activeLevel.units.map((unit: any, ui: number) => (
                  <motion.div key={unit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: ui * 0.08 }}
                    className="card-glass overflow-hidden">
                    <div className="flex flex-wrap md:flex-nowrap items-center gap-6 p-7 border-b border-slate-100 bg-gradient-to-r from-white via-[var(--ocean-50)]/30 to-white">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--ocean-500)] to-[var(--ocean-700)] flex items-center justify-center text-3xl shadow-lg shadow-[var(--ocean-500)]/30 flex-shrink-0">
                        {unit.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                          <h3 className="font-display text-xl font-bold text-slate-900">
                            Unit {ui + 1}: {unit.title}
                          </h3>
                          {unit.completed === unit.total ? (
                            <span className="tag tag-jade"><Check size={11} /> 已完成</span>
                          ) : (
                            <span className="tag tag-ocean">{unit.completed}/{unit.total} 课时</span>
                          )}
                        </div>
                        <p className="font-sans text-sm text-slate-500">
                          掌握本单元后，你将能在特定场景中自如运用目标语言进行交流
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-right w-full md:w-52">
                        <div className="font-sans text-xs text-slate-500 mb-1">单元完成度</div>
                        <div className="num-display text-3xl text-slate-900 mb-2">
                          {Math.round(unit.completed / unit.total * 100)}%
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="progress-fill" style={{ width: `${unit.completed / unit.total * 100}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 p-5">
                      {unit.lessons.map((lesson: any, li: number) => {
                        const isNext = !lesson.completed && !lesson.locked && li === unit.completed;
                        return (
                          <Link key={lesson.id} to={lesson.locked ? '#' : `/learn/${lesson.type}`}
                            className={`p-4 rounded-2xl border-2 transition-all relative group
                              ${lesson.locked ? 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed' :
                                lesson.completed ? 'bg-white border-emerald-200 hover:border-emerald-400 hover:shadow-md' :
                                isNext ? 'bg-white border-orange-300 hover:border-orange-500 shadow-md animate-pulse-ring' :
                                'bg-white border-slate-200 hover:border-[var(--ocean-300)] hover:shadow-md'}`}>
                            {isNext && (
                              <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-sans text-[10px] font-bold shadow-md">
                                继续 →
                              </div>
                            )}
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">{typeIcon[lesson.type as Lesson['type']]}</span>
                                <span className="tag tag-ocean" style={{ fontSize: 10, padding: '2px 8px' }}>
                                  {typeName[lesson.type as Lesson['type']]}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                {lesson.completed ? (
                                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">✓</div>
                                ) : lesson.locked ? (
                                  <Lock size={13} className="text-slate-300" />
                                ) : (
                                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">{li + 1}</div>
                                )}
                              </div>
                            </div>

                            <h4 className={`font-sans font-bold text-sm mb-3 line-clamp-1 ${lesson.locked ? 'text-slate-400' : 'text-slate-800'}`}>
                              {lesson.title}
                            </h4>

                            <div className="flex items-center justify-between text-xs font-sans text-slate-500 pt-2 border-t border-slate-50">
                              <span className="flex items-center gap-1"><Clock size={11} /> {lesson.duration} 分钟</span>
                              <span className="flex items-center gap-1 text-orange-500"><Star size={11} fill="currentColor" /> +{lesson.xp} XP</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </section>
        ) : (
          <div className="card-glass p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-slate-100 to-white border border-slate-200 flex items-center justify-center text-4xl">
              🔒
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">该级别尚未解锁</h3>
            <p className="font-sans text-slate-500 mb-6 max-w-md mx-auto">
              请先完成上一级别的所有课程内容，打好基础后再挑战更高难度哦~
            </p>
            <button onClick={() => {
              const prev = currentLevels.find(l => l.unlocked && l.completedLessons < l.totalLessons);
              if (prev) setSelectedLevel(prev.id);
            }} className="btn-primary">
              <Play size={16} fill="currentColor" /> 继续上一级别学习
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
