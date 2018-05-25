import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { Question, Answer } from '../models/question';

@Injectable()
export class FirestoreDataService {

  questionsCollection: AngularFirestoreCollection<Question>;
  questions: Observable<Question[]>;
  questionDoc: AngularFirestoreDocument<Question>;
  question: Observable<Question>;

  constructor(public _afs: AngularFirestore) {
    // this.questions = this._afs.collection('questions').valueChanges();

    // this.questionsCollection = this._afs.collection('questions', x => x.orderBy('firstname', 'asc'));
    this.questionsCollection = this._afs.collection('questions');
    this.questions = this.questionsCollection.snapshotChanges().map(
      changes => {
        return changes.map(
          a => {
            const data = a.payload.doc.data() as Question;
            data.id = a.payload.doc.id;
            return data;
          });
      });
  }

  getQuestions() {
    return this.questions;
  }

  addQuestion(question: any, imageUrl: string) {
    this.questionsCollection.doc(`${question.questionId}`).set({name: question.questionName, cId: question.categoryId,
                                                                img: imageUrl, expl: question.questionExplain,
                                                                answers: question.answers});
  }

  getQuestion(id: number) {
    this.questionDoc = this._afs.doc<Question>(`questions/${id}`);
    this.question = this.questionDoc.valueChanges();
    return this.question;
  }

  // updateQuestion() {
  //   this.question
  // }

  deleteUser(user) {
    // this.userDoc = this._afs.doc(`Users/${user.id}`);
    // this.userDoc.delete();
  }
}
