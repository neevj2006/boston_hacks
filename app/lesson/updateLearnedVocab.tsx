"use server"

import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import { neon } from "@neondatabase/serverless";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

export const updateVocab = async () => {
      await db.insert(schema.alreadyLearnedVocab).values([
      {
        word:"cái",
      },
     ]);
    }