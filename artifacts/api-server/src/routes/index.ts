import { Router, type IRouter } from "express";
import healthRouter from "./health";
import learningStateRouter from "./learningState";

const router: IRouter = Router();

router.use(healthRouter);
router.use(learningStateRouter);

export default router;
