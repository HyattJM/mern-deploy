import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { Contact } from './models/contactModel.js';
import { PORT, mongoDBURL } from './config.js';

const app = express();

// middleware
const corsOptions = {
    origin: "http://localhost:3000" // frontend URI (ReactJS)
}
app.use(express.json());
app.use(cors(corsOptions));

// connect MongoDB
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


// route
app.get("/", (req, res) => {
    res.status(201).json({message: "Connected to Backend!"});
});

app.post("/", async (req, res) => {
    try {
        if (
            !request.body.name ||
            !request.body.phoneNumber ||
            !request.body.email
        ) {
            return response.ststus(400).send({
                message: 'Send all required fields: name, phoneNumber, email',
            });
        }

        const contact = await Contact.create(newContact);

        return response.status(201).send(contact);        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});