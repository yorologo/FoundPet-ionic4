import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor(private storage: Storage, private AFauth: AngularFireAuth, private AFdb: AngularFireDatabase) { }

  registerUser(userData) {
    return new Promise((accept, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(userData.email, userData.password).then(user => {
        this.writeUserData(userData);
        accept("Usuario registrado");
      }).catch(err => reject(err));
    });
  }

  loginUser(credential) {
    return new Promise((accept, reject) => {
      this.AFauth.auth.signInWithEmailAndPassword(credential.email, credential.password).then(user => {
        this.storage.set("currentUID", this.AFauth.auth.currentUser.uid);
        accept("Login Correcto");
      }).catch(err => reject(err));
    });
  }

  writeUserData(userData) {
    this.AFdb.object('/users/' + this.AFauth.auth.currentUser.uid).update({
      username: userData.username,
      email: userData.email,
      profile_picture: null,
    });
  }
}
