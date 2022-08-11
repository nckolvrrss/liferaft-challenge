import { json, urlencoded } from "body-parser";
import express from "express";
import fs from "fs";
import morgan from "morgan";
import cors from "cors";
import { body, validationResult } from "express-validator";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .post(
      "/message",
      body("name").isString(),
      body("email").isEmail(),
      body("phoneNumber").isString(),
      (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.json({ errors: JSON.stringify(errors) });
        }
        return res.json({ message: `hello world ${req.body.name}` });
      }
    )
    .get("/healthz", (req, res) => {
      return res.json({ ok: true });
    });

  return app;
};
