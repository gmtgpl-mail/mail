
var trescMaila = "";
lenAkapity1 = akapity1.length;
lenAkapity2 = akapity2.length;
trescMaila += akapity1[Math.floor(Math.random() * lenAkapity1)] + "\n"
trescMaila += akapity2[Math.floor(Math.random() * lenAkapity2)] + "\n"
tytul = tytuly[Math.floor(Math.random() * tytuly.length)];
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
    document.getElementById("body").innerHTML = 
    `
  <div id="menuDiv">
    <img id="logo" src="img/logo/logo_black_en.png">
  </div>
  <div id="content">
    <form autocomplete="off">

    Tytuł maila:<input type="text" name="tytul" id="tytulMaila" class="formInput">
    </form>
    Imię do podpisu :<input type="text" name="podpis" id="podpisMaila" class="formInput" oninput="changeMailContent()">
    <div id="divGrupa">
      Wyślij do osób należących do (odznacz te grupy do których nie chcesz wysyłać maili):<br>
      <div id="groupChoice"></div>
      Które są:
      <select id="funkcja" onchange="changeMailContent()">
        <option value="europosel">europosel</option>
      </select>
    </div>
    <button onclick="sendFunction()">wyślij</button><br>
    <form autocomplete="off">
    Treść:
    <textarea type="text" name="tresc" id="trescMaila">

    </textarea><br><br>
    </form>
    <button onclick="sendFunction()">wyślij</button>
  </div>`
    pierwszeZdanie = pierwszeZdania[document.getElementById('funkcja').value]+"\n"
    groupChoiceStr = ""
    Object.keys(email_dict).forEach(function(key){
        groupChoiceStr += "<input type=\"checkbox\" id=\""+key+"\" checked>"+key.replace("_"," ")
    })
    document.getElementById("groupChoice").innerHTML = groupChoiceStr;
    podpis = podpisPoczatek + document.getElementById("podpisMaila").value
    document.getElementById("trescMaila").innerHTML = pierwszeZdanie + trescMaila + podpis;
    document.getElementById("tytulMaila").value = tytul;
}
function getEmailStr(){
    emails = []
    funkcja = document.getElementById("funkcja").value
    Object.keys(email_dict).forEach(function(key){
        if(document.getElementById(key).checked){
            emails.push.apply(emails, email_dict[key][funkcja])
        }
    })
    if(emails.length == 0){
        Object.keys(email_dict).forEach(function(key){
            emails.push.apply(emails, email_dict[key][funkcja])
        })
    }
    console.log(emails)
    shuffle(emails)
    console.log(emails)
    returnEmailsNum = Math.min(emails.length, 3)
    console.log("returnEmailsNum: "+returnEmailsNum)
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
    tekst = encodeURIComponent(document.getElementById("trescMaila").innerHTML);
    window.open('mailto:'+emailStr+'?subject=' + tytul + '&body=' + tekst);
    randomizeContent()
}
function changeMailContent(){
    pierwszeZdanie = pierwszeZdania[document.getElementById('funkcja').value]+"\n";
    podpis = podpisPoczatek + document.getElementById("podpisMaila").value;
    document.getElementById("trescMaila").innerHTML = pierwszeZdanie + trescMaila + podpis;
}
function randomizeContent(){
    pierwszeZdanie = pierwszeZdania[document.getElementById('funkcja').value]+"\n";
    podpis = podpisPoczatek + document.getElementById("podpisMaila").value;
    trescMaila = "";
    trescMaila += akapity1[Math.floor(Math.random() * lenAkapity1)] + "\n"
    trescMaila += akapity2[Math.floor(Math.random() * lenAkapity2)] + "\n"
    tytul = tytuly[Math.floor(Math.random() * tytuly.length)];
    document.getElementById("trescMaila").innerHTML = pierwszeZdanie + trescMaila + podpis;
    document.getElementById("tytulMaila").value = tytul;
}