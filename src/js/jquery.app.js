/* ==============================================
Smooth Scroll To Anchor
=============================================== */
//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.navbar-nav a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 0
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
/* ==============================================
Preloader
=============================================== */

$(window).load(function() {
    $('.status').fadeOut();
    $('.preloader').delay(350).fadeOut('slow');
});

/* ==============================================
WOW plugin triggers animate.css on scroll
=============================================== */
jQuery(document).ready(function () {
    wow = new WOW(
        {
            animateClass: 'animated',
            offset: 50,
            mobile: true
        }
    );
    wow.init();
});


//sticky header on scroll
$(window).load(function() {
    $(".sticky").sticky({topSpacing: 0});
});


$(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn();
    } else {
        $('.back-to-top').fadeOut();
    }
});

$('.back-to-top').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
});

/* ==============================================
Contact App
=============================================== */

//var $ = jQuery.noConflict(); //Relinquish jQuery's control of the $ variable.

/*global jQuery */
jQuery(function ($) {
    'use strict';

    /**
     * Contact Form Application
     */
    var ContactFormApp = {
        $contactForm: $("#ajax-form"),
        $contactFormBtn: $("#send"),
        $contactFormName: $("#name2"),
        $contactFormEmail: $("#email2"),
        $contactFormPhone: $("#phone2"),
        $contactFormCompany: $("#company2"),
        $contactFormSite: $("#site2"),

        $confirmMessage: $("#ajaxsuccess"),

        $errorMessages: $(".error"),

        $errorName: $("#err-name"),
        $errorEmail: $("#err-emailvld"),

        $errorForm: $("#err-form"),
        $errorTimeout: $("#err-timedout"),
        $errorState: $("#err-state"),

        //Validate Contact Us Data
        validate: function () {
            var error = false; // we will set this true if the form isn't valid

            var name = this.$contactFormName.val(); // get the value of the input field

            if(name === "" || name === " ") {
                this.$errorName.show(500);
                this.$errorName.delay(4000);
                this.$errorName.animate({
                    height: 'toggle'
                }, 500, function() {
                    // Animation complete.
                });
                error = true; // change the error state to true
            }

            var email_compare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; // Syntax to compare against input
            var email = this.$contactFormEmail.val().toLowerCase(); // get the value of the input field

            if (email === "" || email === " " || !email_compare.test(email)) { // check if the field is empty
                this.$contactFormEmail.fadeIn('slow'); // error - empty

                this.$errorEmail.show(500);
                this.$errorEmail.delay(4000);
                this.$errorEmail.animate({
                    height: 'toggle'
                }, 500, function() {
                    // Animation complete.
                });
                error = true;
            }

            if(error === true) {
                this.$errorForm.show(500);
                this.$errorForm.delay(4000);
                this.$errorForm.animate({
                    height: 'toggle'
                }, 500, function() {
                    // Animation complete.
                });
            }

            return error;
        },
        //contact form submit handler
        contactFormSubmit: function (obj) {
            this.$errorMessages.fadeOut('slow'); // reset the error messages (hides them)

            if(this.validate() === false) {

                var data_string = $('#ajax-form').serialize(); // Collect data from form

                var $this = this;

                $this.$contactFormBtn.html('Aguarde...');

                $.ajax({
                    type: "POST",
                    url: $this.$contactForm.attr('action'),
                    data: data_string,
                    timeout: 6000,
                    cache: false,
                    crossDomain: false,
                    error: function(request, error) {
                        if (error == "timeout") {
                            $this.$errorTimeout.slideDown('slow');
                        } else {
                            $this.$errorState.slideDown('slow');
                            $this.$errorState.html('An error occurred: ' + error + '');
                        }
                        $this.$contactFormBtn.html('Enviar');
                    },
                    success: function() {
                        $this.$confirmMessage.show(500);
                        $this.$confirmMessage.delay(4000);
                        $this.$confirmMessage.animate({
                            height: 'toggle'
                            }, 500, function() {
                        });

                        $this.$contactFormName.val('');
                        $this.$contactFormEmail.val('');
                        $this.$contactFormPhone.val('');
                        $this.$contactFormCompany.val('');
                        $this.$contactFormSite.val('');
                        $this.$contactFormBtn.html('Enviar');
                    }
                });
            }
            return false;
        },
        bindEvents: function () {
            //binding submit event
            this.$contactFormBtn.on('click', this.contactFormSubmit.bind(this));
        },
        init: function () {
            //initializing the contact form
            this.bindEvents();
            return this;
        }
    };



    //Initializing the app
    ContactFormApp.init({});

});
