import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaRegComment } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Article } from '../../types';
import { articlesApi } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

interface ArticleCardProps {
  article: Article;
  onLikeToggle?: () => void;
}

export function ArticleCard({ article, onLikeToggle }: ArticleCardProps) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(article.likeCount || 0);

  useEffect(() => {
    // If user is logged in, check if they've already liked this article
    const checkLikeStatus = async () => {
      if (user) {
        try {
          const response = await articlesApi.isLiked(article.id);
          setLiked(response.data.liked);
        } catch (error) {
          console.error('Failed to check like status', error);
        }
      }
    };

    checkLikeStatus();
  }, [article.id, user]);

  // Update like count when article prop changes
  useEffect(() => {
    setLikeCount(article.likeCount || 0);
  }, [article.likeCount]);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) return;

    try {
      // Toggle like status
      const response = await articlesApi.toggleLike(article.id);
      const isLiked = response.data.liked;
      setLiked(isLiked);

      // Get the updated article to ensure accurate like count
      const articleResponse = await articlesApi.getById(article.id);
      setLikeCount(articleResponse.data.likeCount || 0);

      if (onLikeToggle) {
        onLikeToggle();
      }
    } catch (error) {
      console.error('Failed to toggle like', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/article/${article.id}`} className="block">
        <div className="p-5">
          <h2 className="text-xl font-bold mb-3 text-gray-800">{article.title}</h2>
          <p className="text-gray-600 mb-4">{article.summary}</p>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center">
              <span className="font-medium">{article.author}</span>
              <span className="mx-2">•</span>
              <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleLikeClick}
                className={`flex items-center space-x-1 ${user ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                disabled={!user}
              >
                {liked ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
                <span>{likeCount}</span>
              </button>

              <Link to={`/article/${article.id}#comments`} className="flex items-center space-x-1">
                <FaRegComment />
                <span>Comments</span>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
