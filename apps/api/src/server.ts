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
      body("name").isString().withMessage("The name must be a string"),
      body("email")
        .isEmail()
        .withMessage(
          "The email address is not formatted correctly. Please try again."
        ),
      body("phoneNumber")
        .isString()
        .withMessage("The phone number must be a string"),
      body("address.houseNumber")
        .isInt()
        .withMessage("The house number must be an integer"),
      body("address.streetName")
        .isString()
        .withMessage("The street name must be an string"),
      body("address.city").isString().withMessage("The city must be an string"),
      body("address.stateProvince")
        .isString()
        .withMessage("The state/province must be an string"),
      body("address.country")
        .isString()
        .withMessage("The country must be an string"),

      (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.json({ errors: errors });
        }
        const dataJSON = JSON.stringify(req.body);
        fs.appendFileSync("customers.json", dataJSON);
        return res.json({
          message: `Success! Your customer contact information has been added. ${req.body.address.city}`,
        });
      }
    )
    .get("/healthz", (req, res) => {
      return res.json({ ok: true });
    });

  return app;
};
