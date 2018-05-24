import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question';
import { FirestoreDataService } from '../services/firebase.service';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent implements OnInit {

  listQuestions: Question[] = [];

  constructor(private firestoreService: FirestoreDataService) { }

  ngOnInit() {

    this.firestoreService.getQuestions().subscribe(res => {
      this.listQuestions = res;
      console.log(res);
    });

  }

  editQuestion(questionId: number) {
    console.log(questionId);
  }

}
