const express=require("express");
const WebSocket=require("ws").Server;
const port=process.env.PORT||80;
const server=express().listen(port,()=>{
    console.log("ready");
});
const wss=new WebSocket({server});
let click=0;
wss.on("connection",ws=>{
    ws.on("message",data=>{
        data=data.toString();
        data=JSON.parse(data);
        if(data.type=="massage"){
            console.log(data.content);
            wss.clients.forEach(function each(client){
                client.send(JSON.stringify(data));
            });
        }
        else if(data.type=="click"){
            click++;
            console.log(click);
            let massage={
                "type":"click",
                "content":click.toString()
            }
            wss.clients.forEach(function each(client){
                client.send(JSON.stringify(massage));
            });
        }
    });
});