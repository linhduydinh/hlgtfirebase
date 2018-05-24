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
  addQuestion(question: any, imageUrl: string) {
    console.log(question);
    this.questionsCollection.doc('question_' + `${question.questionId}`).set({id: question.questionId, name: question.questionName,
      cId: question.categoryId, img: imageUrl, expl: question.questionExplain});

    const answersCollection = this.questionsCollection.doc('question_' + `${question.questionId}`).collection('answers');
    for (const element of question.answers) {
      console.log(element);
      answersCollection.doc('answer_' + `${element.answerId}`).set({
        id: element.answerId,
        name: element.answerName,
        isCorrect: element.isCorrect
      });
    }

    this.questionsCollection.add(question);
  }
  deleteUser(user) {
    this.userDoc = this._afs.doc(`Users/${user.id}`);
    this.userDoc.delete();
  }
}
