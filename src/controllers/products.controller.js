import { ObjectId } from 'mongodb';
import products from '../utils/products.js';
import db from '../server.js';

async function setProducts(request, response) {
  try {
    await db.collection('products').insertOne({ products });

    const dataArray = await db.collection('products').find({}).toArray();

    const dataObject = dataArray[0];
    const { products: data } = dataObject;

    return response.status(201).send(data);
  } catch (error) {
    console.log('BAD REQUEST: ', error);
    return response.sendStatus(500);
  }
};

export { setProducts };
