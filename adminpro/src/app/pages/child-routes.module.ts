import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' } },
  { path: 'account-settings', component: AccountSettingComponent, data: { titulo: 'Ajustes de cuenta' } },
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil Usuario' } },
  { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Búsquedas' } },

  //Mantenimientos
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales de aplicación' } },
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Médicos de aplicación' } },
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Médico de la aplicación' } },

  //Rutas de Administrador
  { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Usuario de aplicación' } },
  { path: 'promesas', canActivate: [AdminGuard], component: PromesasComponent, data: { titulo: 'Promesas' } },
  { path: 'rxjs', canActivate: [AdminGuard], component: RxjsComponent, data: { titulo: 'RXJS' } },

]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }
