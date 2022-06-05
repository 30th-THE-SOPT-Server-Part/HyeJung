import express, { Request, Response, NextFunction } from "express";
const app = express();
import connectDB from "./loaders/db";
import routes from './routes';
import config from './config';
require('dotenv').config();

connectDB(); //* 몽고디비 연결

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //* req.body는 json으로 하겠다.

app.use(routes);   //라우터 

// error handler (router 단에서 발생하는 모든 에러를 이 핸들러가 잡도록 함)
interface ErrorType {
  message: string;
  status: number;
}

app.use(function (err: ErrorType, req: Request, res: Response, next: NextFunction) {

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app
  .listen(config.port, () => {
    console.log(`
    ################################################
          🛡️  Server listening on port 🛡️
    ################################################
  `);
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });