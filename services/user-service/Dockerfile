FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
RUN useradd --system --create-home --uid 10001 aegisops
COPY --from=build /workspace/target/user-service-0.1.0.jar app.jar
USER 10001
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
