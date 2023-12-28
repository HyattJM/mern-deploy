import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { Contact } from './models/contactModel.js';
import { PORT, mongoDBURL } from './config.js';

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

// Route for Save a new Contact (Create)
app.post("/", async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.phoneNumber ||
      !req.body.email
    ) {
      return res.status(400).send({
        message: 'Send all required fields: name, phoneNumber, email',
      });
    }

    const newContact = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
    };

    const contact = await Contact.create(newContact);

    return res.status(201).send(contact);        
  } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
  }
});

// Route for Get All Contacts from database (Retrieve All)
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find({});

    return res.status(200).json({
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Get One Contact from database by id (Retrieve One)
app.get('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    return res.status(200).json(contact);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Update a Contact (Update)

// Route for Delete a Contact (Delete)

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


