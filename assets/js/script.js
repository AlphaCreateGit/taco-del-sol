// A $( document ).ready() block.
$(document).ready(function () {
  console.log("ready!");
  language();
  header();
  animationText();
});

function header() {
  let height = $(".header__container").height() * -1;
  console.log(height);
  let navTop;

  function initializeScrollTrigger() {
    navTop = gsap
      .from("header", {
        y: height,
        paused: true,
        duration: 0.5,
        ease: "power4.out",
        trigger: "header",
      })
      .progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        // Shrink navTop
        self.direction === -1 ? navTop.play() : navTop.reverse();
        // self.refresh();
        if (self.direction === -1) {
          $(".header__sub-menu");
          console.log("scroll lên");
        } else {
          console.log("scroll xuống");
        }
      },
    });
  }

  initializeScrollTrigger();

  // Re-initialize ScrollTrigger when page is refreshed
  $(window).on("load", initializeScrollTrigger);
}
function language() {
  const $dropdowns = $(".dropdown-custom");

  $dropdowns.each(function () {
    const $dropdown = $(this);
    const $btnDropdown = $dropdown.find(".dropdown-custom__btn");
    const $dropdownMenu = $dropdown.find(".dropdown-custom__menu");
    const $dropdownItems = $dropdown.find(".dropdown-custom__item");
    const $textDropdown = $dropdown.find(".dropdown-custom__text");

    $btnDropdown.on("click", function (e) {
      e.stopPropagation();
      closeAllDropdowns($dropdown);
      $dropdownMenu.toggleClass("dropdown--active");
      $(".lang__head").toggleClass("--active");
    });

    $(document).on("click", function () {
      closeAllDropdowns();
    });

    $dropdownItems.on("click", function (e) {
      e.stopPropagation();
      const $item = $(this);
      const tmp = $textDropdown.text();
      $textDropdown.text($item.text());
      if ($item.hasClass("lang__item")) {
        $item.text(tmp);
      }
      closeAllDropdowns();
    });

    function closeAllDropdowns(exception) {
      $dropdowns.each(function () {
        const $menu = $(this).find(".dropdown-custom__menu");
        if (!exception || !$(this).is(exception)) {
          $menu.removeClass("dropdown--active");
        }
      });
    }
  });
}
// function animtionText() {
//   gsap.registerPlugin(SplitType);

//   $(".introduce h1").each(function (index, element) {
//     const split = new SplitType(element, {
//       type: "words",
//       wordsClass: "words",
//     });

//     // List of predefined colors
//     const colors = ["#feb503", "#ee2400", "#108a00"];

//     // Create a timeline for the animation
//     const tl = gsap.timeline();

//     // Animate the characters with random colors from the list
//     tl.set(
//       split.words,
//       {
//         color: function () {
//           // Pick a random color from the list
//           return colors[Math.floor(Math.random() * colors.length)];
//         },
//         stagger: 0.1,
//       },
//       0.1
//     );
//   });
// }
function animationText() {
  gsap.registerPlugin(SplitType);

  $(".introduce__container h1").each(function (index, element) {
    const split = new SplitType(element, {
      type: "words",
      wordsClass: "words",
    });

    // List of predefined colors
    const colors = ["#feb503", "#ee2400", "#108a00"];

    // Variable to keep track of the last used color index
    let lastColorIndex = -1;

    // Create a timeline for the animation
    const tl = gsap.timeline();

    // Animate the words with random colors from the list
    tl.set(
      split.words,
      {
        color: function () {
          let newColorIndex;
          // Ensure that the new color index is different from the last one
          do {
            newColorIndex = Math.floor(Math.random() * colors.length);
          } while (newColorIndex === lastColorIndex);

          // Update the last color index
          lastColorIndex = newColorIndex;

          // Return the new color
          return colors[newColorIndex];
        },
      },
      0.1
    );
  });
}
