'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// Mock data for blog posts
const MOCK_POSTS = [
  {
    id: '1',
    title: 'The Magic of Studio Ghibli Films',
    content: `
      <p>Studio Ghibli films have captivated audiences worldwide with their unique blend of fantasy, environmental themes, and deeply human stories. Founded by directors Hayao Miyazaki and Isao Takahata, along with producer Toshio Suzuki, Studio Ghibli has created some of the most beloved animated films of all time.</p>
      
      <h2>The Distinctive Ghibli Style</h2>
      
      <p>What makes Ghibli films so special? It's a combination of breathtaking hand-drawn animation, complex characters, and stories that respect the intelligence of their audience. Unlike many animated films that simplify narratives for children, Ghibli films explore nuanced themes like environmentalism, pacifism, feminism, and the complexity of human nature.</p>
      
      <p>The visual style of Ghibli films is immediately recognizable. Lush, detailed backgrounds often depict the natural world with extraordinary attention to detail. The animation of natural elements—wind rustling through grass, water flowing in streams, clouds drifting across the sky—creates a sense of life and movement that feels almost magical.</p>
      
      <h2>Themes and Storytelling</h2>
      
      <p>Many Ghibli films share common themes. The relationship between humans and nature is perhaps the most prominent, with films like "Princess Mononoke" and "Nausicaä of the Valley of the Wind" directly addressing environmental destruction. The consequences of war appear in films like "Grave of the Fireflies" and "Howl's Moving Castle."</p>
      
      <p>Strong female protagonists are another Ghibli hallmark. From Nausicaä to Kiki, Sophie to San, Ghibli films feature complex female characters who drive the narrative through their own agency and determination.</p>
      
      <h2>The Magic of Everyday Life</h2>
      
      <p>Perhaps most distinctively, Ghibli films find magic in the ordinary. Even in fantastical settings, characters perform everyday tasks—cooking, cleaning, working—with a level of detail that grounds the stories in reality. This "magic of the mundane" creates a unique viewing experience where even the most fantastical elements feel somehow possible.</p>
      
      <p>As Miyazaki himself once said, "I've become skeptical of the unwritten rule that just because a boy and girl appear in the same feature, a romance must ensue. Rather, I want to portray a slightly different relationship, one where the two mutually inspire each other to live—if I'm able to, then perhaps I'll be closer to portraying a true expression of love."</p>
      
      <p>This approach to storytelling—finding depth in simplicity, magic in the everyday, and complexity in characters—is what continues to make Studio Ghibli films resonate with audiences around the world.</p>
    `,
    date: 'April 10, 2025',
    author: 'Admin',
    readTime: '5 min',
  },
  {
    id: '2',
    title: 'Creating Minimalist Designs with Impact',
    content: `
      <p>Minimalism in design is often misunderstood as simply "using less" or "making things white." In reality, effective minimalist design is a careful balance of restraint and purpose, where every element serves a function and nothing is superfluous.</p>
      
      <h2>The Philosophy of Less</h2>
      
      <p>At its core, minimalist design embraces the mantra "less is more." This approach focuses on removing unnecessary elements until only what's essential remains. The goal isn't emptiness, but clarity and purpose.</p>
      
      <p>Minimalism emerged as a reaction against excess and ornamentation. In a world of constant visual noise, minimalist design creates space for contemplation and understanding. It allows the truly important elements to stand out.</p>
      
      <h2>Key Principles of Minimalist Design</h2>
      
      <p><strong>Simplicity:</strong> Reduce elements to their essential forms. Eliminate decorative features that don't serve a purpose.</p>
      
      <p><strong>Negative Space:</strong> The empty space around elements is just as important as the elements themselves. Proper use of white space creates rhythm and helps guide the eye.</p>
      
      <p><strong>Limited Color Palette:</strong> Minimalist designs typically use a restricted color palette, often with one accent color to create focus and hierarchy.</p>
      
      <p><strong>Typography:</strong> Clean, legible typography is crucial. Font choices are deliberate and usually limited to one or two families.</p>
      
      <h2>Creating Impact Through Restraint</h2>
      
      <p>The power of minimalist design comes from its ability to communicate clearly without distraction. When done well, it creates immediate impact through careful use of contrast, scale, and positioning.</p>
      
      <p>Consider the classic Swiss poster designs or the work of designers like Dieter Rams. Their work demonstrates how restraint can create designs that are not only visually striking but also timeless.</p>
      
      <p>As Rams famously said, "Good design is as little design as possible. Less, but better – because it concentrates on the essential aspects, and the products are not burdened with non-essentials."</p>
      
      <p>In our digital age, where attention is increasingly fragmented, minimalist design offers a way to cut through the noise and create meaningful connections with users. By focusing on what truly matters, we can create designs that not only look beautiful but also function beautifully.</p>
    `,
    date: 'April 5, 2025',
    author: 'Admin',
    readTime: '3 min',
  },
  {
    id: '3',
    title: 'The Art of Storytelling in Web Design',
    content: `
      <p>Storytelling is perhaps humanity's oldest art form, dating back to cave paintings and oral traditions passed down through generations. Today, this ancient practice has found new expression in the digital realm of web design, where it has become a powerful tool for creating engaging, memorable user experiences.</p>
      
      <h2>Why Storytelling Matters in Web Design</h2>
      
      <p>Humans are naturally wired for stories. We process information more effectively when it's presented as a narrative rather than as disconnected facts. A well-crafted story engages both the emotional and rational parts of our brains, making the experience more memorable and impactful.</p>
      
      <p>In web design, storytelling helps create a cohesive user journey that guides visitors through content in a meaningful way. It transforms a website from a mere collection of pages into an experience that resonates with users and encourages them to take action.</p>
      
      <h2>Elements of Storytelling in Web Design</h2>
      
      <p><strong>Visual Narrative:</strong> Images, illustrations, and videos can tell a story without words. The visual journey should complement and enhance the textual narrative.</p>
      
      <p><strong>User Journey:</strong> The path users take through a website can be structured like a story, with a beginning (homepage), middle (content pages), and end (conversion or call to action).</p>
      
      <p><strong>Consistent Characters:</strong> Whether through mascots, recurring imagery, or consistent voice in copy, characters help users connect emotionally with the brand.</p>
      
      <p><strong>Emotional Design:</strong> Color, typography, and micro-interactions can evoke specific emotions that support the overall narrative.</p>
      
      <h2>Implementing Narrative-Driven Design</h2>
      
      <p>Effective storytelling in web design begins with understanding your audience and what resonates with them. What are their pain points? What motivates them? What kind of story will they find compelling?</p>
      
      <p>Once you understand your audience, you can craft a narrative that speaks directly to them. This might involve:</p>
      
      <p><strong>Parallax Scrolling:</strong> Creating a sense of depth and movement as users scroll through content.</p>
      
      <p><strong>Progressive Disclosure:</strong> Revealing information gradually to maintain interest and create a sense of discovery.</p>
      
      <p><strong>Interactive Elements:</strong> Allowing users to participate in the story through interactive features.</p>
      
      <p>As web designer Jeffrey Zeldman noted, "Content precedes design. Design in the absence of content is not design, it's decoration." The story you tell should be integral to the design, not an afterthought.</p>
      
      <p>By embracing the principles of storytelling, web designers can create experiences that don't just inform or sell, but engage, inspire, and transform. In a digital landscape crowded with information, a well-told story can be the difference between a website that's forgotten and one that leaves a lasting impression.</p>
    `,
    date: 'March 28, 2025',
    author: 'Admin',
    readTime: '4 min',
  }
];

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would be an API call
    const foundPost = MOCK_POSTS.find(p => p.id === id);
    setPost(foundPost);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 mb-2"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="max-w-3xl mx-auto py-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 ghibli-header">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime} read</span>
            <span className="mx-2">•</span>
            <span>By {post.author}</span>
          </div>
        </header>
        
        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Link href="/">
            <Button variant="secondary">
              ← Back to all posts
            </Button>
          </Link>
        </div>
      </article>
    </Layout>
  );
}
