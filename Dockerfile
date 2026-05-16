FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY backend/ .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java -jar app.jar --spring.datasource.url=$SPRING_DATASOURCE_URL --spring.datasource.username=$SPRING_DATASOURCE_USERNAME --spring.datasource.password=$SPRING_DATASOURCE_PASSWORD"]
