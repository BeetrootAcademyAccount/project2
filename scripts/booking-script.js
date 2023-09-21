$(document).ready(() => {
  $(".booking-slider").slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

const btnHeart = document.querySelector(".btn-heart");
btnHeart.style.transition = "transform 0.2s ease";

btnHeart.addEventListener("mouseover", function () {
  btnHeart.style.color = "red";
});

btnHeart.addEventListener("mouseout", function () {
  btnHeart.style.color = "";
});

let isClicked = false;
btnHeart.addEventListener("click", function () {
  if (!isClicked) {
    btnHeart.style.color = "red";
    isClicked = true;
  }
});
