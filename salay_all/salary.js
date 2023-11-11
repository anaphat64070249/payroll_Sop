const pool = require("../config")
const express = require('express');
const router = express.Router();

router.get("/payroll_all", async (req,res,next) => {
    // const role = req.headers['role']
    try{

    const [update_nes] = await pool.query("update payroll set payroll_netsalary = payroll_salary-(payroll_salary*0.05)") 

    const [sum,fields] = await pool.query("select sum(payroll_salary) as sum_payroll, sum(payroll_bonus) as sum_bonus,sum(payroll_salary*0.05) as sum_tax,sum(payroll_salary)-sum(payroll_salary*0.05)+sum(payroll_bonus) as sum_netsalary from payroll")
    
    const [everyone,fields2] = await pool.query("select *,(payroll_salary-(payroll_salary*0.05)) as net from payroll join users using(user_id)")
    
    res.json({sum:sum[0],everyone:everyone})

    }catch(err){
        console.log(err);
    }
})


router.get("/charge", async (req,res,next) => {
    // เงินเดือนสุทธิ  (เงินเดือน-(เงินเดือน*ประกันสังคม(5%)+bonus) = a
    // a*ภาษี(12เดือน 5 % 1 เดือน 0.417%) = เงินสุทธิ
    
    const [row1,fields1] = await pool.query("select salary from salary_position where position = 'Manager'")
    const [row2,fields2] = await pool.query("select salary from salary_position where position = 'Supervisor'")
    const [row3,fields3] = await pool.query("select salary from salary_position where position = 'Front-End'")
    const [row4,fields4] = await pool.query("select salary from salary_position where position = 'Back-End'")
    const [row5,fields5] = await pool.query("select salary from salary_position where position = 'UI-Designer'")
    const [row6,fields6] = await pool.query("select salary from salary_position where position = 'UX-Designer'")
    const [row7,fields7] = await pool.query("select salary from salary_position where position = 'TESTER'")


    const check1 = Number(row1[0].salary)
    const check2 = Number(row2[0].salary)
    const check3 = Number(row3[0].salary)
    const check4 = Number(row4[0].salary)
    const check5 = Number(row5[0].salary)
    const check6 = Number(row6[0].salary)
    const check7 = Number(row7[0].salary)     
})

exports.router = router;