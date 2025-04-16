package com.swe_642_assignment_3.assignment3_backend.repo;

import com.swe_642_assignment_3.assignment3_backend.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface surveyRepo extends JpaRepository<Survey,Integer> {
}
