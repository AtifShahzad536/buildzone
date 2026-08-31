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
import { formatDate } from '../../utils/helpers';
import Container from '../../components/common/Container';
import SectionTitle from '../../components/common/SectionTitle';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import SEOHead from '../../components/common/SEOHead';

export const BlogDetails = () => {
  const { slug } = useParams();
  const { data: post, isLoading, isError, refetch } = useGetBlogBySlugQuery(slug);

  if (isLoading) return <Loader text="Loading article..." fullScreen />;
  if (isError || !post) return <ErrorState message="Article not found." onRetry={refetch} />;

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

      <div className="py-12 sm:py-20">
        <Container>
          {/* Back link */}
          <div className="mb-8">
            <Link
              to="/blog"
              className="font-mono text-xs text-slate-500 hover:text-[#0066FF] inline-flex items-center gap-1.5 uppercase tracking-wider font-semibold"
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

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tight text-[#0B1938] mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-2xl mx-auto mb-8">
                {post.excerpt}
              </p>

              {/* Author & Date Bar */}
              <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-slate-500 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-8 h-8 object-cover rounded-full border border-blue-200"
                  />
                  <div className="text-left">
                    <span className="text-[#0B1938] font-bold block">{post.author}</span>
                    <span className="text-[10px] text-[#0066FF]">{post.authorRole}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#0066FF]" />
                  <span>{formatDate(post.publishedDate)}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#0066FF]" />
                  <span>{post.readTime}</span>
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded text-slate-700 hover:text-[#0066FF] hover:border-[#0066FF] flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 rounded-lg border border-slate-200 mb-12">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Content */}
            <div className="font-sans text-slate-700 text-sm sm:text-base leading-relaxed space-y-6 bg-white p-8 sm:p-12 border border-slate-200 rounded-lg shadow-sm">
              {post.content ? (
                <div className="whitespace-pre-line leading-relaxed">
                  {post.content}
                </div>
              ) : (
                <p className="text-slate-500">
                  Comprehensive article content is being synced from our engineering knowledge repository.
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="pt-8 mt-12 border-t border-slate-200 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-slate-500 font-bold uppercase mr-2">Tags:</span>
              {post.tags?.map((tag) => (
                <Badge key={tag} size="sm" variant="default">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Author Card Footer */}
            <div className="mt-12 p-6 sm:p-8 bg-blue-50/50 border border-blue-200 rounded-lg flex flex-col sm:flex-row items-center gap-6">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-16 h-16 object-cover rounded-full border border-blue-400 shrink-0"
              />
              <div className="text-center sm:text-left space-y-1">
                <h4 className="font-display text-base font-bold uppercase text-[#0B1938]">
                  Written by {post.author}
                </h4>
                <p className="font-mono text-xs text-[#0066FF] font-semibold">{post.authorRole}</p>
                <p className="text-xs text-slate-600 font-sans leading-relaxed pt-1">
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
