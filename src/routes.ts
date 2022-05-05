import { Express, Request, Response } from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controller/product.controller";
import {
  createLessonHandler,
  deleteLessonHandler,
  getLessonHandler,
  getLessonsHandler,
  updateLessonHandler,
} from "./controller/lesson.controller";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSesionsHandler,
} from "./controller/session.controller";
import {
  createUserHandler,
  forgotUserPasswordHandler,
  updateUserPasswordHandler,
} from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.shema";
import { createSessionSchema } from "./schema/session.schema";
import {
  createUserSchema,
  forgotUserPasswordSchema,
  updateUserPasswordSchema,
} from "./schema/user.schema";
import {
  createLessonSchema,
  deleteLessonSchema,
  getLessonSchema,
  updateLessonSchema,
} from "./schema/lesson.schema";
import {
  createQuestionSchema,
  deleteQuestionSchema,
  getQuestionByCategorySchema,
  getQuestionsByLessonSchema,
  getQuestionSchema,
  updateQuestionSchema,
} from "./schema/question.schema";
import {
  createQuestionHandler,
  deleteQuestionHandler,
  getQuestionByCategoryHandler,
  getQuestionHandler,
  getQuestionsByLessonHandler,
  updateQuestionHandler,
} from "./controller/question.controller";
import {
  createAnswerSchema,
  deleteAnswerSchema,
  getAnswerSchema,
  updateAnswerSchema,
} from "./schema/answer.schema";
import {
  createAnswerHandler,
  deleteAnswerHandler,
  getAnswerHandler,
  updateAnswerHandler,
} from "./controller/answer.controller";
import {
  createExamSchema,
  deleteExamSchema,
  getExamSchema,
  updateExamSchema,
} from "./schema/exam.schema";
import {
  createExamHandler,
  deleteExamHandler,
  getExamHandler,
  getExamQuestionsHandler,
  getUserExamQuestionsAndAnswersHandler,
  updateExamHandler,
} from "./controller/exam.controller";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  app.put(
    "/api/users/changepass",
    validateResource(updateUserPasswordSchema),
    updateUserPasswordHandler
  );
  app.put(
    "/api/users/forgotpass",
    validateResource(forgotUserPasswordSchema),
    forgotUserPasswordHandler
  );
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSesionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);
  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );
  app.get(
    "/api/products/:productId",
    validateResource(getProductSchema),
    getProductHandler
  );
  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );

  //lessons
  app.get(
    "/api/lessons/questions/:_id",
    validateResource(getQuestionsByLessonSchema),
    getQuestionsByLessonHandler
  );

  app.post(
    "/api/lessons",
    validateResource(createLessonSchema),
    createLessonHandler
  );
  app.put(
    "/api/lessons/:_id",
    validateResource(updateLessonSchema),
    updateLessonHandler
  );
  app.get(
    "/api/lessons/:_id",
    validateResource(getLessonSchema),
    getLessonHandler
  );
  app.get("/api/lessons", requireUser, getLessonsHandler);
  app.delete(
    "/api/lessons/:_id",
    validateResource(deleteLessonSchema),
    deleteLessonHandler
  );
  //questions
  app.post(
    "/api/questions",
    validateResource(createQuestionSchema),
    createQuestionHandler
  );
  app.put(
    "/api/questions/:_id",
    validateResource(updateQuestionSchema),
    updateQuestionHandler
  );
  app.get(
    "/api/questions/:_id",
    validateResource(getQuestionSchema),
    getQuestionHandler
  );

  app.delete(
    "/api/questions/:_id",
    validateResource(deleteQuestionSchema),
    deleteQuestionHandler
  );

  app.get(
    "/api/questions/categories/:category",
    validateResource(getQuestionByCategorySchema),
    getQuestionByCategoryHandler
  );
  //answers

  app.post(
    "/api/answers",
    validateResource(createAnswerSchema),
    createAnswerHandler
  );
  app.put(
    "/api/answers/:_id",
    validateResource(updateAnswerSchema),
    updateAnswerHandler
  );
  app.get(
    "/api/answers/:_id",
    validateResource(getAnswerSchema),
    getAnswerHandler
  );
  app.delete(
    "/api/answers/:_id",
    validateResource(deleteAnswerSchema),
    deleteAnswerHandler
  );

  //exams

  app.post("/api/exams", validateResource(createExamSchema), createExamHandler);
  app.put(
    "/api/exams/:_id",
    validateResource(updateExamSchema),
    updateExamHandler
  );
  app.get("/api/exams/:_id", validateResource(getExamSchema), getExamHandler);
  app.delete(
    "/api/exams/:_id",
    validateResource(deleteExamSchema),
    deleteExamHandler
  );

  app.get("/api/questions/exams/:_id", getExamQuestionsHandler);
  app.get(
    "/api/users/exams/answers/:userId&:examId",
    getUserExamQuestionsAndAnswersHandler
  );
}
export default routes;
