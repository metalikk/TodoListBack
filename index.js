const express = require("express");
const mongoose = require("mongoose");
const List = require("./list"); // on importe notre model
const json = require("body-parser");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/todoList", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // connexion mongoDB

let app = express(); // création de l'objet représentant notre application express
let port = 8080;

app.listen(port, () => {
  // ecoute du serveur sur le port 8080
  console.log("le serveur fonctionne");
});
app.use(cors());

app.use(express.json());
// app.use(json());
// app.use((req, res) => {
//   res.header(("Access-Control-Allow-Origin", "*"));
// });
app.post("/", async (req, res) => {
  console.log(req.body);
  const todo = req.body.todo; // récupération des variables du body

  if (!todo) {
    // on vérifie que la variable est  présente
    res.send("Il manque un argument");
    return;
  }
  const new_liste = new List({
    // création d'un objet représentant notre liste

    todo: todo,
  });
  const newList = await new_liste.save(); // sauvegarde asynchrone de la liste
  res.json(newList);
});

app.get("/", async (req, res) => {
  const list = await List.find(); // On récupère toute la liste
  await res.json(list);
});
app.get("/:id", async (req, res) => {
  const id = req.params.id; // on récupère la valeure dans l'url
  const list = await List.findOne({ _id: id }); // on récupère la liste grâce à son _id
  res.json(list);
});
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const suppr = await List.deleteOne({ _id: id });
  res.json(suppr);
});

app.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const list = await List.findOne({ _id: id }); // on récupere la todo pour pouvoir la modifier

  // on récupère les valeurs potentiellement modifiées
  if ((list.todo !==  req.body.todo) || list.todos!== req.body.todos){
    list.todo = req.body.todo
    list.todos = req.body.todos
}

  await list.save(); // on sauvegarde les modifications
  res.json(list);
});
