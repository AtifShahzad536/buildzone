import React, { useState } from 'react';
import { Plus, Trash2, Edit2, FileText, Calendar, Image as ImageIcon, ExternalLink, Sparkles, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { 
  useGetBlogsQuery, 
  useCreateBlogMutation, 
  useUpdateBlogMutation, 
  useDeleteBlogMutation 
} from '../../../services/api';
import { slugify, formatDate } from '../../../utils/helpers';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';
import EmptyState from '../../../components/common/EmptyState';
import ConfirmModal from '../../../components/common/ConfirmModal';
import ImageUpload from '../../../components/common/ImageUpload';
import RichTextEditor from '../../../components/common/RichTextEditor';

export const BlogManager = () => {
  const { data: blogs, isLoading, refetch } = useGetBlogsQuery();
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null, title: '' });

  const initialForm = {
    title: '',
    category: 'AI',
    excerpt: '',
    content: `## Executive Overview\nModern distributed applications require predictable low-latency, autonomous resiliency, and streamlined data processing.\n\n### Core Engineering Highlights\n- High throughput stream processing with Kafka\n- Zero-downtime rolling deployments via Kubernetes\n- Sub-50ms query cache with Redis clustering\n\n> "Building scalable software is not just about frameworks, it's about disciplined system architecture."\n\n\`\`\`javascript\n// Production stream processing handler\nexport const handleStream = async (payload) => {\n  const validated = validateSchema(payload);\n  return await pipeline.dispatch(validated);\n};\n\`\`\`\n\n:::center\n**BuildZone Engineering Architecture • 2026**\n:::\n`,
    tags: 'AI, Architecture, Full-Stack, Scale',
    author: 'Alex Thorne',
    authorRole: 'CEO & Principal Architect',
    readTime: '6 min read',
    featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  };

  const [formData, setFormData] = useState(initialForm);

  if (isLoading) return <Loader text="Loading blog articles..." />;

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post) => {
    const postId = post.id || post._id;
    setEditingId(postId);
    setFormData({
      title: post.title || '',
      category: post.category || 'AI',
      excerpt: post.excerpt || '',
      content: post.content || '',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''),
      author: post.author || 'Alex Thorne',
      authorRole: post.authorRole || 'Principal Architect',
      readTime: post.readTime || '5 min read',
      featuredImage: post.featuredImage || '',
      authorAvatar: post.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tagArr = typeof formData.tags === 'string'
        ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        : formData.tags;

      const payload = {
        ...formData,
        slug: slugify(formData.title),
        tags: tagArr,
      };

      if (editingId) {
        await updateBlog({ id: editingId, ...payload }).unwrap();
        toast.success("Blog article updated successfully!");
      } else {
        await createBlog(payload).unwrap();
        toast.success("New blog article published!");
      }

      setIsModalOpen(false);
      setEditingId(null);
      setFormData(initialForm);
      refetch?.();
    } catch (e) {
      toast.error(editingId ? "Failed to update blog article" : "Failed to publish blog article");
    }
  };

  const handleDeleteClick = (id, title) => {
    setDeleteConfirm({ isOpen: true, id, title });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteBlog(deleteConfirm.id).unwrap();
      toast.success("Article removed successfully");
      setDeleteConfirm({ isOpen: false, id: null, title: '' });
      refetch?.();
    } catch (e) {
      toast.error("Failed to delete article");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
              BLOG & KNOWLEDGE CMS
            </h1>
            <span className="px-2 py-0.5 bg-blue-50 text-[#0066FF] border border-blue-200 text-[10px] font-mono font-bold rounded-full">
              {blogs?.length || 0} ARTICLES
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
            Publish technical whitepapers, architecture articles, and industry insights with rich formatting.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenCreate}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-sm"
        >
          Compose Article
        </Button>
      </div>

      {/* Blog Posts Table */}
      {!blogs || blogs.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No Articles Published Yet"
          description="Create and publish your first technical article to demonstrate thought leadership."
          actionText="Write First Article"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] bg-slate-50">
                  <th className="py-3 px-4 font-semibold w-20">Banner</th>
                  <th className="py-3 px-4 font-semibold">Title & Author</th>
                  <th className="py-3 px-4 font-semibold">Category</th>
                  <th className="py-3 px-4 font-semibold">Published</th>
                  <th className="py-3 px-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogs?.map((post) => {
                  const postId = post.id || post._id;
                  return (
                    <tr key={postId} className="hover:bg-blue-50/40 transition-colors">
                      {/* Thumbnail */}
                      <td className="py-3 px-4 w-20">
                        <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                          {post.featuredImage ? (
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80';
                              }}
                            />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#0B1938] text-sm max-w-md truncate">{post.title}</div>
                        <div className="text-[11px] text-[#0066FF] font-medium">By {post.author} • {post.readTime}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <Badge variant="cyan" size="sm">{post.category}</Badge>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700">
                        {formatDate(post.publishedDate || post.createdAt)}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(post)}
                            className="p-1.5 text-slate-400 hover:text-[#0066FF] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer shrink-0"
                            title="Edit Article"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleDeleteClick(postId, post.title)} 
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                            title="Delete Article"
                            aria-label={`Delete article ${post.title}`}
                          >
                            <Trash2 className="w-4 h-4 inline-block" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Modal with Rich Editor */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-8 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display text-lg font-bold uppercase text-[#0B1938]">
                {editingId ? "Edit Technical Article" : "Compose New Technical Article"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-mono text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 font-sans">
              {/* Featured Header Image */}
              <ImageUpload
                label="Article Header Image *"
                value={formData.featuredImage}
                onChange={(imgUrl) => setFormData({ ...formData, featuredImage: imgUrl })}
                helperText="Upload 16:9 banner image or paste Cloudinary/Unsplash URL"
                aspectRatio="video"
              />

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Scaling Distributed Microservices with Kafka & Kubernetes"
                  className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs cursor-pointer font-medium"
                  >
                    <option value="AI">AI & Machine Learning</option>
                    <option value="SaaS">SaaS Architecture</option>
                    <option value="Web Development">Web Engineering</option>
                    <option value="Mobile Development">Mobile Apps</option>
                    <option value="DevOps">Cloud & DevOps</option>
                    <option value="Security">Enterprise Security</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-medium"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Read Estimate
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={e => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={e => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="AI, Architecture, Scalability, LLM, Cloud"
                  className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Short Excerpt / SEO Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="A concise summary highlighting the engineering insights..."
                  className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-sans leading-relaxed"
                />
              </div>

              {/* Rich Text WYSIWYG & Markdown Editor */}
              <RichTextEditor
                label="Full Article Body (WYSIWYG & Markdown Editor) *"
                value={formData.content}
                onChange={(newContent) => setFormData({ ...formData, content: newContent })}
                placeholder="Write your comprehensive technical article, system diagram breakdown, code snippets..."
                minHeight="380px"
              />

              <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="sm" 
                  isLoading={isCreating || isUpdating}
                >
                  {editingId ? "Save Changes" : "Publish Article"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Article Confirmation"
        message="Are you sure you want to permanently delete this blog article? It will be removed from the public website and archives."
        itemTitle={deleteConfirm.title}
        confirmText="Yes, Delete Article"
        cancelText="Keep Article"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null, title: '' })}
      />
    </div>
  );
};

export default BlogManager;
