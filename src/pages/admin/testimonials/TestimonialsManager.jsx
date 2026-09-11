import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Star, Quote, Sparkles, Building2, User, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  useGetTestimonialsQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation
} from '../../../services/api';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';
import ImageUpload from '../../../components/common/ImageUpload';

export const TestimonialsManager = () => {
  const { data: testimonials, isLoading } = useGetTestimonialsQuery();
  const [createTestimonial, { isLoading: isCreating }] = useCreateTestimonialMutation();
  const [updateTestimonial, { isLoading: isUpdating }] = useUpdateTestimonialMutation();
  const [deleteTestimonial] = useDeleteTestimonialMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialFormState = {
    author: '',
    role: 'Chief Technology Officer',
    company: '',
    quote: '',
    project: '',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    featured: true
  };

  const [formData, setFormData] = useState(initialFormState);

  if (isLoading) return <Loader text="Loading testimonials..." />;

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingId(t.id || t._id);
    setFormData({
      author: t.author || t.clientName || '',
      role: t.role || t.clientRole || '',
      company: t.company || t.clientCompany || '',
      quote: t.quote || '',
      project: t.project || t.projectType || '',
      rating: t.rating || 5,
      avatar: t.avatar || t.clientAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      featured: t.featured !== false
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateTestimonial({ ...formData, id: editingId }).unwrap();
        toast.success("Testimonial updated successfully!");
      } else {
        await createTestimonial(formData).unwrap();
        toast.success("New testimonial published!");
      }
      setIsModalOpen(false);
      setEditingId(null);
    } catch (e) {
      toast.error(editingId ? "Failed to update testimonial" : "Failed to add testimonial");
    }
  };

  const handleDelete = async (id, author) => {
    if (window.confirm(`Delete review from "${author}"?`)) {
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
              TESTIMONIALS & ENDORSEMENTS
            </h1>
            <span className="px-2 py-0.5 bg-blue-50 text-[#0066FF] border border-blue-200 text-[10px] font-mono font-bold rounded-full">
              {testimonials?.length || 0} REVIEWS
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
            Manage client testimonials, verified reviews, executive headshots, and case endorsements.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenAdd}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-sm"
        >
          Add Testimonial
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials?.map((t) => {
          const id = t.id || t._id;
          const author = t.author || t.clientName || 'Anonymous';
          const avatar = t.avatar || t.clientAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

          return (
            <div
              key={id}
              className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group relative"
            >
              <div>
                {/* Top Row: Stars & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < (t.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>
                  {t.project && (
                    <span className="font-mono text-[10px] text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded-md font-semibold border border-blue-100">
                      {t.project}
                    </span>
                  )}
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="w-6 h-6 text-slate-200 absolute -top-2 -left-1 -z-0 opacity-60" />
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed relative z-10 pl-2">
                    "{t.quote}"
                  </p>
                </div>
              </div>

              {/* Author & Controls */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={avatar}
                    alt={author || "Client avatar"}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <div>
                    <span className="text-xs font-bold text-[#0B1938] uppercase block leading-tight">
                      {author}
                    </span>
                    <span className="text-[11px] text-slate-500 block leading-tight">
                      {t.role || t.clientRole}{t.company || t.clientCompany ? ` • ${t.company || t.clientCompany}` : ''}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 text-slate-400 hover:text-[#0066FF] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    title="Edit Review"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(id, author)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white shrink-0">
              <div>
                <h2 className="font-display text-base sm:text-lg font-bold uppercase text-[#0B1938]">
                  {editingId ? 'Edit Client Testimonial' : 'Publish New Testimonial'}
                </h2>
                <span className="text-[10px] font-mono text-slate-400">
                  {editingId ? 'Updating ID: ' + editingId : 'New Endorsement'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer font-bold"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} id="testimonialForm" className="p-6 space-y-4 font-sans text-xs overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-300">
              {/* Avatar Upload */}
              <ImageUpload
                label="Client Headshot / Avatar"
                helperText="Upload PNG, JPG, or SVG avatar (Max 10MB)"
                aspectRatio="avatar"
                value={formData.avatar}
                onChange={(url) => setFormData({ ...formData, avatar: url })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Client Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="e.g. Dr. Arthur Vance"
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Executive Title / Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Chief Technology Officer"
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. MedFlow Global Health"
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Associated Project / Tag
                  </label>
                  <input
                    type="text"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    placeholder="e.g. MedFlow Telehealth"
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Star Rating (1 - 5)
                </label>
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= formData.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-mono text-xs font-bold text-slate-700 ml-2">
                    {formData.rating} Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Endorsement / Quote *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="BuildZone delivered our mission-critical platform ahead of schedule with 99.98% uptime..."
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs leading-relaxed"
                />
              </div>
            </form>

            {/* Sticky Footer */}
            <div className="flex items-center justify-end gap-2 px-6 py-3.5 border-t border-slate-100 bg-slate-50/80 shrink-0">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="testimonialForm"
                variant="primary"
                size="sm"
                isLoading={isCreating || isUpdating}
              >
                {editingId ? 'Save Changes' : 'Publish Testimonial'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsManager;
