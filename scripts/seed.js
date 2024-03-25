const { db } = require('@vercel/postgres');
const { bots, chats, messages } = require('./data');
const bcrypt = require('bcrypt');

async function seedBots(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS bots (
        id VARCHAR(20) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        avatar TEXT NOT NULL,
        signature Boolean NOT NULL
      );
    `;

    console.log(`Created "bots" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      bots.map(async (bot) => {
        return client.sql`
        INSERT INTO bots (id, name, description, avatar, signature)
        VALUES (${bot.botId}, ${bot.name}, ${bot.description}, ${bot.avatar}, ${bot.signature})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} bots`);

    return {
      createTable,
      bots: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding bots:', error);
    throw error;
  }
}

async function seedChat(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "chats" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS chats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id varchar(200) NOT NULL,
    bot_id varchar(200) NOT NULL,
    title VARCHAR(255) NOT NULL,
    last_message_date DATE NOT NULL
  );
`;

    console.log(`Created "chats" table`);

    // Insert data into the "chats" table
    const insertedInvoices = await Promise.all(
      chats.map((chat) => client.sql`
        INSERT INTO chats (user_id, bot_id, title, last_message_date)
        VALUES (${chat.userId}, ${chat.botId}, ${chat.title}, ${chat.lastMessageDate})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} chats`);

    return {
      createTable,
      chats: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding chats:', error);
    throw error;
  }
}

async function seedMessages(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "messages" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS messages (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        chat_id UUID NOT NULL,
        bot_id varchar(200) NOT NULL,
        is_mine BOOLEAN NOT NULL,
        content text NOT NULL
      );
    `;

    console.log(`Created "messages" table`);

    // Insert data into the "messages" table
    const insertedCustomers = await Promise.all(
      messages.map(
        (message) => client.sql`
        INSERT INTO messages (chat_id, bot_id, is_mine, content)
        VALUES (${message.chatId}, ${message.botId}, ${message.isMine}, ${message.content})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} messages`);

    return {
      createTable,
      messages: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding messages:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  // await seedBots(client);
  // await seedChat(client);
  await seedMessages(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
