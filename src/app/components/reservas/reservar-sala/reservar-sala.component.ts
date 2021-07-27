import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SalasGroup } from 'src/app/shared/model/Salasgroup';
import { Reserva } from 'src/app/shared/model/reserva';
import { CrudreservaService } from 'src/app/shared/services/crudreserva.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservar-sala',
  templateUrl: './reservar-sala.component.html',
  styleUrls: ['./reservar-sala.component.scss']
})
export class ReservarSalaComponent implements OnInit {
  today: Date = new Date;
  max: Date = new Date(new Date().getFullYear(), 12);
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirtFormGroup: FormGroup;
  salasControl = new FormControl();
  isLinear = true;
  sala: string = "";
  fechaElegida: string = "";
  hora: number = 0;
  fecha?: string;
  events: string[] = [];
  horas: number[] = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  horasdisponibles: number[] = [];
  horasocupadas: number[] = [];
  salasGroups: SalasGroup[] = [
    {
      name: 'Consolas',
      salas: [
        { value: 'PlayStation' },
        { value: 'Switch' },
        { value: 'Xbox' }
      ]
    },
    {
      name: 'Ordenador',
      salas: [
        { value: 'Gaming' }
      ]
    },
    {
      name: 'Juegos de Mesa',
      salas: [
        { value: 'Mesa' }
      ]
    },
    {
      name: 'Música',
      salas: [
        { value: 'Karaoke' }
      ]
    }
  ];

  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    private reservaService: CrudreservaService,
    private router: Router,
  ) {
    this.firstFormGroup = this.fb.group({
      salas: ['', Validators.required]
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
    this.db.collection('salas').doc(this.sala).collection('reservas').ref
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
  changesala(): void {
    this.sala = this.firstFormGroup.value.salas

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
    const reserva: Reserva = {
      sala: this.sala,
      fecha: this.fechaElegida,
      hora: this.hora
    }
    this.reservaService.createReservaSala(reserva).then(success => {
      this.router.navigate(["/my-bookings"])
    }).catch(error => {
      console.error("he fallado QQ")
    })
  }

}
