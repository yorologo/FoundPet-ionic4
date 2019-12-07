import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private currUID;

  constructor(private storage: Storage, private AFauth: AngularFireAuth, private AFdb: AngularFireDatabase, private AFs: AngularFirestore, private AFst: AngularFireStorage) {
    this.storage.get('currentUID').then(result => {
      if (result != null) {
        this.currUID = result;
      } else {
        this.storage.set("currentUID", (this.currUID = this.AFauth.auth.currentUser.uid));
      }
    });
  }

  // getCurrUID() {
  //   return this.currUID;
  // }

  createPost(postDetails, imageURL, coordinates) {
    return new Promise((accept, reject) => {
      var pushId = this.AFdb.createPushId();
      this.AFdb.object('/post/' + pushId).update({
        title: postDetails.title,
        description: postDetails.description,
        animal: postDetails.animal,
        report_type: postDetails.type,
        image: (imageURL) ? imageURL : null,
        location: {
          latitude: (coordinates) ? coordinates.latitude : null,
          longitude: (coordinates) ? coordinates.longitude : null
        },
        pushId: pushId,
        uid: this.currUID,
      }).then(x => {
        accept("Post creado correctamente.");
      }).catch(err => reject(err));
    });
  }

  getPost() {
    return this.AFdb.list("/post", ref => ref.limitToLast(10)).valueChanges();
  }
}
