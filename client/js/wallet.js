async function initWalletUI() {

  const savedWallet = localStorage.getItem('solanaWallet');
  if (savedWallet && window.phantom?.solana && !window.phantom.solana.isConnected) {
    await connectSolana();};
  if (window.phantom?.solana?.isConnected) {

    const publicKey = window.phantom.solana.publicKey;
    if (publicKey) {
      walletName = publicKey.toString();
      solButton.textContent = getWalletMask(walletName);
    }
    updateWalletState();
  } else {

    const savedWallet = localStorage.getItem('solanaWallet');
    if (savedWallet && window.phantom?.solana) {

    }
    updateWalletState();
  }
}

const solButton = document.querySelector('.sol__button');
const exitButton = document.querySelector('.exit__button');
const phantom = window.phantom;
let walletName;
let isWalletConnected;


function getWalletMask(address) {
  if (!address || address.length < 6) return address;
  return address.slice(0, 3) + '.....' + address.slice(-3);
}

async function connectSolana() {
  try {
    const connect = await phantom.solana.connect();
    console.log(connect);
    return connect;
  } catch (err) {
    if (err.code === 4001) {
      console.log('Пользователь отклонил запрос на подключение');
      alert('Подключение отклонено. Разрешите доступ в расширении Phantom.');
    } else {
      console.log(err.message);
      alert('Ошибка подключения: ' + err.message);
    }
    return null;
  }
}

async function getSignMessage() {
  if (!window.phantom?.solana?.isConnected) {
    console.log('Кошелёк не подключён, подпись невозможна');
    return null;
  }
  const message = 'Подпиши сообщение для проверки';
  const encodedMessage = new TextEncoder().encode(message);
  const signedMessage = await phantom.solana.signMessage(encodedMessage, 'utf8');
  console.log(signedMessage);
  return signedMessage;
}

const getProvider = () => {
  if ('phantom' in window) {
    const provider = window.phantom?.solana;
    if (provider?.isPhantom) {
      return provider;
    }
  }
  window.open('https://phantom.app/', '_blank');
};

function updateWalletState() {
  const newGameButton = document.querySelector('.button__newgame');
  if (!newGameButton) return;
  if (window.phantom?.solana?.isConnected) {
    newGameButton.removeAttribute('disabled');
  } else {
    newGameButton.setAttribute('disabled', 'disabled');
  }
}

solButton.addEventListener('click', async (e) => {
  if (!window.phantom?.solana?.isPhantom) {
    alert('Установите расширение Phantom');
    return;
  }

  const result = await connectSolana();
  if (!result) return;


  walletName = result.publicKey.toString();
  localStorage.setItem('solanaWallet', walletName);


  await getSignMessage();


  solButton.textContent = getWalletMask(walletName);
  updateWalletState();
});


exitButton.addEventListener('click', async () => {
  if (window.phantom?.solana?.isConnected) {
    await phantom.solana.disconnect();
    walletName = 'Solana';
    solButton.textContent = walletName;
    updateWalletState();
    localStorage.removeItem('solanaWallet');
  }
});


document.addEventListener('DOMContentLoaded', () => {
  initWalletUI();
});