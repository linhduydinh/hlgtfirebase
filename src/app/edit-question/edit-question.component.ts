import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreDataService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Question } from '../models/question';
import { FileUpload } from '../models/file-upload';
import { AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  questionForm: FormGroup;
  question: any;
  selectedFiles: FileList;
  currentUpload: FileUpload;
  imageUrl: string;
  private basePath = '/images';
  questions: AngularFireList<Question>;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private firestoreDataService: FirestoreDataService) {
   }

  ngOnInit() {

    const id = +this.route.snapshot.paramMap.get('id');
    this.firestoreDataService.getQuestion(id).subscribe(res => {
      this.question = res;
      console.log('Document data:', this.question);

      this.questionForm = this.fb.group({
        questionId: [id],
        questionName: [this.question.name],
        questionImage: [''],
        categoryId: [this.question.cId],
        questionExplain: [this.question.expl],
        answers: this.fb.array([])
      });
      this.question.answers.forEach(element => {
        this.addAnswer(element);
      });

    });
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  get answers(): FormArray {
    return <FormArray>this.questionForm.get('answers');
  }

  addAnswer(answer: any): void {
    this.answers.push(this.buildAnswer(answer));
  }

  buildAnswer(answer: any): FormGroup {
    return this.fb.group({
        answerId: answer.answerId,
        answerName: answer.answerName,
        isCorrect: answer.isCorrect
    });
  }

  saveQuestion() {
    if (this.selectedFiles) {
      const file = this.selectedFiles.item(0);
      this.currentUpload = new FileUpload(file);
      const storageRef = firebase.storage().ref(`${this.basePath}`);
      storageRef.child(`/${this.currentUpload.file.name}`).put(this.currentUpload.file).then(res => {
        storageRef.child(`/${this.currentUpload.file.name}`).getDownloadURL().then(ress => {
          this.imageUrl = ress;
          this.firestoreDataService.addQuestion(this.questionForm.value, this.imageUrl);
        });
      });
    } else {
      this.firestoreDataService.addQuestion(this.questionForm.value, this.question.img);
    }
  }

}
