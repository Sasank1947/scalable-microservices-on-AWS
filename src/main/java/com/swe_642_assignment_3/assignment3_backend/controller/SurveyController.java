package com.swe_642_assignment_3.assignment3_backend.controller;

import com.swe_642_assignment_3.assignment3_backend.model.Survey;
import com.swe_642_assignment_3.assignment3_backend.service.surveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class SurveyController {

    @Autowired
    private surveyService service;

    //getting all survey form data from database
    @GetMapping("/surveys")
    public ResponseEntity<List<Survey>> getAllSurveys(){
        return new ResponseEntity<>(service.getAllSurveys(), HttpStatus.OK);
    }

    //getting particular survey data form
    @GetMapping("/surveys/{id}")
    public ResponseEntity<Survey> getSurveyById(@PathVariable int id){
        Survey survey = service.getSurveyById(id);
        if(survey!=null){
            return new ResponseEntity<>(survey,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //creating new survey data
    @PostMapping("/surveys")
    public ResponseEntity<?> addSurvey(@RequestBody Survey survey){
        try {
            Survey survey1 = service.addSurvey(survey);
            return new ResponseEntity<>(survey1,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //updating the survey data
    @PutMapping("/surveys/{id}")
    public ResponseEntity<String> updateSurvey(@PathVariable int id,@RequestBody Survey survey){
        Survey survey1 = null;
        try{
            survey1 = service.updateSurvey(id,survey);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to Update",HttpStatus.BAD_REQUEST);
        }
        if(survey1!=null){
            return new ResponseEntity<>("Updated",HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Failed to Update",HttpStatus.BAD_REQUEST);
        }
    }

    //deleting the survey data
    @DeleteMapping("/surveys/{id}")
    public ResponseEntity<String> deleteSurvey(@PathVariable int id){
        Survey survey = service.getSurveyById(id);
        if(survey!=null){
            service.deleteSurvey(id);
            return new ResponseEntity<>("User Deleted",HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Survey not found",HttpStatus.NOT_FOUND);
        }
    }
}
