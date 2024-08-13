// const express = require("express");
// const bodyParser = require("body-parser");
// require("dotenv").config();
// const { sequelize } = require("./src/config/db");
// const {createNote ,getNoteById,getNotesByTitleSubstring,updateNote} = require('./src/services/noteService')
// const { successResponse, validationResponse } = require("./src/config/response");
// const server_port = process.env.SERVER_PORT;

// const app = express();
// app.use(bodyParser.json());
// app.use(express.json());

// app.post("/notes/", async (req, res) => {
//   try {
//     const {title,description} = req.body;
//     const data = await createNote(title,description);
//     res.status(200).json(successResponse(data));
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(validationResponse(error));
//   }
// });

// app.get(
//   "/notes/:id", async (req, res) => {
//     try {
//       const id = req.params.id;
//       const data = await getNoteById(id);
//       res.status(200).json(successResponse(data));
//     } catch (error) {
//       console.log(error);
//       res.status(400).json(validationResponse(error));
//     }
// });

// app.get(
//   "/notes", async (req, res) => {
//     try {
//       const substring = req.query.title;
//       const data = await getNotesByTitleSubstring(substring);
//       res.status(200).json(successResponse(data));
//     } catch (error) {
//       console.log(error);
//       res.status(400).json(validationResponse(error));
//     }
// });

// app.put(
//   "/notes/:id", async (req, res) => {
//     try {
//       const id = req.params.id;
//       const {title , description} = req.body;
//       const data = await updateNote(id,title,description);
//       res.status(200).json(successResponse(data));
//     } catch (error) {
//       console.log(error);
//       res.status(400).json(validationResponse(error));
//     }
// });


// const server = app.listen(server_port, () => {
//   console.log(`Server is running on port ${server_port}`);
// });

// app.server = server;

// module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./src/config/db');
const noteController = require('./src/controllers/noteController');


const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.post('/notes/', noteController.createNote);
app.get('/notes/:id', noteController.getNoteById);
app.get('/notes', noteController.getNotesByTitleSubstring);
app.put('/notes/:id', noteController.updateNote);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json(responseHandler.errorResponse(err));
});

const server = app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

app.server = server;

module.exports = app;
