import db from "../server.js";

async function signOut(request, response) {
  const { authorization } = request.headers;
  const token = authorization?.replace('Bearer ', '');

  try {
    const session = await db.collection('sessions').findOne({ token });
    await db.collection('sessions').deleteOne({ token });
    const sessions = await db.collection('sessions').find({}).toArray();

    console.log('Session deleted: ', session);
    console.log('Sessions after delete: ', sessions);

    return response.status(200).send('Deleted');
  } catch (error) {
    console.log('Error: ', error);
    return response.sendStatus(500);
  }
};

export { signOut };
