# 1. Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# 2. Runtime stage
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app

# Copy built JAR
COPY --from=build /app/target/*.jar app.jar

# Expose backend port
EXPOSE 9091

# Use SPRING_PROFILES_ACTIVE from environment (default: local)
ENTRYPOINT ["java", "-jar", "app.jar"]


