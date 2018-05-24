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
  answers: Observable<Answer[]>;
  answerDoc: AngularFirestoreDocument<Answer>;

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
    console.log(question);
    this.questionsCollection.doc(`${question.questionId}`).set({name: question.questionName, cId: question.categoryId,
                                                                img: imageUrl, expl: question.questionExplain});

    const answersCollection = this.questionsCollection.doc(`${question.questionId}`).collection('answers');
    for (const element of question.answers) {
      console.log(element);
      answersCollection.doc(`${element.answerId}`).set({
        name: element.answerName,
        isCorrect: element.isCorrect
      });
    }
  }

  getQuestion(id: number) {
    console.log(id);
    this._afs.collection('questions').doc(`${id}`).ref.get().then( querySnapshot => {
      querySnapshot.forEach((collection) => {
          console.log('collection: ' + collection.id);
          });
    });

    this.questionDoc = this._afs.doc<Question>(`questions/${id}`);
    this.answerDoc = this._afs.doc<Answer>(`questions/${id}/answers`);
    this.question = this.questionDoc.valueChanges();
    this.answers = this.answerDoc.valueChanges();
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
