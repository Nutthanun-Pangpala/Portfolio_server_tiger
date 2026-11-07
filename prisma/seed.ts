import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

// NOTE: the resume has no dates for individual projects, so the startDate /
// endDate values below are PLACEHOLDERS. Edit them (or fix them later in
// Prisma Studio) before you publish the site. Only the education range
// (2022-2026) comes from the resume.

type ProjectSeed = {
  slug: string;
  title: string;
  description: string;
  role: string;
  titleTh: string;
  descriptionTh: string;
  roleTh: string;
  technologies: string[];
  isFeatured: boolean;
  imageUrl: string | null;
  images: string[];
  demoUrl: string | null;
  githubUrl: string | null;
};

// imageUrl = card cover, images = gallery on the detail page.
// Put screenshots in the Next.js app at public/projects/<slug>/ and list them
// like "/projects/mangax/1.png". Leave empty until you have them.
// Fields left null / [] are NOT written when re-seeding, so values you set in
// Prisma Studio are never overwritten.
const projects: ProjectSeed[] = [
  {
    slug: "smartpayt",
    role: "Full-stack Developer",
    roleTh: "นักพัฒนา Full-stack",
    imageUrl: null,
    images: [
      "/projects/smartpayt/1.png",
      "/projects/smartpayt/2.png",
      "/projects/smartpayt/3.png",
    ],
    demoUrl: null,
    githubUrl: null,
    title: "SmartPAYT",
    titleTh: "SmartPAYT",
    description:
      "An integrated waste collection and fee payment system built as a LINE OA and web application for Nang Lae Subdistrict Municipality. It streamlines workflows for residents and administrators, using LINE LIFF for easy access. I built the LIFF app for fee payment and waste collection management, implemented the Node.js backend, and managed the MySQL data.",
    descriptionTh:
      "ระบบจัดเก็บขยะและชำระค่าธรรมเนียมแบบครบวงจร พัฒนาเป็น LINE OA และเว็บแอปพลิเคชันให้เทศบาลตำบลนางแล ช่วยให้การทำงานของประชาชนและผู้ดูแลระบบสะดวกขึ้น โดยใช้ LINE LIFF เพื่อให้เข้าถึงได้ง่าย ผมพัฒนาแอป LIFF สำหรับชำระค่าธรรมเนียมและจัดการการจัดเก็บขยะ พัฒนาแบ็กเอนด์ด้วย Node.js และดูแลข้อมูลใน MySQL",
    technologies: ["React", "Node.js", "MySQL", "LINE LIFF"],
    isFeatured: true,
  },
  {
    slug: "smartbrix",
    role: "Full-stack Developer",
    roleTh: "นักพัฒนา Full-stack",
    imageUrl: null,
    images: [
      "/projects/smartbrix/1.png",
      "/projects/smartbrix/2.png",
      "/projects/smartbrix/3.png",
    ],
    demoUrl: null,
    githubUrl: null,
    title: "SmartBrix",
    titleTh: "SmartBrix",
    description:
      "A construction material calculation system built at CyberPay.Tech. I developed responsive interfaces with React and Next.js, designed the database schema, and implemented backend controllers and APIs with NestJS and Prisma on MySQL.",
    descriptionTh:
      "ระบบคำนวณวัสดุก่อสร้างที่พัฒนาที่ CyberPay.Tech ผมพัฒนาหน้าจอแบบ responsive ด้วย React และ Next.js ออกแบบ database schema และพัฒนา controller กับ API ฝั่งแบ็กเอนด์ด้วย NestJS และ Prisma บน MySQL",
    technologies: ["Next.js", "NestJS", "Prisma", "MySQL", "GitLab"],
    isFeatured: true,
  },
  {
    slug: "liberres",
    role: "Full-stack Developer",
    roleTh: "นักพัฒนา Full-stack",
    imageUrl: null,
    images: [],
    demoUrl: null,
    githubUrl: null,
    title: "LiberRes",
    titleTh: "LiberRes",
    description:
      "A mobile application for Mae Fah Luang University students to book library seats and services. Built with Flutter, with a Node.js and MySQL backend.",
    descriptionTh:
      "แอปพลิเคชันมือถือสำหรับนักศึกษามหาวิทยาลัยแม่ฟ้าหลวง ใช้จองที่นั่งและบริการของห้องสมุด พัฒนาด้วย Flutter โดยมีแบ็กเอนด์เป็น Node.js และ MySQL",
    technologies: ["Flutter", "Node.js", "MySQL"],
    isFeatured: false,
  },
  {
    slug: "mfuactivity",
    role: "Front End Developer",
    roleTh: "นักพัฒนา Front-end",
    imageUrl: null,
    images: [],
    demoUrl: null,
    githubUrl: null,
    title: "MFUActivity",
    titleTh: "MFUActivity",
    description:
      "A web application for Mae Fah Luang University students to book activities such as concerts. I worked on the frontend with React, on top of a Node.js and MongoDB backend.",
    descriptionTh:
      "เว็บแอปพลิเคชันสำหรับนักศึกษามหาวิทยาลัยแม่ฟ้าหลวง ใช้จองกิจกรรมต่างๆ เช่น คอนเสิร์ต ผมรับผิดชอบฝั่งฟรอนต์เอนด์ด้วย React ทำงานร่วมกับแบ็กเอนด์ Node.js และ MongoDB",
    technologies: ["React", "Node.js", "MongoDB"],
    isFeatured: false,
  },
  {
    slug: "mangax",
    role: "Full-stack Developer",
    roleTh: "นักพัฒนา Full-stack",
    imageUrl: null,
    images: [
      "/projects/mangax/1.png",
      "/projects/mangax/2.png",
      "/projects/mangax/3.png",
    ],
    demoUrl: null, // TODO: paste your Vercel URL, e.g. "https://....vercel.app"
    githubUrl: null,
    title: "MangaX",
    titleTh: "MangaX",
    description:
      "An online manga reading website integrated with the MangaDex API to show manga information, covers and chapters, with a responsive layout for mobile and desktop.",
    descriptionTh:
      "เว็บไซต์อ่านมังงะออนไลน์ที่เชื่อมต่อกับ MangaDex API เพื่อแสดงข้อมูลมังงะ ปก และรายการตอน รองรับการแสดงผลทั้งมือถือและเดสก์ท็อป",
    technologies: ["React", "Node.js", "MySQL", "MangaDex API"],
    isFeatured: false,
  },
];

type ExperienceSeed = {
  company: string;
  position: string;
  employmentType: string | null;
  description: string;
  companyTh: string;
  positionTh: string;
  employmentTypeTh: string | null;
  descriptionTh: string;
  startDate: Date;
  endDate: Date | null;
  technologies: string[];
};

const experiences: ExperienceSeed[] = [
  {
    company: "CyberPay.Tech",
    position: "Full-stack Developer",
    employmentType: null,
    description:
      "Worked on the SmartBrix construction material calculation platform. Built responsive UIs with React and Next.js, designed database schemas and implemented backend controllers and APIs with NestJS and Prisma ORM on MySQL. Managed source control and branching with Git and GitLab, resolving merge conflicts to keep team collaboration smooth.",
    companyTh: "CyberPay.Tech",
    positionTh: "นักพัฒนา Full-stack",
    employmentTypeTh: null,
    descriptionTh:
      "ทำงานบนแพลตฟอร์มคำนวณวัสดุก่อสร้าง SmartBrix พัฒนาหน้าจอแบบ responsive ด้วย React และ Next.js ออกแบบ database schema และพัฒนา controller กับ API ฝั่งแบ็กเอนด์ด้วย NestJS และ Prisma ORM บน MySQL ดูแล source control และ branching ด้วย Git และ GitLab รวมถึงแก้ merge conflict เพื่อให้ทีมทำงานร่วมกันได้ราบรื่น",
    startDate: new Date("2025-06-01"), // TODO: placeholder
    endDate: null,
    technologies: ["Next.js", "NestJS", "Prisma", "MySQL", "GitLab"],
  },
  {
    company: "Nang Lae Subdistrict Municipality",
    position: "Full-stack Developer",
    employmentType: "Collaboration",
    description:
      "Collaborated with the municipality to build SmartPAYT, a LINE LIFF application for fee payment and waste collection management, making sure the system met real-world requirements. Implemented the Node.js backend and managed data in MySQL.",
    companyTh: "เทศบาลตำบลนางแล",
    positionTh: "นักพัฒนา Full-stack",
    employmentTypeTh: "ความร่วมมือ",
    descriptionTh:
      "ร่วมงานกับเทศบาลเพื่อพัฒนา SmartPAYT แอปพลิเคชัน LINE LIFF สำหรับชำระค่าธรรมเนียมและจัดการการจัดเก็บขยะ โดยให้ระบบตอบโจทย์การใช้งานจริง พัฒนาแบ็กเอนด์ด้วย Node.js และดูแลข้อมูลใน MySQL",
    startDate: new Date("2024-06-01"), // TODO: placeholder
    endDate: new Date("2024-12-01"), // TODO: placeholder
    technologies: ["React", "Node.js", "MySQL", "LINE LIFF"],
  },
  {
    company: "Mae Fah Luang University",
    position: "Bachelor of Engineering, Software Engineering",
    employmentType: "Education",
    description:
      "School of Applied Digital Technology. Building a foundation in web design and development, with university projects including LiberRes, MFUActivity and MangaX.",
    companyTh: "มหาวิทยาลัยแม่ฟ้าหลวง",
    positionTh: "วิศวกรรมศาสตรบัณฑิต สาขาวิศวกรรมซอฟต์แวร์",
    employmentTypeTh: "การศึกษา",
    descriptionTh:
      "สำนักวิชาเทคโนโลยีดิจิทัลประยุกต์ สร้างพื้นฐานด้านการออกแบบและพัฒนาเว็บ พร้อมโปรเจกต์ของมหาวิทยาลัย เช่น LiberRes, MFUActivity และ MangaX",
    startDate: new Date("2022-08-01"), // TODO: confirm month
    endDate: new Date("2026-05-01"), // TODO: confirm month
    technologies: ["React", "Flutter", "Node.js", "MySQL", "MongoDB"],
  },
];

// Drop null / empty values so re-seeding never wipes data added by hand.
function definedFields<T extends object>(value: T) {
  return Object.fromEntries(
    Object.entries(value).filter(
      ([, v]) =>
        v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0),
    ),
  );
}

async function seedContent() {
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: definedFields(project),
      create: project,
    });
  }

  // Experience has no unique field. New rows are created in full; rows that
  // already exist only get their Thai fields filled in, so nothing you edited
  // by hand in the other columns is touched.
  for (const experience of experiences) {
    const existing = await prisma.experience.findFirst({
      where: { company: experience.company, position: experience.position },
    });

    if (!existing) {
      await prisma.experience.create({ data: experience });
    } else {
      await prisma.experience.update({
        where: { id: existing.id },
        data: definedFields({
          companyTh: experience.companyTh,
          positionTh: experience.positionTh,
          employmentTypeTh: experience.employmentTypeTh,
          descriptionTh: experience.descriptionTh,
        }),
      });
    }
  }

  console.log(
    `Seeded ${projects.length} projects and ${experiences.length} experiences.`,
  );
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Missing ADMIN_EMAIL or ADMIN_PASSWORD");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  console.log(`Admin created/updated: ${email}`);
}

async function main() {
  await seedContent();
  await seedAdmin();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());