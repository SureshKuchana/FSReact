import express,{Application} from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';
import "dotenv/config.js";
import {connectDB} from './database'

const port = process.env.PORT || 9000;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mount = async (app: Application) => {
  const db = await connectDB();
  const server = new ApolloServer({ typeDefs, resolvers, context : () => ({db}) });
  server.applyMiddleware({ app, path: '/api' });

  app.get('/',(req,res) => {
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(`<a href=http://localhost:${port}/api>Navigate to Graphql Playground</a>`));
  })

  // app listening to port
  app.listen(port, () => {
    console.log(` Server running on PORT http://localhost:${port}`);
  });  
}

mount(express());