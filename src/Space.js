export default class Space {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.id = `space-${x}-${y}`;
        this.token = null;
        this.diameter = 76;
        this.radius = this.diameter/2;
    }


    /**
     * Draw SVG space
     */
    drawSVGSpace() {

        // const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        // svg.setAttributeNS(null, "id", "mask");
        // svg.setAttributeNS(null, "width", "80");
        // svg.setAttributeNS(null, "height", "80");
        const svgSpace = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        svgSpace.setAttributeNS(null, "id", this.id);
        svgSpace.setAttributeNS(null, "data-column", this.x);
        svgSpace.setAttributeNS(null, "cx", (this.x * this.diameter) + this.radius);
        svgSpace.setAttributeNS(null, "cy", (this.y * this.diameter) + this.radius);
        svgSpace.setAttributeNS(null, "r", this.radius - 8);
        svgSpace.setAttributeNS(null, "fill", "#172836");
        svgSpace.setAttributeNS(null, "stroke", "none");

        // svg.appendChild(svgSpace);
        // document.getElementById('game-board-underlay').appendChild(svg);
        document.getElementById('mask').appendChild(svgSpace);
    }

    /**
     * Updates space to reflect a token has been dropped into it.
     * @param {object} token - The dropped token
     */
    mark(token) {
        this.token = token;
    }
}