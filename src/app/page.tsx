'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import BlogCard from '@/components/ui/BlogCard';
import Button from '@/components/ui/Button';

// Mock data for blog posts
const MOCK_POSTS = [
  {
    id: '1',
    title: 'The Magic of Studio Ghibli Films',
    excerpt: 'Exploring the enchanting world of Hayao Miyazaki and the unique storytelling elements that make Ghibli films so special.',
    date: 'April 10, 2025',
    readTime: '5 min',
  },
  {
    id: '2',
    title: 'Creating Minimalist Designs with Impact',
    excerpt: 'How to achieve powerful visual communication through simplicity and thoughtful design choices.',
    date: 'April 5, 2025',
    readTime: '3 min',
  },
  {
    id: '3',
    title: 'The Art of Storytelling in Web Design',
    excerpt: 'Techniques for creating narrative-driven user experiences that engage visitors and communicate your message effectively.',
    date: 'March 28, 2025',
    readTime: '4 min',
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPosts = MOCK_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 ghibli-header">
            Welcome to Ghibli Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Exploring ideas, sharing knowledge, and building the future
          </p>
          
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search blog posts..."
              className="ghibli-input w-full pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg 
                className="h-5 w-5 text-gray-400" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6 ghibli-header">Latest Blog Posts</h2>
          
          {filteredPosts.length > 0 ? (
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readTime={post.readTime}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                No posts found matching your search.
              </p>
              <Button 
                variant="secondary" 
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </Button>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
