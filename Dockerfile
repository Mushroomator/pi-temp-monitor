FROM arm32v7/python:3.8-slim as builder
COPY requirements.txt /requirements.txt
WORKDIR /
RUN ["pip3", "install", "--user", "-r", "requirements.txt"]
COPY ./app /app

FROM arm32v7/python:3.8-alpine
COPY --from=builder /root/.local/ /root/.local/
COPY ./app /app
WORKDIR /app
ENTRYPOINT ["python3"]
CMD ["app.py"]
