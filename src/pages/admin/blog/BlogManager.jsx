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
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black font-display uppercase tracking-tight text-white">
            BLOG & CONTENT CMS
          </h1>
          <p className="font-mono text-xs text-slate-400">
            Publish engineering articles, case breakdowns, and SEO metadata.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          New Article
        </Button>
      </div>

      <div className="border border-slate-800 bg-[#080B14] overflow-x-auto">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] bg-[#0E1424]">
              <th className="py-3 px-4">Title / Author</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {blogs?.map((post) => (
              <tr key={post.id} className="hover:bg-[#0E1424]/60">
                <td className="py-3 px-4">
                  <div className="font-bold text-white text-sm">{post.title}</div>
                  <div className="text-[11px] text-cyan-400">By {post.author} • {post.readTime}</div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="cyan" size="sm">{post.category}</Badge>
                </td>
                <td className="py-3 px-4 text-slate-300">
                  {formatDate(post.publishedDate)}
                </td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => handleDelete(post.id, post.title)} className="p-1 text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06080F]/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-[#0E1424] border border-cyan-500/40 p-6 space-y-4 tech-corner-accent shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-white">Write New Article</h3>
            <form onSubmit={handleCreate} className="space-y-3 font-sans">
              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Scaling Postgres RLS for High-Growth SaaS"
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="AI">AI</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Short summary for SEO and cards..."
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Content (Markdown / Text)</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full markdown article body..."
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
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
