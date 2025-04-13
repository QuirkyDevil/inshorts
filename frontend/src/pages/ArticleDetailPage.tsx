import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { MainLayout } from '../components/layouts/MainLayout';
import { CommentSection } from '../components/ui/CommentSection';
import { Article, Comment } from '../types';
import { articlesApi, commentsApi } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchArticleData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        // Fetch article
        const articleId = parseInt(id);
        const articleResponse = await articlesApi.getById(articleId);
        setArticle(articleResponse.data);

        // Fetch comments
        const commentsResponse = await commentsApi.getByArticleId(articleId);
        setComments(commentsResponse.data);

        // Check if user has liked this article
        if (user) {
          const likedResponse = await articlesApi.isLiked(articleId);
          setLiked(likedResponse.data.liked);
        }
      } catch (err) {
        setError('Failed to load article. Please try again later.');
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [id, user]);

  const handleLikeToggle = async () => {
    if (!article || !user) return;

    try {
      const response = await articlesApi.toggleLike(article.id);
      setLiked(response.data.liked);

      // Get updated article data to ensure accurate like count
      const articleResponse = await articlesApi.getById(article.id);
      setArticle(articleResponse.data);
    } catch (error) {
      console.error('Failed to toggle like', error);
    }
  };

  const handleCommentAdded = async () => {
    if (!article) return;
    try {
      const response = await commentsApi.getByArticleId(article.id);
      setComments(response.data);
    } catch (error) {
      console.error('Failed to refresh comments', error);
    }
  };

  const handleCommentDeleted = handleCommentAdded;

  if (loading) {
    return (
      <MainLayout>
        <div className="py-10 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading article...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !article) {
    return (
      <MainLayout>
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error || 'Article not found'}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center text-gray-600">
              <span className="font-medium">{article.author}</span>
              <span className="mx-2">•</span>
              <span>
                {formatDistanceToNow(new Date(article.publishedAt), {
                  addSuffix: true,
                })}
              </span>
            </div>

            <button
              onClick={handleLikeToggle}
              className={`flex items-center space-x-1 ${
                user ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}
              disabled={!user}
            >
              {liked ? (
                <FaHeart className="text-red-500 text-xl" />
              ) : (
                <FaRegHeart className="text-xl" />
              )}
              <span>{article.likeCount || 0}</span>
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="text-gray-700">{article.summary}</p>
          </div>

          <div className="prose max-w-none">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="p-6 border-t">
          <CommentSection
            articleId={article.id}
            comments={comments}
            onCommentAdded={handleCommentAdded}
            onCommentDeleted={handleCommentDeleted}
          />
        </div>
      </article>
    </MainLayout>
  );
}
