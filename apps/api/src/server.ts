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
      body("address.houseNumber").isInt(),
      body("address.streetName").isString(),
      body("address.city").isString(),
      body("address.stateProvince").isString(),
      body("address.country").isString(),
      (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.json({ errors: errors });
        }
        return res.json({
          message: `hello world ${req.body.address.city}`,
        });
      }
    )
    .get("/healthz", (req, res) => {
      return res.json({ ok: true });
    });

  return app;
};
