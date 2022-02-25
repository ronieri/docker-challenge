FROM golang:alpine AS builder

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /app
COPY go.mod .
COPY main.go .

RUN go build -o main .
WORKDIR /dist
RUN cp /app/main .

# Multistage

FROM scratch
COPY --from=builder /dist/main /
ENTRYPOINT ["/main"]