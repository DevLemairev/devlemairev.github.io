"use strict";
/**
 * Generates a square grid contained in the element transmitted by argument.
 *
 * @see {@link styles/custom103.css}
 *
 * @param {HTMLElement} containerElem The grid container
 * @param {number} nbCellPerRow The number of cells in a row (same for column, as the grid is a square)
 */
function drawSquareGrid3(containerElem, nbCellPerRow) {
    const oneUnitFraction = 1 / nbCellPerRow;
    containerElem.style.gridTemplate = `repeat(${nbCellPerRow}, ${oneUnitFraction}fr) / repeat(${nbCellPerRow}, ${oneUnitFraction}fr)`;
    const cellElemTemplate = document.createElement('div');
    cellElemTemplate.classList.add('cell');
    const nbCells = Math.pow(nbCellPerRow, 2);
    const cellElems = new Array(nbCells);
    for (let i = 0; i < nbCells; i++) {
        cellElems[i] = cellElemTemplate.cloneNode(true);
    }
    containerElem.append(...cellElems);
}
//# sourceMappingURL=custom103.js.map