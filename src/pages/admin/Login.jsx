import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { loginStart, loginSuccess, loginFailure } from '../../features/auth/authSlice';
import { loginSchema } from '../../utils/validation';
import Button from '../../components/common/Button';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const from = location.state?.from?.pathname || '/admin';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@buildzone.tech',
      password: 'password123',
      role: 'Super Admin'
    }
  });

  const onSubmit = async (data) => {
    dispatch(loginStart());
    try {
      // Strictly enforce Admin authorization (Reject Developers)
      if (data.role === 'Developer' || data.email.includes('dev')) {
        dispatch(loginFailure("Access Restricted: Developer roles are not authorized to access the Admin Panel."));
        toast.error("Access Denied: Only Administrators are authorized.");
        return;
      }

      await new Promise(r => setTimeout(r, 400));
      const mockUser = {
        id: 'usr-admin-1',
        name: data.role === 'Super Admin' ? 'Principal Executive Admin' : 'System Administrator',
        email: data.email,
        role: data.role,
      };
      const mockToken = `mock-jwt-token-${Date.now()}`;

      dispatch(loginSuccess({ user: mockUser, token: mockToken }));
      toast.success(`Authenticated successfully as ${data.role}`);
      navigate(from, { replace: true });
    } catch (err) {
      dispatch(loginFailure("Invalid login credentials"));
      toast.error("Failed to authenticate");
    }
  };

  const handleQuickRole = (role, email) => {
    setValue('role', role);
    setValue('email', email);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold font-display uppercase tracking-tight text-[#0B1938]">
          Administrator Authentication
        </h2>
        <p className="text-xs text-slate-600 font-sans">
          Secured access restricted exclusively to authorized administrators.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
            Admin Role Permission
          </label>
          <select
            {...register('role')}
            className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] font-semibold focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs cursor-pointer"
          >
            <option value="Super Admin">Super Admin (Full Governance)</option>
            <option value="Admin">System Administrator</option>
          </select>
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
            Admin Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              {...register('email')}
              className="w-full bg-white border border-slate-300 pl-8 pr-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
            />
            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
          {errors.email && <p className="font-mono text-[10px] text-rose-600 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
            Security Key / Password
          </label>
          <div className="relative">
            <input
              type="password"
              {...register('password')}
              className="w-full bg-white border border-slate-300 pl-8 pr-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
            />
            <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
          {errors.password && <p className="font-mono text-[10px] text-rose-600 mt-1">{errors.password.message}</p>}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full shadow-md"
          isLoading={loading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Authorize Administrator
        </Button>
      </form>

      {/* Quick Test Demo Credentials Bar */}
      <div className="pt-4 border-t border-slate-200">
        <span className="font-mono text-[10px] text-slate-500 uppercase font-bold block mb-2">
          Administrator Quick Sign-In:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleQuickRole('Super Admin', 'admin@buildzone.tech')}
            className="px-3 py-1.5 bg-blue-50 border border-blue-200 hover:bg-[#0066FF] hover:text-white text-[11px] font-mono text-[#0066FF] font-bold rounded-lg transition-colors cursor-pointer"
          >
            Super Admin
          </button>
          <button
            type="button"
            onClick={() => handleQuickRole('Admin', 'sysadmin@buildzone.tech')}
            className="px-3 py-1.5 bg-slate-100 border border-slate-200 hover:border-[#0066FF] hover:bg-blue-50 text-[11px] font-mono text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer"
          >
            System Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
