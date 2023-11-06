FROM python:3.9.17

ENV PYTHONBUFFERED 1

RUN apt-get update
RUN apt-get install -y vim

RUN mkdir /srv/docker-bridge
WORKDIR /srv/docker-bridge
ADD . /srv/docker-bridge

RUN chmod +x tools/cpptest

RUN pip install -r requirements.txt

EXPOSE 8000
CMD ["sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000 --noreload"]
