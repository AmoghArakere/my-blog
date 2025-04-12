'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch user data and posts
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call to get the current user
        // For now, we'll simulate a successful response
        setUser({
          name: 'Admin',
          email: 'admin@example.com'
        });
        
        // Mock posts data
        setPosts([
          {
            id: '1',
            title: 'The Magic of Studio Ghibli Films',
            published: true,
            createdAt: new Date('2025-04-10').toISOString(),
          },
          {
            id: '2',
            title: 'Creating Minimalist Designs with Impact',
            published: true,
            createdAt: new Date('2025-04-05').toISOString(),
          },
          {
            id: '3',
            title: 'The Art of Storytelling in Web Design',
            published: true,
            createdAt: new Date('2025-03-28').toISOString(),
          }
        ]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-6"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold ghibli-header">Dashboard</h1>
          <Button onClick={handleLogout} variant="secondary">Sign Out</Button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This is your personal dashboard where you can manage your blog posts.
          </p>
          <Link href="/create">
            <Button>Create New Post</Button>
          </Link>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4 ghibli-header">Your Posts</h2>
          
          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{post.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString()} • 
                      {post.published ? ' Published' : ' Draft'}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="secondary" size="sm">View</Button>
                    </Link>
                    <Link href={`/edit/${post.id}`}>
                      <Button variant="accent" size="sm">Edit</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You haven't created any posts yet.
              </p>
              <Link href="/create">
                <Button>Create Your First Post</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
