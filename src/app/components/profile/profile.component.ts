import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reserva } from 'src/app/shared/model/reserva';
import { ReservaMesa } from 'src/app/shared/model/reservamesa';
import { User } from 'src/app/shared/model/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CrudreservaService } from 'src/app/shared/services/crudreserva.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
reservaSalas : Array<Reserva> = []
reservaMesa : Array<ReservaMesa> = []
user? : User;
  constructor(
    private authService: AuthService,
    private router: Router,
    private reservaService: CrudreservaService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.userData()
    this.loadReservas()
  }

  loadReservas() {
    this.reservaService.loadReservasdeSala().subscribe(data => {
      this.reservaSalas = [];
      data.forEach((doc : any)=>{
      let myreserva: Reserva = doc.data()
      this.reservaSalas.push(myreserva)
      })
    });
    this.reservaService.loadReservasdeMesa().subscribe(data => {
      this.reservaMesa = [];
      data.forEach((doc : any)=>{
      let myreserva: ReservaMesa = doc.data()
      this.reservaMesa.push(myreserva)
      })
    })
  }
  deleteReservaSala( reserva : Reserva) {
    this.reservaService.deleteReservaSala(reserva).then(success => {
      console.log("Se ha eliminado correctamente")
      this.loadReservas()
    }).catch(error => {
      console.error("Problema eliminado")
    })
  }
  deleteReservaMesa( reserva : ReservaMesa) {
    this.reservaService.deleteReservaMesa(reserva).then(success => {
      console.log("Se ha eliminado correctamente")
      this.loadReservas()
    }).catch(error => {
      console.error("Problema eliminado")
    })
  }
}
