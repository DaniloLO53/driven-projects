import { ObjectId } from "mongodb";
import db from "../server.js";

async function updateCart(request, response) {
  const { authorization } = request.headers;
  const { newIds } = request.body;
  const token = authorization?.replace('Bearer ', '');

  try {
    const session = await db.collection('sessions').findOne({ token });

    if (!session || !token) {
      return response.status(401).send('Não autorizado');
    };

    await db.collection('users').updateOne(
      { _id: ObjectId(session.usuarioId) },
      {
        $set: { cartIds: newIds },
      },
      { upsert: true },
    )

    const user = await db.collection('users').findOne({ _id: ObjectId(session.usuarioId) });

    return response.status(201).send(user);
  } catch (error) {
    console.log('error: ', error);

    return response.sendStatus(500);
  }
};

async function getCart(request, response) {
  const { authorization } = request.headers;
  const token = authorization?.replace('Bearer ', '');
  console.log('token:', authorization)

  try {
    const users = await db.collection('users').find({}).toArray();
    console.log('users: ', users);
    const sessions = await db.collection('sessions').find({}).toArray();
    console.log('sessions: ', sessions);

    const session = await db.collection('sessions').findOne({ token });
    console.log('Session: ', session)
    const user = await db.collection('users').findOne({ _id: session.usuarioId });
    console.log('user: ', user)

    if (!session || !user) return response.sendStatus(403);

    if (!user.cartIds) {
      user.cartIds = [];
    };

    return response.status(200).send(user);
  } catch (error) {
    console.log('Error: ', error);

    return response.status(500).send(error);
  }
};

export { getCart, updateCart };
