import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  { //Users

    const password = '$2b$10$9WiSDFHp93DC4qjUAgHJT.c/NXpstZtTQucamGfyHiG/./AIQYDaS';

    const steve = await prisma.users.upsert({
      where: { email: 'steve@scuba.ca' },
      update: {
        password: password
      },      create: {
        email: 'steve@scuba.ca',
        username: 'scubaSteve',
        password: password
      },
    });
    const jimmy = await prisma.users.upsert({
      where: { email: 'jimmy@watchtower.com' },
      update: {
        password: password
      },
      create: {
        email: 'jimmy@watchtower.com',
        username: 'HendrixJR',
        password: password
      },
    });
    const mary = await prisma.users.upsert({
      where: { email: 'mary@fitness.com' },
      update: {
        password: password
      },
      create: {
        email: 'mary@fitness.com',
        username: 'muscleMary',
        password: password,
        buddy_availability: false
      },
    });
    const rebecca = await prisma.users.upsert({
      where: { email: 'rebecca@literature.ca' },
      update: {
        buddy_id: 5
      },
      create: {
        email: 'rebecca@literature.ca',
        username: 'bookyBecky',
        password: password
      },
    });
    const stacy = await prisma.users.upsert({
      where: { email: 'anastasia@journaling.com' },
      update: {
        buddy_id: 4
      },
      create: {
        email: 'anastasia@journaling.com',
        username: 'stationeryStacy',
        password: password
      },
    });
    await prisma.users.update({
      where: {
        id: 4
      },
      data: {
        buddy_id: 5
      }
    });
    await prisma.users.update({
      where: {
        id: 5
      },
      data: {
        buddy_id: 4
      }
    });
    const dan = await prisma.users.upsert({
      where: { email: 'danny@wheels.com' },
      update: {
        password: password
      },
      create: {
        email: 'danny@wheels.com',
        username: 'dan_the_driver',
        password: password
      },
    });
    const bill = await prisma.users.upsert({
      where: { email: 'lotion@skin.com' },
      update: {
        password: password
      },
      create: {
        email: 'lotion@skin.com',
        username: 'Buffalo_Bill',
        password: password,
        is_deleted: true
      },
    });

    console.log({ steve, jimmy, mary, rebecca, stacy, dan, bill });
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
  { // Interests
    let id = 0;

    //Steve
    // await prisma.interests.upsert({
    //   where: { id: ++id },
    //   update: {},
    //   create: {
    //     user_id: 1,
    //     category_id: 1
    //   },
    // });
    // await prisma.interests.upsert({
    //   where: { id: ++id  },
    //   update: {},
    //   create: {
    //     user_id: 1,
    //     category_id: 2
    //   },
    // });
    // await prisma.interests.upsert({
    //   where: { id: ++id },
    //   update: {},
    //   create: {
    //     user_id: 1,
    //     category_id: 3
    //   },
    // });
    //Jimmy
    await prisma.interests.upsert({
      where: { id: ++id },
      update: {},
      create: {
        user_id: 2,
        category_id: 4
      },
    });
    //Mary
    await prisma.interests.upsert({
      where: { id: ++id },
      update: {},
      create: {
        user_id: 3,
        category_id: 1
      },
    });
    //Rebecca
    await prisma.interests.upsert({
      where: { id: ++id },
      update: {},
      create: {
        user_id: 4,
        category_id: 4
      },
    });
    await prisma.interests.upsert({
      where: { id: ++id },
      update: {},
      create: {
        user_id: 4,
        category_id: 7
      },
    });
    //Stacy
    await prisma.interests.upsert({
      where: { id: ++id },
      update: {},
      create: {
        user_id: 5,
        category_id: 2
      },
    });
    await prisma.interests.upsert({
      where: { id: ++id },
      update: {},
      create: {
        user_id: 5,
        category_id: 4
      },
    });
    //Dan
    await prisma.interests.upsert({
      where: { id: ++id },
      update: {},
      create: {
        user_id: 6,
        category_id: 7
      },
    });
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
        category_id: 3
      },
    });
    const jimmy = await prisma.main_goals.upsert({
      where: { id: ++id },
      update: {},
      create: {
        title: 'Play Bold As Love',
        note: 'I want to learn to play guitar like Jimmi Hendricks and play Bold As Love in front of a live audience.',
        user_id: 2,
        category_id: 4
      },
    });
    const mary = await prisma.main_goals.upsert({
      where: { id: ++id },
      update: {},
      create: {
        title: 'Compete In Triathlon',
        note: 'I want to get back into shape and compete in a triathlon.',
        user_id: 3,
        category_id: 1
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
        }
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
        }
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
        }
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
          priority: 1,
        }
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
          priority: 1,
        }
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
          priority: 1,
          completed_on: new Date('2023-02-13')
        }
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
          priority: 1,
        }
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
          priority: 1,
          completed_on: new Date('2023-05-24')
        }
      })
    );
    steve.push(
      await prisma.sub_goals.upsert({
        where: { id: ++id },
        update: {},
        create: {
          title: 'Pick Up Extra Shifts',
          note: 'I can pick up extra shifts at work to earn more money.',
          main_goal_id: 1,
          priority: 1,
        }
      })
    );

    console.log({ steve });
  }

  { // Goal Relationships
    let id = 0;
    await prisma.goal_relationship.upsert({
      where: { id: ++id },
      update: {},
      create: {
        parent_id: 3,
        child_id: 4
      }
    });
    await prisma.goal_relationship.upsert({
      where: { id: ++id },
      update: {},
      create: {
        parent_id: 4,
        child_id: 5
      }
    });
    await prisma.goal_relationship.upsert({
      where: { id: ++id },
      update: {},
      create: {
        parent_id: 5,
        child_id: 6
      }
    });
    await prisma.goal_relationship.upsert({
      where: { id: ++id },
      update: {},
      create: {
        parent_id: 5,
        child_id: 7
      }
    });
    await prisma.goal_relationship.upsert({
      where: { id: ++id },
      update: {},
      create: {
        parent_id: 4,
        child_id: 8
      }
    });
    await prisma.goal_relationship.upsert({
      where: { id: ++id },
      update: {},
      create: {
        parent_id: 3,
        child_id: 9
      }
    });
  }

  { // Buddy requests
    await prisma.buddy_requests.upsert({
      where: { id: 1 },
      update: {},
      create: {
        from_user: 1,
        to_user: 6,
        request_message: 'Hey! I\'m looking for an accountability buddy. I\'d love to connect! Cheers!'
      }
    });
  }

  { // Messages
    await prisma.messages.upsert({
      where: { id: 1 },
      update: {},
      create: {
        sender_id: 4,
        receiver_id: 5,
        content: "Hi Stacy! Nice to meet you!"
      }
    });
    await prisma.messages.upsert({
      where: { id: 2 },
      update: {},
      create: {
        sender_id: 5,
        receiver_id: 4,
        content: "Likewise! It's a bit awkward looking for an accountability buddy..."
      }
    });
    await prisma.messages.upsert({
      where: { id: 3 },
      update: {},
      create: {
        sender_id: 4,
        receiver_id: 5,
        content: "I know what you mean! But it'll be nice to actually share my progress with someone."
      }
    });
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
