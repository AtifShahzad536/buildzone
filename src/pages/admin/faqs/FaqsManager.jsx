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
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black font-display uppercase tracking-tight text-white">
            FAQ MANAGEMENT
          </h1>
          <p className="font-mono text-xs text-slate-400">
            Maintain public pricing, delivery model, and technical questions.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add FAQ
        </Button>
      </div>

      <div className="space-y-3">
        {faqs?.map((faq) => (
          <div key={faq.id} className="p-5 bg-[#080B14] border border-slate-800 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase">{faq.category}</span>
              </div>
              <h3 className="font-display text-sm font-bold text-white uppercase">{faq.question}</h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">{faq.answer}</p>
            </div>
            <button onClick={() => handleDelete(faq.id)} className="p-1 text-slate-500 hover:text-rose-400 shrink-0">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06080F]/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0E1424] border border-cyan-500/40 p-6 space-y-4 tech-corner-accent shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-white">Add FAQ</h3>
            <form onSubmit={handleCreate} className="space-y-3 font-sans">
              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={e => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. Do you support dedicated team hiring?"
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Pricing, Technical, Timeline"
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={e => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Detailed clear response for clients..."
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
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
