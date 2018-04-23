import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';


import { AppComponent } from './app.component';
import { AddQuestionComponent } from './add-question/add-question.component';

const appRoutes: Routes = [
  { path: 'home', component: AddQuestionComponent },
  { path: 'add-question', component: AddQuestionComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    AddQuestionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
