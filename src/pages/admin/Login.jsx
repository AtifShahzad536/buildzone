import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Lock, Mail, Shield, ArrowRight, KeyRound } from 'lucide-react';
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
      // Simulate authentication
      await new Promise(r => setTimeout(r, 400));
      const mockUser = {
        id: 'usr-1',
        name: data.role === 'Developer' ? 'Senior Dev' : 'Lead Architect',
        email: data.email,
        role: data.role,
      };
      const mockToken = `mock-jwt-token-${Date.now()}`;

      dispatch(loginSuccess({ user: mockUser, token: mockToken }));
      toast.success(`Logged in as ${data.role}`);
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
        <h2 className="text-xl font-bold font-display uppercase tracking-wider text-white">
          Admin Portal Authentication
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          Sign in to access BuildZone CRM, CMS, and engineering telemetry.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1">
            Role Permission
          </label>
          <select
            {...register('role')}
            className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-cyan-400 focus:outline-none focus:border-cyan-400"
          >
            <option value="Super Admin">Super Admin (All Modules)</option>
            <option value="Admin">Admin</option>
            <option value="Content Manager">Content Manager</option>
            <option value="Sales">Sales (CRM Only)</option>
            <option value="Developer">Developer</option>
          </select>
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              {...register('email')}
              className="w-full bg-[#080B12] border border-slate-800 pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
            <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          </div>
          {errors.email && <p className="font-mono text-[10px] text-rose-400 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1">
            Security Key / Password
          </label>
          <div className="relative">
            <input
              type="password"
              {...register('password')}
              className="w-full bg-[#080B12] border border-slate-800 pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
            <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          </div>
          {errors.password && <p className="font-mono text-[10px] text-rose-400 mt-1">{errors.password.message}</p>}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full"
          isLoading={loading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Authorize Session
        </Button>
      </form>

      {/* Quick Test Demo Credentials Bar */}
      <div className="pt-4 border-t border-slate-800/80">
        <span className="font-mono text-[10px] text-slate-500 uppercase font-bold block mb-2">
          Demo Quick Sign-In:
        </span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => handleQuickRole('Super Admin', 'admin@buildzone.tech')}
            className="px-2 py-1 bg-[#080B12] border border-slate-800 hover:border-cyan-400 text-[10px] font-mono text-slate-300"
          >
            Super Admin
          </button>
          <button
            type="button"
            onClick={() => handleQuickRole('Sales', 'sales@buildzone.tech')}
            className="px-2 py-1 bg-[#080B12] border border-slate-800 hover:border-cyan-400 text-[10px] font-mono text-slate-300"
          >
            Sales CRM
          </button>
          <button
            type="button"
            onClick={() => handleQuickRole('Content Manager', 'editor@buildzone.tech')}
            className="px-2 py-1 bg-[#080B12] border border-slate-800 hover:border-cyan-400 text-[10px] font-mono text-slate-300"
          >
            Content CMS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
