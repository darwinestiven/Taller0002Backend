import express from "express";
import {crear,buscarId,buscar,actualizar,eliminar} from "../controladores/adopcionController.js";
const routerAdopcion = express.Router();

routerAdopcion.get("/",(req,res)=>{
    res.send("Bienvenido a Adopciones");
});

routerAdopcion.post("/crear",(req,res)=>{
    crear(req,res);
});

routerAdopcion.get("/buscar/:id",(req,res)=>{
    buscarId(req,res);
});

routerAdopcion.get("/buscar",(req,res)=>{
    buscar(req,res);
});

routerAdopcion.put("/actualizar/:id",(req,res)=>{
    actualizar(req,res);
});

routerAdopcion.delete("/eliminar/:id",(req,res)=>{
    eliminar(req,res);
});

export {routerAdopcion}