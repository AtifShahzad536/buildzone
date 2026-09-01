import React from 'react';
import { Inbox } from 'lucide-react';
import Button from './Button';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = "No Records Found",
  description = "There are currently no items matching this criteria.",
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 border border-dashed border-slate-300 bg-white rounded-2xl text-center max-w-lg mx-auto shadow-2xs">
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-full text-slate-400 mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-[#0B1938] uppercase tracking-wider mb-2">{title}</h3>
      <p className="text-xs text-slate-600 max-w-sm mb-6">{description}</p>
      {actionText && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
