package com.swe_642_assignment_3.assignment3_backend.service;

import com.swe_642_assignment_3.assignment3_backend.model.Survey;
import com.swe_642_assignment_3.assignment3_backend.repo.surveyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class surveyService {


    @Autowired
    private surveyRepo repo;

    public List<Survey> getAllSurveys(){
        return repo.findAll();
    }

    public Survey getSurveyById(int id) {
        return repo.findById(id).orElse(null);
    }


    public Survey addSurvey(Survey survey) {
        return repo.save(survey);
    }

    public Survey updateSurvey(int id, Survey survey) {
        return repo.save(survey);
    }

    public void deleteSurvey(int id) {
        repo.deleteById(id);
    }
}
