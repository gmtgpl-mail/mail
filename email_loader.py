import csv


def main():
    with open('BAZA MAILI - ONZ.csv') as f:
        dane = [{k: v for k, v in row.items()}
            for row in csv.DictReader(f, skipinitialspace=True)]
    email_string = ""
    for osoba in dane:
        if osoba['zaimki:'] == 'F' and osoba['notatki'] == '':
            email_string += str("\""+osoba['e-mail:']+"\", ")
    email_string = email_string.replace(";", "\", \"")
    print(email_string)

main()