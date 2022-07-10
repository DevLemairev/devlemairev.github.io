"use strict";
/**
 * Delcare an element as a slider : add the slides elements as children, plug the inherent behaviours.
 *
 * Each anchor has a 'data-slide-order' attribute which value is the position of the anchor in the list (starting at 0)
 *
 * @see {@link styles/slider.css}
 *
 * @param {HTMLElement} slider The slider element.
 * @param {Array<HTMLElement>} slides The slides to add to the slider.
 */
function declareSlider(slider, slides) {
    const slidesContainer = slider.getElementsByClassName('slides-container')[0];
    if (slidesContainer == null)
        throw "Missing slides-container element in slider";
    slidesContainer.append(...slides.map((slide, order) => {
        slide.classList.add('slide', 'slide-visible');
        slide.setAttribute("data-slide-order", order.toString());
        return slide;
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