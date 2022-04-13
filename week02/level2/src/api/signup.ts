import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.status(201).json({
    status: 201,
    message: "회원가입 성공",
  });
});

export default router;
