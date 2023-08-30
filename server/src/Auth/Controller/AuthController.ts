import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../db/models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AuthService from "../Service/AuthService";
import AuthContract from "../Repositories/AuthRepo";
dotenv.config();

export default class AuthController {
  private authService: AuthContract;
  constructor() {
    this.authService = new AuthService();
  }

  signUp = async (req: Request, res: Response) => {
    const userBody = req.body;
    const password = userBody.password;
    const hashedPassword = bcrypt.hashSync(password, 10);

    userBody.password = hashedPassword;
    try {
      const userExists = await this.authService.findOneEmail(userBody.email);
      if (userExists) {
        res.status(400).json({ message: "User already exists" });
      } else {
        res.json(await this.authService.createUser(userBody));
      }
    } catch (error) {
      console.log(error);
      res.json({ error: "error in creating user" });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const userExists = await this.authService.findOneEmail(email);
      if (userExists) {
        const userPassword = userExists?.password;

        const passMatched: boolean = bcrypt.compareSync(password, userPassword);
        if (passMatched) {
          const secretKey: string = process.env.SECRET_KEY as string;
          const payload = { id: userExists.id, email: userExists.email };
          const token = jwt.sign(payload, secretKey, { expiresIn: "6d" });
          res.json({ message: "succesfully logged in", token });
        } else {
          throw new Error("password is wrong");
        }
      } else {
        throw new Error("User Doesnt Exists Please Sign in");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  };
  loginPage = (req: Request, res: Response) => {
    res.render("login");
  };
}
