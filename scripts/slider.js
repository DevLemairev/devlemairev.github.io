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
        return slide;
    }));
    computeFirstAndLastVisibleSlides(slider);
    setSliderButtonsAvailability(slider);
    sliderResizeObserver.observe(slider);
}
/**
 * Claculate the order of the 1st and last visible slides.
 *
 * @param {HTMLElement} slider The slider element.
 */
function computeFirstAndLastVisibleSlides(slider) {
    // We check if there are slides remaining before and after the currently visible slides
    let firstVisibleSlideOrder = -1, lastVisibleSlideOrder = -1;
    const slides = slider.getElementsByClassName('slide');
    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        if (slide.offsetTop == slider.offsetTop) {
            if (firstVisibleSlideOrder == -1) {
                firstVisibleSlideOrder = i;
                // Case there is only one slide visible
                if (i == slides.length - 1) {
                    lastVisibleSlideOrder = i;
                }
            }
            else {
                lastVisibleSlideOrder = i;
            }
        }
        else if (lastVisibleSlideOrder > -1) {
            // If we've reached a none visible slide, and the last visible slide is known, we have all necessary information : don't loop further
            break;
        }
    }
    slider[Symbol.for('FirstVisibleSlideOrder')] = firstVisibleSlideOrder;
    slider[Symbol.for('LastVisibleSlideOrder')] = lastVisibleSlideOrder;
}
/**
 *
 * @param {HTMLElement} slider The slider element.
 */
function setSliderButtonsAvailability(slider) {
    const slidesContainer = slider.getElementsByClassName('slides-container')[0];
    if (slidesContainer == null)
        throw "Missing slides-container element in slider";
    const previousButton = slider.getElementsByClassName('slider-button-previous')[0];
    if (previousButton == null)
        throw "Missing slider-button-previous element in slider";
    const nextButton = slider.getElementsByClassName('slider-button-next')[0];
    if (nextButton == null)
        throw "Missing slider-button-next element in slider";
    previousButton.disabled = slider[Symbol.for('FirstVisibleSlideOrder')] <= 0;
    nextButton.disabled = slider[Symbol.for('LastVisibleSlideOrder')] == slidesContainer.getElementsByClassName('slide').length - 1;
}
/**
 * Resize observer to plug with a slider.
 *
 * Will recompute the previous and next buttons states, because when the slider is resized the list of visible and invisible slides may be affected.
 * Thus depending of the visible slides includes the 1st and / or last one, we have to enable or not the next and previous buttons.
 */
const sliderResizeObserver = new ResizeObserver(elements => {
    elements.forEach(element => {
        const slider = element.target;
        computeFirstAndLastVisibleSlides(slider);
        setSliderButtonsAvailability(slider);
    });
});
/**
 * Make the nth slide the first visible slide.
 *
 * @param {HTMLElement} slider The slider element.
 * @param {number} slideOrder The order of the slide to shift to next.
 */
function shiftToNthSlide(slider, slideOrder) {
    // si slideOrder > firstVisible, et que le lastVisible est le dernier de la liste alors stop !
    const slides = slider.getElementsByClassName('slide');
    if (slideOrder < 0 || slideOrder > slides.length - 1)
        throw 'slideOrder out of range';
    for (let i = 0; i < slides.length; i++) {
        // If both the target slide and the lastest of the collection are already visible, we don't loop further
        if (slider[Symbol.for('LastVisibleSlideOrder')] == slides.length - 1 && slideOrder > slider[Symbol.for('FirstVisibleSlideOrder')]) {
            break;
        }
        const slide = slides[i];
        if (i < slideOrder) {
            slide.style.display = 'none';
            slide.setAttribute('data-slide-retired', "true");
        }
        else {
            slide.style.display = 'inline-block';
            slide.removeAttribute('data-slide-retired');
        }
        computeFirstAndLastVisibleSlides(slider);
    }
    setSliderButtonsAvailability(slider);
}
//# sourceMappingURL=slider.js.map