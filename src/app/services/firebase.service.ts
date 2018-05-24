import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { Question } from '../models/question';

@Injectable()
export class FirestoreDataService {
  questionsCollection: AngularFirestoreCollection<Question>;
  questions: Observable<Question[]>;
  userDoc: AngularFirestoreDocument<Question>;

  constructor(public _afs: AngularFirestore) {
    // this.questions = this._afs.collection('questions').valueChanges();

    // this.questionsCollection = this._afs.collection('questions', x => x.orderBy('firstname', 'asc'));
    this.questionsCollection = this._afs.collection('questions');
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
    // return this.users;
  }
  addQuestion(question: Question) {
    this.questionsCollection.add(question);
  }
  deleteUser(user) {
    this.userDoc = this._afs.doc(`Users/${user.id}`);
    this.userDoc.delete();
  }
}
