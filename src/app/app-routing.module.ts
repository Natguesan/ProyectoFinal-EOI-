import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './components/contacto/contacto.component';
import { DondeEstamosComponent } from './components/encuentranos/donde-estamos.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { InicioComponent } from './components/Home/inicio.component';
import { SalasComponent } from './components/nuestra-dimension/salas/salas.component';
import { TabernaComponent } from './components/nuestra-dimension/taberna/taberna.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RedesComponent } from './components/redes/redes.component';
import { ReservarMesaComponent } from './components/reservas/reservar-mesa/reservar-mesa.component';
import { ReservarSalaComponent } from './components/reservas/reservar-sala/reservar-sala.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { AuthGuard } from './shared/guard/auth.guard';
const routes: Routes = [
  { path: "", component: InicioComponent, pathMatch: "full" },
  { path: "our-dimension/rooms", component: SalasComponent, },
  { path: "our-dimension/tavern", component: TabernaComponent,},
  { path: "find-us", component: DondeEstamosComponent,},
  { path: "contact-us", component: ContactoComponent,},
  { path: "social-media", component: RedesComponent,},
  { path: "book", component: ReservasComponent,canActivate: [AuthGuard]},
  { path: "book-a-table", component: ReservarMesaComponent,canActivate: [AuthGuard]},
  { path: "book-a-room", component: ReservarSalaComponent,canActivate: [AuthGuard]},
  { path: "my-bookings", component: ProfileComponent,canActivate: [AuthGuard]},
  { path: "events", component: EventosComponent,}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
