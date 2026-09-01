import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';
import { ADMIN_LOGIN_PATH } from '../config/adminConfig';

export const ProtectedRoute = ({ children, allowedRoles = ['Super Admin', 'Admin'] }) => {
  const location = useLocation();
  const { isAuthenticated, currentRole, user } = useSelector((state) => state.auth);

  const activeRole = currentRole || user?.role;

  if (!isAuthenticated) {
    return <Navigate to={ADMIN_LOGIN_PATH} state={{ from: location }} replace />;
  }

  // Developer or unauthorized role check
  if (activeRole === 'Developer' || (allowedRoles && !allowedRoles.includes(activeRole))) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="p-8 text-center bg-white border border-rose-200 rounded-2xl shadow-xl max-w-md w-full space-y-4">
          <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#0B1938] font-display uppercase tracking-tight">Access Restricted</h3>
          <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
            The BuildZone Admin Panel is strictly reserved for <strong>Authorized Administrators</strong> only. Developer accounts do not have permission to access administration controls.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link to="/" className="w-full">
              <Button variant="secondary" size="md" className="w-full" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Return to Public Website
              </Button>
            </Link>
            <Link to={ADMIN_LOGIN_PATH} className="text-xs text-[#0066FF] hover:underline font-mono font-bold">
              Sign In as Administrator →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
