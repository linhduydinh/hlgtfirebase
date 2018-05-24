import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreDataService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Question } from '../models/question';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  questionForm: FormGroup;
  _fb: FormBuilder;
  question: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private firestoreDataService: FirestoreDataService) {
    this._fb = fb;
   }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.firestoreDataService.getQuestion(id).subscribe(res => {
      this.question = res;
      console.log('Document data:', this.question);

      this.questionForm = this._fb.group({
        questionId: ['', Validators.required],
        questionName: ['', Validators.required],
        questionImage: ['', Validators.required],
        categoryId: ['', Validators.required],
        questionExplain: ['', Validators.required],
        answers: this._fb.array([this.buildAnswer()])
      });

    });
  }

  buildAnswer(): FormGroup {
    return this.fb.group({
        answerId: '',
        answerName: '',
        isCorrect: false
    });
  }

}
