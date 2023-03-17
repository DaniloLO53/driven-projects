import bcrypt from "bcrypt";
import db from "../server.js";

export async function signInValidation(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.sendStatus(401);
    }

    const passwordHash = bcrypt.compareSync(password, user.password);
    if (!passwordHash) {
      return res.sendStatus(401);
    }
    res.locals.user = user;

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
