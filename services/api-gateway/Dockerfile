FROM eclipse-temurin:21-jre

RUN useradd --system --create-home --uid 10001 aegisops
WORKDIR /app

COPY target/api-gateway-0.1.0.jar app.jar

USER 10001
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
