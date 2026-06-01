FROM gradle:jdk17-alpine AS build
WORKDIR /app
# TODO - caching layer
COPY petgram-backend /app
RUN gradle build -x test

FROM gradle:jdk17-alpine
WORKDIR /app
# TODO
COPY --from=build /app/build/libs/*SNAPSHOT.jar app.jar
COPY --from=build /app/.env-template /app/.env
HEALTHCHECK --retries=5 CMD curl localhost:8080/healthcheck
CMD java -jar app.jar
