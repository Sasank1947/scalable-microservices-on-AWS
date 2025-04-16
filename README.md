# 📝 Scalable Microservices on AWS

## 📌 Project Overview

A full-stack web application that manages student surveys. Users can submit, update, delete, and view survey responses. The system is deployed on **AWS Cloud** with an end-to-end CI/CD pipeline.

---

## 💻 Tech Stack

| Layer        | Technology                              |
|--------------|------------------------------------------|
| Frontend     | Angular                                  |
| Backend      | Spring Boot, JPA/Hibernate               |
| Database     | AWS RDS (MySQL)                          |
| CI/CD        | Jenkins (on EC2), Docker, Kubernetes     |
| Orchestration| Rancher (on EC2)                         |
| Deployment   | AWS EC2 instances                        |

---

## 🔧 Features
- 📝 Student Survey Form
- 📋 List and manage all surveys
- ✏️ Full CRUD operations
- 🚀 Automated CI/CD pipeline using Jenkins and Docker
- 🛡️ Scalable container orchestration with Rancher

---

## ⚙️ Prerequisites

- AWS Account
- EC2 Instances (Ubuntu preferred)
- RDS MySQL Instance
- Docker & Rancher installed on EC2
- Jenkins running and configured
- Angular CLI
- Java 17

---

## 🚀 Deployment Architecture

```plaintext
[Angular Frontend] → [Spring Boot REST API] → [AWS RDS (MySQL)]

CI/CD Flow:
GitHub Push → Jenkins (on EC2) → Docker Build → Rancher (K8s) Deployment
```

---

## 📁 Backend Setup

1. **Spring Boot Setup**  
   - Project initialized using Spring Initializr  
   - Dependencies: Spring Web, Spring Data JPA, MySQL Driver  

2. **MySQL RDS Configuration** (`application.properties`)
   ```properties
   spring.datasource.url=jdbc:mysql://<RDS-ENDPOINT>:3306/surveydb
   spring.datasource.username=yourusername
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   ```

3. **Build JAR & Push Docker Image**
   ```bash
   ./mvnw clean package
   docker build -t your-dockerhub/survey-backend .
   docker push your-dockerhub/survey-backend
   ```

4. **Deploy via Rancher**
   - Use Rancher UI to deploy Docker image as a Kubernetes service

---

## 🖥 Frontend Setup (Angular)

```bash
ng new survey-app --standalone=true
cd survey-app
ng generate component survey
ng generate component survey-list
ng generate component update-survey
ng generate service survey
```

- Configure routing and services
- Connect Angular to backend API endpoints

### Production Build
```bash
ng build --configuration=production
```

- Serve with NGINX or deploy using S3 + CloudFront (optional)

---

## 🔁 CI/CD Pipeline (Jenkins)

1. **Pipeline Stages**
   - Clone Git repo
   - Build with Maven
   - Dockerize backend and frontend
   - Push to Docker Hub
   - Trigger Rancher to redeploy containers

2. **Sample Jenkinsfile**
   ```groovy
   pipeline {
     agent any
     stages {
       stage('Build Backend') {
         steps {
           sh './mvnw clean package'
         }
       }
       stage('Docker Build & Push') {
         steps {
           sh 'docker build -t your-dockerhub/survey-backend .'
           sh 'docker push your-dockerhub/survey-backend'
         }
       }
       stage('Deploy to Rancher') {
         steps {
           // Use Rancher CLI or Webhook to trigger redeployment
         }
       }
     }
   }
   ```

---

## 🧪 Testing & Validation

- **Postman**: Test all backend API endpoints
- **Browser**: Validate Angular frontend navigation & form actions
- **MySQL Workbench**: Check DB persistence in AWS RDS

---

## ✅ Final Output

- Fully responsive survey system
- Automated deployment pipeline
- Resilient, scalable containerized deployment on AWS

---

## 📸 Screenshots

### Survey Home Page

![image](https://github.com/user-attachments/assets/67953993-22e2-4ef4-8bca-caa154f64dfb)

### Survey Form

![image](https://github.com/user-attachments/assets/cb1b3aa2-d92f-444c-9ff1-b138a344ed57)

### View Surveys

![image](https://github.com/user-attachments/assets/9b0e3362-f7c2-494c-9610-cf8a22ef81c6)

### Postman Testing

![image](https://github.com/user-attachments/assets/f8b0b84b-8a4a-4bb6-a078-6cd09d9d508d)

### Rancher Setup

![image](https://github.com/user-attachments/assets/cc07ca4e-81a5-41c3-b140-d2491373ab1b)

### Jenkins CI/CD Pipeline

![image](https://github.com/user-attachments/assets/f206683b-7f6c-4f45-b447-e8d8ffa0351f)
