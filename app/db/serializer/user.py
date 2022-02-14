def generate_user_key(email: str):
    username, domain = email.split('@')
    return {
        'PK': f'DOMAIN#{domain.upper()}',
        'SK': f'USERNAME#{username.upper()}'
    }
