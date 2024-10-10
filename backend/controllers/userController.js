const db = require('../db')
const bcrypt = require('bcrypt')
const { generateToken } = require('../jwtUtils');

//login
exports.login = async (req, res) => {
    try {
        console.log("login")

        const {username,password} = req.body;
        
        // var login = req.body.login
        // var password = req.body.password

        var con = db.bddConnect()

        var sql = "SELECT * FROM user WHERE login = ?";
        con.query(sql,[username],async function (err, result) {
            if (err) throw err;
            // console.log(username)
            // console.log(password)
            // console.log(result)
            if(result.length >0){
                console.log("toto")
                // console.log(result[0].password)
                bcrypt.compare(password,result[0].password, function(error,re){
                    if (error){
                        console.log("Erreur serv")

                        res.status(500).json({ success: false,error: error.message });
                    }
                      else if (re) {
                        
                        const token = generateToken(result[0].login);
                        console.log("login success")

                        res.status(200).json({success:true,user:result[0],token:token});

                      } else {
                        console.log("mdp incorrect")
                        return res.status(404).json({success: false, message: 'mdp incorrecte'});
                      }
                })              

            }else{
                console.log("login incorrecte")
                return res.status(404).json({success: false, message: 'login incorrecte'});
            }
        });
        

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



