FROM --platform=linux/amd64 openjdk:21-jdk-slim
LABEL authors="sasanksandeep"

EXPOSE 8080

ARG JAR_FILE=target/assignment3-backend-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} .

CMD [ "java", "-jar", "/assignment3-backend-0.0.1-SNAPSHOT.jar"]