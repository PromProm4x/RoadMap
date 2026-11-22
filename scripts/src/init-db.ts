import { db, initDb, userLearningStateTable } from "@workspace/db";

console.log("Connecting and initializing database...");
await initDb();

console.log("Verifying schema in database...");
const count = await db.select().from(userLearningStateTable).limit(1);
console.log(`Database connected and verified successfully! (Found ${count.length} existing records)`);

process.exit(0);

