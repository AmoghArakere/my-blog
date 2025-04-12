import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// User authentication
export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return null;
  }

  return user;
}

// Generate JWT token
export function generateToken(userId: string) {
  const token = jwt.sign(
    { userId },
    process.env.AUTH_SECRET || 'fallback-secret-key',
    { expiresIn: '7d' }
  );
  
  return token;
}

// Verify JWT token
export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET || 'fallback-secret-key');
    return decoded;
  } catch (error) {
    return null;
  }
}

// Get user by ID
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

// Create post
export async function createPost(
  title: string,
  content: string,
  authorId: string,
  published: boolean = false
) {
  return prisma.post.create({
    data: {
      title,
      content,
      published,
      author: {
        connect: { id: authorId },
      },
    },
  });
}

// Get all posts
export async function getAllPosts(published: boolean = true) {
  return prisma.post.findMany({
    where: { published },
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
}

// Get post by ID
export async function getPostById(id: string) {
  return prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
}

// Update post
export async function updatePost(
  id: string,
  data: { title?: string; content?: string; published?: boolean }
) {
  return prisma.post.update({
    where: { id },
    data,
  });
}

// Delete post
export async function deletePost(id: string) {
  return prisma.post.delete({
    where: { id },
  });
}
