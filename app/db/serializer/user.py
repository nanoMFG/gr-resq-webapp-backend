def generate_user_key(email: str):
    key = f'USER#{email.upper()}'
    return {
        'PK': key,
        'SK': key
    }
