import express from 'express';
import { Contact} from '../models/contactModel.js';

const router = express.Router();

// Route for Save a new Contact (Create)
router.post("/", async (req, res) => {
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
  router.get('/', async (req, res) => {
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
  router.get('/:id', async (req, res) => {
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
  router.put('/:id', async (req, res) => {
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
  
      const { id } = req.params;
  
      const result = await Contact.findByIdAndUpdate(id, req.body);
  
      if (!result) {
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      return res.status(404).json({ message: 'Contact updated successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message }); 
    }
  });
  
  // Route for Delete a Contact (Delete)
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await Contact.findByIdAndDelete(id);
  
      if(!result) {
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      return res.status(200).send({ message: 'Contact deleted successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });    
    }
  });
  
  export default router;