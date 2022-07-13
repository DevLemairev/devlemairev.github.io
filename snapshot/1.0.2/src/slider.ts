"use strict";

/**
 * Declare an element as a slider : build the necessary elements tree, add the slides elements, plug the inherent behaviours.
 * 
 * @see {@link styles/slider.css}
 * 
 * @param slider The slider element.
 * @param slides The slides to add to the slider.
 * @param slideStep The amount of em to shift when clicking on previous / next buttons.
 */
function declareSlider(slider: HTMLElement, slides: Array<HTMLElement>, slideStep: number) {

  /*
    Disable or enable the shift controls (previous / next buttons),
    according to currently visible slides.
  */
  const shiftControlsEnabler = function(slider: HTMLElement) {
      const slidesContainer = <HTMLElement> slider.getElementsByClassName('slides')[0];
      const slides = <HTMLCollectionOf<HTMLElement>> slidesContainer.getElementsByClassName('slide');
      // Check what are the 1st and last visible slides
      let firstSlideVisible = -1, lastSlideVisible = -1;
      for(let j = 0; j < slides.length; j++) {
        const slide = slides[j];
        if (
          slide.offsetLeft >= slidesContainer.offsetLeft && slide.offsetLeft <= slidesContainer.offsetLeft + slidesContainer.offsetWidth
          &&
          slide.offsetLeft + slide.offsetWidth >= slidesContainer.offsetLeft && slide.offsetLeft + slide.offsetWidth <= slidesContainer.offsetLeft + slidesContainer.offsetWidth
        ) {
          if (firstSlideVisible == -1) {
            firstSlideVisible = j;
          } else {
            lastSlideVisible = j;
          }
        } else if (lastSlideVisible != -1) /* If we already know 1st and last slides : no need to loop further */ {
          break;
        }
      }

      // Disable or enable the controls according the 1st and last visible slides
      const shiftControls = slider.querySelectorAll('.slider-control-previous, .slider-control-next');
      for (let j = 0; j < shiftControls.length; j++) {
        const shiftControl = shiftControls[j];
        let shiftControlEnabled = true;
        if (shiftControl.classList.contains('slider-control-previous')) {
          shiftControlEnabled = firstSlideVisible > 0 || firstSlideVisible == -1 && lastSlideVisible == -1;
        } else {
          shiftControlEnabled = firstSlideVisible > -1 && lastSlideVisible < slides.length - 1;
        };
        if (shiftControlEnabled) {
          shiftControl.removeAttribute("disabled");
        } else {
          shiftControl.setAttribute("disabled", "true");
        }
      }
  };

  /*
    Apply a shift control action (shift to previous or next slide)
  */
  const shiftControlClickEventListener = function(event: Event) {
    const target = <HTMLElement> event.target;
    const slider = <HTMLElement> target.closest('.slider');
    const slidesContainer = slider.getElementsByClassName('slides')[0];
    const slides = <HTMLCollectionOf<HTMLElement>> slidesContainer.getElementsByClassName('slide');
    const shiftPreviousControl = target.classList.contains('slider-control-previous');
    for(let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      let left = Number.parseFloat(slide.style.left);
      if (isNaN(left)) {
        if (shiftPreviousControl) {
          left = slideStep;
        } else {
          left = -slideStep;
        }
      } else {
        if (shiftPreviousControl) {
          left += slideStep;
        } else {
          left -= slideStep;
        }
      }
      slide.style.left = left + "em"; 
    }
    shiftControlsEnabler(slider);
  };

  const previousButton = document.createElement('button');
  previousButton.type = 'button';
  previousButton.className = 'slider-control-previous';
  previousButton.ariaLabel = "Shift to one previous slide";
  previousButton.addEventListener('click', shiftControlClickEventListener); 
  const slidesContainer = document.createElement('div');
  slidesContainer.className = 'slides';
  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.className = 'slider-control-next';
  nextButton.ariaLabel = "Shift to one next slide";
  nextButton.addEventListener('click', shiftControlClickEventListener); 

  slider.classList.add('slider');
  slider.append(previousButton, slidesContainer, nextButton);

  new ResizeObserver(entries => {
    for(let i = 0; i < entries.length; i++) {
      shiftControlsEnabler(<HTMLElement> entries[i].target);
    }
  }).observe(slider);

  slidesContainer.append(...slides.map(
      (slide: HTMLElement, order: Number) => {
        slide.classList.add('slide');
        return slide;
      }
    )
  );
}