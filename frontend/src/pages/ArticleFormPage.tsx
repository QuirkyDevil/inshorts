import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '../components/layouts/AdminLayout';
import { Article } from '../types';
import { articlesApi } from '../lib/api';

export function ArticleFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    summary: '',
    content: '',
    author: '',
    publishedAt: new Date().toISOString().slice(0, 16) // Format: YYYY-MM-DDThh:mm
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If editing, fetch the article data
    if (isEditMode) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const response = await articlesApi.getById(parseInt(id));
      const article = response.data;

      setFormData({
        title: article.title,
        summary: article.summary,
        content: article.content,
        author: article.author,
        publishedAt: new Date(article.publishedAt).toISOString().slice(0, 16)
      });
    } catch (err) {
      setError('Failed to load article. Please try again.');
      console.error('Error fetching article:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.summary || !formData.content || !formData.author) {
      setError('Please fill out all required fields.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      if (isEditMode && id) {
        await articlesApi.update(parseInt(id), formData);
      } else {
        await articlesApi.create(formData as Omit<Article, 'id'>);
      }

      navigate('/admin/articles');
    } catch (err) {
      setError('Failed to save article. Please try again.');
      console.error('Error saving article:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{isEditMode ? 'Edit Article' : 'Create New Article'}</h2>
      </div>

      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
              Summary * <span className="text-xs text-gray-500">(A brief description of the article)</span>
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="px-2 w-full md:w-1/2 mb-4">
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                Author *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="px-2 w-full md:w-1/2 mb-4">
              <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-700 mb-1">
                Publication Date and Time *
              </label>
              <input
                type="datetime-local"
                id="publishedAt"
                name="publishedAt"
                value={formData.publishedAt}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/articles')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : isEditMode ? 'Update Article' : 'Create Article'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
