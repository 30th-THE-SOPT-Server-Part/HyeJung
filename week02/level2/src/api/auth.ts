import { Request, Response } from "express";

const signUp = (req: Request, res: Response) => {
  return res.status(201).json({
    status: 201,
    message: "회원가입 성공",
  });
}

export default signUp;
