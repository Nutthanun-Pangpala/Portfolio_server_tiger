import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

config({ path: '.env.local' });
config(); // .env

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error('ตั้งค่า ADMIN_EMAIL และ ADMIN_PASSWORD ใน .env ก่อน');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });
  console.log(`สร้าง/อัปเดตแอดมิน: ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
