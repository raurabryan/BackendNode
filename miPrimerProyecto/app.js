const express = require("express");
const bodyParser=require("body-parser");

const app=express();
const puerto=3001;

app.use(bodyParser.json());


app.use("/contactos",(request,response,next)=>{
    console.log("ingresa a midlewer");
    console.log("headres:",request.headers);
    console.log("body:",request.body)
    next();
});


app.get("/contactos",(request,response)=>{
    const contactos =[
        {id:1,nombre:"Santiago",apellido:"Mosquera",celular:"0962036220"},
        {id:2,nombre:"Bryan",apellido:"Raura",celular:"0962099220"},
        {id:3,nombre:"Alan",apellido:"Palomino",celular:"0900036220"}
    ]
    response.send(contactos);
})

app.post("/contactos",(req,resp)=>{
    req.body.id=99;
    resp.send(req.body);
})

app.put("/contactos/:idParam",(req,resp)=>{
    const id= req.params.idParam;
    console.log("id",id);
    resp.send(req.body);
})

app.delete("/contactos/:id",(req,resp)=>{
    const id= req.params.id;
    console.log("id:",id);
    resp.send();
})

app.listen(puerto,()=>{
    console.log("servisor listo en el puerto 3001")
});