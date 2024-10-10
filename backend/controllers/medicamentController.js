
const db = require('../db')

//autocompletion
exports.autocompleteMedicament = async (req,res)=>{
    try{
        console.log("autocompletionMedicament")
        var string = req.params.search
        var con = db.bddConnect()
        var sql = "SELECT DISTINCT id,nom from medicament WHERE nom LIKE '"+string+"%'"
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

//get diff medicament
exports.getMedic = async (req,res)=>{
    try{
        console.log("diffMedic")
        var con = db.bddConnect()
        var sql = "SELECT DISTINCT nom as name from medicament"
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    }catch(error){
        res.status(500).json({error:error.message})
    }
}


//update la quantite 
exports.updateQuantite = async (req,res)=>{
    try{
        console.log("UpdateQuantite")
        var id = req.body.id
        var qt= req.body.qt

        // console.log(req.body)
        // console.log("id="+id)
        // console.log("qt="+qt)

        var con = db.bddConnect()
        var sql = "UPDATE medicament set quantite='"+qt+"' WHERE id='"+id+"'"
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json({sucess:true, message:"Modification réussie"});
        });
    }catch(error){
        res.status(500).json({error:error.message})
    }
}