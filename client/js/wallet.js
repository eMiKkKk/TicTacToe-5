const solButton = document.querySelector('.sol__button');
const exitButton = document.querySelector('.exit__button');
const phantom = window.phantom;
let walletName;
let isWalletConnected;

async function connectSolana() {
  return phantom.solana.connect();
}


function updateWalletState() {
  const newGameButton = document.querySelector('.button__newgame');
  if (phantom.solana.isConnected) {
    newGameButton.removeAttribute('disabled','')
  }
  else
  newGameButton.setAttribute('disabled','')
}

solButton.addEventListener('click', async (e) => {
  if (window.phantom?.solana?.isPhantom) {
    const result = await connectSolana();
    walletName = result.publicKey.toString();
    solButton.textContent = walletName;
    updateWalletState()
  }
  else alert('установи фантом заебал')
})


exitButton.addEventListener('click', async() => {
  if (phantom.solana.isConnected) {
    await phantom.solana.disconnect()
    solButton.textContent = 'Solana'
    await updateWalletState()
  }
})
