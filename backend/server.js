const express = require('express')
const app = express()
const router = require('./routes/router');
var mysql = require('mysql');
const db = require('./db')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const cors = require('cors')

// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

//CORS
// app.use(cors({origin: "http://localhost", credentials: true }))
app.use(cors());


var con = db.bddConnect()

con.connect( async function(err) {
    if (err) throw err;
    console.log("Connected!");
    
    
    //initialisation de la table pharmacie
    console.log("Pharmacie init")

    var sql = "DROP TABLE pharmacie";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table deleted");
    });


    sql = "CREATE TABLE pharmacie (id INT AUTO_INCREMENT PRIMARY KEY,nom VARCHAR(255), adresse VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });


    sql = "INSERT INTO pharmacie (nom, adresse) VALUES ('pharmacie 1', 'Lyon')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });



    sql = "INSERT INTO pharmacie (nom, adresse) VALUES ('pharmacie 2', 'Paris')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    sql = "INSERT INTO pharmacie (nom, adresse) VALUES ('pharmacie 3', 'Vesoul')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    //initialisation de la table User
    console.log("User init")

    sql = "DROP TABLE user";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table deleted");
    });


    sql = "CREATE TABLE user (id INT AUTO_INCREMENT PRIMARY KEY,login VARCHAR(255), password VARCHAR(500),idPharmacie integer)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });

    const hashedPassword = await bcrypt.hash("1234", 10);
    sql = "INSERT INTO user (login, password,idPharmacie) VALUES ('redha', '"+hashedPassword+"',1)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    sql = "INSERT INTO user (login, password,idPharmacie) VALUES ('youssef', '"+hashedPassword+"',2)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    sql = "INSERT INTO user (login, password,idPharmacie) VALUES ('nicola', '"+hashedPassword+"',3)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    //initialisation de la table medicament
    console.log("Medicament init")

    sql = "DROP TABLE medicament";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table deleted");
    });


    sql = "CREATE TABLE medicament (id INT AUTO_INCREMENT PRIMARY KEY,nom VARCHAR(255), quantite integer,prix integer,idPharmacie integer)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });


    //ajoute doliprane pour pharmacie 1 et 2
    sql = "INSERT INTO medicament (nom, quantite,prix,idPharmacie) VALUES ('doliprane', 50,4,1)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    sql = "INSERT INTO medicament (nom, quantite,prix,idPharmacie) VALUES ('doliprane', 30,3,2)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    //paracetamol pour pharmacie 2 et 3
    sql = "INSERT INTO medicament (nom, quantite,prix,idPharmacie) VALUES ('paracetamol', 10,3.50,2)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    sql = "INSERT INTO medicament (nom, quantite,prix,idPharmacie) VALUES ('paracetamol', 18,5,3)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    //placebo pour la pharmacie 1
    sql = "INSERT INTO medicament (nom, quantite,prix,idPharmacie) VALUES ('placebo', 100,2,1)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

});

app.use('/',router)

//ouvre le port 8080
app.listen(8080,()=>{
    console.log("Serveur lancé...")
})


