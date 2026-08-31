import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const { isAuthenticated, currentRole } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentRole)) {
    return (
      <div className="p-8 text-center bg-[#0E1424] border border-rose-900/60 max-w-lg mx-auto mt-12">
        <h3 className="text-lg font-bold text-rose-300 uppercase mb-2">Access Restricted</h3>
        <p className="text-xs text-slate-400 mb-4">
          Your current role (<strong className="text-cyan-400">{currentRole}</strong>) does not have sufficient permissions to view this module.
        </p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
