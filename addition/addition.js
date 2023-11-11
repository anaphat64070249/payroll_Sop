const pool = require("../config")
const express = require('express');
const router = express.Router();
const {isLoggedIn} = require("../modileware/index")



router.put("/select_addition", async (req,res,next) => {

    try{

        const [row,fields] = await pool.query("select * from Addition")
        res.json({deduc:row})


    }catch(err){
        console.log(err);

    }
})

router.put("/insert_addition", async (req,res,next) => {
    
    const title = req.body.title;
    const name = req.body.name;
    const amount = req.body.amount;
    const id = req.body.id;

    const conn = await pool.getConnection()
    conn.beginTransaction()

    try{
        
        
        const [row,fields] = await conn.query("insert into Addition(addition_title,addition_name,addition_amount,date) values(?,?,?,?,CURRENT_TIMESTAMP)",[title,name,amount])

        const [row1,fields1] = await conn.query("update Payroll set netSalary = netSalary+? where emp_id = ?",[amount,id])

        conn.commit()
    }catch(err){
        console.log(err);
        conn.rollback()
    }finally{
        conn.release()
    }
})


router.delete("/delete_addition" ,async (req,res,next) => {
    
    const [deletee,fields2] = await conn.query("delete from Addition where date < DATE_ADD(date,INTERVAL 1 MONTH)")

})
exports.router = router;