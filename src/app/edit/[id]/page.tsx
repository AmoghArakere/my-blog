'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';

export default function EditPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch post');
        }

        setTitle(data.post.title);
        setContent(data.post.content);
        setIsPublished(data.post.published);
      } catch (error) {
        setMessage({ 
          type: 'error', 
          text: error instanceof Error ? error.message : 'An error occurred while fetching the post' 
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          published: isPublished,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update post');
      }

      setMessage({ type: 'success', text: 'Post updated successfully!' });
      
      // Redirect to dashboard after successful submission
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'An error occurred while updating the post' 
      });
      setIsSubmitting(false);
    }
  };

  const handleSaveAsDraft = async () => {
    setIsPublished(false);
    // Submit the form
    const form = document.getElementById('post-form') as HTMLFormElement;
    form.requestSubmit();
  };

  const handlePublish = async () => {
    setIsPublished(true);
    // Submit the form
    const form = document.getElementById('post-form') as HTMLFormElement;
    form.requestSubmit();
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete post');
      }

      // Redirect to dashboard after successful deletion
      router.push('/dashboard');
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'An error occurred while deleting the post' 
      });
      setIsSubmitting(false);
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
        <h1 className="text-3xl font-bold mb-6 ghibli-header">Edit Blog Post</h1>
        
        {message.text && (
          <div className={`p-4 mb-6 rounded-md ${
            message.type === 'error' 
              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' 
              : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
          }`}>
            {message.text}
          </div>
        )}
        
        <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Post Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="ghibli-input w-full"
              placeholder="Enter a title for your blog post"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Post Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="ghibli-input w-full min-h-[400px]"
              placeholder="Write your blog post content here... HTML formatting is supported."
              disabled={isSubmitting}
            />
            <p className="text-sm text-gray-500 mt-2">
              You can use HTML tags for formatting (e.g., &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;)
            </p>
          </div>
          
          <div className="flex justify-between">
            <Button
              variant="accent"
              type="button"
              disabled={isSubmitting}
              onClick={handleDelete}
            >
              Delete Post
            </Button>
            
            <div className="flex space-x-4">
              <Button
                variant="secondary"
                type="button"
                disabled={isSubmitting}
                onClick={handleSaveAsDraft}
              >
                Save as Draft
              </Button>
              
              <Button
                type="button"
                disabled={isSubmitting}
                onClick={handlePublish}
              >
                {isPublished ? 'Update Published Post' : 'Publish Post'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
