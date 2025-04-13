import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaNewspaper, FaChartLine, FaHeart } from 'react-icons/fa';
import { AdminLayout } from '../components/layouts/AdminLayout';
import { articlesApi } from '../lib/api';
import { Article } from '../types';

export function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalArticles: 0,
    recentArticles: 0,
    totalLikes: 0,
  });

  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const articlesResponse = await articlesApi.getAll();
        const articles = articlesResponse.data;

        // Get articles from the last 7 days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const recentArticlesList = articles.filter(
          article => new Date(article.publishedAt) >= oneWeekAgo
        );

        // Calculate total likes
        const totalLikes = articles.reduce((sum, article) => sum + (article.likeCount || 0), 0);

        setStats({
          totalArticles: articles.length,
          recentArticles: recentArticlesList.length,
          totalLikes: totalLikes,
        });

        // Get most recent articles (up to 5)
        const sortedArticles = [...articles].sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );

        setRecentArticles(sortedArticles.slice(0, 5));
      } catch (err) {
        setError('Failed to load dashboard data. Please try again.');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                  <FaNewspaper size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Articles</p>
                  <h3 className="text-2xl font-bold">{stats.totalArticles}</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                  <FaChartLine size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Articles This Week</p>
                  <h3 className="text-2xl font-bold">{stats.recentArticles}</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 text-red-500 mr-4">
                  <FaHeart size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Likes</p>
                  <h3 className="text-2xl font-bold">{stats.totalLikes}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Articles */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold">Recent Articles</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {recentArticles.length === 0 ? (
                <p className="p-4 text-gray-500 text-center">No articles found</p>
              ) : (
                recentArticles.map(article => (
                  <div key={article.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{article.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{article.summary.substring(0, 100)}...</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <span className="font-medium">{article.author}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                          <span className="mx-2">•</span>
                          <span className="flex items-center">
                            <FaHeart className="text-red-500 mr-1" size={12} />
                            {article.likeCount || 0}
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/admin/articles/edit/${article.id}`}
                        className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 bg-gray-50 border-t">
              <Link
                to="/admin/articles"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                View All Articles →
              </Link>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
