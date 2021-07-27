import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ReservaMesa } from 'src/app/shared/model/reservamesa';
import { CrudreservaService } from 'src/app/shared/services/crudreserva.service';

@Component({
  selector: 'app-reservar-mesa',
  templateUrl: './reservar-mesa.component.html',
  styleUrls: ['./reservar-mesa.component.scss']
})
export class ReservarMesaComponent implements OnInit {
  today: Date = new Date;
  max: Date = new Date(new Date().getFullYear(), 12);
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirtFormGroup: FormGroup;
  isLinear = true;
  personas : number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  comensales: number = 0;
  fechaElegida: string = "";
  hora: number = 0;
  fecha?: string;
  horas: number[] = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  horasdisponibles: number[] = [];
  horasocupadas: number[] = [];
 

  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    private reservaService: CrudreservaService,
    private router: Router,
  ) {
    this.firstFormGroup = this.fb.group({
      personas: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirtFormGroup = this.fb.group({
      hora: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }
  searchreservas(event: MatDatepickerInputEvent<Date>) {
    let fecha = event.value;
    this.horasocupadas = [];
    const fechaformat = moment(fecha).format("DD/MM/YYYY");
    this.db.collection('mesas').doc('Mesa').collection('reservas').ref
      .where('fecha', '==', fechaformat).get().then(data => {
        data.forEach((doc) => {
          let date: number = doc.get("hora");
          this.horasocupadas.push(date)
        });
        this.filtrado();
      });
  }
  filtrado(): void {
    this.horasdisponibles = this.horas;
    const horasocupadas = this.horasocupadas;
    this.horasdisponibles = this.horasdisponibles.filter(hora => !horasocupadas.includes(hora));
  }
  changeComensales(): void {
    this.comensales = this.firstFormGroup.value.personas
  }
  changefecha(): void {
    let fecha = this.secondFormGroup.value.secondCtrl;
    const fechaformat = moment(fecha).format("DD/MM/YYYY");
    this.fechaElegida = fechaformat;
  }
  changehora(): void {
    this.hora = this.thirtFormGroup.value.hora;
  }
  crearReserva(): void {
    const reserva: ReservaMesa = {
      comensales: this.comensales,
      fecha: this.fechaElegida,
      hora: this.hora
    }
    this.reservaService.createReservaMesa(reserva).then(success => {
      this.router.navigate(["/my-bookings"])
    }).catch(error => {
      console.error("he fallado QQ")
    })
  }

}
