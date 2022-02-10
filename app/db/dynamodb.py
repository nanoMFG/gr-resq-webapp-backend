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
