import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Survey {
  id?: number;
  first_name: string;
  last_name: string;
  street_addr: string;
  city: string;
  state: string;
  zip: string;
  telephone_number: string;
  email: string;
  survey_date: string;
  likes: string[];
  hearAboutUs: string;
  likelihood: string;
  comments: string;
}

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private apiUrl = 'http://localhost:8086/api/surveys'; // Backend URL

  constructor(private http: HttpClient) {}

  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.apiUrl);
  }

  getSurveyById(id: number): Observable<Survey> {
    return this.http.get<Survey>(`http://localhost:8086/api/surveys/${id}`);
  }
  

  createSurvey(survey: Survey): Observable<Survey> {
    return this.http.post<Survey>(this.apiUrl, survey);
  }

  updateSurvey(id: number, survey: Survey): Observable<string> {
    return this.http.put<string>(`http://localhost:8086/api/surveys/${id}`, survey, {
      responseType: 'text' as 'json', // Expect plain text response
    });
  }  

  // deleteSurvey(id: number): Observable<string> {
  //   return this.http.delete(`${this.apiUrl}/surveys/${id}`, { responseType: 'text' });
  // }

  // deleteSurvey(id: number): Observable<String> {
  //   return this.http.delete<String>(`${this.apiUrl}/${id}`);
  // }

  deleteSurvey(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8086/api/surveys/${id}`, {
      responseType: 'text', // Expect a plain text response
    });
  }
}
