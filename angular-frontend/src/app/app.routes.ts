import { Routes } from '@angular/router';
import { SurveyFormComponent } from './components/survey-form/survey-form.component';
import { SurveyListComponent } from './components/survey-list/survey-list.component';
import { HomeComponent } from './components/home/home.component';
import { UpdateSurveyComponent } from './components/update-survey/update-survey.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'survey-form', component: SurveyFormComponent },
    { path: 'survey-list', component: SurveyListComponent },
    { path: 'update-survey/:id', component: UpdateSurveyComponent },
];
