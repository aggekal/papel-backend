import { Request, Response } from "express";
import {
  createLessonInput,
  deleteLessonInput,
  readLessonInput,
  updateLessonInput,
} from "../schema/lesson.schema";
import {
  createLesson,
  deleteLesson,
  findAndUpdateLesson,
  findLesson,
  findLessons,
} from "../service/lesson.service";

export async function createLessonHandler(
  req: Request<{}, {}, createLessonInput["body"]>,
  res: Response
) {
  const body = req.body;
  const lesson = await createLesson({ ...body });

  return res.send(lesson);
}
export async function updateLessonHandler(
  req: Request<updateLessonInput["params"]>,
  res: Response
) {
  const lessonId = req.params._id;
  const update = req.body;
  const lesson = await findLesson({ lessonId });
  if (!lesson) {
    return res.sendStatus(404);
  }
  const updatedLesson = await findAndUpdateLesson({ lessonId }, update, {
    new: true,
  });
  return res.send(updatedLesson);
}
export async function getLessonHandler(
  req: Request<readLessonInput["params"]>,
  res: Response
) {
  const lessonId = req.params._id;
  const lesson = await findLesson({ lessonId });
  if (!lesson) {
    return res.sendStatus(404);
  }
  res.send(lesson);
}
export async function deleteLessonHandler(
  req: Request<deleteLessonInput["params"]>,
  res: Response
) {
  const lessonId = req.params._id;
  const lesson = await findLesson({ lessonId });
  if (!lesson) {
    return res.sendStatus(404);
  }

  await deleteLesson({ lessonId });
  return res.sendStatus(200);
}

export async function getLessonsHandler(req: Request, res: Response) {
  const lessons = await findLessons();
  return res.send(lessons);
}
