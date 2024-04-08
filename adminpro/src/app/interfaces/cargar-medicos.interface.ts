import { Medico } from "../models/medico.model";

export interface CargarMedicos{ 
    totalMedicos:number;
    medicos:Medico[];
}