import boto3
from app.config import config

dynamo_db_admin = boto3.resource(
    'dynamodb',
    aws_access_key_id=config['DYNAMODB_FULL_ACCESS_ACCESS_KEY'],
    aws_secret_access_key=config['DYNAMODB_FULL_ACCESS_SECRET_ACCESS'],
    region_name=config['DYNAMODB_FULL_ACCESS_REGION']
)

dynamo_db_read = boto3.resource(
    'dynamodb',
    aws_access_key_id=config['DYNAMODB_READ_ONLY_ACCESS_KEY'],
    aws_secret_access_key=config['DYNAMODB_READ_ONLY_SECRET_ACCESS'],
    region_name=config['DYNAMODB_READ_ONLY_REGION'],
)

dynamo_db_write = boto3.resource(
    'dynamodb',
    aws_access_key_id=config['DYNAMODB_READ_WRITE_ACCESS_KEY'],
    aws_secret_access_key=config['DYNAMODB_READ_WRITE_SECRET_ACCESS'],
    region_name=config['DYNAMODB_READ_WRITE_REGION'],
)

read_table = dynamo_db_read.Table(config['TABLE_1'])
write_table = dynamo_db_write.Table(config['TABLE_1'])