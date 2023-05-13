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
    const stacy = await prisma.users.upsert({
      where: { email: 'anastasia@journaling.com' },
      update: {},
      create: {
        email: 'anastasia@journaling.com',
        username: 'stationeryStacy',
        password: 'password'
      },
    });
    const dan = await prisma.users.upsert({
      where: { email: 'danny@wheels.com' },
      update: {},
      create: {
        email: 'danny@wheels.com',
        username: 'dan_the_driver',
        password: 'password'
      },
    });
    console.log({ steve, jimmy, mary, rebecca, stacy, dan });
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
    console.table({ steve, jimmy, mary });
  }
  { // Sub Goals
    let id = 0;
    const steve = [];

    steve.push(
      await prisma.sub_goals.upsert({
        where: { id: ++id },
        update: {},
        create: {
          title: 'Visit The Red Sea',
          note: 'I will need to buy a ticket to Egypt.',
          main_goal_id: 1,
          priority: 2,
          due_date: new Date("2024-07-01 00:00:00")
        },
      })
    );
    steve.push(
      await prisma.sub_goals.upsert({
        where: { id: ++id },
        update: {},
        create: {
          title: 'Learn To Scuba Dive',
          note: 'I will need to take scuba diving classes and get some practice.',
          main_goal_id: 1,
          priority: 1,
          due_date: new Date("2023-11-01 00:00:00")
        },
      })
    );
    steve.push(
      await prisma.sub_goals.upsert({
        where: { id: ++id },
        update: {},
        create: {
          title: 'Save Money',
          note: '',
          main_goal_id: 1,
          priority: 1
        },
      })
    );
    steve.push(
      await prisma.sub_goals.upsert({
        where: { id: ++id },
        update: {},
        create: {
          title: 'Reduce needless spending',
          note: 'I should look at where my money is going and see if some of it is being wasted.',
          main_goal_id: 1,
          parent_id: 3,
          priority: 1,
        },
      })
    );
    steve.push(
      await prisma.sub_goals.upsert({
        where: { id: ++id },
        update: {},
        create: {
          title: 'Stop Ordering Takeout',
          note: '',
          main_goal_id: 1,
          parent_id: 4,
          priority: 1,
        },
      })
    );
    steve.push(
      await prisma.sub_goals.upsert({
        where: { id: ++id },
        update: {},
        create: {
          title: 'Delete Uber Eats',
          note: 'If I delete the app from my phone, I\'ll be less inclined to order in.',
          main_goal_id: 1,
          parent_id: 5,
          priority: 1,
        },
      })
    );
    steve.push(
      await prisma.sub_goals.upsert({
        where: { id: ++id },
        update: {},
        create: {
          title: 'Buy Groceries On Sale',
          note: 'Keep an eye out on yellow stickers and maybe look into clipping coupons.',
          main_goal_id: 1,
          parent_id: 4,
          priority: 1,
        },
      })
    );
    steve.push(
      await prisma.sub_goals.upsert({
        where: { id: ++id },
        update: {},
        create: {
          title: 'Cancel Disney+',
          note: 'I rarely watch it, but keep getting billed for it.',
          main_goal_id: 1,
          parent_id: 4,
          priority: 1,
        },
      })
    );
    steve.push(
      await prisma.sub_goals.upsert({
        where: { id: ++id },
        update: {},
        create: {
          title: 'Pick Up Extra Shifts',
          note: 'I can pick up extra shifts at work to earn more.',
          main_goal_id: 1,
          parent_id: 3,
          priority: 1,
        },
      })
    );

    console.log({ steve });
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
