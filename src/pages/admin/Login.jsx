import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { loginStart, loginSuccess, loginFailure } from '../../features/auth/authSlice';
import { loginSchema } from '../../utils/validation';
import Button from '../../components/common/Button';
import { ADMIN_BASE_PATH } from '../../config/adminConfig';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || ADMIN_BASE_PATH;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'Super Admin'
    }
  });

  const onSubmit = async (data) => {
    dispatch(loginStart());
    try {
      // Strictly enforce Admin authorization (Reject Developers and non-admins)
      if (data.role === 'Developer' || data.email.toLowerCase().includes('dev')) {
        dispatch(loginFailure("Access Restricted: Developer roles are not authorized."));
        toast.error("Access Denied: Only Administrators are authorized.");
        return;
      }

      // Simulate secure password verification
      await new Promise(r => setTimeout(r, 500));

      // Credential verification
      const validAdminEmails = ['admin@buildzone.tech', 'superadmin@buildzone.tech', 'atif@buildzone.tech'];
      const isValidEmail = validAdminEmails.includes(data.email.trim().toLowerCase()) || data.email.endsWith('@buildzone.tech');
      
      if (!isValidEmail || data.password.length < 6) {
        dispatch(loginFailure("Invalid email or password. Access denied."));
        toast.error("Invalid administrator credentials. Please check your email and password.");
        return;
      }

      const mockUser = {
        id: 'usr-admin-1',
        name: data.role === 'Super Admin' ? 'Principal Executive Admin' : 'System Administrator',
        email: data.email.trim(),
        role: data.role,
      };
      const mockToken = `bz-jwt-token-${Date.now()}`;

      dispatch(loginSuccess({ user: mockUser, token: mockToken }));
      toast.success(`Authenticated successfully as ${data.role}`);
      navigate(from, { replace: true });
    } catch (err) {
      dispatch(loginFailure("Invalid login credentials"));
      toast.error("Failed to authenticate administrator");
    }
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans">
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
              placeholder="e.g. admin@buildzone.tech"
              autoComplete="username"
              {...register('email')}
              className="w-full bg-white border border-slate-300 pl-8 pr-3 py-2 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-medium"
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
              type={showPassword ? "text" : "password"}
              placeholder="Enter your security password"
              autoComplete="current-password"
              {...register('password')}
              className="w-full bg-white border border-slate-300 pl-8 pr-9 py-2 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
            />
            <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
          {errors.password && <p className="font-mono text-[10px] text-rose-600 mt-1">{errors.password.message}</p>}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full shadow-md mt-2"
          isLoading={loading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Authorize Administrator
        </Button>
      </form>
    </div>
  );
};

export default Login;
