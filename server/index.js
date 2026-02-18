import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
// Enable CORS for all routes
app.use(cors());
app.use(express.json());


// Connect to MongoDB and Create schema and model  
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));
  
// Schema
const PersonSchema = new mongoose.Schema({   
  name: String,
  lastname: String,
  street: String,
  zipcode: String,
  city: String,
  phone: String
});
const Person = mongoose.model("Person", PersonSchema);

// Backend Routes 
// GET http://localhost:5000/person, (Get all persons)
app.get("/person", async (req, res) => {
  res.json(await Person.find());
});

// GET http://localhost:5000/person/{id}, (Get a person with specific id)
app.get("/person/:id", async (req, res) => { 
  const { id } = req.params; 
  try { 
    console.log("ID:", id); 
    const person = await Person.findById(id);    
    res.json(person); } 
    catch (err) 
    { 
      console.error(err);
      res.status(500).json({ error: "Could not fetch person" });
     } 
   });

//POST http://localhost:5000/person (create new person)
app.post("/person", async (req, res) => {
  console.log("REQ BODY:", req.body);
  //console.log("HEADERS:", req.headers);

  const item = new Person({
    name: req.body.name,
    lastname: req.body.lastname,
    street: req.body.street,
    zipcode: req.body.zipcode,
    city: req.body.city,
    phone: req.body.phone
  });
  await item.save();
  res.json(item);
});

//PUT http://localhost:5000/person/{id} (update person with specific id)
app.put("/person/:id", async (req, res) => { 
  const { id } = req.params; 
  console.log("Update id:", id); 
  try { 
    const updated = await Person.findByIdAndUpdate( id, 
    { 
      name: req.body.name, 
      lastname: req.body.lastname, 
      street: req.body.street, 
      zipcode: req.body.zipcode, 
      city: req.body.city, 
      phone: req.body.phone 
    }, 
    { 
      returnDocument: "after", 
      runValidators: true 
    } 
  ); 
  if (!updated) 
  { 
    return res.status(404).json({ error: "Person not found" }); 
  } 
        
    res.json(updated); 
} 
  catch (err) 
  { 
    console.error("PUT error:", err); 
    res.status(500).json({error: "Could not update person" }); 
  } 
});

// DELETE http://localhost:5000/person/{id} 
  app.delete("/person/:id", async (req, res) => {
  const { id } = req.params;  
  console.log("Delete id:", id);

  try {
    const deleted = await Person.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.json(deleted);
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Could not delete person" });
  }
});

// Start server
app.listen(process.env.PORT, () => console.log("Server running on port 5000"));
