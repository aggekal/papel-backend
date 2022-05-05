import { Request, response, Response } from "express";
import {
  createExamInput,
  deleteExamInput,
  getExamQuestionsInput,
  getUserExamQuestionsAndAnswersInput,
  readExamInput,
  updateExamInput,
} from "../schema/exam.schema";
import { findAnswersByUserExam } from "../service/answer.service";
import {
  createExam,
  deleteExam,
  findAndUpdateExam,
  findExam,
} from "../service/exam.service";
import { findQuestion, findQuestions } from "../service/question.service";

export async function createExamHandler(
  req: Request<{}, {}, createExamInput["body"]>,
  res: Response
) {
  const body = req.body;

  const product = await createExam({ ...body });

  return res.send(product);
}
export async function updateExamHandler(
  req: Request<updateExamInput["params"]>,
  res: Response
) {
  const productId = req.params._id;
  const update = req.body;
  const product = await findExam({ productId });
  if (!product) {
    return res.sendStatus(404);
  }
  const updatedProduct = await findAndUpdateExam({ productId }, update, {
    new: true,
  });
  return res.send(updatedProduct);
}
export async function getExamHandler(
  req: Request<readExamInput["params"]>,
  res: Response
) {
  const productId = req.params._id;
  const product = await findExam({ productId });
  if (!product) {
    return res.sendStatus(404);
  }
  res.send(product);
}
export async function deleteExamHandler(
  req: Request<deleteExamInput["params"]>,
  res: Response
) {
  const productId = req.params._id;
  const product = await findExam({ productId });
  if (!product) {
    return res.sendStatus(404);
  }
  await deleteExam({ productId });
  return res.sendStatus(200);
}

export async function getExamQuestionsHandler(
  req: Request<getExamQuestionsInput["params"]>,
  res: Response
) {
  const examId = req.params._id;
  const exam = await findExam({ examId });
  if (exam) {
    const examQuestions = exam.questions;
    const question = await findQuestions({ questions: examQuestions });
    res.send(question);
  }

  if (!examId || !exam) {
    return res.sendStatus(404);
  }
}

export async function getUserExamQuestionsAndAnswersHandler(
  req: Request<getUserExamQuestionsAndAnswersInput["params"]>,
  res: Response
) {
  //get all user answers for given exam
  const userId = req.params.userId;
  const examId = req.params.examId;
  const usersAnswersForExam = await findAnswersByUserExam({
    issuedById: userId,
    examId,
  });
  if (!usersAnswersForExam) {
    return res.sendStatus(404);
  }

  const Ids = usersAnswersForExam.map((obj) => obj.questionId);

  const questions = await findQuestions({ questions: Ids });
  const result: Array<{}> = [];
  questions.forEach((question) => {
    const q_id = question._id as string;
    const correct_ans = usersAnswersForExam.find(
      (answer) => answer.questionId == q_id
    );
    result.push([question, correct_ans]);
  });

  return res.send(result);
}
