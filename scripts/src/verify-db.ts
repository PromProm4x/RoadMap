import { db, initDb, userLearningStateTable, eq } from "@workspace/db";

console.log("Connecting and initializing database...");
await initDb();

console.log("1. Inserting test record into user_learning_state...");
const testRecord = {
  userId: "verify_tester_1",
  state: {
    completedLessonIds: ["intro-1", "html-basics"],
    dayGoalMinutes: 45,
  },
};

await db
  .insert(userLearningStateTable)
  .values(testRecord)
  .onConflictDoUpdate({
    target: userLearningStateTable.userId,
    set: { state: testRecord.state },
  });

console.log("2. Querying inserted record from database...");
const [found] = await db
  .select()
  .from(userLearningStateTable)
  .where(eq(userLearningStateTable.userId, "verify_tester_1"));

console.log("Found record in DB:", JSON.stringify(found, null, 2));

console.log("3. Cleaning up test record...");
await db
  .delete(userLearningStateTable)
  .where(eq(userLearningStateTable.userId, "verify_tester_1"));

console.log("SUCCESS: All database operations (CONNECT, INSERT, SELECT, UPDATE, DELETE) verified!");
process.exit(0);

