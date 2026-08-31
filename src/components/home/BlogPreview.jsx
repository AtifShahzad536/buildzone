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
import { initialBlogs } from '../../data/blogs';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

export const BlogPreview = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Primary featured big blog on the left panel
  const featuredBlog = initialBlogs[0];

  // Remaining articles for the right panel search feed
  const sideBlogs = initialBlogs.slice(1);

  // Filtered side blogs based on search input
  const filteredSideBlogs = sideBlogs.filter(blog => {
    const term = searchTerm.toLowerCase();
    return (
      blog.title.toLowerCase().includes(term) ||
      blog.category.toLowerCase().includes(term) ||
      (blog.tags && blog.tags.some(t => t.toLowerCase().includes(term)))
    );
  });

  return (
    <section className="py-16 sm:py-24 bg-white relative border-t border-slate-200">
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
              <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse"></span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0066FF]">
                Featured Publication
              </span>
            </div>

            <article className="bg-white border border-slate-200 hover:border-[#0066FF] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between h-full">
              <div>
                {/* Large Cover Image with Badges */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                  <img
                    src={featuredBlog.featuredImage}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1938]/85 via-[#0B1938]/20 to-transparent"></div>
                  
                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-md rounded-lg shadow-sm border border-white/40 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#0066FF]" />
                    <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#0B1938]">
                      {featuredBlog.category}
                    </span>
                  </div>

                  {/* Read Time & Date Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 text-xs font-mono">
                    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
                      <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                      <span>{featuredBlog.publishedDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
                      <Clock className="w-3.5 h-3.5 text-cyan-300" />
                      <span>{featuredBlog.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-7">
                  <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-[#0B1938] mb-3 group-hover:text-[#0066FF] transition-colors leading-snug">
                    {featuredBlog.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-6 line-clamp-3">
                    {featuredBlog.excerpt}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {featuredBlog.tags?.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 bg-[#F8FAFC] border border-slate-200 text-slate-700 font-mono text-[10px] font-semibold rounded-md group-hover:border-blue-200 group-hover:text-[#0066FF] transition-colors"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author Row & Read CTA Button */}
              <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredBlog.authorAvatar}
                      alt={featuredBlog.author}
                      className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-xs"
                    />
                    <div>
                      <div className="font-mono text-xs font-bold text-[#0B1938]">
                        {featuredBlog.author}
                      </div>
                      <div className="text-[10.5px] text-slate-500 font-mono">
                        {featuredBlog.authorRole}
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${featuredBlog.slug}`}
                    className="px-4 py-2 bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-lg font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT PANEL: Search Bar + 6 Compact Line-Wise Blogs + View More (6 Columns) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Top Search Bar with Live Filter */}
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 shadow-2xs">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search 60+ engineering articles, AI, Cloud, SaaS..."
                  className="w-full bg-white border border-slate-200 pl-10 pr-4 py-2.5 text-xs text-[#0B1938] placeholder-slate-400 rounded-lg focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all font-sans"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* List of 6 Line-Wise Articles */}
            <div className="space-y-2.5">
              {filteredSideBlogs.slice(0, 6).map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.slug}`}
                  className="p-3 bg-white border border-slate-200 hover:border-[#0066FF] rounded-xl transition-all duration-200 flex items-center gap-3.5 group shadow-2xs hover:shadow-md hover:bg-blue-50/40"
                >
                  {/* Thumbnail Image */}
                  <div className="w-20 sm:w-24 h-18 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-slate-100 relative">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded text-[8.5px] font-mono font-bold text-white uppercase">
                      {blog.category}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 mb-1">
                      <span>{blog.publishedDate}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#0066FF]">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{blog.readTime}</span>
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-xs sm:text-sm text-[#0B1938] group-hover:text-[#0066FF] transition-colors leading-snug line-clamp-2 uppercase">
                      {blog.title}
                    </h4>

                    <div className="flex items-center gap-1.5 mt-1.5 text-[10px] font-mono text-slate-500">
                      <span>By {blog.author}</span>
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="w-7 h-7 rounded-md bg-slate-50 border border-slate-200 group-hover:border-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white flex items-center justify-center text-slate-400 transition-colors shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}

              {filteredSideBlogs.length === 0 && (
                <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-xs font-mono">
                  No publications match "{searchTerm}". Try another query or clear search.
                </div>
              )}
            </div>

            {/* View More / All Articles Button */}
            <div className="pt-2">
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
