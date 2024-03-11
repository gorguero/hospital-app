import { Hospital } from "../models/hospital.model";

export interface CargarHospitales{ 
    totalHospitales:number;
    hospitales:Hospital[];
}