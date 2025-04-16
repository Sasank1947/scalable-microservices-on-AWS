import { Component, OnInit } from '@angular/core';
import { Survey, SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss'
})

export class SurveyListComponent implements OnInit {
  surveys: Survey[] = [];

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit(): void {
    this.getAllSurveys();
  }

  getAllSurveys(): void {
    this.surveyService.getSurveys().subscribe({
      next: (data) => {
        this.surveys = data;
      },
      error: (error) => {
        alert('Error fetching surveys.');
        console.error('Error:', error);
      },
    });
  }

  deleteSurvey(id: number): void {
    this.surveyService.deleteSurvey(id).subscribe({
      next: (response) => {
        console.log('Response:', response); // Logs "Deleted"
        alert('Survey deleted successfully!');
        this.surveys = this.surveys.filter((survey) => survey.id !== id); // Remove the deleted survey from the list
      },
      error: (error) => {
        console.error('Error deleting survey:', error);
        alert('Error deleting survey. Please try again.');
      },
    });
  }
  

  updateSurvey(id: number): void {
    this.router.navigate([`/update-survey/${id}`]);// Pass survey ID for update
  }
}

