import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module.js';
import { ExperiencesModule } from './experiences/experiences.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProjectsModule } from './projects/projects.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'], // .env.local = ไฟล์จาก `vercel env pull`
    }),
    PrismaModule,
    AuthModule,
    ProjectsModule,
    ExperiencesModule,
  ],
})
export class AppModule {}
