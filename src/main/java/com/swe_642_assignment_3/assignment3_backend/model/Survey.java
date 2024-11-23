package com.swe_642_assignment_3.assignment3_backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
//defining the model to be created in the AWS RDS database
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Survey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String first_name;
    private String last_name;

    private String street_addr;
    private String city;
    private String state;
    private String zip;

    private String telephone_number;
    private String email;

    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "dd-MM-yyyy")
    private Date survey_date;

    @ElementCollection
    @CollectionTable(name = "survey_likes", joinColumns = @JoinColumn(name = "survey_id"))
    @Column(name = "like_item")
    private List<String> likes;

    private String hearAboutUs;
    private String likelihood;
    private String comments;

    @Override
    public String toString() {
        return "Survey{" +
                "id=" + id +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", street_addr='" + street_addr + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zip=" + zip +
                ", telephone_number=" + telephone_number +
                ", email='" + email + '\'' +
                ", survey_date=" + survey_date +
                ", likes=" + likes +
                ", hearAboutUs='" + hearAboutUs + '\'' +
                ", likelihood='" + likelihood + '\'' +
                ", comments='" + comments + '\'' +
                '}';
    }
}
