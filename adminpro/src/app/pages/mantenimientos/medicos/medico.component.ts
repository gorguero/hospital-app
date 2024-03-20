import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit{

  public medicoForm!:FormGroup;
  public hospitales:Hospital[] = [];

  public hospitalSeleccionado:Hospital;

  constructor(private fb:FormBuilder, private hospitalService:HospitalService){
    this.hospitalSeleccionado = new Hospital('','','');
  }

  ngOnInit(): void {

    this.medicoForm = this.fb.group({
      nombre: ['Montiel', Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
      .subscribe( hospitalID => {
        if (hospitalID !== undefined) {
          const hospitalEncontrado = this.hospitales.find(hospital => hospital.uid === hospitalID);
          if (hospitalEncontrado !== undefined) {
            this.hospitalSeleccionado = hospitalEncontrado;
          }
        }
      });

  }

  cargarHospitales(){
    this.hospitalService.cargarUnpagedHospitales()
      .subscribe({
        next: (hospitales:any) => {
          this.hospitales = hospitales;
        }
      })
  }

  guardarMedico(){
    console.log(this.medicoForm.value)
  }

}
