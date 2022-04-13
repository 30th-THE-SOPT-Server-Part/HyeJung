import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/post", (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "포스팅 조회 성공",
  });
});

export default router;
