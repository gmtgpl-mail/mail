
var mailContent = "";
for (let i = 0; i< paragraphs.length; i++){
    mailContent += paragraphs[i][Math.floor(Math.random() * paragraphs[i].length)] + "\n"
}
tytul = titles[Math.floor(Math.random() * titles.length)];
function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}
function loadContent() {
    if(language == 'en'){
        linksTxt = `
        <a href="../../">main page</a>
        <a href="../../feedback/">send us feedback</a>`
        mailTitleFldTxt = "Mail title"
        nameFldTxt = "Full name for the signature"
        groupChoiceFldTxt = "Send to people from groups (uncheck these groups to whom You don't want to send emails)"
        pronounChoiceFldTxt = "Who are a"
        howManyEmailsFldTxt = "how many recipients?"
        wrongEmailNoticeTxt = 'Some email addresses might be wrong, if You have issuses message us! '
        sendBtnTxt = "Send"
        contentFldTxt = "Mail content"
        copyTitleBtnTxt = "Copy title"
        copyContentBtnTxt = "Copy text"
        copyEmailsBtnTxt = "Copy email addresses"
    }
    else if(language == 'pl'){
        linksTxt = `
        <a href="../../">strona główna</a>
        <a href="../../feedback/">wyślij nam feedback</a>`
        mailTitleFldTxt = "Tytuł maila"
        nameFldTxt = "Imię i Nazwisko do podpisu"
        groupChoiceFldTxt = "Wyślij do osób należących do (odznacz te grupy do których nie chcesz wysyłać maili)"
        pronounChoiceFldTxt = "Które są"
        howManyEmailsFldTxt = "Do ilu osób wysłać mail?"
        wrongEmailNoticeTxt = 'Niektóre maile mogą być nie poprawne, jeśli dostaniesz odpowiedź "nie znaleziono adresu", daj nam znać.'
        sendBtnTxt = "wyślij"
        contentFldTxt = "Treść"
        copyTitleBtnTxt = "kopiuj tytuł"
        copyContentBtnTxt = "kopiuj tekst"
        copyEmailsBtnTxt = "kopiuj adresy e-mail"
    }
    else{
        document.getElementById("body").innerHTML = "You have to set the language parameter to a correct value"
        return(0);
    }
    if (typeof maxNumOfRecipients === 'undefined') {
        maxNumOfRecipients = 100
    }
    if (typeof defaultNumOfRecipients === 'undefined') {
        defaultNumOfRecipients = 100
    }
    if (typeof maxNumOfRecipients === 'undefined') {
        minNumOfRecipients = 3
    }
    document.getElementById("body").innerHTML = 
    `
  <div id="header">
    <img id="logo" src="../../img/logo/logo_black_en.png">
  </div>
  <div id="content">
    <nobr>`+linksTxt+`
    </nobr>
    <form autocomplete="off">

    `+mailTitleFldTxt+`:<input type="text" name="tytul" id="tytulMaila" class="formInput" readonly>
    </form>
    `+nameFldTxt+`:<input type="text" name="signature" id="mailSignature" class="formInput" oninput="changeMailContent()">
    <div id="divGroup">
      `+groupChoiceFldTxt+`:<br>
      <div id="groupChoice"></div>
      `+pronounChoiceFldTxt+`:
      <select id="pronoun" onchange="changeMailContent()">
      </select>
    </div>
    `+howManyEmailsFldTxt+`:
    <input type="range" min="`+minNumOfRecipients+`" max="`+maxNumOfRecipients+`" value="`+defaultNumOfRecipients+`" id="howManyEmails" oninput="this.nextElementSibling.value = this.value">
    <output id="howManyEmailsOutput">`+defaultNumOfRecipients+`</output> 
    `+wrongEmailNoticeTxt+`
    <button onclick="sendFunction()">`+sendBtnTxt+`</button><br>
    <form autocomplete="off">
    `+contentFldTxt+`:
    <textarea type="text" name="content" id="mailContent">

    </textarea><br><br>
    </form>
    <button onclick="sendFunction()">`+sendBtnTxt+`</button><hr>
    <button onclick="copyTitle()">`+copyTitleBtnTxt+`</button>
    <button onclick="copyTekst()">`+copyContentBtnTxt+`</button>
    <button onclick="copyAddresses()">`+copyEmailsBtnTxt+`</button>
  </div>`
    selectPoczatekStr = "";
    Object.keys(pronouns).forEach(function(key){
        selectPoczatekStr += "<option value=\""+key+"\">"+pronouns[key]+"</option>"
    });
    document.getElementById('pronoun').innerHTML = selectPoczatekStr
    pierwszeZdanie = firstSentences[document.getElementById('pronoun').value]+"\n"
    groupChoiceStr = ""
    Object.keys(email_dict).forEach(function(key){
        groupChoiceStr += "<input type=\"checkbox\" id=\""+key+"\" checked>"+key.replace("_"," ")
    })
    document.getElementById("groupChoice").innerHTML = groupChoiceStr;
    signature = signatureBegining + document.getElementById("mailSignature").value
    document.getElementById("mailContent").innerHTML = pierwszeZdanie + mailContent + signature;
    document.getElementById("tytulMaila").value = tytul;
}
function getEmailStr(){
    emails = []
    pronoun = document.getElementById("pronoun").value
    Object.keys(email_dict).forEach(function(key){
        if(document.getElementById(key).checked){
            emails.push.apply(emails, email_dict[key][pronoun])
        }
    })
    if(emails.length == 0){
        Object.keys(email_dict).forEach(function(key){
            emails.push.apply(emails, email_dict[key][pronoun])
        })
    }
    shuffle(emails)
    howManyEmails = document.getElementById('howManyEmails').value
    returnEmailsNum = Math.min(emails.length, howManyEmails)
    shrEmails = []
    for (let i = 0; i<= returnEmailsNum; i++){
        shrEmails[i] = emails[i]
    }
    shrEmails.sort()
    emailStr = shrEmails.toString()
    emailStr = ""
    for (let i = 0; i < returnEmailsNum; i++){
        emailStr += emails[i]
        if(i+1<returnEmailsNum){
            emailStr+= ", "
        }
    }
    return emailStr
}
function sendFunction() {
    emailStr = getEmailStr()
    tytul = encodeURIComponent(document.getElementById("tytulMaila").value);
    tekst = encodeURIComponent(document.getElementById("mailContent").innerHTML);
    window.open('mailto:'+emailStr+'?subject=' + tytul + '&body=' + tekst);
    randomizeContent()
}
function changeMailContent(){
    pierwszeZdanie = firstSentences[document.getElementById('pronoun').value]+"\n";
    signature = signatureBegining + document.getElementById("mailSignature").value;
    document.getElementById("mailContent").innerHTML = pierwszeZdanie + mailContent + signature;
}
function randomizeContent(){
    pierwszeZdanie = firstSentences[document.getElementById('pronoun').value]+"\n";
    signature = signatureBegining + document.getElementById("mailSignature").value;
    mailContent = "";
    for (let i = 0; i < paragraphs.length; i++){
        mailContent += paragraphs[i][Math.floor(Math.random() * paragraphs[i].length)] + "\n"
    }
    tytul = titles[Math.floor(Math.random() * titles.length)];
    document.getElementById("mailContent").innerHTML = pierwszeZdanie + mailContent + signature;
    document.getElementById("tytulMaila").value = tytul;
}
function copyTitle(){
    navigator.clipboard.writeText(document.getElementById('tytulMaila').value);
}
function copyTekst(){
    navigator.clipboard.writeText(document.getElementById('mailContent').innerHTML);
    randomizeContent()
}
function copyAddresses(){
    navigator.clipboard.writeText(getEmailStr());
}