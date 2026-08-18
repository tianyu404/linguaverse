import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Globe2, Target, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { LANGUAGES } from '../../data/mockData';

export default function Register() {
  const navigate = useNavigate();
  const register = useAuthStore(s => s.register);
  const setTargetLanguage = useAuthStore(s => s.setTargetLanguage);

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [targetLang, setTargetLang] = useState('en');
  const [showPwd, setShowPwd] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const selectedLang = LANGUAGES.find(l => l.code === targetLang);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('两次输入的密码不一致');
      return;
    }
    if (form.password.length < 6) {
      setError('密码至少需要6位');
      return;
    }
    setLoading(true);
    const ok = await register(form.name, form.email, form.password);
    setLoading(false);
    if (ok) {
      setTargetLanguage(targetLang as any);
      navigate('/onboarding', { replace: true });
    } else {
      setError('注册失败，请检查输入信息');
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient relative overflow-hidden flex items-center py-12">
      <div className="deco-circle" style={{ width: 500, height: 500, top: -120, left: -120, background: 'var(--lavender-400)', opacity: 0.18 }} />
      <div className="deco-circle" style={{ width: 420, height: 420, bottom: -100, right: -80, background: 'var(--sunset-500)', opacity: 0.22 }} />

      <div className="w-full max-w-xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Link to="/" className="flex items-center gap-3 mb-8 justify-center text-white">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Globe2 size={24} />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold">LinguaVerse</h1>
              <p className="text-white/60 text-xs font-sans">沉浸式多语种学习平台</p>
            </div>
          </Link>

          <div className="card-glass p-10 shadow-2xl">
            <h3 className="font-display text-3xl font-bold text-slate-900 mb-2">开启学习之旅</h3>
            <p className="text-slate-500 mb-8 font-sans">创建账号，定制你的专属学习方案</p>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-sans font-semibold text-slate-700 mb-2">昵称</label>
                <div className="relative">
                  <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text" required
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="input-field pl-12"
                    placeholder="如何称呼你？"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-sans font-semibold text-slate-700 mb-2">邮箱地址</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email" required
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="input-field pl-12"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-sans font-semibold text-slate-700 mb-2">密码</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPwd ? 'text' : 'password'} required
                      value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                      className="input-field pl-12 pr-12"
                      placeholder="至少6位"
                    />
                    <button type="button" onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-sans font-semibold text-slate-700 mb-2">确认密码</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPwd ? 'text' : 'password'} required
                      value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })}
                      className="input-field pl-12"
                      placeholder="再次输入"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-sans font-semibold text-slate-700 mb-2">
                  <span className="flex items-center gap-1.5"><Target size={14} /> 选择想学习的语言</span>
                </label>
                <div className="relative">
                  <button type="button" onClick={() => setLangOpen(!langOpen)}
                    className="w-full input-field text-left flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <span className="text-2xl">{selectedLang?.flag}</span>
                      <span className="font-sans font-medium">
                        {selectedLang?.name}（{selectedLang?.nativeName}）
                      </span>
                    </span>
                    <ChevronDown size={18} className={`text-slate-400 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-20"
                    >
                      {LANGUAGES.map(lang => (
                        <button key={lang.code} type="button" onClick={() => { setTargetLang(lang.code); setLangOpen(false); }}
                          className={`w-full px-5 py-3 flex items-center gap-3 hover:bg-slate-50 transition ${targetLang === lang.code ? 'bg-[var(--ocean-50)]' : ''}`}>
                          <span className="text-2xl">{lang.flag}</span>
                          <div className="text-left">
                            <div className="font-sans font-semibold text-slate-800">{lang.name}</div>
                            <div className="text-xs text-slate-500 font-sans">{lang.nativeName} · {lang.learners.toLocaleString()}人学习</div>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>

              {error && <div className="text-red-500 text-sm font-sans bg-red-50 p-3 rounded-xl">{error}</div>}

              <label className="flex items-start gap-3 text-sm text-slate-600 font-sans cursor-pointer">
                <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded border-slate-300 text-orange-500 focus:ring-orange-500" />
                <span>
                  我已阅读并同意<a className="text-[var(--ocean-600)] font-semibold mx-0.5 hover:underline">《服务条款》</a>和<a className="text-[var(--ocean-600)] font-semibold mx-0.5 hover:underline">《隐私政策》</a>
                </span>
              </label>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-base py-4">
                {loading ? '创建账号中...' : (<>创建账号 <ArrowRight size={18} /></>)}
              </button>
            </form>

            <p className="text-center mt-8 text-slate-500 font-sans text-sm">
              已有账号？
              <Link to="/login" className="ml-1.5 text-[var(--ocean-600)] font-bold hover:underline">前往登录 →</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
