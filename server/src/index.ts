import express from 'express';
import { listings } from './listings';

const app = express();
const port = 9000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Typescript from Server 1");
});

//get listings
//deleting listings

app.get('/listings', (_req, res) => {
  return res.send(listings);
})


app.post('/delete-listing', (_req, res) => {
  const id: string = _req.body.id;
  return res.send(listings.filter((list) => list.id === id));
})



// app listening to port
app.listen(port, () => {
  console.log(` Server running on PORT http://localhost:${port}`);
});
