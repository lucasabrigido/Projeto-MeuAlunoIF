const mysql      = require('mysql');
const connection = mysql.createConnection({
	  host     : '127.0.0.1',
	  port     : 3306,
	  user     : 'root',
	  password : 'your new password',
	  database : 'banco'
});

function createTable(conn){
 
      const sql = "CREATE TABLE IF NOT EXISTS STUDENTS (\n"+
                  "ID int NOT NULL AUTO_INCREMENT,\n"+
                  "Login varchar(150) NOT NULL,\n"+
                  "Password char(255) NOT NULL,\n"+
                  "PRIMARY KEY (ID)\n"+
                  ");";
      
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log('criou a tabela!');
      });
}
createTable(connection);