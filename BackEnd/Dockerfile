FROM python:3.8

RUN mkdir -p /app
WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app/

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]