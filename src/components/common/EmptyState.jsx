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
    <div className="flex flex-col items-center justify-center p-10 border border-dashed border-slate-800 bg-[#0B0F19] text-center max-w-lg mx-auto">
      <div className="p-4 bg-slate-900 border border-slate-800 text-slate-500 mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-white uppercase tracking-wider mb-2">{title}</h3>
      <p className="text-xs text-slate-400 max-w-sm mb-6">{description}</p>
      {actionText && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
