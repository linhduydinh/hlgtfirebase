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
import { FirestoreDataService } from '../services/firebase.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  questionForm: FormGroup;
  selectedFiles: FileList;
  currentUpload: FileUpload;
  imageUrl: string;
  private basePath = '/images';
  questions: AngularFireList<Question>;

  constructor(private fb: FormBuilder, private db: AngularFireDatabase,
    private afStorage: AngularFireStorage, private firestoreDataService: FirestoreDataService) {
  }

  ngOnInit() {

    this.questionForm = this.fb.group({
      questionId: ['', Validators.required],
      questionName: ['', Validators.required],
      questionImage: ['', Validators.required],
      categoryId: ['', Validators.required],
      questionExplain: ['', Validators.required],
      answers: this.fb.array([this.buildAnswer()])
    });

  }

  getData() {
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
        answerId: '',
        answerName: '',
        isCorrect: false
    });
  }

  saveQuestion() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new FileUpload(file);
    const storageRef = firebase.storage().ref(`${this.basePath}`);
    storageRef.child(`/${this.currentUpload.file.name}`).put(this.currentUpload.file).then(res => {
      storageRef.child(`/${this.currentUpload.file.name}`).getDownloadURL().then(ress => {
        this.imageUrl = ress;
        this.firestoreDataService.addQuestion(this.questionForm.value, this.imageUrl);
      });
    });
  }

}
