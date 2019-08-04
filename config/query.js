const mysql = require('mysql');

function execQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : '127.0.0.1',
    port     : 3306,
    user     : 'root',
    password : 'your new password',
    database : 'banco'
  });
 
  connection.query(sqlQry, function(error, results, fields){
      if(error) 
        console.log(error)
      else
        console.log(results);
      connection.end();
      console.log('query ok!');
  });
}

module.exports = {execQuery};