import { MongoClient } from 'mongodb';
import { Database } from '../lib/types';
const passwd = process.env.DB_PASSWD

const url = `mongodb+srv://SureshKuchana:${passwd}@cluster0.ww4pv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const connectDB = async (): Promise<Database> => {
  const client = await MongoClient.connect(url);

  const db = client.db('main');

  return {
    listings : db.collection('test_listings')
  }
}