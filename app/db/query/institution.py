from .. import read_table, write_table
from botocore.exceptions import ClientError
from app.db.serializer import generate_institution_key
from boto3.dynamodb.conditions import Key


def get_institution(name: str):
    key = generate_institution_key(name)
    try:
        response = read_table.get_item(
            Key=key
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        return response.get('Item')


def get_all_institutions():
    '''
    Returns all institutions (Names only)
    '''
    response = read_table.query(
        KeyConditionExpression=Key('PK').eq('INST')
    )
    institutions = response.get('Items')
    return list(map(lambda x: x['Name'], institutions))


def put_institution(institution: dict):
    response = write_table.put_item(
        Item=institution
    )
    return response
