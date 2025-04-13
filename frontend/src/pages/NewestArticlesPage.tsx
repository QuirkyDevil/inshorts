import { useState, useEffect } from 'react';
import { ArticleCard } from '../components/ui/ArticleCard';
import { Article } from '../types';
import { articlesApi } from '../lib/api';
import { MainLayout } from '../components/layouts/MainLayout';

export function NewestArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await articlesApi.getNewest();
        setArticles(response.data);
      } catch (err) {
        setError('Failed to load newest articles. Please try again later.');
        console.error('Error fetching newest articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const response = await articlesApi.getNewest();
      setArticles(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to refresh articles. Please try again later.');
      console.error('Error refreshing articles:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Newest Articles</h1>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {loading && !error ? (
          <div className="py-10 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading articles...</p>
          </div>
        ) : !loading && articles.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-gray-600">No articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                onLikeToggle={handleRefresh}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
