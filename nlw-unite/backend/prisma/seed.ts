import { prisma } from '../src/lib/prisma'

async function seed() {
  await prisma.event.create({
    data: {
      id: '7ff837f6-5ac6-4e39-b122-c7e9c41c7042',
      title: 'Event 1',
      details: 'Event 1 details',
      slug: 'event-1',
      maximumAttendees: 100,
    }
  })
}

seed().then(() => {
  console.log('Seed completed');
  prisma.$disconnect();
});