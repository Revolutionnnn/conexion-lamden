const ROCK = parseFloat(1);
const PAPER = parseFloat(2);
const SCISSOR = parseFloat(3);
let Eleccion = null;

// FALTA COLOCAR EL HADDLER EVENT DE LA TRASSACCION

document.addEventListener("lamdenWalletInfo", handleWalletInfo);

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("rock").onclick = () => {
        Eleccion = ROCK;
    };
    document.getElementById("scissor").onclick = () => {
        Eleccion = SCISSOR;
    };
    document.getElementById("paper").onclick = () => {
        Eleccion = PAPER;
    };
    const boton = document.getElementById("boton");
    boton.addEventListener("click", connectToWallet);

    const infoBoton = document.getElementById("info");
    infoBoton.addEventListener("click", informacion);

    document.getElementById("jugar").onclick = () => {
        trasaccion(me);
    };
});

// Función para manejar el evento 'lamdenWalletInfo'
function connectToWallet() {
    const detail = JSON.stringify({
        appName: "Piedra,Papel,Tijera",
        version: "1.0.0",
        logo: "images/logo.png", //or whatever the location of your logo
        contractName: "con_juego_10", //Will never change
        networkType: "testnet", // other option is 'mainnet'
        networkName: "arko", // needed for Arko connections
    });

    document.dispatchEvent(new CustomEvent("lamdenWalletConnect", { detail }));
}

function informacion() {
    // Get Wallet Info
    document.dispatchEvent(new CustomEvent("lamdenWalletGetInfo"));
}

function handleWalletInfo(response) {
    if (response.detail.errors) {
        console.log(response.detail.errors);
        return;
    }
    if (response.detail.locked) {
        alert("The wallet is locked");
    } else {
        console.log(response.detail.wallets[0]);
    }
}

function trasaccion(me) {
    if (Eleccion === null) {
        return console.log("Elige");
    }
    const detail = {
        contractName: "con_juego_10",
        networkType: "testnet",
        networkName: "arko",
        methodName: "Jugar",
        kwargs: {
            movimiento: Eleccion,
            precio: parseFloat(3.0),
        },
        stampLimit: 100,
    };
// FALTA COLOCAR LA TRASACCION
}
