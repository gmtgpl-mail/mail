import csv


def main():
    with open('convertcsv.csv') as f:
        dane = [{k: v for k, v in row.items()}
            for row in csv.DictReader(f, skipinitialspace=True)]
    email_string = ""
    parties = set()
    for osoba in dane:
        parties.add(osoba['nationalPoliticalGroup'])
        if osoba['zaimki:'] == 'M' and osoba['notatki'] == '' and osoba['nationalPoliticalGroup'] == "Konfederacja Korony Polskiej":
            email_string += str("\""+osoba['e-mail:']+"\", ")
    email_string = email_string.replace(";", "\", \"")
    print(email_string)
    print(parties)

main()