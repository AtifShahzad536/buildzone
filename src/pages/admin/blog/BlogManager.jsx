import React, { useState } from 'react';
import { Plus, Trash2, FileText, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { useGetBlogsQuery, useCreateBlogMutation, useDeleteBlogMutation } from '../../../services/api';
import { slugify, formatDate } from '../../../utils/helpers';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';

export const BlogManager = () => {
  const { data: blogs, isLoading } = useGetBlogsQuery();
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'AI',
    excerpt: '',
    content: '',
    tags: 'AI, Architecture, Scale',
    author: 'Alex Thorne',
    authorRole: 'CEO & Principal Architect',
    readTime: '6 min read',
    featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  });

  if (isLoading) return <Loader text="Loading blog articles..." />;

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const tagArr = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
      await createBlog({
        ...formData,
        slug: slugify(formData.title),
        tags: tagArr
      }).unwrap();

      toast.success("Blog article published!");
      setIsModalOpen(false);
    } catch (e) {
      toast.error("Failed to publish blog");
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete article "${title}"?`)) {
      try {
        await deleteBlog(id).unwrap();
        toast.success("Post removed");
      } catch (e) {
        toast.error("Failed to delete post");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
            BLOG & CONTENT CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
            Publish engineering articles, case breakdowns, and SEO metadata.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-sm"
        >
          New Article
        </Button>
      </div>

      <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-2xs">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] bg-slate-50">
              <th className="py-3 px-4 font-semibold">Title / Author</th>
              <th className="py-3 px-4 font-semibold">Category</th>
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="py-3 px-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {blogs?.map((post) => (
              <tr key={post.id} className="hover:bg-blue-50/40 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-[#0B1938] text-sm">{post.title}</div>
                  <div className="text-[11px] text-[#0066FF] font-medium">By {post.author} • {post.readTime}</div>
                </td>
                <td className="py-3.5 px-4">
                  <Badge variant="cyan" size="sm">{post.category}</Badge>
                </td>
                <td className="py-3.5 px-4 text-slate-700">
                  {formatDate(post.publishedDate)}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button onClick={() => handleDelete(post.id, post.title)} className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-[#0B1938]">Write New Article</h3>
            <form onSubmit={handleCreate} className="space-y-4 font-sans">
              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Scaling Postgres RLS for High-Growth SaaS"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs cursor-pointer font-medium"
                  >
                    <option value="AI">AI</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Short summary for SEO and cards..."
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Content (Markdown / Text)</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full markdown article body..."
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isCreating}>Publish Post</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
