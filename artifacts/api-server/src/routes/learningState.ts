import { getAuth } from "@clerk/express";
import { db, userLearningStateTable, eq } from "@workspace/db";
import {
  GetLearningStateResponse,
  SaveLearningStateBody,
  SaveLearningStateResponse,
} from "@workspace/api-zod";
import { Router, type IRouter } from "express";

const router: IRouter = Router();

const emptyLearningState = {
  completedLessonIds: [],
  inProgressLessonIds: [],
  bookmarkedLessonIds: [],
  completedProjectIds: [],
  projectTaskChecks: {},
  quizResults: [],
  dayGoalMinutes: 30,
  activityMinutesByDate: {},
};

router.get("/learning-state", async (req, res): Promise<void> => {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const [record] = await db
    .select({ state: userLearningStateTable.state })
    .from(userLearningStateTable)
    .where(eq(userLearningStateTable.userId, userId))
    .limit(1);

  res.json(GetLearningStateResponse.parse(record?.state ?? emptyLearningState));
});

router.put("/learning-state", async (req, res): Promise<void> => {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const parsed = SaveLearningStateBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [record] = await db
    .insert(userLearningStateTable)
    .values({ userId, state: parsed.data })
    .onConflictDoUpdate({
      target: userLearningStateTable.userId,
      set: { state: parsed.data, updatedAt: new Date() },
    })
    .returning({ state: userLearningStateTable.state });

  res.json(SaveLearningStateResponse.parse(record.state));
});

export default router;
