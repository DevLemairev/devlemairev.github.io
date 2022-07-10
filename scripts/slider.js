"use strict";
/**
 * Generates a list of anchors, one for each item of the version parameter, each one containing an anchor referencing the archived page designated by this version item.
 *
 * Each item of versions must be a string named as a subfolder of 'snapshot' source folder.
 * Each anchor has a 'data-order' attribute which value is the position of the anchor in the list (starting at 0)
 *
 * @see {@link styles/archiveNav.css}
 *
 * @param {HTMLElement} slider The slider element.
 * @param {Array<string>} versions The versions of the archived pages that must be present in the list.
 */
function declareSlider(slider, versions) {
    const slidesContainer = slider.getElementsByClassName('slides-container')[0];
    if (slidesContainer == null)
        throw "Missing slides-container element in slider";
    const anchorTemplate = document.createElement('a');
    anchorTemplate.rel = "nofollow";
    slidesContainer.append(...versions.map((item, index) => {
        const anchor = anchorTemplate.cloneNode(true);
        anchor.href = `snapshot/${item}`;
        anchor.text = item;
        anchor.className = 'slide slide-visible';
        anchor.setAttribute("data-order", index.toString());
        return anchor;
    }));
    sliderResizeObserver.observe(slider);
}
/**
 * Enable or disable the previous and next buttons from either side of a slider, according to slides that are outside the visible content of the slider.
 *
 * @param {HTMLElement} slider The slider element.
 */
function setSliderButtonsState(slider) {
    const slidesContainer = slider.getElementsByClassName('slides-container')[0];
    if (slidesContainer == null)
        throw "Missing slides-container element in slider";
    const previousButton = slider.getElementsByClassName('slider-button-previous')[0];
    if (previousButton == null)
        throw "Missing slider-button-previous element in slider";
    const nextButton = slider.getElementsByClassName('slider-button-next')[0];
    if (nextButton == null)
        throw "Missing slider-button-next element in slider";
    // We check if there are slides remaining before and after the currently visible slides
    let firstVisibleSlideOrder = -1, lastVisibleSlideOrder = -1;
    const slides = slidesContainer.getElementsByClassName('slide');
    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        if (slide.offsetTop == slidesContainer.offsetTop) {
            if (slide.getAttribute("data-order") == null)
                throw "Missing attribute 'data-order' on slide element";
            const slideOrder = Number.parseInt(slide.getAttribute("data-order") ?? "NaN", 10);
            if (isNaN(slideOrder))
                throw "Not authorized value [" + slide.getAttribute("data-order") + "] for 'data-order' attribute on slide element - must be an integer >= 0";
            if (firstVisibleSlideOrder == -1) {
                firstVisibleSlideOrder = slideOrder;
            }
            else {
                lastVisibleSlideOrder = slideOrder;
            }
        }
    }
    previousButton.disabled = firstVisibleSlideOrder <= 0;
    nextButton.disabled = lastVisibleSlideOrder == slides.length - 1;
}
const sliderResizeObserver = new ResizeObserver(elements => {
    elements.forEach(element => {
        setSliderButtonsState(element.target);
    });
});
//# sourceMappingURL=slider.js.map