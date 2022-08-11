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
    // .get("/message/:name", (req, res) => {
    //   const dataJSON = JSON.stringify(req.params.name);
    //   fs.appendFileSync("customers.json", dataJSON);
    //   return res.json({ message: `hello ${req.params.name}` });
    // })
    .post(
      "/message",
      body("name").isString(),
      (req: express.Request, res: express.Response) => {
        return res.json({ message: `hello world ${req.body.name}` });
      }
    )
    .get("/healthz", (req, res) => {
      return res.json({ ok: true });
    });

  return app;
};
