$(function () {

    $('.slider-border').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        dots: true,
    });

    $('.catalog-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        prev: "<",
        next: ">",
        dots: true,
        responsive:[
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint:630,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    });

    if ($(window).width() < 992){
        $('.slider-down').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            prev: "<",
            next: ">",
            responsive:[
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                }
            ]
        });
    }


    if ($(window).width() < 768){
        $('.kids-slid').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            prev: "<",
            next: ">",
            responsive:[
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                }
            ]
        });
    }

    $('.reviews-slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        prev: "<",
        next: ">",
        responsive:[
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    });

    $('input[name="phone"]').mask("+3 (999) 999 99 99");

    $('.call-bt').click(function () {
        var parentClass = $(this).attr('rel');
        validate = 1;
        validate_msg = '';
        form = $('#' + $(this).attr('data-rel'));
        jQuery.each(form.find('.validate input'), function (key, value) {

            if ($(this).val() == '') {
                validate_msg += $(this).attr('title') + '\n';
                validate = 0;
                $(this).focus();
                $(this).parent("label").find('input').addClass('red_input');
                $(this).keyup(function () {
                    $(this).parent("label").find('input').removeClass('red_input');
                });
            }
            else {
                $(this).parent("label").find('input').removeClass('red_input');
            }
        });

        if (validate == 1) {
            $.ajax({
                url: 'ajax.php'
                , data: 'action=send_form&' + form.serialize()
                , success: function (data) {
                    $('form').trigger('reset');
                    $('.modal').modal('hide');
                    $('#popap-thank').modal('show');
                }
            });
        }
        else {}
    });

    if($("#map").length > 0){

        function initialize() {

            var styleArray = [
                {
                    featureType: 'all',
                    stylers: [
                        { saturation: -80 }
                    ]
                },{
                    featureType: 'road.arterial',
                    elementType: 'geometry',
                    stylers: [
                        { hue: '#00ffee' },
                        { saturation: 50 }
                    ]
                },{
                    featureType: 'poi.business',
                    elementType: 'labels',
                    stylers: [
                        { visibility: 'off' }
                    ]
                }
            ];

            var mapOptions = {
                zoom: 16,
                center: new google.maps.LatLng(50.2962461, 26.8598976),
                styles: styleArray,
                scrollwheel: false
            };


            var contentString = '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h2 id="firstHeading" class="firstHeading">УПАКОВОЧНАЯ ПЛЁНКА</h2>'+
                '<div id="bodyContent">'+
                '<p>Россия, 1230225</p>'+
                '<p>Москва,</p>'+
                '<p>Столярный пер., 3к13</p>'+
                '</div>'+
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });


            var map = new google.maps.Map(document.getElementById('map'),
                mapOptions);

            var image = 'img/point.png';

            var marker = new google.maps.Marker({
                position: {lat: 50.2962461, lng: 26.8598976},
                map: map,
                icon: 'images/marker.png'
            });

            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });

        }
        google.maps.event.addDomListener(window, 'load', initialize);
    }

    var timer = 10;

    var interval = setInterval(function() {
        timer--;
        $('.timer').text(timer);
        if (timer === 0) clearInterval(interval);
    }, 1000);

});