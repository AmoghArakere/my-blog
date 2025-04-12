import { ReactNode } from 'react';
import Navbar from '@/components/ui/Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="ghibli-cloud ghibli-cloud-1 hidden md:block"></div>
      <div className="ghibli-cloud ghibli-cloud-2 hidden md:block"></div>
      
      <Navbar />
      
      <main className="flex-grow">
        <div className="ghibli-container py-8">
          {children}
        </div>
      </main>
      
      <footer className="bg-primary-dark dark:bg-background-dark py-6">
        <div className="ghibli-container">
          <div className="text-center text-white">
            <p className="mb-2">© {new Date().getFullYear()} Ghibli Blog</p>
            <p className="text-sm opacity-75">A minimalistic Ghibli-themed blog site</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
