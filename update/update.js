const pool = require("../config")
const express = require('express');
const router = express.Router();
const {isLoggedIn} = require("../modileware/index")

router.get("/salary_position", async (req,res,next) => {


    try{

        const [row,fields] = await pool.query("select * from salary_position")
        const [row1,fields1] = await pool.query("select count(position) as all_ux from users where position = 'Manager'")
        const [row2,fields2] = await pool.query("select count(position) as all_super from users where position = 'Supervisor'")
        const [row3,fields3] = await pool.query("select count(position) as all_front from users where position = 'Front-End'")
        const [row4,fields4] = await pool.query("select count(position) as all_back from users where position = 'Back-End'")
        const [row5,fields5] = await pool.query("select count(position) as all_ui from users where position = 'UI-Designer'")
        const [row6,fields6] = await pool.query("select count(position) as all_ux from users where position = 'UX-Designer'")
        const [row7,fields7] = await pool.query("select count(position) as all_tester from users where position = 'TESTER'")

        res.json({postion:row,sum:{row1,row2,row3,row4,row5,row6,row7}})
    }catch(err){
        console.log(err);
    }
})



router.put("/update_salarybase", async (req,res,next) => {
    
    const position = req.body.position;
    const new_salary = req.body.salary;

    // const position = 'TESTER';
    // const new_salary = 20000;

    const conn = await pool.getConnection()
    conn.beginTransaction()

    try{

        const [row,fields] = await conn.query("update payroll join users using(user_id) set payroll_salary = ? where position = ?",[new_salary,position])


        conn.commit()
    }catch(err){
        console.log(err);
        conn.rollback()
    }finally{
        conn.release()
    }
})

router.put("/select_deduction", async (req,res,next) => {


    try{

        const [row,fields] = await pool.query("select * from deduction")
        res.json({deduc:row})


    }catch(err){
        console.log(err);

    }
})

router.put("/insert_deduction", async (req,res,next) => {
    
    const title = req.body.title
    const amount = req.body.amount;
    const target = req.body.taget;
    const salay_max = req.body.salay_max;
    const salary_min = req.body.salary_min;
    const times = req.body.times; 


    const conn = await pool.getConnection()
    conn.beginTransaction()

    try{

        const [row,fields] = await conn.query("insert into deduction(title,amount,target_group,salary_min,salary_max,times) values(?,?,?,?,?,?)",[title,amount,target,salary_min,salay_max,times])

        conn.commit()
    }catch(err){
        console.log(err);
        conn.rollback()
    }finally{
        conn.release()
    }
})

exports.router = router;