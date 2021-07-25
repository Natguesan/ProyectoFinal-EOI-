import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { throwError } from 'rxjs';
import { User } from '../model/user';
import fireapp from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireStore: AngularFirestore,
    private fireAuth: AngularFireAuth,
  ) { }
  userData(): User {
    return JSON.parse(localStorage.getItem('user')!)
  }
  setUserData(user: any) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    }
    return this.fireStore.collection('users').doc(user.uid).set(userData, {
      merge: true
    })
  }
  googleAuth(): Promise<any> {
    return this.fireAuth.signInWithPopup(new fireapp.auth.GoogleAuthProvider())
      .then((result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        this.setUserData(result.user);
      }).catch((error) => {
        throwError(error)
      })
  }
  login(email: string, password : string): Promise<any> {
  return this.fireAuth.signInWithEmailAndPassword(
    email,
    password).then((result) => {
      localStorage.setItem('user', JSON.stringify(result.user));
      this.setUserData(result.user);
    }).catch((error) => {
      throwError(error)
    })
  }
  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      return true
    }
    return false
  }
  logoutservice() : void{
  localStorage.removeItem('user')
  }

  getCurrentUser() {
    const uid = this.userData().uid
    return this.fireStore.collection('users').doc(uid).get()
  }
}