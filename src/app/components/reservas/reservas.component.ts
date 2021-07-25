import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {
  fecha? : string;
  events: string[] = [];
  horas: number[] = [12,13,14,15,16,17,18,19,20,21,22,23];
  horasdisponibles: number[] = [];
  horasocupadas:number[] = [];
  constructor(
    private db: AngularFirestore,
  ) {
  }

  ngOnInit(): void {

  }

    searchreservas(event: MatDatepickerInputEvent<Date>){
      let fecha = event.value;
      this.horasocupadas = [];
      const fechaformat = moment(fecha).format("DD/MM/YYYY");
      this.db.collection('salas').doc("gaming").collection('reservas').ref
      .where('fecha', '==', fechaformat).get().then(data => {
        data.forEach((doc) => {
          let date : number = doc.get("hora");
          this.horasocupadas.push(date)
          console.log(doc.id, " => ", doc.data(), " => ", date+":00");
        });
        this.filtrado();
      });
      }
    filtrado() : void {
      this.horasdisponibles = this.horas;
      const horasocupadas = this.horasocupadas;
      this.horasdisponibles = this.horasdisponibles.filter(hora => !horasocupadas.includes(hora)); 
      console.log(this.horasdisponibles);
    }

}
