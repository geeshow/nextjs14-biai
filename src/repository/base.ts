import {unstable_noStore as noStore} from "next/dist/server/web/spec-extension/unstable-no-store";
import {sql} from "@vercel/postgres";

export async function findOne<T>(query: string) {
  try {
    const data = await sql`${query}`;
    
    if (data.rows.length === 0) {
      return null;
    }
    
    return data.rows[0] as T;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}
export async function find<T>(query: string) {
  try {
    const data = await sql`${query}`;
    return data.rows as T;
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}
