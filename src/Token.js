// import $ from 'jquery';

export default class Token {

    constructor(index, owner) {
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.dropped = false;
        this.columnLocation = 0;
    }

    /**
     * Gets associated htmlToken.
     * @returns {element} Html element associated with token object.
     */
    get htmlToken() {
        return document.getElementById(this.id);
    }


    /**
     * Gets left offset of html element.
     * @returns {string}  Left offset of token object's htmlToken.
     */
    get offsetLeft() {
        return this.htmlToken.offsetLeft;
    }


    /**
     * Draw new HTML token.
     */
    drawHTMLToken() {
        const token = document.createElement('div');
        document.getElementById('game-board-underlay').appendChild(token);
        token.setAttribute('id', this.id);
        token.setAttribute('class', 'token');
        token.style.backgroundColor = this.owner.color;
    }

    /**
     * Move html token one column to left.
     */
    moveLeft() {
        if (this.columnLocation > 0) {
            this.htmlToken.style.left = `${this.offsetLeft - 76}px`;
            this.columnLocation -= 1;
        }
    }

    /**
     * Move html token one column to right.
     */
    moveRight(columns) {
        if (this.columnLocation < columns - 1) {
            this.htmlToken.style.left = `${this.offsetLeft + 76}px`;
            this.columnLocation += 1;
        }
    }


    /**
     * Drops html token into targeted board space.
     * @param {object} target space for dropped token.
     * @param {function} reset function to call after the drop animation has completed.
     */
    drop(target, reset) {
        this.dropped = true;
        $(this.htmlToken).animate({
            top: (target.y * target.diameter) + 8
        }, 750, 'easeOutBounce', reset);
    }
}