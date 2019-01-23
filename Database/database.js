var mysql = require('mysql');

//DEFINE POOLING
var pool = mysql.createPool({
    connectionLimit: 20,
    host: "83.217.132.102",
    port: '3306',
    user: "root",
    password: "Miroslava326356$$$$$",
    database: "fr"
});

module.exports.pool = pool

function CreatePool(db_loc) {

    return new Promise(function (resolve,reject) {
    
        var pool = mysql.createPool({
        connectionLimit: 10,
        host: "83.217.132.102",
        port: '3306',
        user: "root",
        password: "Miroslava326356$$$$$",
        database: db_loc 
        })    
        
        resolve(pool)
    })
}

module.exports.CreatePool = CreatePool;

function ConnectToDB(argPool) {
    
    return new Promise (function (resolve,reject) {

        argPool.getConnection(function (err, con) {

        if (err) {
        console.log(err)
        } else {
        //console.log("Success to retrieve the connection")
        resolve(con)
        }
            
	})
    })
}

module.exports.ConnectToDB = ConnectToDB;
                        
function GoQuery(connection, query) {

	return new Promise(function(resolve,reject) {
		
		connection.query(query, function(err,result,fields) {	
				if (err) {
                    console.log(err)
					return reject(err)
				} else {
					return resolve(result)
				}

		})
			
	})

}

module.exports.GoQuery = GoQuery;


                      
