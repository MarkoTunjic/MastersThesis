FROM openjdk:17-jdk-alpine
MAINTAINER baeldung.com
COPY target/masters_thesis_api-0.0.1-SNAPSHOT.jar masters_thesis_api.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=prod","-jar","/masters_thesis_api.jar"]
