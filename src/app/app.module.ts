import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';

import { AppComponent } from './app.component';
import { FirebaseConfig} from './firebase.config';
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
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(FirebaseConfig.firebase),
    AngularFireDatabaseModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
