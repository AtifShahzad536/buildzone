import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Terminal } from 'lucide-react';
import { useGetBlogsQuery } from '../../services/api';
import { initialBlogs } from '../../data/blogs';
import { formatDate } from '../../utils/helpers';
import Container from '../../components/common/Container';
import Badge from '../../components/common/Badge';
import SEOHead from '../../components/common/SEOHead';

const categories = ['All', 'AI', 'SaaS', 'Architecture', 'Web Development', 'Mobile'];

export const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { data: blogsData, isLoading } = useGetBlogsQuery();
  const blogs = (blogsData && Array.isArray(blogsData) && blogsData.length > 0)
    ? blogsData
    : initialBlogs;

  const filtered = blogs?.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHead
        title="Engineering Blog — Architecture, AI & Scalability"
        description="Deep dives, system design patterns, and case studies written by BuildZone senior engineers and principal architects."
      />

      <div className="py-12 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full mb-4">
              <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                ENGINEERING INSIGHTS
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#0B1938] mb-4">
              ARCHITECTURAL WRITINGS
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Technical deep-dives on distributed system design, LLM orchestration, microservices, and modern frontend engineering.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all rounded-md border ${
                    activeCategory === cat
                      ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-sm'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-[#0066FF] hover:text-[#0066FF]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-300 pl-9 pr-3 py-2 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-md"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Blog Cards Grid */}
          {isLoading && (!blogsData || blogsData.length === 0) ? (
            <div className="py-8">
              <div className="flex flex-col items-center justify-center text-center space-y-3 mb-10">
                <div className="w-10 h-10 border-3 border-blue-100 border-t-[#0066FF] rounded-full animate-spin"></div>
                <p className="font-mono text-xs text-slate-500 tracking-widest uppercase font-semibold">
                  Loading Engineering Articles...
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
                    <div className="aspect-[16/9] w-full bg-slate-100 rounded-md" />
                    <div className="w-3/4 h-5 bg-slate-100 rounded" />
                    <div className="w-full h-12 bg-slate-50 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered?.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-slate-200 hover:border-[#0066FF]/50 rounded-lg transition-all flex flex-col justify-between group overflow-hidden shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={post.featuredImage}
                      alt={post.title || "Blog cover image"}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="cyan" size="sm">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 font-mono text-xs text-slate-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#0066FF]" />
                        <span>{formatDate(post.publishedDate)}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#0066FF]" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold font-display uppercase tracking-tight text-[#0B1938] mb-3 group-hover:text-[#0066FF] transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.authorAvatar}
                      alt={post.author || "Author avatar"}
                      loading="lazy"
                      className="w-7 h-7 object-cover rounded-full border border-blue-200"
                    />
                    <span className="font-mono text-xs text-slate-700 font-bold">{post.author}</span>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="font-mono text-xs font-bold uppercase tracking-wider text-[#0066FF] hover:text-[#0052CC] inline-flex items-center gap-1 group/btn"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default Blog;
