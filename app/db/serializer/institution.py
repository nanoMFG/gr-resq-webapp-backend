def generate_institution_key(name: str):
    return {
        'PK': f'INST#{name.upper()}',
        'SK': f'INST#{name.upper()}'
    }
