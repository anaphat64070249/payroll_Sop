const pool = require("../config")
const express = require('express');
const router = express.Router();

router.get("/payroll_all", async (req,res,next) => {

    // const role = req.headers['role']
    try{

    
    const [sum,fields] = await pool.query("select sum(position_salary) as sum_salary  from Payroll join position using(position_id)")
    const [sum1,fields1] = await pool.query("select sum(addition_amount) as sum_add  from Payroll join position using(position_id) join Employee_info using(emp_id)  join Addition using(addition_id)")
    const [sum2,fields2] = await pool.query("select sum((netSalary+ (netSalary*percent/100))) as sum_add  from Payroll join position using(position_id) join Employee_info using(emp_id)  join Addition using(addition_id)")
    const [sum3,fields3] = await pool.query("select count(payroll.emp_id) from payroll join addition using(addition_id) where percent != 0") 
    // const [everyone,fields2] = await pool.query("select * from Payroll join Employee_info using(emp_id) join position using(position_id) join Addition using (addition_id)")
    const [everyone,fields5] = await pool.query("select * from Payroll join position using(position_id) join addition using(addition_id) join Employee_info using(emp_id)")
    res.json({everyone:everyone,sum:{sum,sum1,sum2,sum3}})
    

    }catch(err){
        console.log(err);
    }
})




exports.router = router;