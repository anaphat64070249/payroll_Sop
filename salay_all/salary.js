const pool = require("../config")
const express = require('express');
const router = express.Router();

router.get("/payroll_all", async (req,res,next) => {

    // const role = req.headers['role']
    try{


    const [sum,fields] = await pool.query("select sum(position_salary) as sum_salary,sum(addition_amount) as sum_add,sum(netSalary) as net_salary,sum(position_salary)+sum_salary,sum(addition_amount)-sum_add,sum(netSalary) as sum_deduction from Payroll join Employee_info using(emp_id) join Position using(position_id) join Addition using(addition_id)")
        
    
    const [everyone,fields2] = await pool.query("select * from Payroll join Employee_info using(emp_id) join Position using(position_id) ")
    
    res.json({sum:sum[0],everyone:everyone})
    

    }catch(err){
        console.log(err);
    }
})




exports.router = router;