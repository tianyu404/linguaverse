import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Globe2, Home, BookOpen, BarChart3, Users, Trophy, Sparkles, Menu, X, Flame, LogOut, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const navItems = [
  { to: '/dashboard', label: '学习中心', icon: Home },
  { to: '/courses', label: '分级课程', icon: BookOpen },
  { to: '/progress', label: '学习进度', icon: BarChart3 },
  { to: '/community', label: '学习社区', icon: Users },
  { to: '/achievements', label: '成就中心', icon: Trophy },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore(s => s.user);
  const logout = useAuthStore(s => s.logout);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/30">
            <Globe2 size={22} className="text-white" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-slate-900 leading-none">LinguaVerse</h1>
            <p className="text-[10px] font-sans text-slate-500 tracking-wide">LANGUAGE · CULTURE · CONNECTION</p>
          </div>
        </Link>

        {/* Nav Links - Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = location.pathname.startsWith(item.to);
            return (
              <Link key={item.to} to={user ? item.to : '/login'}
                className={`px-4 py-2.5 rounded-xl font-sans text-sm font-semibold flex items-center gap-2 transition
                  ${active ? 'text-[var(--ocean-700)] bg-[var(--ocean-50)]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/50">
                <Flame size={17} className="text-orange-500" />
                <span className="font-sans text-sm font-bold text-orange-600">{user.streak}天</span>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200/60">
                <Sparkles size={16} className="text-[var(--ocean-600)]" />
                <span className="font-sans text-sm font-bold text-[var(--ocean-700)]">Lv.{user.level}</span>
              </div>

              {/* User Avatar */}
              <div className="relative">
                <button onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--ocean-500)] to-[var(--ocean-700)] flex items-center justify-center text-lg">
                    {user.avatar}
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-bold text-slate-800 font-sans leading-tight">{user.name}</div>
                    <div className="text-[10px] text-slate-500 font-sans">{user.xp.toLocaleString()} XP</div>
                  </div>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <div className="font-sans font-bold text-slate-800">{user.name}</div>
                      <div className="text-xs text-slate-500 font-sans">{user.email}</div>
                    </div>
                    <button className="w-full px-4 py-2.5 text-left text-sm font-sans text-slate-700 hover:bg-slate-50 flex items-center gap-3">
                      <UserIcon size={16} /> 个人资料
                    </button>
                    <Link to="/progress" onClick={() => setMenuOpen(false)}
                      className="w-full px-4 py-2.5 text-left text-sm font-sans text-slate-700 hover:bg-slate-50 flex items-center gap-3">
                      <BarChart3 size={16} /> 学习报告
                    </Link>
                    <Link to="/achievements" onClick={() => setMenuOpen(false)}
                      className="w-full px-4 py-2.5 text-left text-sm font-sans text-slate-700 hover:bg-slate-50 flex items-center gap-3">
                      <Trophy size={16} /> 我的成就
                    </Link>
                    <div className="border-t border-slate-100 mt-2 pt-2">
                      <button onClick={() => { logout(); setMenuOpen(false); navigate('/'); }}
                        className="w-full px-4 py-2.5 text-left text-sm font-sans text-red-600 hover:bg-red-50 flex items-center gap-3">
                        <LogOut size={16} /> 退出登录
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden sm:block btn-outline !py-2.5 !px-5 text-sm">登录</Link>
              <Link to="/register" className="btn-primary !py-2.5 !px-5 text-sm">免费开始</Link>
            </>
          )}

          {/* Mobile toggle */}
          <button className="lg:hidden p-2 rounded-xl hover:bg-slate-100" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = location.pathname.startsWith(item.to);
            return (
              <Link key={item.to} to={user ? item.to : '/login'} onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-xl font-sans text-base font-semibold flex items-center gap-3
                  ${active ? 'text-[var(--ocean-700)] bg-[var(--ocean-50)]' : 'text-slate-700 hover:bg-slate-50'}`}>
                <Icon size={19} />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
