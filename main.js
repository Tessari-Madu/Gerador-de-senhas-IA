```javascript
const numeroSenha = document.querySelector(".parametro-senha__texto");
const botoes = document.querySelectorAll(".parametro-senha__botao");
const campoSenha = document.querySelector("#campo-senha");
const checkbox = document.querySelectorAll(".checkbox");
const forcaSenha = document.querySelector(".forca");
const entropiaTexto = document.querySelector(".entropia");
const botaoCopiar = document.querySelector("#copiar");

let tamanhoSenha = 12;

const maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const minusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%&*?";

numeroSenha.textContent = tamanhoSenha;

botoes[0].addEventListener("click", () => {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
        numeroSenha.textContent = tamanhoSenha;
        gerarSenha();
    }
});

botoes[1].addEventListener("click", () => {
    if (tamanhoSenha < 30) {
        tamanhoSenha++;
        numeroSenha.textContent = tamanhoSenha;
        gerarSenha();
    }
});

checkbox.forEach(item => {
    item.addEventListener("change", gerarSenha);
});

botaoCopiar.addEventListener("click", () => {
    navigator.clipboard.writeText(campoSenha.value);

    botaoCopiar.textContent = "✅ Copiado!";

    setTimeout(() => {
        botaoCopiar.textContent = "📋 Copiar senha";
    }, 1500);
});

function gerarSenha() {

    let caracteres = "";

    if (checkbox[0].checked) caracteres += maiusculas;
    if (checkbox[1].checked) caracteres += minusculas;
    if (checkbox[2].checked) caracteres += numeros;
    if (checkbox[3].checked) caracteres += simbolos;

    if (caracteres.length === 0) {
        campoSenha.value = "Selecione uma opção";
        return;
    }

    let senha = "";

    for (let i = 0; i < tamanhoSenha; i++) {
        const indice = Math.floor(
            Math.random() * caracteres.length
        );

        senha += caracteres[indice];
    }

    campoSenha.value = senha;

    classificarSenha(caracteres.length);
}

function classificarSenha(tamanhoAlfabeto) {

    const entropia =
        tamanhoSenha * Math.log2(tamanhoAlfabeto);

    forcaSenha.classList.remove(
        "fraca",
        "media",
        "forte"
    );

    if (entropia > 60) {
        forcaSenha.classList.add("forte");
    }
    else if (entropia > 40) {
        forcaSenha.classList.add("media");
    }
    else {
        forcaSenha.classList.add("fraca");
    }

    entropiaTexto.textContent =
        `Entropia estimada: ${Math.round(entropia)} bits`;
}

gerarSenha();
```
