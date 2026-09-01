import React, { useState } from 'react';
import { Plus, Trash2, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useGetFaqsQuery, useCreateFaqMutation, useDeleteFaqMutation } from '../../../services/api';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';

export const FaqsManager = () => {
  const { data: faqs, isLoading } = useGetFaqsQuery();
  const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    category: 'General',
    answer: ''
  });

  if (isLoading) return <Loader text="Loading FAQs..." />;

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createFaq(formData).unwrap();
      toast.success("FAQ created!");
      setIsModalOpen(false);
      setFormData({ question: '', category: 'General', answer: '' });
    } catch (e) {
      toast.error("Failed to add FAQ");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this FAQ item?")) {
      try {
        await deleteFaq(id).unwrap();
        toast.success("FAQ deleted");
      } catch (e) {
        toast.error("Failed to delete");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
            FAQ MANAGEMENT
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
            Maintain public pricing, delivery model, and technical questions.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-sm"
        >
          Add FAQ
        </Button>
      </div>

      <div className="space-y-4">
        {faqs?.map((faq) => (
          <div key={faq.id} className="p-6 bg-white border border-slate-200 rounded-xl shadow-2xs flex items-start justify-between gap-4 hover:shadow-md transition-shadow">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#0066FF] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full font-bold uppercase">{faq.category}</span>
              </div>
              <h3 className="font-display text-base font-bold text-[#0B1938] uppercase">{faq.question}</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed pt-1">{faq.answer}</p>
            </div>
            <button onClick={() => handleDelete(faq.id)} className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer shrink-0">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-[#0B1938]">Add FAQ</h3>
            <form onSubmit={handleCreate} className="space-y-4 font-sans">
              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={e => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. Do you support dedicated team hiring?"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Pricing, Technical, Timeline"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={e => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Detailed clear response for clients..."
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isCreating}>Add FAQ</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqsManager;
