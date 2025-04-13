FROM maven:3.8.6-openjdk-17-slim AS build

WORKDIR /app

# Copy maven config files
COPY pom.xml ./

# Copy source code
COPY src ./src

# Build application
RUN mvn clean package -DskipTests

# Create runtime image
FROM openjdk:17-slim

WORKDIR /app

# Copy the built jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
