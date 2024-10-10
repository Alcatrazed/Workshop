var mysql = require('mysql');


function bddConnect(){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database:"pharma"
      });
    return con;
}


module.exports = {bddConnect};