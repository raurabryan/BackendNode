const express = require("express");
const bodyParser=require("body-parser");

const app=express();
const puerto=3001;

app.use(bodyParser.json());


app.use("/laptops",(request,response,next)=>{
    console.log("ingresa a midlewer");
    console.log("headres:",request.headers);
    console.log("body:",request.body)
    next();
});


app.get("/laptops/:id",(request,response)=>{
    const laptops =[
        {marca:"Lenovo",procesador:"Core 5 Gen",memoria:"250",disco:"SSD"},

    ]
    response.send(laptops);
})

app.get("/laptops",(request,response)=>{
    const laptops =[
        {id:1,marca:"Lenovo",procesador:"Core 5 Gen",memoria:"250",disco:"SSD"},
        {id:2,marca:"HP",procesador:"Core 5 Gen",memoria:"250",disco:"SSD"},
        {id:3,marca:"Lenovo",procesador:"Core 7 Gen",memoria:"250",disco:"SSD"},
        {id:4,marca:"DELL",procesador:"Core 5 Gen",memoria:"250",disco:"SSD"},
        {id:5,marca:"Lenovo",procesador:"Core 8 Gen",memoria:"250",disco:"SSD"},

    ]
    response.send(laptops);
})

app.post("/laptops",(req,resp)=>{
    req.body.id=4;
    resp.send(req.body);
})

app.put("/laptops/:idParam",(req,resp)=>{
    const id= req.params.idParam;
    console.log("id",id);
    req.body.id=id;
    resp.send(req.body);
})

app.delete("/laptops/:id",(req,resp)=>{
    const id= req.params.id;
    console.log("id:",id);
    resp.send();
})

app.listen(puerto,()=>{
    console.log("servisor listo en el puerto 3001")
});