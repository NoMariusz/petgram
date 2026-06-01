FROM gradle:jdk17-alpine AS build
WORKDIR /app
# TODO - caching layer
COPY petgram-backend/build.gradle /app/build.gradle
RUN --mount=type=cache,target=/home/gradle/.gradle \
    gradle dependencies --no-daemon
COPY petgram-backend/.env-template /app/.env
COPY petgram-backend /app
RUN --mount=type=cache,target=/home/gradle/.gradle \ 
    gradle build -x test --build-cache

FROM gradle:jdk17-alpine
WORKDIR /app
# TODO
COPY --from=build /app/build/libs/*SNAPSHOT.jar app.jar
COPY --from=build /app/.env /app/.env
HEALTHCHECK --retries=5 CMD curl localhost:8080/healthcheck
CMD java -jar app.jar
