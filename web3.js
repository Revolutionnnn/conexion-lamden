document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("boton");
  boton.addEventListener("click", connectToWallet);

  const infoBoton = document.getElementById("info");
  infoBoton.addEventListener("click", informacion);

  const formulario = document.getElementById("JugarPartida");
  formulario.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener el valor del input
    const inputNombre = document.getElementById("jugar");
    const valorNombre = inputNombre.value;

    trasaccion();
  });
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
  // Remover el evento de escucha previo, si existe
  document.removeEventListener("lamdenWalletInfo", handleWalletInfo);

  // Agregar el evento de escucha
  document.addEventListener("lamdenWalletInfo", handleWalletInfo);

  // Get Wallet Info
  document.dispatchEvent(new CustomEvent("lamdenWalletGetInfo"));
}

function handleWalletInfo(response) {
  if (response.detail.error) {
    console.log(response.detail.error);
    return;
  }
  if (response.detail.locked) {
    alert("The wallet is locked");
  } else {
    console.log(response.detail.wallets[0]);
  }
}

function trasaccion() {
  // Get Wallet Info
  const detail = JSON.stringify({
    contractName: "con_juego_10", // user will ALWAYS get a popup for any contracts that are different than the approved contract from your connection request
    //Which Lamden Network to send this to
    //mainnet, testnet are the only acceptable values
    networkType: "testnet",
    // if not provided, the default version is legacy.
    networkName: "arko",

    //The method in your contract to call
    methodName: "Jugar",

    //The argument values for your method
    kwargs: {
      movimiento: parseInt(1),
      precio: parseFloat(3.0),
    },
    //The maximum amount of stamps this transaction is allowed to use
    //Could you less but won't be allowed to use more
    stampLimit: 100,
  });
  document.addEventListener("lamdenWalletTxStatus", (response) => {
    console.log(response);
  });
  document.dispatchEvent(new CustomEvent("lamdenWalletSendTx", { detail }));
}
