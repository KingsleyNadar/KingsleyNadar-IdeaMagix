import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = await login(email);

    setIsSubmitting(false);

    if (success) {
      toast.success('Successfully logged in');
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser?.role === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/instructor');
      }
    } else {
      toast.error('Login failed. Please check your email.');
    }
  };

  return (
    <div className="min-h-screen flex bg-victorian-eggshell font-serif">
      <div className="hidden lg:flex lg:w-1/2 bg-victorian-paper relative overflow-hidden flex-col justify-between p-12 border-r border-victorian-charcoal/20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #C5B358 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-victorian-ink rounded-full flex items-center justify-center border border-victorian-gold/50 shadow-sm">
            <BookOpen className="text-victorian-gold w-5 h-5" />
          </div>
          <span className="text-4xl font-calligraphy text-victorian-ink tracking-wide">IdeaMagix</span>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-serif italic text-victorian-ink leading-tight mb-6 border-b border-victorian-gold/30 pb-4 inline-block">
            Online Lecture Scheduling Module
          </h1>
        </div>

        <div className="relative z-10 text-sm text-victorian-charcoal font-serif italic">
          Made By Kingsley Nadar
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
            <div className="w-10 h-10 bg-victorian-ink rounded-full flex items-center justify-center border border-victorian-gold/50 shadow-sm">
              <BookOpen className="text-victorian-gold w-5 h-5" />
            </div>
            <span className="text-4xl font-calligraphy text-victorian-ink tracking-wide">IdeaMagix</span>
          </div>

          <div className="mb-10 text-center border-b border-victorian-gold/30 pb-6">
            <h2 className="text-4xl font-serif text-victorian-ink mb-2">Welcome</h2>
            <p className="text-victorian-charcoal font-serif italic">Sign in to your account to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-serif text-victorian-ink mb-1.5 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-victorian-charcoal/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-victorian-paper border border-victorian-charcoal/30 rounded-sm focus:outline-none focus:ring-1 focus:ring-victorian-gold focus:border-victorian-gold transition-all text-victorian-ink font-serif shadow-sm"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-victorian-ink hover:bg-victorian-charcoal text-victorian-paper font-serif tracking-widest py-3 px-4 border border-victorian-gold/50 rounded-sm transition-all shadow-sm flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-4 uppercase"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 p-5 bg-victorian-paper rounded-sm border border-victorian-charcoal/20">
            <h4 className="text-xs font-serif text-victorian-charcoal uppercase tracking-widest mb-3 border-b border-victorian-gold/30 pb-2">Demo Credentials</h4>
            <div className="space-y-2 text-sm font-serif">
              <div className="flex justify-between">
                <span className="text-victorian-charcoal">Admin</span>
                <span className="text-victorian-ink italic">admin@example.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-victorian-charcoal">Instructor</span>
                <span className="text-victorian-ink italic">rahul@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
