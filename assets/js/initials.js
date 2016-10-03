/**
 * Created by csburak on 03/10/16.
 */
var intro = introJs();
intro.setOptions({
  tooltipPosition: 'top'
});

// If user already visited, do not show the intro again.
intro.oncomplete(function() {
  localStorage.setItem('doneTour', 'done!');
})

intro.onexit(function() {
  localStorage.setItem('doneTour', 'done!');
});

window.addEventListener('load', function() {
  var doneTour = localStorage.getItem('doneTour') === 'done!';
  if (doneTour) return;
  intro.start();
});
// State of IntroJS has been saved.

var $carouselNav = $('.carousel-nav').flickity({
  asNavFor: '.carousel',
  resize: true,
  contain: true,
  pageDots: false,
  prevNextButtons: false,
  freeScroll: true
});

$carouselNav.find(".carousel-cell").click(function () {
  var bgColor = $(".carousel.carousel-cell.is-selected");
  console.log(bgColor);
});

$("#countdown_wedding").countdown("2016/10/07", function(event) {
  $(this).text(
    event.strftime('%D days %H:%M:%S')
  );
});
