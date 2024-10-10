const db = require('../db')
var mysql = require('mysql');



//  getAllPharmacie
exports.getAllPharmacie= async (req,res)=>{
    try{
        console.log("getAllpharmacie")
        
        var con = db.bddConnect()
        var sql = "SELECT * from pharmacie"
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);
        });

    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getPharmacieByMedicament = async (req,res)=>{
    try{
        console.log("getPharmacieByMedicament")
        var string = req.params.search
        var con = db.bddConnect()
        var sql = "SELECT * from pharmacie p INNER JOIN medicament m ON m.idPharmacie = p.id WHERE m.nom LIKE '"+string+"%'"
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

exports.getPharmacieById = async (req,res)=>{
    try{
        console.log("getPharmacieById")
        var id = req.params.id
        var con = db.bddConnect()
        var sql = "SELECT * from pharmacie WHERE id='"+id+"'"
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

exports.getStock = async (req,res)=>{
    try{
        console.log("GetStock")
        var id = req.params.id
        var con = db.bddConnect()
        var sql = "SELECT * from medicament WHERE idPharmacie='"+id+"'"
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    }catch(error){
        res.status(500).json({error:error.message})
    }
}