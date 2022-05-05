import { Request, Response } from "express";
import { AnswerInput } from "../models/answer.model";
import {
  createAnswerInput,
  deleteAnswerInput,
  readAnswerInput,
  updateAnswerInput,
} from "../schema/answer.schema";
import {
  createAnswer,
  deleteAnswer,
  findAndUpdateAnswer,
  findAnswer,
} from "../service/answer.service";
import { findQuestion } from "../service/question.service";

export async function createAnswerHandler(
  req: Request<{}, {}, createAnswerInput["body"]>,
  res: Response
) {
  const body = req.body;
  const questionId = body.questionId;
  const questionBody = findQuestion({ questionId });
  const answer = await createAnswer({ ...body });

  return res.send(answer);
}
export async function updateAnswerHandler(
  req: Request<updateAnswerInput["params"]>,
  res: Response
) {
  const answerId = req.params._id;
  const update = req.body;
  const answer = await findAnswer({ answerId });
  const newAnswer = { ...update, submitedAt: new Date() };
  if (!answer) {
    return res.sendStatus(404);
  }
  const updatedAnswer = await findAndUpdateAnswer({ answerId }, newAnswer, {
    new: true,
  });
  return res.send(updatedAnswer);
}
export async function getAnswerHandler(
  req: Request<readAnswerInput["params"]>,
  res: Response
) {
  const answerId = req.params._id;
  const answer = await findAnswer({ answerId });
  if (!answer) {
    return res.sendStatus(404);
  }
  res.send(answer);
}
export async function deleteAnswerHandler(
  req: Request<deleteAnswerInput["params"]>,
  res: Response
) {
  const answerId = req.params._id;
  const answer = await findAnswer({ answerId });
  if (!answer) {
    return res.sendStatus(404);
  }
  await deleteAnswer({ answerId });
  return res.sendStatus(200);
}
