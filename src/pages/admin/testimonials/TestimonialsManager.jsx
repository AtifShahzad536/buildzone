import React, { useState } from 'react';
import { Plus, Trash2, Star, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { useGetTestimonialsQuery, useCreateTestimonialMutation, useDeleteTestimonialMutation } from '../../../services/api';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';

export const TestimonialsManager = () => {
  const { data: testimonials, isLoading } = useGetTestimonialsQuery();
  const [createTestimonial, { isLoading: isCreating }] = useCreateTestimonialMutation();
  const [deleteTestimonial] = useDeleteTestimonialMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    author: '',
    role: 'Chief Technology Officer',
    company: '',
    quote: '',
    project: '',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
  });

  if (isLoading) return <Loader text="Loading testimonials..." />;

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createTestimonial(formData).unwrap();
      toast.success("Testimonial added!");
      setIsModalOpen(false);
    } catch (e) {
      toast.error("Failed to add testimonial");
    }
  };

  const handleDelete = async (id, author) => {
    if (window.confirm(`Delete review from ${author}?`)) {
      try {
        await deleteTestimonial(id).unwrap();
        toast.success("Testimonial removed");
      } catch (e) {
        toast.error("Failed to delete review");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black font-display uppercase tracking-tight text-white">
            TESTIMONIALS MANAGER
          </h1>
          <p className="font-mono text-xs text-slate-400">
            Publish verified client feedback and project endorsements.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Testimonial
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials?.map((t) => (
          <div key={t.id} className="p-6 bg-[#080B14] border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-mono text-[10px] text-cyan-400">{t.project}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 italic mb-4">"{t.quote}"</p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white uppercase block">{t.author}</span>
                <span className="text-[11px] text-slate-400">{t.role}, {t.company}</span>
              </div>
              <button
                onClick={() => handleDelete(t.id, t.author)}
                className="p-1 text-slate-500 hover:text-rose-400"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06080F]/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0E1424] border border-cyan-500/40 p-6 space-y-4 tech-corner-accent shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-white">Add Client Review</h3>
            <form onSubmit={handleCreate} className="space-y-3 font-sans">
              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Author Name *</label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={e => setFormData({ ...formData, author: e.target.value })}
                  placeholder="e.g. David Henderson"
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Quote Text *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.quote}
                  onChange={e => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isCreating}>Add Review</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsManager;
