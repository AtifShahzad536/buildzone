import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Clock, 
  Calendar, 
  Search, 
  Sparkles, 
  BookOpen, 
  TrendingUp,
  User
} from 'lucide-react';
import { useGetBlogsQuery } from '../../services/api';
import { initialBlogs } from '../../data/blogs';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

export const BlogPreview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: blogsData } = useGetBlogsQuery();

  const blogs = (blogsData && Array.isArray(blogsData) && blogsData.length > 0)
    ? blogsData
    : initialBlogs;

  // Primary featured big blog on the left panel (most recent blog)
  const featuredBlog = blogs[0] || initialBlogs[0];

  // Remaining articles for the right panel search feed
  const sideBlogs = blogs.slice(1);

  // Filtered side blogs based on search input
  const filteredSideBlogs = sideBlogs.filter(blog => {
    const term = searchTerm.toLowerCase();
    const title = (blog.title || '').toLowerCase();
    const category = (blog.category || '').toLowerCase();
    const tags = Array.isArray(blog.tags) ? blog.tags : [];
    return (
      title.includes(term) ||
      category.includes(term) ||
      tags.some(t => String(t).toLowerCase().includes(term))
    );
  });

  return (
    <section className="py-16 sm:py-24 bg-[#0A1128] relative border-t border-slate-800/80">
      <Container>
        <SectionTitle
          badge="Engineering Publications"
          title="Latest Architecture & AI Deep-Dives"
          subtitle="Technical breakdowns, architectural patterns, and battle-tested engineering playbooks written by our senior developers."
          center
        />

        {/* 2-Column Split-Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-12 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT PANEL: 1 Main Featured Large Blog Card (6 Columns) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#00F0FF]">
                Featured Publication
              </span>
            </div>

            <article className="bg-[#0B1528] border border-slate-800 hover:border-[#0066FF] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group flex flex-col justify-between h-full">
              <div>
                {/* Large Cover Image with Badges */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                  <img
                    src={featuredBlog?.featuredImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
                    alt={featuredBlog?.title ? `${featuredBlog.title} publication cover` : "Featured engineering publication"}
                    width="600"
                    height="300"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-[#0B1528]/30 to-transparent"></div>
                  
                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#060B18]/90 backdrop-blur-md rounded-lg shadow-sm border border-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wide text-white">
                      {featuredBlog?.category || 'AI & Architecture'}
                    </span>
                  </div>

                  {/* Read Time & Date Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 text-xs font-sans">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                      <Calendar className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span>{featuredBlog?.publishedDate || 'Recently Published'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                      <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span>{featuredBlog?.readTime || '5 min read'}</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-7">
                  <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white mb-3 group-hover:text-[#00F0FF] transition-colors leading-snug">
                    {featuredBlog?.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6 line-clamp-3">
                    {featuredBlog?.excerpt}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {(Array.isArray(featuredBlog?.tags) ? featuredBlog.tags : []).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-[#070E1C] border border-slate-800 text-slate-300 font-sans text-[11px] font-semibold rounded-md group-hover:border-[#0066FF]/60 group-hover:text-[#00F0FF] transition-colors"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author Row & Read CTA Button */}
              <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0">
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredBlog?.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                      alt={featuredBlog?.author ? `${featuredBlog.author} avatar` : "Author avatar"}
                      width="36"
                      height="36"
                      loading="lazy"
                      decoding="async"
                      className="w-9 h-9 rounded-full object-cover border-2 border-blue-500/40 shadow-xs"
                    />
                    <div>
                      <div className="font-sans text-xs font-bold text-white">
                        {featuredBlog?.author || 'BuildZone Editorial'}
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans">
                        {featuredBlog?.authorRole || 'Senior Engineering Team'}
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${featuredBlog?.slug || featuredBlog?.id}`}
                    className="font-sans text-xs font-bold uppercase tracking-wide text-[#00F0FF] hover:text-cyan-300 inline-flex items-center gap-1.5 group/btn"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT PANEL: 6 Line-Wise Scrollable Cards with Live Filter (6 Columns) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Search Input Bar */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter engineering publications by title or tag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0B1528] border border-slate-800 focus:border-[#0066FF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 font-sans focus:outline-none shadow-sm transition-colors"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* List of Line-Wise Articles */}
            <div className="space-y-2.5">
              {filteredSideBlogs.slice(0, 6).map((blog) => (
                <Link
                  key={blog.id || blog.slug}
                  to={`/blog/${blog.slug || blog.id}`}
                  className="p-3 bg-[#0B1528] border border-slate-800 hover:border-[#0066FF] rounded-xl transition-all duration-200 flex items-center gap-3.5 group shadow-sm hover:shadow-lg hover:bg-[#111E38]"
                >
                  {/* Thumbnail Image */}
                  <div className="w-20 sm:w-24 h-18 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-slate-900 relative">
                    <img
                      src={blog.featuredImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80'}
                      alt={blog.title ? `${blog.title} article cover` : "Article cover thumbnail"}
                      width="96"
                      height="80"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-black/80 backdrop-blur-md rounded text-[9px] font-sans font-bold text-[#00F0FF] uppercase tracking-wide border border-white/10">
                      {blog.category || 'Tech'}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] font-sans text-slate-400 mb-1">
                      <span>{blog.publishedDate || 'Recently Published'}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#00F0FF] font-medium">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{blog.readTime || '5 min read'}</span>
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-[#00F0FF] transition-colors leading-snug line-clamp-2">
                      {blog.title}
                    </h4>

                    <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-sans text-slate-400">
                      <span>By {blog.author || 'BuildZone Editorial'}</span>
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="w-7 h-7 rounded-md bg-[#070E1C] border border-slate-800 group-hover:border-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white flex items-center justify-center text-slate-400 transition-colors shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}

              {filteredSideBlogs.length === 0 && (
                <div className="p-8 text-center bg-[#0B1528] border border-slate-800 rounded-xl text-slate-400 text-xs font-sans">
                  No publications match "{searchTerm}". Try another query or clear search.
                </div>
              )}
            </div>

            {/* View More / All Articles Button */}
            <div className="pt-3">
              <Link to="/blog" className="block">
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  View All Engineering Articles & Case Studies
                </Button>
              </Link>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default BlogPreview;
