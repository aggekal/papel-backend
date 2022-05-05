import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  CreateUserInput,
  ForgotUserPasswordInput,
  UpdateUserPasswordInput,
} from "../schema/user.schema";
import {
  createUser,
  findUser,
  updateUserPassword,
  validatePassword,
} from "../service/user.service";
import { nanoid } from "nanoid";
import logger from "../utils/logger";
import config from "config";
import { transporter } from "../utils/mailer";
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function updateUserPasswordHandler(
  req: Request<UpdateUserPasswordInput["body"]>,
  res: Response
) {
  const email = req.body.email;
  console.log(email);
  const user = await validatePassword({
    email: req.body.email,
    password: req.body.oldPassword,
  });
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  console.log(user);
  const userId = user._id;
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hashSync(req.body.password, salt);
  const update = { password: hash };

  try {
    const user = await updateUserPassword({ userId }, update, {
      new: true,
    });
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function forgotUserPasswordHandler(
  req: Request<ForgotUserPasswordInput["body"]>,
  res: Response
) {
  //const userId = req.params._id;
  const email = req.body.email;
  const user = await findUser({ email });
  if (!user) {
    return res.status(404).send("User not found");
  }
  const userId = user._id;
  const newPassword = nanoid();

  req.body.password = newPassword;
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hashSync(req.body.password, salt);
  const update = { password: hash };

  try {
    const user = await updateUserPassword({ userId }, update, {
      new: true,
    });
    if (user) {
      await transporter.sendMail({
        from: "autoreply-exams@hotmail.com",
        to: `${user.email}`,
        subject: "Your password has been changed",
        text: `Hello ${user.name} ${user.surname}. This is your temporary password
        please follow the instructions and use a new one. ${newPassword}`,
      });
    }
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
  return res.status(409);
}
