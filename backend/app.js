import express from "express";
import { PORT, mongoDBURL } from './config.js';
import mongoose from "mongoose";
import contactsRoute from './routes/contactsRoute.js';
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors());
// Option 2: Allow Custom Origins
app.use(
  cors({
    origin: 'http://localhost:4000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

// connect MongoDB

// route
app.get("/", (req, res) => {
  res.status(201).json({message: "Connected to Backend!"});
});

app.use('/contacts', contactsRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });


