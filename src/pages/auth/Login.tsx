import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Globe2, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore(s => s.login);
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } else {
      setError('登录失败，请检查邮箱或密码（密码至少6位）');
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient relative overflow-hidden flex items-center">
      {/* Decorative shapes */}
      <div className="deco-circle" style={{ width: 500, height: 500, top: -120, right: -120, background: 'var(--sunset-500)', opacity: 0.18 }} />
      <div className="deco-circle" style={{ width: 400, height: 400, bottom: -100, left: -80, background: 'var(--ocean-400)', opacity: 0.3 }} />
      
      <div className="absolute top-16 left-16 text-white/70 animate-float-slow">
        <Globe2 size={34} />
      </div>
      <div className="absolute top-40 right-24 text-white/60 animate-float" style={{ animationDelay: '0.5s' }}>
        <Sparkles size={28} />
      </div>
      <div className="absolute bottom-32 left-1/3 text-white/50 animate-float" style={{ animationDelay: '1s' }}>
        <span className="text-4xl">🌸</span>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="text-white hidden lg:block"
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Globe2 size={26} className="text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">LinguaVerse</h1>
              <p className="text-white/60 text-sm font-sans">沉浸式多语种学习平台</p>
            </div>
          </div>

          <h2 className="font-display text-5xl font-bold leading-tight mb-6">
            推开语言世界的<br />
            <span className="bg-gradient-to-r from-orange-300 to-amber-200 bg-clip-text text-transparent">大门</span>
          </h2>
          <p className="text-white/75 text-lg mb-10 max-w-md leading-relaxed">
            与全球百万学习者一起，在沉浸式的旅程中掌握英语、日语、韩语等多种语言。每一次坚持，都让你离世界更近一步。
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-md">
            <div className="card-glass-dark p-4 text-center">
              <div className="num-display text-3xl mb-1 text-white">50万+</div>
              <div className="text-white/60 text-xs font-sans">活跃学习者</div>
            </div>
            <div className="card-glass-dark p-4 text-center">
              <div className="num-display text-3xl mb-1 text-white">6+</div>
              <div className="text-white/60 text-xs font-sans">语种覆盖</div>
            </div>
            <div className="card-glass-dark p-4 text-center">
              <div className="num-display text-3xl mb-1 text-white">96%</div>
              <div className="text-white/60 text-xs font-sans">学习坚持率</div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="card-glass p-10 shadow-2xl">
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <Globe2 size={22} className="text-white" />
              </div>
              <h1 className="font-display text-xl font-bold text-slate-900">LinguaVerse</h1>
            </div>

            <h3 className="font-display text-3xl font-bold text-slate-900 mb-2">欢迎回来</h3>
            <p className="text-slate-500 mb-8 font-sans">继续你的语言学习之旅</p>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-sans font-semibold text-slate-700 mb-2">邮箱地址</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email" required
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="input-field pl-12"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-sans font-semibold text-slate-700 mb-2">密码</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPwd ? 'text' : 'password'} required
                    value={password} onChange={e => setPassword(e.target.value)}
                    className="input-field pl-12 pr-12"
                    placeholder="至少6位字符"
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm font-sans">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500" />
                  记住登录
                </label>
                <a className="text-[var(--ocean-600)] font-semibold hover:underline cursor-pointer">忘记密码？</a>
              </div>

              {error && <div className="text-red-500 text-sm font-sans bg-red-50 p-3 rounded-xl">{error}</div>}

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-base py-4">
                {loading ? '登录中...' : (<>登 录 <ArrowRight size={18} /></>)}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-sm text-slate-400 font-sans">或使用其他方式</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button className="btn-outline !p-3 justify-center text-lg">🍎</button>
              <button className="btn-outline !p-3 justify-center text-lg">🔵</button>
              <button className="btn-outline !p-3 justify-center text-lg">💚</button>
            </div>

            <p className="text-center mt-8 text-slate-500 font-sans text-sm">
              还没有账号？
              <Link to="/register" className="ml-1.5 text-[var(--ocean-600)] font-bold hover:underline">立即注册 →</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
