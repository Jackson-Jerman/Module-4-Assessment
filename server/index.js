const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, getFortunes, getGuardian, createGuardian, deleteGuardian,updateGuardian } = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortunes);
app.get("/api/guardian", getGuardian);
app.post("/api/guardian", createGuardian);
app.delete("/api/guardian/:id", deleteGuardian);
app.put("/api/guardian/:id", updateGuardian)

app.listen(4000, () => console.log("Server running on 4000"));
