const pool = require("../config")
const express = require('express');
const router = express.Router();
const {isLoggedIn} = require("../modileware/index")



router.put("/select_deduction", async (req,res,next) => {

    try{
        const [row,fields] = await pool.query("select *,count(emp_id) from Deduction join Payroll using(deduction_id) where netSalary between salary_min and salary_max")
        res.json({deduc:row})
        

    }catch(err){
        console.log(err);

    }
})

router.put("/insert_deduction", async (req,res,next) => {
    
    const title = req.body.title
    const amount = req.body.amount;
    const min = req.body.min;
    const max = req.body.max;
    const percent = req.body.percent
    const tax = Number(percent)/100;

    const conn = await pool.getConnection()
    conn.beginTransaction()

    try{

       if (tax != 0 && amount == 0){
        const [update,fields2] = await conn.query("update Payroll join Position using (position_id) set netSalary = netSalary*(?)+netSalary where position_salary between ? and ?",[tax,min,max])
       }
       else if (amount != 0 && percent == 0){
        const [update,fields2] = await conn.query("update Payroll join Position using (position_id) set netSalary = netSalary +(?) where position_salary between ? and ?",[amount,min,max])
       }
       else{
        const [update,fields2] = await conn.query("update Payroll join Position using (position_id) set netSalary = (netSalary*(?)+netSalary)+ (?) where position_salary between ? and ?",[tax,amount,min,max])
       }

        const [row,fields] = await conn.query("insert into Deduction(deduction_title,deduction_amount,percent,deduction_min,deduction_max) values(?,?,?,?)",[title,amount,percent,min,max])

        conn.commit()
    }catch(err){
        console.log(err);
        conn.rollback()
    }finally{
        conn.release()
    }
})

exports.router = router;