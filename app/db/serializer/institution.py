def generate_institution_key(country: str, name: str):
    return {
        'PK': f"COUNTRY#{country.upper()}",
        'SK': f'INST#{name.upper()}'
    }
