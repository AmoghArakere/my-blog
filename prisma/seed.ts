import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: process.env.ADMIN_EMAIL,
    },
  });

  if (!existingAdmin) {
    // Create admin user if it doesn't exist
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
    
    await prisma.user.create({
      data: {
        name: 'Admin',
        email: process.env.ADMIN_EMAIL || 'admin@example.com',
        password: hashedPassword,
      },
    });
    
    console.log('Admin user created successfully');
  } else {
    console.log('Admin user already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
