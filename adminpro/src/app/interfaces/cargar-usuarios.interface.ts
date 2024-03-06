import { Usuario } from "../models/usuario.model";

export interface CargarUsuario{ 
    totalUsers:number;
    usuarios:Usuario[];
}