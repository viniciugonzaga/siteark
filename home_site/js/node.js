const io = require('socket.io')(3000);
const rooms = {};

io.on('connection', (socket) => {
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room ${room}`);
  });

  socket.on('dadoRolado', (msg, room) => {
    io.to(room).emit('dadoRolado', msg);
  });
});
// Cliente (JavaScript)
// ... (código existente)

document.getElementById('joinRoom').addEventListener('click', () => {
    const roomName = document.getElementById('roomName').value;
    socket.emit('joinRoom', roomName);
  });
  
  document.getElementById('rolarDado').addEventListener('click', () => {
    const resultado = Math.floor(Math.random() * 6) + 1;
    const room = 'minhaSala'; // Substituir pelo nome da sala atual
    socket.emit('dadoRolado', resultado, room);
  });
  function rolarDado(numFaces) {
    // Gera um número aleatório entre 1 e numFaces
    const resultado = Math.floor(Math.random() * numFaces) + 1;
  
    // Seleciona o elemento onde o resultado será exibido
    const resultadoElemento = document.getElementById('resultadoDado');
  
    // Atualiza o texto do elemento com o resultado
    resultadoElemento.textContent = `Resultado do dado: ${resultado}`;
  }
