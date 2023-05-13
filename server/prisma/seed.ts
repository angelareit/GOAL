import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  { //Users
    const steve = await prisma.users.upsert({
      where: { email: 'steve@scuba.ca' },
      update: {},
      create: {
        email: 'steve@scuba.ca',
        username: 'scubaSteve',
        password: 'password'
      },
    });
    const jimmy = await prisma.users.upsert({
      where: { email: 'jimmy@watchtower.com' },
      update: {},
      create: {
        email: 'jimmy@watchtower.com',
        username: 'HendricksJR',
        password: 'password'
      },
    });
    const mary = await prisma.users.upsert({
      where: { email: 'mary@fitness.com' },
      update: {},
      create: {
        email: 'mary@fitness.com',
        username: 'muscleMary',
        password: 'password'
      },
    });
    const rebecca = await prisma.users.upsert({
      where: { email: 'rebecca@literature.ca' },
      update: {},
      create: {
        email: 'rebecca@literature.ca',
        username: 'bookyBecky',
        password: 'password'
      },
    });
    console.log({ steve, jimmy, mary, rebecca });
  }
  { //Categories
    const categoryNames = ['Health & Fitness', 'Job & Career', 'Travel', 'Arts', 'Personal Project', 'Education', 'Social'];
    const categories = [];
    for (const name of categoryNames) {
      categories.push(
        await prisma.categories.upsert({
          where: { name: name },
          update: {},
          create: {
            name: name,
          },
        })
      );
    }
    console.table(categories);
  }
  { // Main Goals
    let id = 0;
    const steve = await prisma.main_goals.upsert({
      where: { id: ++id },
      update: {},
      create: {
        title: 'Visit Red Sea Coral Reef',
        note: 'I want to visit the Red Sea coral reef and dive down to look at it up close.',
        user_id: 1,
        category_id: 6
      },
    });
    const jimmy = await prisma.main_goals.upsert({
      where: { id: ++id },
      update: {},
      create: {
        title: 'Play Bold As Love',
        note: 'I want to learn to play guitar like Jimmi Hendricks and play Bold As Love in front of a live audience.',
        user_id: 3,
        category_id: 7
      },
    });
    const mary = await prisma.main_goals.upsert({
      where: { id: ++id },
      update: {},
      create: {
        title: 'Compete In Triathlon',
        note: 'I want to get back into shape and compete in a triathlon.',
        user_id: 4,
        category_id: 8
      },
    });
    console.log({ steve, jimmy, mary });
  }
  
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
