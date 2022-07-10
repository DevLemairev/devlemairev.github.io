"use strict";
/**
 * Declare an element as a slider : build the necessary elements tree, add the slides elements, plug the inherent behaviours.
 *
 * @see {@link styles/slider.css}
 *
 * @param {HTMLElement} slider The slider element.
 * @param {Array<HTMLElement>} slides The slides to add to the slider.
 */
function declareSlider(slider, slides) {
    const previousButton = document.createElement('button');
    previousButton.type = 'button';
    previousButton.className = 'slider-button-previous';
    previousButton.ariaLabel = "Shift to one previous slide";
    const slidesParentContainer = document.createElement('div');
    slidesParentContainer.className = 'slides-parent-container';
    const slidesContainer = document.createElement('div');
    slidesContainer.className = 'slides-container';
    slidesParentContainer.appendChild(slidesContainer);
    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'slider-button-next';
    nextButton.ariaLabel = "Shift to one next slide";
    slider.classList.add('slider');
    slider.append(previousButton, slidesParentContainer, nextButton);
    slidesContainer.append(...slides.map((slide, order) => {
        slide.classList.add('slide');
        slide.setAttribute("data-slide-order", order.toString());
        return slide;
    }));
    sliderResizeObserver.observe(slider);
}
/**
 * Enable or disable the previous and next buttons of a slider, according to slides that are outside the visible content of the slider.
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
            if (slide.getAttribute("data-slide-order") == null)
                throw "Missing attribute 'data-slide-order' on slide element";
            const slideOrder = Number.parseInt(slide.getAttribute("data-slide-order") ?? "NaN", 10);
            if (isNaN(slideOrder))
                throw "Not authorized value [" + slide.getAttribute("data-slide-order") + "] for 'data-slide-order' attribute on slide element - must be an integer >= 0";
            if (firstVisibleSlideOrder == -1) {
                firstVisibleSlideOrder = slideOrder;
            }
            else {
                lastVisibleSlideOrder = slideOrder;
            }
        }
        else if (lastVisibleSlideOrder > -1) {
            // If we've reach a none visible slide, and the last visible slide is known, we have all necessary information : don't loop further
            break;
        }
    }
    previousButton.disabled = firstVisibleSlideOrder <= 0;
    nextButton.disabled = lastVisibleSlideOrder == slides.length - 1;
}
/**
 * Resize observer to plug with a slider.
 *
 * Will recompute the previous and next buttons states, as when the slider is resized, the list of visible and invisible slides may be affected.
 */
const sliderResizeObserver = new ResizeObserver(elements => {
    elements.forEach(element => {
        setSliderButtonsState(element.target);
    });
});
//# sourceMappingURL=slider.js.map