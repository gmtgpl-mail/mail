import csv


def main():
    with open('baza_maili_posłowie_i_senatorowie.csv') as f:
        dane = [{k: v for k, v in row.items()}
            for row in csv.DictReader(f, skipinitialspace=True)]
    email_string = ""
    email_set = set()
    count = 0
    emails_in_each_part = 99
    total_parts = 1
    # parties = set()
    for osoba in dane:
        # parties.add(osoba['nationalPoliticalGroup'])
        # if osoba['zaimki:'] == 'M' and osoba['notatki'] == '' and osoba['nationalPoliticalGroup'] == "Konfederacja Korony Polskiej":
        # print(osoba.keys())
        if osoba['posada:'] == 'poseł':
            personEmails = osoba['e-mail:'].split(';')
            # print(len(personEmails))
            for email in personEmails:
                count += 1
                email_string += str("\""+email.strip()+"\", ")
                if email.strip() in email_set:
                    print(email)
                email_set.add(email.strip())
                if count % emails_in_each_part == 0:
                    email_string += '\n'
                    total_parts += 1
    email_string = email_string.replace(";", "\", \"")
    print(email_string)
    print('email count: '+str(count))
    print('email set len: '+str(len(email_set)))
    print('total count: '+str(len(dane)))
    print('total parts: '+str(total_parts))
    # print(parties)

main()