/**
 * Created by tiedan on 2017/7/5.
 */
const express = require("express");
const static = require("express-static");
const mysql = require("mysql");
let server = express();
server.listen(5000);

let db=mysql.createConnection({
 host:'localhost',
 user:'root',
 database:'bbb'
 });
/*增加一条数据*/
server.get(`/add`,(req,res)=>{
    let name=req.query.name;
    let age=req.query.age;
    if(name&&age){
        let sql=`insert into ggg values (0,'${name}','${age}')`;
        db.query(sql,(err,data)=>{
            if(err){
                res.send({err:1,msg:"数据库有问题"});
                res.end();
            }else{
                res.send({
                    err:0,
                    msg:"添加成功"
                });
                res.end();
            }
        })
    }
});
/*获取数据*/
server.get(`/getData`,(req,res)=>{
  let sql=`SELECT * FROM GGG LIMIT 0,5`
  db.query(sql,(err,data)=>{
     if(err){
        res.send({err:1,msg:"请求数据失败"});
        res.end();
     }else{
        res.send(data);
        res.end();
     }
  })
});
//点击换页数
server.get(`/fenye`,(req,res)=>{
  let index=req.query.index;
  let sql1=`SELECT * FROM GGG LIMIT ${index*5-5},5`
  db.query(sql1,(err,data)=>{
     if(err){
        res.send({err:1,msg:"请求数据失败"});
        res.end();
     }else{
        res.send(data);
        res.end();
     }
  })
});
//获取总的数据长度
server.get(`/zong`,(req,res)=>{
  let sql1=`SELECT * FROM GGG`

  db.query(sql1,(err,data)=>{
     if(err){
        res.send({err:1,msg:"请求数据失败"});
        res.end();
     }else{
        res.send(data);
        res.end();
     }
  })
});
/*删除一条数据*/
server.get(`/det`,(req,res)=>{
  let n=req.query.n;
  let sql=`delete from ggg where id='${n}'`;
  db.query(sql,(err,data)=>{
     if (err){
       res.send({err:1,msg:"数据库删除失败"});
       res.end();
     }else{
       res.send({err:0,msg:"牛x了"});
       res.end();
     }
  })
});
server.use(static('www'));
