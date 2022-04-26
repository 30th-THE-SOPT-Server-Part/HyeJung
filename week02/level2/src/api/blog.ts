import { Request, Response } from "express";

const selectPost = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "포스팅 조회 성공",
  });
};

const likePost = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "좋아요 성공",
  });
};

export { selectPost, likePost };
