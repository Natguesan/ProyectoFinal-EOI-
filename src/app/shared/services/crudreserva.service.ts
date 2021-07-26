import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Reserva } from '../model/reserva';
import { ReservaMesa } from '../model/reservamesa';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CrudreservaService {

  constructor(private fireStore : AngularFirestore, private authService : AuthService) { }



  createReservaSala(data : Reserva) {
    data.uid = this.authService.userData().uid;
    data.id = this.fireStore.createId();
    this.fireStore.collection('users').doc(data.uid).collection('reservaSala').doc(data.id).set(data);
    return this.fireStore.collection('salas').doc(data.sala).collection('reservas').doc(data.id).set(data);
  }
  createReservaMesa(data : ReservaMesa) {
    data.uid = this.authService.userData().uid;
    data.id = this.fireStore.createId();
    this.fireStore.collection('users').doc(data.uid).collection('reservaMesa').doc(data.id).set(data);
    return this.fireStore.collection('mesas').doc('Mesa').collection('reservas').doc(data.id).set(data);
  }
  loadReservasdeSala(){
    const uid = this.authService.userData().uid;
   return this.fireStore.collection('users').doc(uid).collection('reservaSala').get()
  }
  loadReservasdeMesa(){
    const uid = this.authService.userData().uid;
   return this.fireStore.collection('users').doc(uid).collection('reservaMesa').get()
  }
  deleteReservaSala(reserva : Reserva){
    this.fireStore.collection('salas').doc(reserva.sala).collection('reservas').doc(reserva.id).delete();
    return this.fireStore.collection('users').doc(reserva.uid).collection('reservaSala').doc(reserva.id).delete()
  }
  deleteReservaMesa(reserva : ReservaMesa){
    this.fireStore.collection('mesas').doc('Mesa').collection('reservas').doc(reserva.id).delete();
    return this.fireStore.collection('users').doc(reserva.uid).collection('reservaMesa').doc(reserva.id).delete()
  }
}
