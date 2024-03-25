import {IBots} from "@/app/lib/definitions";
import {sql} from "@vercel/postgres";
import {cache} from 'react'

export async function selectBotById(id: string) {
  try {
    const data = await sql`SELECT * FROM bots WHERE bots.id = ${id}`;
    
    if (data.rows.length === 0) {
      throw new Error('Bot not found');
    }
    
    return data.rows[0] as IBots;
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}

export const selectBotAll = cache(async() => {
  try {
    const data = await sql`SELECT * FROM bots`;
    return data.rows as IBots[];
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
});

export const fetchBotAll = async() => {
  const bots = await fetch('/api/bots')
}
