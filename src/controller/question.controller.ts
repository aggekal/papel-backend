import { Request, Response } from "express";
import { QuestionInput } from "../models/question.model";
import {
  createQuestionInput,
  deleteQuestionInput,
  getQuestionByCategoryInput,
  getQuestionByDifficultyInput,
  getQuestionsByLessonInput,
  readQuestionInput,
  updateQuestionInput,
} from "../schema/question.schema";
import {
  createQuestion,
  deleteQuestion,
  findAndUpdateQuestion,
  findQuestion,
  getQuestionByCategory,
  getQuestionByDifficulty,
  getQuestionsByLesson,
} from "../service/question.service";

export async function createQuestionHandler(
  req: Request<{}, {}, createQuestionInput["body"]>,
  res: Response
) {
  const body = req.body;
  const question = await createQuestion({ ...body } as QuestionInput);

  return res.send(question);
}
export async function updateQuestionHandler(
  req: Request<updateQuestionInput["params"]>,
  res: Response
) {
  const questionId = req.params._id;
  const update = req.body;
  const question = await findQuestion({ questionId });
  if (!question) {
    return res.sendStatus(404);
  }
  const updatedQuestion = await findAndUpdateQuestion({ questionId }, update, {
    new: false,
  });
  return res.send(updatedQuestion);
}
export async function getQuestionHandler(
  req: Request<readQuestionInput["params"]>,
  res: Response
) {
  const questionId = req.params._id;
  const question = await findQuestion({ questionId });
  if (!question) {
    return res.sendStatus(404);
  }
  res.send(question);
}
export async function deleteQuestionHandler(
  req: Request<deleteQuestionInput["params"]>,
  res: Response
) {
  const questionId = req.params._id;
  const question = await findQuestion({ questionId });

  if (!question) {
    return res.sendStatus(404);
  }
  await deleteQuestion({ questionId });
  return res.sendStatus(200);
}

export async function getQuestionByCategoryHandler(
  req: Request<getQuestionByCategoryInput["body"]>,
  res: Response
) {
  const category = req.body.category;
  const lessonId = req.body.lessonId;
  const response = await getQuestionByCategory({ category, lessonId });
  if (response) {
    res.send(response);
  }
}

export async function getQuestionByDifficultyHandler(
  req: Request<getQuestionByDifficultyInput["body"]>,
  res: Response
) {
  const difficulty = req.body.difficulty;
  const lessonId = req.body.lessonId;
  console.log(req.body);
  const response = await getQuestionByDifficulty({ difficulty, lessonId });
  if (response) {
    res.send(response);
  }
}

export async function getQuestionsByLessonHandler(
  req: Request<getQuestionsByLessonInput["params"]>,
  res: Response
) {
  const lessonId = req.params._id;
  const response = await getQuestionsByLesson({ lessonId });
  if (response) {
    res.send(response);
  }
}
