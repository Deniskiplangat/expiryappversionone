const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 100,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
})


// view product
exports.view = (req,res)=>{
    


    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected to the database')

        connection.query('SELECT product_name, expiry_date, DATEDIFF(expiry_date,NOW()) as days FROM expiryy',(err,rows)=>{
            connection.release()
            if(!err){
                res.render('home',{rows})
            }else{
                console.log(err)
            }
            console.log(rows)
        })
    })
    
}