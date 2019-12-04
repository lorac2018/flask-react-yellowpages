# when backend is elasticsearch, MSEARCH_INDEX_NAME is unused
# flask-msearch will use table name as elasticsearch index name unless set __msearch_index__
MSEARCH_INDEX_NAME = 'msearch'
# simple,whoosh,elaticsearch, default is simple
MSEARCH_BACKEND = 'whoosh'
# table's primary key if you don't like to use id, or set __msearch_primary_key__ for special model
MSEARCH_PRIMARY_KEY = 'id'
# auto create or update index
MSEARCH_ENABLE = True
# SQLALCHEMY_TRACK_MODIFICATIONS must be set to True when msearch auto index is enabled
SQLALCHEMY_TRACK_MODIFICATIONS = True
# when backend is elasticsearch
ELASTICSEARCH = {"hosts": ["127.0.0.1:9200"]}