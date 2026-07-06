if (localStorage.darkmode == undefined || localStorage.darkmode == null) {
    localStorage.setItem("darkmode", 1);
}
let darkMode = false;
let numberString = "";
let resultado = false;
const teclasValidas = "0123456789+-*/=%()";
const backspace = "Backspace";
const enter = "Enter";
const esc = "Escape";
const deleteKey = "Delete";
const arrowLeft = "ArrowLeft";
const arrowRight = "ArrowRight";
function testa(event) {
    const newValue = document.getElementById("digitedNumber").value;
    if (!teclasValidas.includes(event.key) &&
        event.key != deleteKey &&
        event.key != backspace &&
        event.key != enter &&
        event.key != esc &&
        event.key != arrowLeft &&
        event.key != arrowRight) {
        event.preventDefault();
        return false;
    }
    if (event.key == enter || event.key == "=") {
        event.preventDefault();
        prepareResult();
        document.getElementById("digitedNumber").value = result();
        return false;
    }
    if (event.key == esc) {
        event.preventDefault();
        clear();
        return false;
    }

    numberString = newValue;

    if (event.key != deleteKey &&
        event.key != backspace &&
        event.key != enter &&
        event.key != esc &&
        event.key != arrowLeft &&
        event.key != arrowRight) {
        numberString += event.key;
    }
    return true;
}
function tecla(numberButton) {
    numberString += numberButton.toString();
    document.getElementById("digitedNumber").value = numberString;
    resultado = false;
    try {
        const valor = eval(result());

        document.getElementById("result_preview").innerText = '=' + valor;
    } catch (e) {
        document.getElementById("result_preview").innerText = result();
    }
}
function prepareResult() {
    numberString = eval(numberString.toString()
        .replace(/^\++|\++$/g, "")
        .replace(/^\-+|\-+$/g, "")
        .replace(/^\*+|\*+$/g, "")
        .replace(/^\/+|\/+$/g, "")
        .replace(/^\=+|\=+$/g, "")
        .replace(/\s+/g, '')
        .replace(/([+\-*/%])\1+/g, '$1')
        .replace("%", "/100")
    )
    if (!numberString) {
        numberString = '';
    }
}
function result() {
    resultado = true;
    const valor = numberString || '';

    document.getElementById("result_preview").innerText = valor;
    return valor;
}
function reset() {
    window.location.href = window.location.href
}
function dark(elem) {
    if (elem.checked) {
        setDark();
    } else {
        setLight();
    }
}
function setLight() {
    localStorage.setItem("darkmode", 0);
    for (let material of document.querySelectorAll(".bg-dark")) {
        const bgDark = document.querySelector(".bg-dark");
        if (bgDark) {
            bgDark.classList.remove("bg-dark");
            bgDark.classList.add("bg-white");
            bgDark.classList.remove("text-light");
        }
        material.classList.remove("bg-dark");
        material.classList.add("bg-light");
        material.classList.remove("text-light");
    }
}
function setDark() {
    localStorage.setItem("darkmode", 1);
    for (let material of document.querySelectorAll(".bg-light")) {
        const bgWhite = document.querySelector(".bg-white");
        if (bgWhite) {
            bgWhite.classList.remove("bg-white");
            bgWhite.classList.add("bg-dark");
            bgWhite.classList.add("text-light");
        }
        material.classList.remove("bg-light");
        material.classList.add("bg-dark");
        material.classList.add("text-light");
    }
}

function darkModeOption() {
    if (localStorage.darkmode == 1) {
        document.getElementById("darkMode").checked = true;
        setDark();
    }
}
document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("equal").addEventListener("click", ()=> {
        prepareResult();
        document.getElementById('digitedNumber').value = result()
    });
    darkModeOption();
});
module.exports = {window, document, testa, tecla, prepareResult, result};