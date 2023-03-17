import db from "../server.js";
import { v4 as uuidV4 } from "uuid";

export async function signIn(req, res) {
  const user = res.locals.user;
  const token = uuidV4();

  try {
    await db.collection("sessions").insertOne({ token, usuarioId: user._id });
    res.send({ token });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}