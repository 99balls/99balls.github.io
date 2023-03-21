var Panel = {
    initialised: false,
    mobile: false,
    init: function () {

        if (!this.initialised) {
            this.initialised = true;
        } else {
            return;
        }

        this.globalJs();


    },
    loadJs: function () {

        $(".header").addClass("");


    },
    globalJs: function () {

        $(".page-loading").remove();



        $(".custom-scrollbar").mCustomScrollbar({
            axis:"x",
            theme:"dark-thin",
            advanced:{autoExpandHorizontalScroll:true}
        });


        // Panel.gridSystem();
        Panel.categoriesSystem();
        Panel.lazy();

        //cokie
        $.cookieBubble();

        //gamebox
        $('.sidenav').sidenav();

        // tooltip
        Panel.tooltip();

        // autoComplete
        $("input.autocomplete").off("keyup").on("keyup", function () {
            Panel.gameAutoComplete();
        });

        // categori dropdown
        $('.dropdown-trigger').dropdown();

        // // search auto complete
        // $('input.autocomplete').autocomplete({
        //     data: {
        //         "Subway Surfers": 'http://localhost/oyun-tema/img/games/1.jpg',
        //         "Super Chibi": 'http://localhost/oyun-tema/img/games/2.jpg'
        //     },
        //     isOpen: true,
        //     sortFunction:function (a, b, inputString) {
        //         return "asdasd"+a.indexOf(inputString) - b.indexOf(inputString);
        //     },
        //     onAutocomplete:function (e) {
        //         console.log(e);
        //
        //     }
        //
        //
        // });

        $(".gamebox-btn").off("click").on("click", function () {
            var url = $(this).data("url");

            jQuery.ajax({
                url: url,
                data: null,
                type: 'GET',
                beforeSend: function () {
                },
                success: function (data) {
                    $(".gameboxList").html(data);
                    var instance = M.Sidenav.getInstance($(".gameboxList"))
                    instance.open();
                    Panel.tooltip();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }

            });

        });

    },

    swfContainer: function (url) {

        $('#swf_container').flash(
            {
                src: url,
                width: 720,
                height: 480
            },
            {version: 8}
        );

    },

    gameAutoComplete: function () {
        var elm = $("input.autocomplete");
        var content_elm = $(".autocomplete-content");
        var value = elm.val();
        var url = elm.data("url");
        if (value != null && value != '') {
            jQuery.ajax({
                url: url,
                data: 'search=' + value,
                type: 'GET',
                beforeSend: function () {
                    content_elm.html("");
                },
                success: function (data) {
                    content_elm.html(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }

            });
        } else {
            content_elm.html("");
        }


    },

    tooltip: function () {
        if ($(".tooltip").length > 0) {
            $('.tooltip').tooltip();
        }
    },
    gameStar: function () {


        if ($(".my-rating").length > 0) {
            var rating = $(".my-rating").data("rating");
            var readonly = $(".my-rating").data("readonly");

            if (readonly > 0) {
                readonly = true;
            } else {
                readonly = false;
            }

            $(".my-rating").starRating({
                initialRating: rating,
                strokeColor: '#fad218',
                strokeWidth: 10,
                starSize: 30,
                totalStars: 5,
                starShape: 'rounded',
                // emptyColor: 'lightgray',
                hoverColor: 'gold',
                activeColor: 'gold',
                ratedColor: 'orange',
                useFullStars: true,
                useGradient: false,
                readOnly: readonly,
                callback: function (currentRating, $el) {
                    Panel.addStar("star", currentRating);
                }
            });


            // game_star = $('#gamestar').starrr({
            //     max: 5,
            //     rating:rating,
            //     // rating: $s2input.val(),
            //     change: function(e, value){
            //         Panel.addStar("star",value);
            //     },
            //     readOnly: true
            // });
        }


    },
    lazy: function () {

        if ($(".lazy").length > 0) {

            $('.lazy').Lazy({
                scrollDirection: 'vertical',
                effect: 'fadeIn',
                event: "loadImage",
                // visibleOnly: true,
                onError: function (element) {
                    console.log('error loading ' + element.data('src'));
                },

            });
        }


    },
    categoriesSystem: function () {

        var screensize = $("body").width();


        if (screensize > 1550) {
            Panel.addCategoriDropdown(9);
        } else if (screensize > 1366) {
            Panel.addCategoriDropdown(7);
        } else if (screensize > 1200) {
            Panel.addCategoriDropdown(5);
        } else if (screensize > 800) {
            Panel.addCategoriDropdown(0);
        } else {
            Panel.addCategoriDropdown(3);
        }


    },

    addCategoriDropdown: function (hedef = 4) {

        var sayi = 0;
        $(".categoriList li").each(function () {
            sayi++;


            if (sayi > hedef && !$(this).hasClass("other-categori")) {

                var content = $(this).html();
                $(".other-categori .dropdown-content").append('<li>' + content + '</li>');
                $(this).remove();

            }


        });


    },
    setPlayingTime: function () {

        setInterval(function () {

            var url = $(".game-detail").data("url");

            jQuery.ajax({
                url: url,
                data: 'type=playingTime',
                type: 'GET',
                beforeSend: function () {
                },
                success: function (data) {
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }

            });

        }, 10000);

    },

    likeDislike: function () {
        // $('.js-rating-simple').thumbs();
        // $('.js-rating-simple').thumbs({
        //     onLike: function (value) {
        //         Panel.addLikeDislike("like");
        //
        //     },
        //     onDislike: function(value) {
        //         Panel.addLikeDislike("dislike");
        //     }
        // });

        $(".game-rating-container button").off("click").on("click", function () {

            var elm = $(this);
            var elm_ust = $(this).closest("div");

            if (elm.hasClass("btn-like")) {
                Panel.addLikeDislike("like", this);
                elm.toggleClass("active");
                $("button.btn-dislike").removeClass("active");


            } else if (elm.hasClass("btn-dislike")) {
                Panel.addLikeDislike("dislike", this);
                elm.toggleClass("active");
                $("button.btn-like").removeClass("active");

            }


        });


    },
    addLikeDislike: function (type, ths) {
        var elm = $(ths);
        var elm_ust = $(ths).closest("div");
        var url = $(".game-detail").data("url");

        $.ajax({
            type: 'POST',
            url: url,
            beforeSend: function () {

            },
            data: 'type=rating&ratingType=' + type,
            success: function (data) {
                console.log(data);
                if (data.response == 1) {
                    $("button.btn-like .count", elm_ust).html(data.total.like_total);
                    $("button.btn-dislike .count", elm_ust).html(data.total.dislike_total);
                }
            }
        });

    },
    addStar: function (type, value) {

        var url = $(".game-detail").data("url");

        $.ajax({
            type: 'POST',
            url: url,
            beforeSend: function () {
            },
            data: 'type=rating&ratingType=' + type + '&value=' + value,
            success: function (data) {
                if (data.response == 1) {
                    $('.my-rating').starRating('setRating', data.total)

                }
            }
        });

    },
    gameDetail: function () {

        Panel.setPlayingTime();


        var slickOptions = {
            vertical: true,
            verticalSwiping: true,
            centerMode: false,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            // initialSlide: 0,
            prevArrow: "<i class='slick-prev slick-arrow fas fa-chevron-down'></i>",
            nextArrow: "<i class='slick-next slick-arrow fas fa-chevron-up'></i>"

        };

        // slim scroll
        $('.scroll-container').slimscroll({
            size: '5px',
            alwaysVisible: true,
        });


        $('.slick').slick(slickOptions)

        $('.slick').on('init', function () {
            $('.slick-current').addClass('slick-animate');
        }).on('beforeChange', function () {
            $(".item").removeClass('slick-animate');
        }).on('afterChange', function () {
            $('.slick-current').addClass('slick-animate');

        });

        /*like*/
        Panel.likeDislike();


        /*share*/
        $("#share").jsSocials({
            showLabel: false,
            shares: ["twitter", "facebook"]
        });

        //fly-effect
        Panel.flytEffect();

        //game star
        Panel.gameStar();


    },
    flytEffect: function () {

        $('.game-detail').flyto({
            item: '.game-picture',
            target: '.gamebox-btn',
            button: '.add-gameBox'
        });

    },
    addGameBox: function (ths) {
        var count = $(".gamebox-btn .count");

        var url = $(".game-detail").data("url");

        $.ajax({
            type: 'GET',
            url: url,
            beforeSend: function () {
            },
            data: 'type=addGamebox',
            success: function (data) {
                if (data.response == 1) {
                    setTimeout(function () {
                        count.html(data.total)
                    }, 800);
                }
            }
        });


    },
    gameboxRemove: function (ths) {
        var count = $(".gamebox-btn .count");

        var url = $(ths).data("url");

        $.ajax({
            type: 'GET',
            url: url,
            beforeSend: function () {
                $(ths).closest("li").remove();
            },
            data: 'type=removeGamebox',
            success: function (data) {
                if (data.response == 1) {
                    count.html(data.total)
                }
            }
        });


    },

    gameFullScreen: function () {

        var content = $(".game-frame");
        var game_area = $(".game-area");
        content.toggleClass("full-screen");
        game_area.toggleClass("full-screen");

        $(".close-fullscreen").toggleClass("hidden");

        // if(content.hasClass("full-screen")){
        //     $(".close-fullscreen").removeClass("hidden");
        // }else{
        //
        // }

        $(document).on('keyup', function (evt) {
            if (evt.keyCode == 27) {
                $(".game-frame").removeClass("full-screen");
                $(".game_area").removeClass("full-screen");
                $(".close-fullscreen").addClass("hidden");
            }
        });
    },

    windowSize: function () {

        var screensize = $(window).width();

        // console.log(screensize);

        var grid = Math.floor(screensize / 150) * 150;

        // console.log(grid);

        $(".games-grid").css("width", grid + 'px');
        // $(".game-width").css("width", grid + 'px');
        // $(".header").css("margin-left", '-' + (grid / 2) + 'px');

        $(".header").removeClass("overflow-hidden");


    },

    gridSystem: function () {

        Panel.windowSize();


        var grid = $('.games-grid');

        grid.masonry({
            itemSelector: 'div.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            stamp: '.stamp',
            // fitWidth: true,
        });

        $('.games-grid').infinitescroll({
                // Pagination element that will be hidden
                navSelector: '#pagination',

                // Next page link
                nextSelector: '#pagination a',

                // Selector of items to retrieve
                itemSelector: '.grid-item',

                // Loading message
                loadingText: '',

                // pageType: "&page=items",
                // categoryParam: "?deneme=shoes",

            },

            // Function called once the elements are retrieved
            function (new_elts) {
                var elts = $(new_elts).css('opacity', 0);

                elts.animate({opacity: 1});
                grid.masonry('appended', elts);

                Panel.lazy();
            });

    },
    headerFixed: function () {

        var sticky = $('.header'),
            scroll = $(window).scrollTop();

        if (scroll >= 50) sticky.addClass('fixed');
        else sticky.removeClass('fixed');

    },
    searchGame: function () {

        var screensize = $("body").width();

        if (screensize < 992) {

        }
            $("body .search-section .input-field").toggleClass("active");


    },
    toggleFullScreen: function () {


        var doc = window.document;
        var docEl = doc.documentElement;
        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
            requestFullScreen.call(docEl);
        }
        else {
            cancelFullScreen.call(doc);
        }
    }


};

/* ================================================
// ---------------------- Custom.js ----------------- */


jQuery(document).ready(function () {
    // Init our app
    Panel.init();


});

// Load Events
$(window).on('load', function () {

    Panel.loadJs();


});

// Scroll Event
$(window).on('scroll', function () {


    Panel.headerFixed();

});


// Resize Event
$(window).resize(function () {
    Panel.categoriesSystem();
    // Panel.gridSystem();
});

