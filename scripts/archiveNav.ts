"use strict";

/**
 * Generates a list of anchors, one for each item of the version parameter, each one containing an anchor referencing the archived page designated by this version item. 
 * 
 * Each item of versions is a string named as a subfolder of 'snapshot' source folder.
 * 
 * @see {@link styles/archiveNav.css}
 * 
 * @param {HTMLElement} slidesContainerElem The element that will be the parent element of the slides.
 * @param {Array<string>} versions The versions of the archived pages that must be present in the list.
 */
function renderArchiveNavigationTags(slidesContainerElem: HTMLElement, versions: Array<string>) {
  const anchorElemTemplate = document.createElement('a');
  anchorElemTemplate.rel = 'nofollow';

  slidesContainerElem.append(...versions.map(
      (item: string, index: Number) => {
        const anchorElem = <HTMLAnchorElement> anchorElemTemplate.cloneNode(true);
        anchorElem.href = `snapshot/${item}`;
        anchorElem.text = item;
        anchorElem.className = 'slide slide-visible';
        anchorElem.setAttribute("data-order", index.toString());
        return anchorElem;
      }
    )
  );
}

/**
 * 
 * @param {HTMLElement} slidesContainerElem The parent element of the slides.
 */
function setLeftButtonState(slidesContainerElem: HTMLElement) {

  const leftButton = <HTMLSelectElement> slidesContainerElem.closest('.slider').getElementsByClassName('slider-button-left');
  leftButton.disabled = leftButton.offsetTop > slidesContainerElem.offsetTop;
}
