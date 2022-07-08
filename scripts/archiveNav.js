"use strict";

/**
 * Generates a list of anchors, one for each item of the version parameter, each one containing an anchor referencing the archived page designated by this version item. 
 * 
 * Each item of versions is a string named as a subfolder of 'snapshot' source folder.
 * 
 * @see {@link styles/archiveNav.css}
 * 
 * @param {HTMLElement} containerElem The list container (must be ol)
 * @param {Array} versions The versions of the archived pages that must be present in the list.
 */
function renderArchiveNavigationTags(containerElem, versions) {
  const anchorElemTemplate = document.createElement('a');
  anchorElemTemplate.rel = 'nofollow';

  containerElem.append(...versions.map(
      (item, index) => {
        /** @type {HTMLAnchorElement} */
        // @ts-ignore
        const anchorElem = anchorElemTemplate.cloneNode(true);
        anchorElem.href = `snapshot/${item}`;
        anchorElem.text = item;
        anchorElem.className = 'slide slide-visible';
        return anchorElem;
      }
    )
  );
}
