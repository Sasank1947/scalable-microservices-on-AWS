import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For Angular structural directives like *ngFor
import { FormsModule } from '@angular/forms'; // For [(ngModel)] support
import { Survey, SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-form',
  standalone: true, // Mark as a standalone component
  imports: [CommonModule, FormsModule], // Import necessary modules
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss'] // Corrected from styleUrl to styleUrls
})

export class SurveyFormComponent {
  survey: Survey = {
    first_name: '',
    last_name: '',
    street_addr: '',
    city: '',
    state: '',
    zip: '',
    telephone_number: '',
    email: '',
    survey_date: '',
    likes: [],
    hearAboutUs: '',
    likelihood: '',
    comments: '',
  };

  likesOptions = ['Atmosphere', 'Dorm Rooms', 'Sports', 'Students', 'Location', 'Campus'];
  hearAboutUsOptions = ['Friends', 'Television', 'Internet', 'Other'];
  likelihoodOptions = ['Very Likely', 'Likely', 'Unlikely'];

  constructor(private surveyService: SurveyService, private router: Router) {} // Inject Router

  onSubmit(): void {
    // Format survey_date as "dd-MM-yyyy"
    if (this.survey.survey_date) {
      const date = new Date(this.survey.survey_date);
      this.survey.survey_date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }

    this.surveyService.createSurvey(this.survey).subscribe({
      next: (response) => {
        // Show success pop-up
        alert('Survey submitted successfully!');
        // Redirect to home page
        this.router.navigate(['/']);
      },
      error: (error) => {
        // Show error pop-up
        alert('Error submitting survey.');
        console.error('Error:', error);
      },
    });
  }

  onCancel(): void {
    this.survey = {
      first_name: '',
      last_name: '',
      street_addr: '',
      city: '',
      state: '',
      zip: '',
      telephone_number: '',
      email: '',
      survey_date: '',
      likes: [],
      hearAboutUs: '',
      likelihood: '',
      comments: '',
    };
  }
}
