FROM python:3.6
COPY . /web/env
WORKDIR /web/env
RUN pip install -r web/env/requirements.txt
ENTRYPOINT ["python"]
CMD ["app.py"]