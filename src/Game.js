import Board from './Board';
import Player from './Player';

export default class Game {
    constructor() {
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }


    /**
     * Return active player.
     * @returns {object} player - The active player.
     */
    get activePlayer() {
        return this.players.find(Player => Player.active);
    }


    /**
     * Creates two player objects
     * @return {array} An array of two player objects.
     */
    createPlayers() {
        const players = [new Player('player 1', 1, 'red', true),
                         new Player('player 2', 2, 'dodgerblue')]
        
        return players;
    }

    /**
     * Begins game.
     */
    startGame() {
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        document.getElementById('player-name').style.display = 'block';
        this.playerName(this.activePlayer.name)
        this.ready = true;
    }


    /**
     * Branches code, depending on what key player presses
     * @param {object} e - Keydown event object
     */
    handleKeydown(e) {
        if (this.ready) {
            if (e.key === "ArrowLeft") {
                this.activePlayer.activeToken.moveLeft();
            } else if (e.key === "ArrowRight") {
                this.activePlayer.activeToken.moveRight(this.board.columns);
            } else if (e.key === "ArrowDown") {
                this.playToken();
            }
        }
    }


    /**
     * Checks if there a winner on the board after each token drop.
     * @param {object} target - Targeted space for dropped token.
     * @returns {boolean} Boolean value indicating whether the game has been won (true) or not
     */
    checkForWin(target) {

        let spaces = this.board.spaces;
        let seriesX = 0;
        let seriesY = 0;
        let seriesXY = 0;
        let seriesYX = 0;
        
        for (let x=target.x, y=target.y; y < 6; y++) {
            if ( spaces[x][x, y].token.owner !== target.token.owner) 
                break;    
            seriesY++
        }
        for (let x=target.x, y=target.y; x < 7; x++) {
            if ( !spaces[x][x, y].token || spaces[x][x, y].token.owner !== target.token.owner)
                break;
            seriesX++
        }
        for (let x=target.x, y=target.y; x > -1; x--) {
            if ( !spaces[x][x, y].token || spaces[x][x, y].token.owner !== target.token.owner)
                break;
            seriesX++
        }
        for (let x=target.x, y=target.y; x < 7 && y > -1; x++, y--) {
            if ( !spaces[x][x, y].token || spaces[x][x, y].token.owner !== target.token.owner)
                break;
            seriesXY++
        }
        for (let x=target.x, y=target.y; x > -1 && y < 6; x--, y++) {
            if ( !spaces[x][x, y].token || spaces[x][x, y].token.owner !== target.token.owner)
                break;
            seriesXY++
        }
        for (let x=target.x, y=target.y; x > -1 && y > -1; x--, y--) {
            if ( !spaces[x][x, y].token || spaces[x][x, y].token.owner !== target.token.owner)
                break;
            seriesYX++
        }
        for (let x=target.x, y=target.y; x < 7 && y < 6; x++, y++) {
            if ( !spaces[x][x, y].token || spaces[x][x, y].token.owner !== target.token.owner)
                break;
            seriesYX++
        }
        return seriesX > 4 || seriesY > 3 ||  seriesXY > 4 || seriesYX > 4;
    }

    /**
     * Switches active player.
     */
    switchPlayers() {
        for (let player of this.players) {
            player.active = player.active === true ? false : true;
        }
    }


    /**
     * Displays winner info.
     * @param {string} message - Game over message.
     */
    gameOver(message) {
        document.getElementById('game-over').style.display = 'block';
        document.getElementById('game-over').textContent = message;
        document.getElementById('game-over').addEventListener("mouseout", function(e) {
            e.target.textContent = message;
        })
        document.getElementById('game-over').addEventListener("mouseover", function(e) {
            e.target.textContent = 'Play again?'
        })
    }

     /**
     * Displays player name.
     * @param {string} name - player name.
     */
    playerName(name) {
        document.getElementById('player-name').textContent = name;
    }

    /**
     * Finds Space object to drop Token into, drops Token
     */
    playToken() {
        let spaces = this.board.spaces;
        let activeToken = this.activePlayer.activeToken;
        let targetColumn = spaces[activeToken.columnLocation];
        let targetSpace = null;

        for (let space of targetColumn) {
            if (space.token === null) {
                targetSpace = space;
            }
        }

        if (targetSpace !== null) {
            game.ready = false;
            activeToken.drop(targetSpace, this.updateGameState(activeToken, targetSpace));
        }
    }


    /**
     * Updates game state after token is dropped.
     * @param {Object} token - The token that's being dropped.
     * @param {Object} target - Targeted space for dropped token.
     */
    updateGameState(token, target) {
        target.mark(token);

        if (!this.checkForWin(target)) {
            this.switchPlayers();
            if (this.activePlayer.checkTokens()) {
                this.activePlayer.activeToken.drawHTMLToken();
                this.playerName(this.activePlayer.name)
                this.ready = true;
            } else {
                this.gameOver('Draw');
            }
        } else {
            this.gameOver(`${target.token.owner.name} wins!`)
        }
    }
}