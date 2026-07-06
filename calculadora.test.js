const scriptjs = require('./script.js');

const digitedNumberField = scriptjs.document.createElement("input");
digitedNumberField.id = "digitedNumber";
scriptjs.document.body.appendChild(digitedNumberField);


const resultPreview = scriptjs.document.createElement("input");
resultPreview.id = "result_preview";
scriptjs.document.body.appendChild(resultPreview);

const equalButton = scriptjs.document.createElement("input");
equalButton.id = "equal";
scriptjs.document.body.appendChild(equalButton);

test("Ao digitar teclas inválidas, não permite inserção", ()=>{
    expect(scriptjs.testa({key: "A", preventDefault: jest.fn()})).toBe(false);
});

test("Ao pressionar Enter, exibe o resultado", ()=>{
    expect(scriptjs.testa({key: "Enter", preventDefault: jest.fn()})).toBe(false);
});

test("Ao pressionar =, Enter exibe o resultado", ()=>{
    scriptjs.tecla("9");
    scriptjs.tecla("*");
    scriptjs.tecla("9");
    scriptjs.tecla("=");
    scriptjs.prepareResult();
    expect(scriptjs.testa({key: "=", preventDefault: jest.fn()})).toBe(false);
    expect(scriptjs.document.getElementById("digitedNumber").value).toBe("81");
});