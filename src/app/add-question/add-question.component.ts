import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, FormControlName} from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { FileUpload } from '../models/file-upload';
import { Question } from '../models/question';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  //_db: AngularFirestore;
  questionForm: FormGroup;
  selectedFiles: FileList;
  currentUpload: FileUpload;
  imageUrl: string;
  //questions: Observable<any[]>;
  private basePath: string = '/images';
  questions: AngularFireList<Question>;

  constructor(private fb: FormBuilder, private db: AngularFireDatabase, 
    private afStorage: AngularFireStorage) { 
    this.questions = db.list('questions');
    //this._db = db;
  }

  ngOnInit() {

    this.questionForm = this.fb.group({
      questionId: [0, Validators.required],
      questionName: ['', Validators.required],
      questionImage: ['', Validators.required],
      categoryId: [0, Validators.required],
      questionExplain: ['', Validators.required],
      answers: this.fb.array([this.buildAnswer()])
    });

  }

  getData(){
    this.questions = this.db.list('questions');
    return this.questions;
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  get answers(): FormArray {
    return <FormArray>this.questionForm.get('answers');
  }

  addAnswer(): void {
    this.answers.push(this.buildAnswer());
  }

  buildAnswer(): FormGroup {
    return this.fb.group({
        answerId: 0,
        answerName: '',
        isCorrect: false
    });
  }

  saveQuestion() {
    console.log(this.questionForm);

    let file = this.selectedFiles.item(0)
    this.currentUpload = new FileUpload(file);
    console.log(this.currentUpload);
    let storageRef = firebase.storage().ref(`${this.basePath}`);
    storageRef.child(`/${this.currentUpload.file.name}`).put(this.currentUpload.file).then(res => {
      storageRef.child(`/${this.currentUpload.file.name}`).getDownloadURL().then(ress => {
        this.imageUrl = ress;
        console.log(this.imageUrl);
      });
    });
    console.log(this.questions);
    this.questions.push({id: 1, name: 'a', categoryId: 1, explain: 'b' });
    // this.questions.push(this.questionForm.value);

    //const questionsCollection = this._db.collection<Question>('questions').doc('question');
    //const question = questionsCollection.set(this.questionForm.value);
    // const answersCollection = questionsCollection.collection('answers');
    // for (const element of this.answers) {
    //   console.log(element);
    //   answersCollection.doc('answer' + element.answerId).set({
    //     answerId: element.answerId,
    //     answerName: element.answerName,
    //     isCorrect: element.isCorrect
    //   });
    // }
  }

}
