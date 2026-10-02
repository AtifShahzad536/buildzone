import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Terminal 
} from 'lucide-react';
import { toast } from 'sonner';
import { useGetBlogBySlugQuery } from '../../services/api';
import { initialBlogs } from '../../data/blogs';
import { formatDate } from '../../utils/helpers';
import Container from '../../components/common/Container';
import SectionTitle from '../../components/common/SectionTitle';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import SEOHead from '../../components/common/SEOHead';
import RichTextRenderer from '../../components/common/RichTextRenderer';

export const BlogDetails = () => {
  const { slug } = useParams();
  const { data: apiPost, isLoading, isError, refetch } = useGetBlogBySlugQuery(slug);

  const post = apiPost || initialBlogs.find(b => b.slug === slug || b.id === slug);

  if (isLoading && !post) return <Loader text="Loading article..." fullScreen />;
  if (!post) return <ErrorState message="Article not found." onRetry={refetch} />;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Article link copied to clipboard!");
  };

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        ogType="article"
      />

      <div className="py-12 sm:py-20 bg-[#060B18]">
        <Container>
          {/* Back link */}
          <div className="mb-8">
            <Link
              to="/blog"
              className="font-mono text-xs text-slate-400 hover:text-[#00F0FF] inline-flex items-center gap-1.5 uppercase tracking-wider font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Engineering Blog</span>
            </Link>
          </div>

          <article className="max-w-4xl mx-auto">
            {/* Post Header */}
            <div className="mb-10 text-center">
              <Badge variant="cyan" size="sm" className="mb-4">
                {post.category}
              </Badge>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tight text-white mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-2xl mx-auto mb-8">
                {post.excerpt}
              </p>

              {/* Author & Date Bar */}
              <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-slate-400 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <img
                    src={post.authorAvatar}
                    alt={post.author || "Author avatar"}
                    className="w-8 h-8 object-cover rounded-full border border-[#0066FF]/60"
                  />
                  <div className="text-left">
                    <span className="text-white font-bold block">{post.author}</span>
                    <span className="text-[10px] text-[#00F0FF]">{post.authorRole}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#00F0FF]" />
                  <span>{formatDate(post.publishedDate)}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#00F0FF]" />
                  <span>{post.readTime}</span>
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="px-3 py-1 bg-[#0B1528] border border-slate-800 rounded-xl text-slate-300 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-[16/9] w-full overflow-hidden bg-slate-900 rounded-2xl border border-slate-800 mb-12 shadow-2xl">
              <img
                src={post.featuredImage}
                alt={post.title || "Blog article cover"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Content */}
            <div className="bg-[#0B1528] p-6 sm:p-12 border border-slate-800/90 rounded-2xl shadow-xl text-slate-300">
              {post.content ? (
                <RichTextRenderer content={post.content} />
              ) : (
                <p className="text-slate-400 font-sans italic">
                  Comprehensive article content is being synced from our engineering knowledge repository.
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="pt-8 mt-12 border-t border-slate-800 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-slate-400 font-bold uppercase mr-2">Tags:</span>
              {post.tags?.map((tag) => (
                <Badge key={tag} size="sm" variant="default">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Author Card Footer */}
            <div className="mt-12 p-6 sm:p-8 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-6">
              <img
                src={post.authorAvatar}
                alt={post.author || "Author portrait"}
                className="w-16 h-16 object-cover rounded-full border-2 border-[#0066FF] shrink-0"
              />
              <div className="text-center sm:text-left space-y-1">
                <h2 className="font-display text-base font-bold uppercase text-white">
                  Written by {post.author}
                </h2>
                <p className="font-mono text-xs text-[#00F0FF] font-semibold">{post.authorRole}</p>
                <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
                  Leading applied machine learning, distributed cloud systems, and production software architecture at BuildZone.
                </p>
              </div>
            </div>
          </article>
        </Container>
      </div>
    </>
  );
};

export default BlogDetails;
