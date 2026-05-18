import csv
import json
from collections import defaultdict

input = 'maile_europarlament - Austria.csv'

# Nested defaultdict helper
def nested():
    return defaultdict(list)

result = defaultdict(nested)

plecDict = {
    'M' : 'male',
    'F': 'female'
}
country_translations = {
    "Finlandia": "Finland",
    "Hiszpania": "Spain",
    "Polska": "Poland",
    "Grecja": "Greece",
    "Malta": "Malta",
    "Francja": "France",
    "Szwecja": "Sweden",
    "Niemcy": "Germany",
    "Irlandia": "Ireland",
    "Holandia": "Netherlands",
    "Litwa": "Lithuania",
    "Luksemburg": "Luxembourg",
    "Belgia": "Belgium",
    "Włochy": "Italy",
    "Portugalia": "Portugal",
    "Rumunia": "Romania",
    "Chorwacja": "Croatia",
    "Czechy": "Czech Republic",
    "Słowacja": "Slovakia",
    "Austria": "Austria",
    "Dania": "Denmark",
    "Węgry": "Hungary",
    "Cypr": "Cyprus",
    "Słowenia": "Slovenia",
    "Łotwa": "Latvia",
    "Bułgaria": "Bulgaria",
    "Estonia": "Estonia",
}

with open(input, newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)

    for row in reader:
        kraj = country_translations[row["kraj pl"]]
        plec = plecDict[row["płeć"]]
        email = row["email"]

        result[kraj][plec].append(email)

# Convert defaultdicts to normal dicts
final_result = {
    k: dict(v)
    for k, v in result.items()
}

print(final_result.keys())

# Write to JS file
with open("output.js", "w", encoding="utf-8") as f:
    f.write("var email_dict = ")
    f.write(json.dumps(final_result, indent=2))
    f.write(";")

print("output.js created")