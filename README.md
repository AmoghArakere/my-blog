# Ghibli Blog

A minimalistic, Ghibli-themed blog site where only you can write and share your thoughts.

## Features

- **Beautiful Ghibli-themed UI**
  - Custom color palette inspired by Studio Ghibli films
  - Minimalistic design with subtle Ghibli-inspired elements
  - Responsive layout for all devices
  - Light/dark mode toggle

- **Complete Blog Structure**
  - Homepage with blog post listings and search functionality
  - Detailed blog post pages
  - Dashboard for managing your content

- **Secure Authentication System**
  - Login functionality with JWT tokens
  - Protected admin routes
  - Secure content creation endpoints

- **Content Management Functionality**
  - Post creation with HTML formatting support
  - Draft/publish workflow
  - Post editing and deletion capabilities

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma (ORM)
- SQLite (Database)
- NextAuth.js (Authentication)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ghibli-blog.git
cd ghibli-blog
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Edit the `.env` file and add your own values.

4. Set up the database
```bash
npx prisma migrate dev
```

5. Run the development server
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

The easiest way to deploy this application is using [Vercel](https://vercel.com), the platform built by the creators of Next.js.

1. Push your code to a GitHub repository
2. Import the project into Vercel
3. Vercel will detect that you're using Next.js and set up the build configuration automatically
4. Add your environment variables in the Vercel dashboard
5. Deploy!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Inspired by the magical worlds of Studio Ghibli
- Built with love for minimalistic design and thoughtful content sharing
