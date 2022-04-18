import { Request, Response } from "express";

const selectUser = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "유저 조회 성공",
  });
};

export default selectUser;
