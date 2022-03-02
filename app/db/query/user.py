from .. import read_table, write_table
from botocore.exceptions import ClientError
from app.db.serializer import generate_user_key


def get_user(email: str):
    key = generate_user_key(email)
    try:
        response = read_table.get_item(
            Key=key
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        return response.get('Item')


def put_user(user: dict):
    response = write_table.put_item(
        Item=user
    )
    return response
