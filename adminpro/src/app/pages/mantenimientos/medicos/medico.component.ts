import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit{

  public medicoForm!:FormGroup;
  public hospitales:Hospital[] = [];

  public hospitalSeleccionado:Hospital;
  public medicoSeleccionado:Medico;

  constructor(
    private fb:FormBuilder, 
    private hospitalService:HospitalService,
    private medicoService:MedicoService,
    private router:Router
  ){
    this.hospitalSeleccionado = new Hospital('','','');
    this.medicoSeleccionado = new Medico('','','');
  }

  ngOnInit(): void {

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
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
    const {nombre} = this.medicoForm.value;
    this.medicoService.crearMedico( this.medicoForm.value )
      .subscribe({
        next: (resp:any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${ resp.medico.uid }`);
        }
      })
  }

}
