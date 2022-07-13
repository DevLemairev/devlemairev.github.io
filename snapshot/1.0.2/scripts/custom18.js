"use strict";
drawSquareGrid(document.getElementById('board18'), 10);
/**
 * Generates a square grid contained in the element transmitted by argument.
 *
 * @see {@link styles/custom18.css}
 *
 * @param {HTMLElement} containerElem The grid container
 * @param {number} nbCellPerRow The number of cells in a row (same for column, as the grid is a square)
 */
function drawSquareGrid(containerElem, nbCellPerRow) {
    const cellElemTemplate = document.createElement('div');
    cellElemTemplate.classList.add('cell');
    for (let i = 1; i <= nbCellPerRow; i++) {
        const rowElem = document.createElement('div');
        rowElem.classList.add('row');
        containerElem.append(rowElem);
        const rowCellElems = [];
        for (let j = 1; j <= nbCellPerRow; j++) {
            /** @type {HTMLDivElement} */
            // @ts-ignore
            const cellElem = cellElemTemplate.cloneNode(true);
            cellElem.classList.add('cell');
            // workaround for designating cells that shall have a left and a top border,
            // with css classes on the most left cell and most top of the grid
            // not very happy of this, because it ties the model with the view
            if (j == 1) {
                cellElem.classList.add('most-left-cell');
            }
            if (i == 1) {
                cellElem.classList.add('most-top-cell');
            }
            rowCellElems.push(cellElem);
        }
        rowElem.append(...rowCellElems);
    }
}
//# sourceMappingURL=custom18.js.map