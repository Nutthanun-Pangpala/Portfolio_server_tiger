import { PrismaClient } from "@prisma/client";

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
    imageUrl: null,
    images: ["/projects/smartpayt/1.png","/projects/smartpayt/2.png","/projects/smartpayt/3.png"],
    demoUrl: null,
    githubUrl: null,
    title: "SmartPAYT",
    description:
      "An integrated waste collection and fee payment system built as a LINE OA and web application for Nang Lae Subdistrict Municipality. It streamlines workflows for residents and administrators, using LINE LIFF for easy access. I built the LIFF app for fee payment and waste collection management, implemented the Node.js backend, and managed the MySQL data.",
    technologies: ["React", "Node.js", "MySQL", "LINE LIFF"],
    isFeatured: true,
  },
  {
    slug: "smartbrix",
    role: "Full-stack Developer",
    imageUrl: null,
    images: ["/projects/smartbrix/1.png","/projects/smartbrix/2.png","/projects/smartbrix/3.png"],
    demoUrl: null,
    githubUrl: null,
    title: "SmartBrix",
    description:
      "A construction material calculation system built at CyberPay.Tech. I developed responsive interfaces with React and Next.js, designed the database schema, and implemented backend controllers and APIs with NestJS and Prisma on MySQL.",
    technologies: ["Next.js", "NestJS", "Prisma", "MySQL", "GitLab"],
    isFeatured: true,
  },
  {
    slug: "liberres",
    role: "Full-stack Developer",
    imageUrl: null,
    images: [],
    demoUrl: null,
    githubUrl: null,
    title: "LiberRes",
    description:
      "A mobile application for Mae Fah Luang University students to book library seats and services. Built with Flutter, with a Node.js and MySQL backend.",
    technologies: ["Flutter", "Node.js", "MySQL"],
    isFeatured: false,
  },
  {
    slug: "mfuactivity",
    role: "Front End Developer",
    imageUrl: null,
    images: [],
    demoUrl: null,
    githubUrl: null,
    title: "MFUActivity",
    description:
      "A web application for Mae Fah Luang University students to book activities such as concerts. I worked on the frontend with React, on top of a Node.js and MongoDB backend.",
    technologies: ["React", "Node.js", "MongoDB"],
    isFeatured: false,
  },
  {
    slug: "mangax",
    role: "Full-stack Developer",
    imageUrl: null,
    images: ["/projects/mangax/1.png","/projects/mangax/2.png","/projects/mangax/3.png",],
    demoUrl: null, // TODO: paste your Vercel URL, e.g. "https://....vercel.app"
    githubUrl: null,
    title: "MangaX",
    description:
      "An online manga reading website integrated with the MangaDex API to show manga information, covers and chapters, with a responsive layout for mobile and desktop.",
    technologies: ["React", "Node.js", "MySQL", "MangaDex API"],
    isFeatured: false,
  },
];

const experiences = [
  {
    company: "CyberPay.Tech",
    position: "Full-stack Developer",
    employmentType: null,
    description:
      "Worked on the SmartBrix construction material calculation platform. Built responsive UIs with React and Next.js, designed database schemas and implemented backend controllers and APIs with NestJS and Prisma ORM on MySQL. Managed source control and branching with Git and GitLab, resolving merge conflicts to keep team collaboration smooth.",
    startDate: new Date("2025-06-01"), // TODO: placeholder
    endDate: null as Date | null, // TODO: placeholder
    technologies: ["Next.js", "NestJS", "Prisma", "MySQL", "GitLab"],
  },
  {
    company: "Nang Lae Subdistrict Municipality",
    position: "Full-stack Developer",
    employmentType: "Collaboration",
    description:
      "Collaborated with the municipality to build SmartPAYT, a LINE LIFF application for fee payment and waste collection management, making sure the system met real-world requirements. Implemented the Node.js backend and managed data in MySQL.",
    startDate: new Date("2024-06-01"), // TODO: placeholder
    endDate: new Date("2024-12-01") as Date | null, // TODO: placeholder
    technologies: ["React", "Node.js", "MySQL", "LINE LIFF"],
  },
  {
    company: "Mae Fah Luang University",
    position: "Bachelor of Engineering, Software Engineering",
    employmentType: "Education",
    description:
      "School of Applied Digital Technology. Building a foundation in web design and development, with university projects including LiberRes, MFUActivity and MangaX.",
    startDate: new Date("2022-08-01"), // TODO: confirm month
    endDate: new Date("2026-05-01") as Date | null, // TODO: confirm month
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

async function main() {
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: definedFields(project),
      create: project,
    });
  }

  // Experience has no unique field, so skip any that already exist.
  for (const experience of experiences) {
    const existing = await prisma.experience.findFirst({
      where: { company: experience.company, position: experience.position },
    });

    if (!existing) {
      await prisma.experience.create({ data: experience });
    }
  }

  console.log(
    `Seeded ${projects.length} projects and up to ${experiences.length} experiences.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());