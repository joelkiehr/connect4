const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");
const imagen1 = document.getElementById('spiderman');
const imagen2 = document.getElementById('venom');

let gameOver = false;
let gameStart = false;
let turno = 1;

imagen1.classList.add('pulso');



const tablero = new Tablero(6, 7, 60);

const anchoTablero = tablero.columnas * tablero.tamañoCasillero;
const altoTablero = tablero.filas * tablero.tamañoCasillero;
const inicioXTablero = (canvas.width - anchoTablero) / 2;
const inicioYTablero = (canvas.height - altoTablero) / 2;





// Crear las fichas disponibles
const fichas_player1 = [
    new Ficha(100, 220, 20, "red", "Joel", "images/spiderman.png"),
    new Ficha(100, 270, 20, "red", "Joel", "images/spiderman.png"),
    new Ficha(100, 320, 20, "red", "Joel", "images/spiderman.png"),
    new Ficha(100, 370, 20, "red", "Joel", "images/spiderman.png"),
    new Ficha(100, 420, 20, "red", "Joel", "images/spiderman.png"),
    new Ficha(100, 470, 20, "red", "Joel", "images/spiderman.png"),
    new Ficha(100, 520, 20, "red", "Joel", "images/spiderman.png"),
    new Ficha(100, 570, 20, "red", "Joel", "images/spiderman.png"),
    new Ficha(150, 220, 20, "red", "Joel", "images/spiderman.png"),
    new Ficha(150, 270, 20, "red", "Joel", "images/spiderman.png"),
    new Ficha(150, 320, 20, "red", "Joel", "images/spiderman.png"),
    new Ficha(150, 370, 20, "red", "Joel", "images/spiderman.png"),
    new Ficha(150, 420, 20, "red", "Joel", "images/spiderman.png"),
    new Ficha(150, 470, 20, "red", "Joel", "images/spiderman.png"),
    new Ficha(150, 520, 20, "red", "Joel", "images/spiderman.png"),
    new Ficha(150, 570, 20, "red", "Joel", "images/spiderman.png"),
    // Agrega más fichas si es necesario
];

const fichas_player2 = [
    
    new Ficha(900, 220, 20, "blue", "Fran", "images/venom.png"),
    new Ficha(900, 270, 20, "blue", "Fran", "images/venom.png"),
    new Ficha(900, 320, 20, "blue", "Fran", "images/venom.png"),
    new Ficha(900, 370, 20, "blue", "Fran", "images/venom.png"),
    new Ficha(900, 420, 20, "blue", "Fran", "images/venom.png"),
    new Ficha(900, 470, 20, "blue", "Fran", "images/venom.png"),
    new Ficha(900, 520, 20, "blue", "Fran", "images/venom.png"),
    new Ficha(900, 570, 20, "blue", "Fran", "images/venom.png"),
    new Ficha(850, 220, 20, "blue", "Fran", "images/venom.png"),
    new Ficha(850, 270, 20, "blue", "Fran", "images/venom.png"),
    new Ficha(850, 320, 20, "blue", "Fran", "images/venom.png"),
    new Ficha(850, 370, 20, "blue", "Fran", "images/venom.png"),
    new Ficha(850, 420, 20, "blue", "Fran", "images/venom.png"),
    new Ficha(850, 470, 20, "blue", "Fran", "images/venom.png"),
    new Ficha(850, 520, 20, "blue", "Fran", "images/venom.png"),
    new Ficha(850, 570, 20, "blue", "Fran", "images/venom.png"),
    // Agrega más fichas si es necesario
];


function dibujarTodas(){
    fichas_player1.forEach(ficha => ficha.dibujar(ctx));
    fichas_player2.forEach(ficha => ficha.dibujar(ctx));
}


function dibujarTodo(){
    
    tablero.dibujar(ctx);
    dibujarTodas();
}
dibujarTodo();

// Evento de clic en el canvas
let fichaArrastrando = null; // Ficha que se está arrastrando
let offsetX, offsetY; // Offset para el mouse
let posInicialx;
let posInicialy;

// Evento mousedown para iniciar el arrastre
canvas.addEventListener("mousedown", (event) => {
    if (gameOver) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if(turno==1){
        for (const ficha of fichas_player1) {
            if (!ficha.usada && ficha.seleccionada(mouseX, mouseY)) {
                fichaArrastrando = ficha;
                offsetX = mouseX - ficha.posX;
                offsetY = mouseY - ficha.posY;
                posInicialx = ficha.posX;
                posInicialy = ficha.posY;
                console.log("Jugador 1: ficha seleccionada");
                //turno=2;
            return; // Salir si se ha encontrado una ficha
            }
        }
    }else {
        for (const ficha of fichas_player2) {
                if (!ficha.usada && ficha.seleccionada(mouseX, mouseY)) {
                    fichaArrastrando = ficha;
                    offsetX = mouseX - ficha.posX;
                    offsetY = mouseY - ficha.posY;
                    posInicialx = ficha.posX;
                    posInicialy = ficha.posY;
                    console.log("Jugador 2: ficha seleccionada");
                    //turno=1;
                    return; // Salir si se ha encontrado una ficha
                }
            }
    }
});


// Evento mousemove para mover la ficha arrastrada
canvas.addEventListener("mousemove", (event) => {
    if (gameOver) return;
    if (fichaArrastrando) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Mover la ficha teniendo en cuenta el offset
        fichaArrastrando.mover(mouseX - offsetX, mouseY - offsetY);
        //ficha1.mover(mouseX - offsetX, mouseY - offsetY)
        // Redibujar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
        fichaArrastrando.dibujar(ctx);
        dibujarTodo();
    }
});



// Evento mouseup para soltar la ficha
canvas.addEventListener("mouseup", (event) => {
    if (gameOver) return;
    if (fichaArrastrando) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Calcular las posiciones iniciales del tablero (las mismas que al dibujar)
        const anchoTablero = tablero.columnas * tablero.tamañoCasillero;
        const altoTablero = tablero.filas * tablero.tamañoCasillero;
        const inicioX = (canvas.width - anchoTablero) / 2;
        const inicioY = (canvas.height - altoTablero) / 2;

        // Verificar si el drop es válido, dentro de la zona permitida (200px por encima del tablero)
        if (mouseY >= inicioY - 200 && mouseY <= inicioY) {
            // Calcular la columna basada en la posición relativa al inicio del tablero
            const columnaSeleccionada = Math.floor((mouseX - inicioX) / tablero.tamañoCasillero);

            if (columnaSeleccionada >= 0 && columnaSeleccionada < tablero.columnas) {
                let filaActual = -1; // Iniciar con un valor que indique que no se ha encontrado fila
                for (let i = tablero.filas - 1; i >= 0; i--) {
                    if (tablero.casilleros[i][columnaSeleccionada].estaVacio()) {
                        filaActual = i; // Almacenar la fila donde se colocará la ficha
                        break; // Salir del bucle una vez que se encuentra una fila vacía
                    }
                }

                if (filaActual !== -1) { // Si se encontró una fila vacía
                    // Colocar la ficha en el tablero ajustando su posición
                    tablero.colocarFichaEnColumna(columnaSeleccionada, fichaArrastrando);
                    
                    // Limpiar y volver a dibujar el canvas
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    tablero.dibujar(ctx);
                    dibujarTodas(); // Dibujar todas las fichas disponibles

                    // Verificar victoria después de colocar la ficha
                    if(tablero.verificar(filaActual, columnaSeleccionada, fichaArrastrando)){
                        fichaArrastrando.usada = true;
                        
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        tablero.dibujar(ctx);
                        
                        finalizar(turno);
                        fichaArrastrando = null;
                        
                    }
                    fichaArrastrando.usada = true;
                        cambiarTurno();
                    
                } else {
                    fichaArrastrando.mover(posInicialx, posInicialy);
                    console.log("La columna está llena."); // Si no hay filas vacías
                }
            }else {
                fichaArrastrando.mover(posInicialx, posInicialy);
            }
            
        }else {
            fichaArrastrando.mover(posInicialx, posInicialy);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        tablero.dibujar(ctx);
        dibujarTodas();

        fichaArrastrando = null; // Restablecer la ficha arrastrando
    }
});


function cambiarTurno(){
   // alternarFlechas();
   alternarPulso();
    if (turno ==1){
        turno = 2;
    }else {
        turno = 1;
    }
}

function finalizar(turno){
    gameOver = true;
     // Opcional: Muestra un mensaje de ganador
    if (turno==1){
        imagen1.classList.add('pulso');
        imagen2.classList.remove('pulso');
    }else {
        imagen2.classList.add('pulso');
        imagen1.classList.remove('pulso');
    }
    // Alternar flechas y detener animación, si es necesario
    
    
    


}

function alternarPulso() {
    // Alternar el pulso entre imagen1 e imagen2
    if (turno==1) {
        imagen1.classList.remove('pulso');
        imagen2.classList.add('pulso');
    } else {
        imagen2.classList.remove('pulso');
        imagen1.classList.add('pulso');
    }
}

const resetButton = document.getElementById("resetButton");

resetButton.addEventListener("click", reiniciarJuego);

function reiniciarJuego() {
    // Reiniciar el estado del juego
    gameOver = false;
    turno = 1;
    imagen1.classList.add('pulso');
    imagen2.classList.remove('pulso');

    // Reiniciar las fichas (coloca cada ficha en su posición inicial)
    restablecerFichas();

    // Limpiar el tablero
    tablero.limpiarTablero(); // Asegúrate de que tu clase Tablero tenga este método para restablecer los casilleros

    // Limpiar y redibujar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarTodo();
    dibujarTodas();

    console.log("Juego reiniciado.");
}

function restablecerFichas() {
    // Posiciones iniciales de las fichas de cada jugador
    const posicionesJugador1 = [
        [100, 220], [100, 270], [100, 320], [100, 370],
        [100, 420], [100, 470], [100, 520], [100, 570],
        [150, 220], [150, 270], [150, 320], [150, 370],
        [150, 420], [150, 470], [150, 520], [150, 570]
    ];

    const posicionesJugador2 = [
        [900, 220], [900, 270], [900, 320], [900, 370],
        [900, 420], [900, 470], [900, 520], [900, 570],
        [850, 220], [850, 270], [850, 320], [850, 370],
        [850, 420], [850, 470], [850, 520], [850, 570]
    ];

    // Restablecer las posiciones de las fichas del jugador 1
    fichas_player1.forEach((ficha, index) => {
        ficha.posX = posicionesJugador1[index][0];
        ficha.posY = posicionesJugador1[index][1];
        ficha.usada = false; // Marcar como no usada
    });

    // Restablecer las posiciones de las fichas del jugador 2
    fichas_player2.forEach((ficha, index) => {
        ficha.posX = posicionesJugador2[index][0];
        ficha.posY = posicionesJugador2[index][1];
        ficha.usada = false; // Marcar como no usada
    });
}

/*      ------------------COSAS POR ACOMODAR--------------------

AGREGAR:
    tiempo ??
    turno
    ganador
    


*/