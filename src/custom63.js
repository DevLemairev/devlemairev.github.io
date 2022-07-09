"use strict";

/**
 * Generates a square grid contained in the element transmitted by argument.
 * 
 * @see {@link styles/custom63.css}
 * 
 * @param {HTMLElement} containerElem The grid container
 * @param {number} nbCellPerRow The number of cells in a row (same for column, as the grid is a square)
 */
function drawSquareGrid2(containerElem, nbCellPerRow) {
  const cellSideLength = 100.0 / nbCellPerRow;

  const rowElemTemplate = document.createElement('div');
  rowElemTemplate.classList.add('row');
  rowElemTemplate.style.height = `${cellSideLength}%`;

  const cellElemTemplate = document.createElement('div');
  cellElemTemplate.classList.add('cell');
  cellElemTemplate.style.width = `${cellSideLength}%`;

  for(let i = 1; i <= nbCellPerRow; i++) {
    const rowElem = rowElemTemplate.cloneNode(true);
    containerElem.append(rowElem);
    const rowCellElems = [];
    for (let j = 1; j <= nbCellPerRow; j++) {
      rowCellElems.push(cellElemTemplate.cloneNode(true));
    }
    // @ts-ignore
    rowElem.append(...rowCellElems);
  }
}
