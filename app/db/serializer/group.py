def generate_group_key(name: str):
    return {
        'PK': f'GROUP#{name.upper()}',
        'SK': f'GROUP#{name.upper()}'
    }
