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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
            FAQ MANAGEMENT
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans pt-1">
            Maintain public pricing, delivery model, and technical questions.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-sm cursor-pointer"
        >
          Add FAQ
        </Button>
      </div>

      <div className="space-y-4">
        {faqs?.map((faq) => (
          <div key={faq.id} className="p-6 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-xl flex items-start justify-between gap-4 hover:border-[#00F0FF]/40 hover:shadow-2xl transition-all">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#00F0FF] bg-[#0066FF]/20 border border-[#00F0FF]/30 px-2 py-0.5 rounded-full font-bold uppercase">{faq.category}</span>
              </div>
              <h2 className="font-display text-base font-bold text-white uppercase">{faq.question}</h2>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed pt-1">{faq.answer}</p>
            </div>
            <button onClick={() => handleDelete(faq.id)} className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer shrink-0">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0B1528] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <h2 className="font-display text-lg font-bold uppercase text-white">Add FAQ</h2>
            <form onSubmit={handleCreate} className="space-y-4 font-sans">
              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-300 font-bold mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={e => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. Do you support dedicated team hiring?"
                  className="w-full bg-[#070E1C] border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg shadow-inner"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-300 font-bold mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Pricing, Technical, Timeline"
                  className="w-full bg-[#070E1C] border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg shadow-inner"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-300 font-bold mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={e => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Detailed clear response for clients..."
                  className="w-full bg-[#070E1C] border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg shadow-inner leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
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
