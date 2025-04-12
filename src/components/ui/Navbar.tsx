import { ReactNode } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  username?: string;
}

export default function Navbar({ username }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-10 backdrop-blur-md bg-background-main/80 border-b border-border-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-dark dark:text-primary-light">
                Ghibli Blog
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {username ? (
              <>
                <Link 
                  href="/create" 
                  className="ghibli-button"
                >
                  Write Post
                </Link>
                <Link 
                  href="/dashboard" 
                  className="text-text-main hover:text-primary-main transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/api/auth/signout" 
                  className="text-text-main hover:text-accent-main transition-colors"
                >
                  Sign Out
                </Link>
              </>
            ) : (
              <Link 
                href="/api/auth/signin" 
                className="ghibli-button"
              >
                Sign In
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
