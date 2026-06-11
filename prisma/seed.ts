import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.availableSlot.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.video.deleteMany();

  // ─── Seed Available Slots ───────────────────────────────────────────────

  await prisma.availableSlot.createMany({
    data: [
      { date: "2026-06-20", time: "09:00" },
      { date: "2026-06-20", time: "14:00" },
      { date: "2026-06-22", time: "10:00" },
      { date: "2026-06-25", time: "11:00" },
    ],
  });
  console.log("  ✅ Available slots seeded");

  // ─── Seed Videos ────────────────────────────────────────────────────────

  await prisma.video.createMany({
    data: [
      {
        title: "Understanding NeurOptimal®",
        description:
          "A brief introduction to how dynamical neurofeedback works and its benefits for your brain.",
        thumbnail: "/wicare-study.png",
        duration: "3:45",
      },
      {
        title: "Client Experience: Peak Performance",
        description:
          "Hear from an athlete who uses NeurOptimal to stay in the zone and improve focus.",
        thumbnail: "/wicare-focus.png",
        duration: "5:20",
      },
      {
        title: "Stress & Anxiety Relief",
        description:
          "Discover how brain training helped a professional overcome chronic stress naturally.",
        thumbnail: "/wicare-peace.png",
        duration: "4:15",
      },
      {
        title: "Focus and Learning for All Ages",
        description:
          "Learn about improving concentration and regulating emotions in both children and adults.",
        thumbnail: "/wicare-center.png",
        duration: "6:10",
      },
    ],
  });
  console.log("  ✅ Videos seeded");

  // ─── Seed Blog Posts ────────────────────────────────────────────────────

  await prisma.blogPost.createMany({
    data: [
      {
        slug: "understanding-dynamical-neurofeedback",
        title:
          "Understanding Dynamical Neurofeedback: How It Differs from Traditional Methods",
        excerpt:
          "Discover why NeurOptimal®'s non-linear approach to brain training is considered the most advanced and safest form of neurofeedback available today.",
        content: [
          "Neurofeedback has been around for decades, but not all systems are created equal. Traditional, linear neurofeedback requires a practitioner to diagnose a condition and then 'push' the brain into specific states by targeting certain frequencies. While this can be effective, it also carries the risk of side effects if the practitioner pushes the brain too far or in the wrong direction.",
          "Enter NeurOptimal®, a dynamical neurofeedback system. Unlike its predecessors, NeurOptimal® doesn't diagnose or tell the brain what to do. Instead, it acts like a mirror. By monitoring the electrical activity of your brain 256 times per second, it detects any sudden shifts or 'turbulence' and alerts the central nervous system by briefly interrupting the music you are listening to.",
          "This brief pause triggers your brain's natural orienting response. Your brain notices what it was doing just before the pause and, because the brain is inherently self-organizing, it automatically corrects itself. Over time, this helps the brain build resilience and flexibility, leading to better sleep, improved focus, and a profound sense of calm.",
          "Because NeurOptimal® relies on the brain's own wisdom rather than an outside practitioner's protocol, it is entirely non-invasive and 100% safe for everyone, from young children to seniors.",
        ],
        author: "WiCare Team",
        date: "October 12, 2023",
        readTime: "5 min read",
        category: "Neurofeedback",
        image: "/wicare-study.png",
      },
      {
        slug: "managing-stress-in-modern-world",
        title: "Managing Stress in a High-Speed Modern World",
        excerpt:
          "Practical tips and the role of brain training in building resilience against chronic stress and burnout in today's demanding work environments.",
        content: [
          "In our always-on culture, chronic stress has become an epidemic. Our nervous systems are constantly bombarded with notifications, deadlines, and global news, keeping us in a perpetual state of 'fight or flight'. Over time, this chronic activation wears down our bodies and minds, leading to burnout, anxiety, and sleep disorders.",
          "While traditional stress-management techniques like meditation, exercise, and therapy are essential, they often require significant conscious effort—something that is hard to muster when you are already depleted.",
          "This is where brain training offers a unique advantage. Dynamical neurofeedback helps to calm the central nervous system without requiring any active effort from the user. You simply sit in a comfortable chair, listen to relaxing music, and let the software do the work.",
          "By helping the brain return to a more regulated state, individuals often find that they have more capacity to engage in other healthy habits. Their baseline of calm is restored, making the inevitable stressors of modern life much easier to navigate.",
        ],
        author: "Dr. Emmanuel R.",
        date: "November 05, 2023",
        readTime: "7 min read",
        category: "Wellness",
        image: "/wicare-peace.png",
      },
      {
        slug: "neurofeedback-for-peak-athletic-performance",
        title:
          "Finding the Zone: Neurofeedback for Peak Athletic Performance",
        excerpt:
          "How athletes are using brain optimization to improve focus, reduce reaction times, and maintain emotional control during high-pressure competitions.",
        content: [
          "At the highest levels of sports, physical abilities are often relatively equal among competitors. The deciding factor between winning and losing usually comes down to the mind. Athletes need to maintain intense focus, manage performance anxiety, and recover quickly from mistakes.",
          "Neurofeedback is increasingly being used by elite athletes to gain a mental edge. By training the brain to operate more efficiently, athletes can enter 'the zone' or a state of flow more easily.",
          "A well-regulated nervous system also means better sleep and faster recovery, which are critical for physical performance. When the brain is not wasting energy on anxiety or stress, it can direct more resources toward physical healing and coordination.",
          "Whether you are a professional athlete or a weekend warrior, brain training can help you perform at your best by ensuring your mind is working for you, not against you.",
        ],
        author: "WiCare Team",
        date: "December 18, 2023",
        readTime: "6 min read",
        category: "Performance",
        image: "/wicare-focus.png",
      },
      {
        slug: "improving-focus-and-learning-in-children",
        title: "Supporting Your Child's Focus and Learning Naturally",
        excerpt:
          "Explore non-invasive strategies, including dynamical neurofeedback, to help children manage anxiety and improve concentration at school.",
        content: [
          "Many children today struggle with attention issues, hyperactivity, and emotional regulation. For parents, navigating these challenges can be overwhelming, especially when trying to find solutions that don't rely heavily on medication.",
          "NeurOptimal® offers a gentle, non-invasive alternative. Because it requires no conscious effort and is entirely passive, children find the sessions easy and even enjoyable. They can watch a visualizer, read a book, or even take a nap while the system works.",
          "As the child's brain learns to self-regulate, parents and teachers often notice significant improvements in focus, behavior, and emotional stability. Children become better equipped to handle frustrations, sit still in class, and engage with their learning materials.",
          "It's about giving the developing brain the feedback it needs to find its own best path, laying a strong foundation for future success and well-being.",
        ],
        author: "Aline U.",
        date: "January 22, 2024",
        readTime: "4 min read",
        category: "Family",
        image: "/wicare-center.png",
      },
    ],
  });
  console.log("  ✅ Blog posts seeded");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
