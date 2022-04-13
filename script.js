
const $visualize = document.getElementById("visualize"),
$upper = document.getElementById("uppercase"),
$lower = document.getElementById("lowercase"),
$lenght = document.getElementById("long"),
$symbol = document.getElementById("symbol"),
$number = document.getElementById("number"),
$generate = document.getElementById("generate");

// COPIA EL TEXTO DEL INPUT DONDE SE MUESTRA LA CONTRASEÑA
const copyToClipBoard = ()=> {
    var content = document.getElementById('visualize');
    content.select();
    document.execCommand('copy');
}

// DEVUELVE UN STRING DEPENDIENDO DE QUE CHECKBOX ESTEN ACTIVAS
const  generateRandomString = (uppercase, lowercase, symbol, number) => {
    let num = "", 
    upper = "", 
    lower = "", 
    sym = "",
    result = "";

    if(uppercase.checked) upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(lowercase.checked) lower = "abcdefghijklmnopqrstuvwxyz";
    if(symbol.checked) sym = `!"#$%&'()*+,-./:;<=>?@[\]^_{|}~`;
    if(number.checked)  num = "0123456789";

    result = upper + lower + sym + num;
    return result;
}

// RECIBE LA CADENA DE CARACTERES ALEATORIOS Y COMPRUEBA SI CONTIENE AL MENOS UN CARACTER DE LAS CHECKBOX ACTIVAS
// DEVUELVE UN TRUE SI LOS CONTIENE O UN FALSE SI NO LO TIENE
const  comprobatePassword = (string ,uppercase, lowercase, symbol, number) => {
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower = "abcdefghijklmnopqrstuvwxyz",
    sym = `!"#$%&'()*+,-./:;<=>?@[\]^_{|}~`,
    num = "0123456789",
    flag;

    if(uppercase.checked){
        for (let i = 0; i < upper.length; i++) {
            if(string.includes(upper[i])){
                flag = true;
                break;
            }
            else {
                flag = false
            }
        }
    }
    if(lowercase.checked){
        for (let i = 0; i < lower.length; i++) {
            if(string.includes(lower[i])){
                flag = true;
                break;
            }
            else {
                flag = false
            }
        }
    }
    if(symbol.checked){
        for (let i = 0; i < sym.length; i++) {
            if(string.includes(sym[i])){
                flag = true;
                break;
            }
            else {
                flag = false
            }
        }
    }
    if(number.checked){
        for (let i = 0; i < num.length; i++) {
            if(string.includes(num[i])){
                flag = true;
                break;
            }
            else {
                flag = false
            }
        }
    }
    return flag;
}

// DEVUELVE UN STRING DE CARACTERES ALEATORIOS (RECIBIDOS DE LA FUNCION generateRandomString()) Y DEL LARGO QUE RECIBIO DEL INPUT NUMBER
const  generateRandomPassword = (length) => {
    const characters = generateRandomString($upper, $lower, $symbol, $number);
    let result = ' ';
    const charactersLength = characters.length;

    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    if(!comprobatePassword(result,$upper,$lower,$symbol,$number)) {
        return generateRandomPassword($lenght.value);
    }
    return result
}

// COMPRUEBA EL LARGO DEL INPUT NUMBER Y LLAMA A LA FUNCION  generateRandomPassword() Y MUESTRA EL RESULTADO EN EL INPUT $visualize
$generate.addEventListener("click", ()=> {
    if($lenght.value < 8) {
        $lenght.value = 8;
    }
    else if($lenght.value > 32) {
        $lenght.value = 32;
    }
    
    $visualize.value = generateRandomPassword($lenght.value);
});