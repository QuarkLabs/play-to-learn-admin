import { Injectable } from '@angular/core';
import firebase from '@firebase/app';
import '@firebase/database'
import { FirebaseDatabase } from '@firebase/database-types';

@Injectable()
export class FirebaseService {

  constructor() {
    this.initializeConnection();
  }

  initializeConnection(){
    firebase.initializeApp({
        serviceAccount: "../../config/serviceAccountKey.json",
        databaseURL: "https://ptlquestions.firebaseio.com"
    });
  }

  getDatabase(): FirebaseDatabase {
    return firebase.database();
  }

}
