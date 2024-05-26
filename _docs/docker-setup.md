### setup docker container

```bash
docker network create calculation-microservices-network

docker image build --tag raghugannaram/subtraction-service:1.0.0 ./

docker container run \
> --detach \
> --name subtraction-service \
> --publish 9002:9002 \
> --network calculation-microservices-network \
> --env LOG_LEVEL=debug \
> --mount type=bind,source="$(pwd)/_docker/logs",target=/app/logs \
> raghugannaram/subtraction-service:1.0.0

```

