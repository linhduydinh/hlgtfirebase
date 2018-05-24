import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';

import { AppComponent } from './app.component';
import { FirebaseConfig} from './firebase.config';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirestoreDataService } from './services/firebase.service';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';

const appRoutes: Routes = [
  { path: 'home', component: AddQuestionComponent },
  { path: 'list-question', component: ListQuestionsComponent},
  { path: 'add-question', component: AddQuestionComponent},
  { path: 'edit-question/:id', component: EditQuestionComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    AddQuestionComponent,
    ListQuestionsComponent,
    EditQuestionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(FirebaseConfig.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    AngularFireStorageModule
  ],
  providers: [
    FirestoreDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
