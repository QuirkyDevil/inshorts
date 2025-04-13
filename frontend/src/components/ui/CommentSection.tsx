import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FaTrash, FaUser } from 'react-icons/fa';
import { Comment } from '../../types';
import { commentsApi } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

interface CommentSectionProps {
  articleId: number;
  comments: Comment[];
  onCommentAdded: () => void;
  onCommentDeleted: () => void;
}

export function CommentSection({ articleId, comments, onCommentAdded, onCommentDeleted }: CommentSectionProps) {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !newComment.trim()) return;

    try {
      setIsSubmitting(true);
      await commentsApi.add(articleId, newComment);
      setNewComment('');
      onCommentAdded();
    } catch (error) {
      console.error('Failed to add comment', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!user) return;

    try {
      await commentsApi.delete(commentId);
      onCommentDeleted();
    } catch (error) {
      console.error('Failed to delete comment', error);
    }
  };

  return (
    <div className="mt-8" id="comments">
      <h3 className="text-xl font-bold mb-4">Comments</h3>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-3">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              rows={3}
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <div className="p-4 mb-6 bg-gray-100 rounded-md text-center">
          Please <a href="/login" className="text-red-600 font-medium">login</a> to post a comment.
        </div>
      )}

      {comments.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-gray-50 rounded-md">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <span className="bg-gray-200 p-1 rounded-full">
                    <FaUser className="text-gray-500" />
                  </span>
                  <span className="font-medium text-blue-600">{comment.username || 'Anonymous'}</span>
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>

                {user && (user.id === comment.userId || (user.roles && user.roles.includes('ROLE_ADMIN'))) && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="p-1 text-gray-400 hover:text-red-500"
                    aria-label="Delete comment"
                  >
                    <FaTrash size={14} />
                  </button>
                )}
              </div>
              <p className="mt-2 text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
