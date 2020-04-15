import Game from './Game';

let game = new Game();


document.getElementById('begin-game').addEventListener('click', function() {
    game.startGame();

    this.style.display = 'none';
    document.getElementById('play-area').style.opacity = '1';
    
})


document.addEventListener('keydown', function(event) {
    game.handleKeydown(event);
})

document.getElementById('game-over').addEventListener("click", function(e) {
    e.target.style.display = 'none';
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, "id", "mask");
    const board = document.getElementById('game-board-underlay');
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    board.appendChild(svg);
    game = null;
    game = new Game();
    game.startGame();
})
