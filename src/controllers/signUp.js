import db from "../server.js";
import joi from "joi";
import bcrypt from "bcrypt";

const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
});

export async function signUp(req, res){
  const { name, email, password } = req.body;
 
  try{
      const userExists = await db.collection('users').findOne({ email: email })
      if(userExists) return res.status(409).send("Este email pertence a outra conta.")

      const validation = signUpSchema.validate( { name, email, password }, {abortEarly: false});
      if(validation.error) {
          const err = validation.error.details.map((detail) => detail.message);
          return res.status(422).send(err);
      };

      const passwordHashed = bcrypt.hashSync(password, 10);

      await db.collection("users").insertOne( { name, email, password: passwordHashed });
      res.sendStatus(201);
  }catch(err){
      return res.status(500).send(err.message);
  };
}