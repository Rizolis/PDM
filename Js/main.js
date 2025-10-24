if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js', { type: 'module' });
      console.log('Service Worker registrado com sucesso!', reg);
    } catch (err) {
      console.error('Falha ao registrar o Service Worker:', err);
    }
  });
}
let posicaoInicial;
const capturarLocalizacao = document.getElementById('localizacao');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const mapa = document.getElementById('mapa');

const sucesso = (posicao) => {
  posicaoInicial = posicao;
  const lat = posicaoInicial.coords.latitude;
  const lon = posicaoInicial.coords.longitude;

  latitude.innerHTML = lat;
  longitude.innerHTML = lon;
  mapa.src = `https://www.google.com/maps?q=${lat},${lon}&z=15&output=embed`
};

const erro = (error) => {
  let errorMessage;
  switch (error.code) {
    case 0:
      errorMessage = 'Erro desconhecido!';
      break;
    case 1:
      errorMessage = 'Permissão negada!';
      break;
    case 2:
      errorMessage = 'Captura de posição indisponível!';
      break;
    case 3:
      errorMessage = 'Tempo de solicitação excedido!';
      break;
    default:
      errorMessage = 'Erro não identificado.';
  }
  console.error('Ocorreu um erro: ' + errorMessage);
};

capturarLocalizacao.addEventListener('click', () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(sucesso, erro);
  } else {
    console.error('Geolocalização não suportada neste navegador.');
  }
});