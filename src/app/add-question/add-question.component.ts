import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, FormControlName} from '@angular/forms';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  questionForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.questionForm = this.fb.group({
      questionName: ['', Validators.required],
      categoryId: ['', Validators.required],
      questionExplain: ['', Validators.required]
  });

  }

}
