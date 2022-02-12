def generate_institution_key(name: str):
    return {
        'PK': "INST",
        'SK': f'INST#{name.upper()}'
    }
