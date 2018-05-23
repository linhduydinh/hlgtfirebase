import { Injectable } from '@angular/core';  
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';  
  
import { Observable } from 'rxjs/Observable';   
import { Question } from '../models/question';
  
@Injectable()  
export class FirestoreDataService {  
  userscollection: AngularFirestoreCollection<Question>;  
  users: Observable<Question[]>;  
  userDoc: AngularFirestoreDocument<Question>;  
  
  constructor(public _afs: AngularFirestore) {  
    //this.users = this._afs.collection('Users').valueChanges();  
  
    this.userscollection = this._afs.collection('Users', x => x.orderBy('firstname', 'asc'));  
    // this.users = this.userscollection.snapshotChanges().map(  
    //   changes => {  
    //     return changes.map(  
    //       a => {  
    //         const data = a.payload.doc.data() as Question;  
    //         data.id = a.payload.doc.id;  
    //         return data;  
    //       });  
    //   });  
  }  
  getUsers() {  
    return this.users;  
  }  
  addUser(user) {  
    this.userscollection.add(user);  
  }  
  deleteUser(user) {  
    this.userDoc = this._afs.doc(`Users/${user.id}`);  
    this.userDoc.delete();  
  }  
} 