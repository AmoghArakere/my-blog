import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime?: string;
  imageUrl?: string;
}

export default function BlogCard({ 
  id, 
  title, 
  excerpt, 
  date, 
  readTime = '3 min', 
  imageUrl 
}: BlogCardProps) {
  return (
    <div className="ghibli-card p-0 mb-8">
      {imageUrl && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 text-primary-dark dark:text-primary-light">
          {title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {date} · {readTime} read
        </p>
        <p className="text-text-main mb-4">
          {excerpt}
        </p>
        <Link 
          href={`/blog/${id}`} 
          className="inline-block ghibli-button"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}
