"use strict";
/**
 * Declare an element as a slider : build the necessary elements tree, add the slides elements, plug the inherent behaviours.
 *
 * @see {@link styles/slider.css}
 *
 * @param {HTMLElement} slider The slider element.
 * @param {Array<HTMLElement>} slides The slides to add to the slider.
 * @param {number} slideStep The amount of em to shift when clicking on previous / next buttons.
 */
function declareSlider(slider, slides, slideStep) {
    /*
      Disable or enable the shift controls (previous / next buttons),
      according to currently visible slides.
    */
    const shiftControlsEnabler = function (slider) {
        const slidesContainer = slider.getElementsByClassName('slides')[0];
        const slides = slidesContainer.getElementsByClassName('slide');
        // Check which are the 1st and last visible slides
        let firstSlideVisible = -1, lastSlideVisible = -1;
        for (let j = 0; j < slides.length; j++) {
            const slide = slides[j];
            if (slide.offsetLeft >= slidesContainer.offsetLeft && slide.offsetLeft + slide.offsetWidth <= slidesContainer.offsetLeft + slidesContainer.offsetWidth) {
                if (firstSlideVisible == -1) {
                    firstSlideVisible = j;
                }
                else {
                    lastSlideVisible = j;
                }
            }
            else if (lastSlideVisible != -1) /* If we already know 1st and last slides : no need to loop further */ {
                break;
            }
        }
        // Disable or enable the controls according the 1st and last visible slides
        const shiftControls = slider.querySelectorAll('.slider-previous, .slider-next');
        for (let j = 0; j < shiftControls.length; j++) {
            const shiftControl = shiftControls[j];
            let shiftControlEnabled = true;
            if (shiftControl.classList.contains('slider-previous')) {
                shiftControlEnabled = firstSlideVisible > 0;
            }
            else {
                shiftControlEnabled = lastSlideVisible < slides.length - 1;
            }
            ;
            if (shiftControlEnabled) {
                shiftControl.removeAttribute("disabled");
            }
            else {
                shiftControl.setAttribute("disabled", "true");
            }
        }
    };
    /*
      Apply a shift control action (shift to previous or next slide)
    */
    const shiftControlClickEventListener = function (event) {
        const target = event.target;
        const slider = target.closest('.slider');
        const slidesContainer = slider.getElementsByClassName('slides')[0];
        const slides = slidesContainer.getElementsByClassName('slide');
        const shiftPreviousControl = target.classList.contains('slider-previous');
        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i];
            let left = Number.parseFloat(slide.style.left);
            if (isNaN(left)) {
                if (shiftPreviousControl) {
                    left = slideStep;
                }
                else {
                    left = -slideStep;
                }
            }
            else {
                if (shiftPreviousControl) {
                    left += slideStep;
                }
                else {
                    left -= slideStep;
                }
            }
            slide.style.left = left + "em";
        }
        shiftControlsEnabler(slider);
    };
    const previousButton = document.createElement('button');
    previousButton.type = 'button';
    previousButton.className = 'slider-previous';
    previousButton.ariaLabel = "Shift to one previous slide";
    previousButton.innerText = "<";
    previousButton.addEventListener('click', shiftControlClickEventListener);
    const slidesContainer = document.createElement('div');
    slidesContainer.className = 'slides';
    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'slider-next';
    nextButton.ariaLabel = "Shift to one next slide";
    nextButton.innerText = ">";
    nextButton.addEventListener('click', shiftControlClickEventListener);
    slider.classList.add('slider');
    slider.append(previousButton, slidesContainer, nextButton);
    new ResizeObserver(entries => {
        for (let i = 0; i < entries.length; i++) {
            shiftControlsEnabler(entries[i].target);
        }
    }).observe(slider);
    slidesContainer.append(...slides.map((slide, order) => {
        slide.classList.add('slide');
        return slide;
    }));
}
//# sourceMappingURL=slider.js.map