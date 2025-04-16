import { Component, OnInit } from '@angular/core';
import { Survey, SurveyService } from '../../services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-survey',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './update-survey.component.html',
  styleUrl: './update-survey.component.scss'
})
export class UpdateSurveyComponent implements OnInit {
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
    comments: ''
  };

  likesOptions = ['Atmosphere', 'Dorm Rooms', 'Sports', 'Students', 'Location', 'Campus'];
  hearAboutUsOptions = ['Friends', 'Television', 'Internet', 'Other'];
  likelihoodOptions = ['Very Likely', 'Likely', 'Unlikely'];

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']; // Get ID from route params
    this.surveyService.getSurveyById(id).subscribe({
      next: (data: Survey) => {
        // Format the date to yyyy-MM-dd for the date input field
        if (data.survey_date) {
          const parts = data.survey_date.split('-'); // Assuming it's in dd-MM-yyyy format
          data.survey_date = `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert to yyyy-MM-dd
        }
        this.survey = data; // Populate form with existing data
      },
      error: (err: any) => {
        console.error('Error fetching survey:', err);
        alert('Error loading survey data.');
      }
    });
  }
  
  onSubmit(): void {
    // Ensure survey ID is not undefined
    if (this.survey.id === undefined) {
      alert('Survey ID is missing. Unable to update.');
      return; // Stop execution if ID is undefined
    }
  
    // Convert date back to dd-MM-yyyy before submitting
    if (this.survey.survey_date) {
      const parts = this.survey.survey_date.split('-'); // yyyy-MM-dd
      this.survey.survey_date = `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert to dd-MM-yyyy
    }
  
    // Call updateSurvey with a valid number ID
    this.surveyService.updateSurvey(this.survey.id, this.survey).subscribe({
      next: (response: string) => {
        if (response === 'Updated') {
          alert('Survey updated successfully!');
          this.router.navigate(['/']);
        } else {
          alert('Update failed. Please try again.');
        }
      },
      error: (err: any) => {
        console.error('Error updating survey:', err);
        alert('Error updating survey. Please try again.');
      }
    });
  }
  
  
  
  
  

  onCancel(): void {
    this.router.navigate(['/']);
  }

  updateLikes(option: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.survey.likes.push(option);
    } else {
      this.survey.likes = this.survey.likes.filter((like) => like !== option);
    }
  }
  
}