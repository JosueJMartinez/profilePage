(function ($) {
    "use strict"; // Start of use strict

    // values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
    var i = 0,
        a = 0,
        isBackspacing = false,
        isParagraph = false;

    // Typerwrite text content. Use a pipe to indicate the start of the second line "|".
    var textArray = [
        "console.log('Hello World!');",
        "<p>Hello World!</p>",
        'System.out.println("Hello World!");',
    ];

    // Speed (in milliseconds) of typing.
    var speedForward = 50, //Typing Speed
        speedWait = 1000, // Wait between typing and backspacing
        speedBetweenLines = 100, //Wait between first and second lines
        speedBackspace = 10; //Backspace Speed

    typeWriter("typewriter", textArray);

    function typeWriter(id, ar) {
        var eType = $("#" + id),
            aString = ar[a];
        if (!isBackspacing) {
            // If full string hasn't yet been typed out, continue typing
            if (i < aString.length) {
                eType.text(eType.text() + aString.charAt(i));
                i++;
                setTimeout(function () {
                    typeWriter(id, ar);
                }, speedForward);
            } else if (i == aString.length) {
                isBackspacing = true;
                setTimeout(function () {
                    typeWriter(id, ar);
                }, speedWait);
            }

            // If backspacing is enabled
        } else {
            // If either the header or the paragraph still has text, continue backspacing
            if (eType.text().length > 0) {
                if (eType.text().length > 0) {
                    eType.text(
                        eType.text().substring(0, eType.text().length - 1)
                    );
                }
                setTimeout(function () {
                    typeWriter(id, ar);
                }, speedBackspace);

                // If neither head or paragraph still has text, switch to next quote in array and start typing.
            } else {
                isBackspacing = false;
                i = 0;
                isParagraph = false;
                a = (a + 1) % ar.length; //Moves to next position in array, always looping back to 0
                setTimeout(function () {
                    typeWriter(id, ar);
                }, 50);
            }
        }
    }

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#sideNav",
    });
})(jQuery); // End of use strict
