import { ethers } from "https://esm.sh/ethers@6.13.4";


const somButton = document.querySelector('.som__button');
const exitButton = document.querySelector('.exit__button');
const newGameButton = document.querySelector('.button__newgame');
const walletStatus = document.querySelector('.wallet-status');

let currentWalletAddress = null;


function getWalletMask(address) {
  if (!address || address.length < 6) return address;
  return address.slice(0, 3) + '.....' + address.slice(-3);
}


function loadStoredWallet() {
  const stored = localStorage.getItem('somnia_wallet_address');
  if (stored) {
    currentWalletAddress = stored;
    updateUIAfterConnection(stored);
    console.log('Сессия восстановлена:', getWalletMask(stored));
  }
}


function updateUIAfterConnection(address) {
  somButton.textContent = getWalletMask(address);
  walletStatus.textContent = `Вы играете как: ${getWalletMask(address)}`;
  newGameButton.disabled = false;
  exitButton.style.display = 'inline-block';
}


function disconnectWallet() {
  currentWalletAddress = null;
  localStorage.removeItem('somnia_wallet_address');
  somButton.textContent = 'Somnia';
  walletStatus.textContent = 'Кошелёк не подключён';
  newGameButton.disabled = true;
  // exitButton.style.display = 'none';
  console.log('Кошелёк отключён');
}


async function connectSomnia() {
  if (!window.ethereum) {
    alert('MetaMask не установлен! Пожалуйста, установите расширение.');
    console.error('MetaMask отсутствует');
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);

    const accounts = await provider.send("eth_requestAccounts", []);
    const address = accounts[0];

    const network = await provider.getNetwork();
    const expectedChainId = 50311;
    if (network.chainId !== BigInt(expectedChainId)) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${expectedChainId.toString(16)}` }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${expectedChainId.toString(16)}`,
              chainName: 'Somnia Testnet',
              nativeCurrency: { name: 'STT', symbol: 'STT', decimals: 18 },
              rpcUrls: ['https://dream-rpc.somnia.network'],
              blockExplorerUrls: ['https://shannon-explorer.somnia.network'],
            }],
          });
        } else {
          throw switchError;
        }
      }
    }

    currentWalletAddress = address;
    const sendWalletData = await fetch('./api/user', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({address})
    })
    localStorage.setItem('somnia_wallet_address', address);

    updateUIAfterConnection(address);
    console.log('Подключенный адрес:', address);

    const signer = await provider.getSigner();
    return { provider, signer, address };

  } catch (error) {
    if (error.code === 4001) {
      alert('Вы отклонили подключение кошелька.');
    } else {
      console.error('Ошибка подключения:', error);
      alert('Произошла ошибка при подключении. Подробности в консоли.');
    }
    return null;
  }
}

somButton.addEventListener('click', async () => {
  await connectSomnia();
});

exitButton.addEventListener('click', () => {
  disconnectWallet();
});

window.addEventListener('load', () => {
  loadStoredWallet();
});