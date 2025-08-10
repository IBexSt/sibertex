var ctrl = new ScrollMagic.Controller;
$(".animated").each(function () {
    new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: "onEnter",
        offset: -100,
        reverse: !1
    }).setClassToggle(this, "fadeInDownCustom").addTo(ctrl)
})

var clienCardSlider = new Swiper('#clientSlider', {
    slidesPerView: 'auto',
    speed: 600,
    grabCursor: true,
    pagination: {
      el: '#clientSlider .swiper-pagination',
      type: 'progressbar',
  },
    breakpoints: {
        320: {
            spaceBetween: 8
        },
        767: {
            spaceBetween: 16
        },
        1200: {
            spaceBetween: 30
        }
    }
})

$(".how-works-item").click(function () {
    $(this).toggleClass("how-works-item--active").find(".how-works-item__dsc").slideToggle("ease-out")
    $(this).siblings(".how-works-item").removeClass("how-works-item--active").find(".how-works-item__dsc").slideUp(400)
})

window.onscroll = function () {

    if (!$('.modal').hasClass('is-open')) {
        fixedMenu()
    }

};

var header = document.getElementsByClassName('header')[0]
var sticky = header.offsetTop;


function fixedMenu() {
    if (window.pageYOffset > sticky) {
        // if ($('.header').hasClass('header-main-page')) {
        //    $('.header').addClass('scroll')
        // }
        $('.header').addClass('scroll')
    } else {
        $('.header').removeClass("scroll");
    }
    // Обновляем тему логотипа при изменении состояния скролла
    updateLogoTheme();
}

fixedMenu()


if ((window.matchMedia("(min-width:767px)").matches) && ($('.main-banner').length)) {
    var path = anime.path('.main-banner__path path');

    anime({
        targets: '.main-banner .animation-item',
        translateX: path('x'),
        translateY: path('y'),
        easing: 'linear',
        duration: 15000,
        loop: true
    });

}

var path2 = anime.path('.main-banner__path-2 path');

anime({
    targets: '.footer .animation-item',
    translateX: path2('x'),
    translateY: path2('y'),
    easing: 'linear',
    duration: 15000,
    loop: true
});

$(document).on('click', '.header-link-js', function (e) {
    e.preventDefault()
    if (!$(this).hasClass('header-link-active')) {
        $(this).addClass('header-link-active')
        $('.header__dropdown').addClass('show-dropdown')

    }
})
document.addEventListener('mouseup', function (e) {
    var div = $(".header__dropdown");
    if ((!div.is(e.target)) && (div.has(e.target).length === 0) && ($('.header-link-js').hasClass('header-link-active'))) {
        setTimeout(function () {
            $('.header__dropdown').removeClass('show-dropdown')
            $('.header-link-js').removeClass('header-link-active')
        }, 10)

    }
})


if (window.matchMedia("(max-width: 767px)").matches) {
    var advantagesSliderMobile = new Swiper('#advantagesSliderMobile', {
        slidesPerView: 'auto',
        spaceBetween: 28,
        pagination: {
            el: '#advantagesSliderMobile .swiper-pagination',
            type: 'progressbar',
        },
    })

    var competentionSliderMobile = new Swiper('#competentionSlider', {
        slidesPerView: 'auto',
        spaceBetween: 8,
        pagination: {
            el: '#competentionSlider .swiper-pagination',
            type: 'progressbar',
        },
    })
    var servicesSliderMobile = new Swiper('#servicesSliderMobile', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
            el: '#competentionSlider .swiper-pagination',
            type: 'progressbar',
        },
    })
    servicesSliderMobile.on('transitionStart', function () {
        var index = servicesSliderMobile.realIndex
        var img = $('.services-slider .img')
        $('.services-slider .img').addClass('hide')
        img[index].classList.remove('hide')

    })

    $('.policy-filter').click(function () {
       $('.policy-filter__item').toggleClass('active')
        $('.information-block-nav').toggleClass('information-block-nav--show')
    })
    $(document).mouseup(function (e) {
        var container = $(".policy-filter");
        if ((container.has(e.target).length === 0)) {
          $('.policy-filter__item').removeClass('active')
            $('.information-block-nav').removeClass('information-block-nav--show')
        }
    });
}

$('.header__btn').click(function () {
    $('.header__links-col:nth-child(2)').toggleClass('show')
})


$('.phone').mask('+0 (000) 000-00-00');
// $('.phone').one('click', function () {
//     $(this).val('+7')
// })

$(document).on('change keydown', '.price-tab-person-data .input', function () {
    formPriceCheckInputValidate($(this))
})


$.validator.addMethod('newEmail', function (value) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}, 'Некорректный Email');

$.validator.messages.required = '';
$.validator.messages.minlength = '';


$('#contacts-form input[name="f_phone"]').attr('req', false);
$('#contacts-form input[name="f_email"]').attr('req', true);

$('#contacts-form .radio-button input').click(function(){

   let value = $(this).val()

   if (value == 'E-mail') {
      $('#contacts-form input[name="f_email"]').attr('req', true);
      $('#contacts-form input[name="f_phone"]').attr('req', false);
   } else {
      $('#contacts-form input[name="f_email"]').attr('req', false);
      $('#contacts-form input[name="f_phone"]').attr('req', true);
   }

})

$("#contacts-form").each(function () {
    $(this).validate({
        success: "valid",
        ignore: ".ignore",
        rules: {
            f_name: {
                required: true,
                minlength: 2
            },

            f_phone: {
                required: {
                    depends: function (element) {
                        return $('#contacts-form .phone').attr('req') == 'true';
                    }
                },
                minlength: 18
            },
            f_email: {
                required: {
                    depends: function (element) {
                        return $('#contacts-form .email').attr('req') == 'true';
                    }
                },
                newEmail: false
            },
			text: {
                required: true,
                minlength: 2
            },
        },
        messages: {
            f_name: {
                required: "Введите имя"
            },
            f_phone: {
                required: "Введите телефон"
            },
            f_email: {
                required: "Введите Email",
				email: "Некорректный Email"
            },
			text: {
				required: "Введите собщение",
            }
        },
        submitHandler: function (form) {
            contactsSubmitHandler({
                'success': function () {
                    // console.log('success');
                    $(form).closest('.form-block').find('.form-wrap').addClass('hide')
                    $(form).closest('.form-block').find('.message-success').removeClass('hide')

                    $([document.documentElement, document.body]).animate({
                        scrollTop: $(".message-success").offset().top - 150
                    }, 400);
                    // $('.message-success')
					if (typeof ym !== 'undefined') {
						ym(24468002,'reachGoal','request');
					}
                },
                'error': function () {
                    console.log('error');
                }
            }, form);
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        highlight: function (error) {
            $(error).addClass('inputError')
        },
        unhighlight: function (error) {
            $(error).removeClass('inputError')
        }

    });
});
$("#contacts-form2").each(function () {
    $(this).validate({
        success: "valid",
        ignore: ".ignore",
        rules: {
            f_name: {
                required: true,
                minlength: 2
            },

            f_phone: {
                required: true,
                minlength: 18
            }
        },
        messages: {
            f_name: {
                required: "Введите имя"
            },
            f_phone: {
                required: "Введите телефон"
            }
        },
        submitHandler: function (form) {
            contacts2SubmitHandler({
                'success': function () {
                    // console.log('success');
                    $(form).closest('.form-block').find('.form-wrap').addClass('hide')
                    $(form).closest('.form-block').find('.message-success').removeClass('hide')

                    $([document.documentElement, document.body]).animate({
                        scrollTop: $(".message-success").offset().top - 150
                    }, 400);
                    // $('.message-success')
					if (typeof ym !== 'undefined') {
						ym(24468002,'reachGoal','request');
					}
                },
                'error': function () {
                    console.log('error');
                }
            }, form);
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        highlight: function (error) {
            $(error).addClass('inputError')
        },
        unhighlight: function (error) {
            $(error).removeClass('inputError')
        }

    });
});
$('#formAudit input[name="f_phone"]').attr('req', false);
$('#formAudit input[name="f_email"]').attr('req', true);

$('#formAudit .radio-button input').click(function(){

   let value = $(this).val()

   if (value == 'E-mail') {
      $('#formAudit input[name="f_email"]').attr('req', true);
      $('#formAudit input[name="f_phone"]').attr('req', false);
   } else {
      $('#formAudit input[name="f_email"]').attr('req', false);
      $('#formAudit input[name="f_phone"]').attr('req', true);
   }

})

$("#formAudit").each(function () {
    $(this).validate({
        success: "valid",
        ignore: ".ignore",
        rules: {
            f_name: {
                required: true,
                minlength: 2
            },
            f_phone: {
                required: {
                    depends: function (element) {
                        return $('#formAudit .phone').attr('req') == 'true';
                    }
                },
                minlength: 18
            },
            f_email: {
                required: {
                    depends: function (element) {
                        return $('#formAudit .email').attr('req') == 'true';
                    }
                }
            }
        },
        messages: {
            f_name: {
                required: "Введите имя"
            },
            f_phone: {
                required: "Введите телефон"
            },
            f_email: {
                required: "Введите Email",
				email: "Некорректный Email"
            }
						
        },
        submitHandler: function (form) {
            auditlSubmitHandler({
                'success': function () {
                    // console.log('success');
                    $(form).closest('.form-block').find('.form-wrap').addClass('hide')
                    $(form).closest('.form-block').find('.message-success').removeClass('hide')

                    $([document.documentElement, document.body]).animate({
                        scrollTop: $(".message-success").offset().top - 150
                    }, 400);
                    // $('.message-success')
					if (typeof ym !== 'undefined') {
						ym(24468002,'reachGoal','request');
					}
                },
                'error': function () {
                    console.log('error');
                }
            }, form);
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        highlight: function (error) {
            $(error).addClass('inputError')
        },
        unhighlight: function (error) {
            $(error).removeClass('inputError')
        }

    });
});

$('#tarif-form input[name="f_phone"]').attr('req', false);
$('#tarif-form input[name="f_email"]').attr('req', true);

$('#tarif-form .radio-button input').click(function(){

   let value = $(this).val()

   if (value == 'E-mail') {
      $('#tarif-form input[name="f_email"]').attr('req', true);
      $('#tarif-form input[name="f_phone"]').attr('req', false);
   } else {
      $('#tarif-form input[name="f_email"]').attr('req', false);
      $('#tarif-form input[name="f_phone"]').attr('req', true);
   }

})


$("#tarif-form").each(function () {
    $(this).validate({
        success: "valid",
        ignore: ".ignore",
        rules: {
            f_name: {
                required: true,
                minlength: 2
            },
            f_phone: {
                required: {
                    depends: function (element) {
                        return $('#tarif-form .phone').attr('req') == 'true';
                    }
                },
                minlength: 18
            },
            f_email: {
                required: {
                    depends: function (element) {
                        return $('#tarif-form .email').attr('req') == 'true';
                    }
                },
                newEmail: false
            }
        },
        messages: {
            f_name: {
                required: "Введите имя"
            },
            f_phone: {
                required: "Введите телефон"
            },
			f_email: {
                required: "Введите Email",
				email: "Некорректный Email"
            }
        },
        submitHandler: function (form) {
            tarifSubmitHandler({
                'success': function () {
                    // console.log('success');
                    $(form).closest('.form-block').find('.form-wrap').addClass('hide')
                    $(form).closest('.form-block').find('.message-success').removeClass('hide')

                    $([document.documentElement, document.body]).animate({
                        scrollTop: $(".message-success").offset().top - 150
                    }, 400);
                    // $('.message-success')
					if (typeof ym !== 'undefined') {
						ym(24468002,'reachGoal','request');
					}
                },
                'error': function () {
                    console.log('error');
                }
            }, form);
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        highlight: function (error) {
            $(error).addClass('inputError')
        },
        unhighlight: function (error) {
            $(error).removeClass('inputError')
        }

    });
});
$(".form-price").each(function () {
    $(this).validate({
        success: "valid",
        ignore: ".ignore",
        rules: {
            f_name: {
                required: true,
                minlength: 2
            },
            f_phone: {
               required: {
                   depends: function (element) {
                       return $('.form-price input[name="f_phone"]').attr('req') == 'true';
                   }
               },
               minlength: 18
           },
           f_email: {
               required: {
                   depends: function (element) {
                       return $('.form-price input[name="f_email"]').attr('req') == 'true';
                   }
               },
               newEmail: false
           },
            f_conditions: {
                required: true
            }
        },
        messages: {
            f_name: {
                required: "Введите имя"
            },
            f_phone: {
                required: "Введите телефон"
            },
			f_email: {
                required: "Введите Email",
				email: "Некорректный Email"
            }
        },
        submitHandler: function (form) {
            priceSubmitHandler({
                'success': function () {
                    // console.log('success');
                    $(form).closest('.form-block').find('.form-wrap').addClass('hide')
                    $(form).closest('.form-block').find('.message-success').removeClass('hide')

                    // $('.message-success')
					if (typeof ym !== 'undefined') {
						ym(24468002,'reachGoal','request');
					}
                },
                'error': function () {
                    console.log('error');
                }
            }, form);
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        highlight: function (error) {
            $(error).addClass('inputError')
        },
        unhighlight: function (error) {
            $(error).removeClass('inputError')
        }

    });
});
$('.form-price input[name="f_phone"]').attr('req', false);
$('.form-price input[name="f_email"]').attr('req', true);

$('.radio-button input').click(function(){

   let value = $(this).val()

   if (value == 'E-mail') {
      $('.form-price input[name="f_email"]').attr('req', true);
      $('.form-price input[name="f_phone"]').attr('req', false);
   } else {
      $('.form-price input[name="f_email"]').attr('req', false);
      $('.form-price input[name="f_phone"]').attr('req', true);
   }

})

$(document).on('click', '.button-success', function () {
    var formBlock = $(this).closest('.form-block')
    formBlock.find('.form-wrap').removeClass('hide')
    formBlock.find('.message-success').addClass('hide')
    clearInput(formBlock)
    if (modal.isOpen == true) {
        modal.close()
    } else {
        $([document.documentElement, document.body]).animate({
            scrollTop: formBlock.offset().top - 150
        }, 400);
    }
    if ($(modal.modalContainer).hasClass('modal__container-price')) {
        setTimeout(function(){
            $('#tab-1').removeClass('hide')
            $('#tab-2, #tab-3').addClass('hide')

            $('.form-nav__item').removeClass('form-nav__item--active')
            $('.form-nav__item').eq(0).addClass('form-nav__item--active')


            $('.modal-footer-buttons .button-prev').addClass('hidden-opacity')

            $('.modal-footer-buttons .button-submit').addClass('hide')
            $('.modal-footer-buttons .button-next').removeClass('hide')
            // $('.modal-footer-buttons .button-submit').removeClass('hide')

            $('.modal-footer-buttons').attr('attr-index-tab', 0)

        },500)
    }
})

function clearInput(el) {
    var formBlockInput = el.find('input').val('')
    var formBlockText = el.find('textarea').val('')
}


var targetElement2 = document.querySelector(".mobileMenu");
$(".header__mobile-menu-btn").click(function () {
    $(".mobileMenu").addClass("open")
    bodyScrollLock.disableBodyScroll(targetElement2)
})

$(".mobileMenu .close").click(function () {
    $(".mobileMenu").removeClass("open")
    bodyScrollLock.enableBodyScroll(targetElement2)
})


$(document).on('click', '.menu-content__link-js', function () {
    $('.menu-content__dropdown').toggleClass('show')
    $(this).toggleClass('active')
})


// модалка

class GraphModal {
    constructor(t) {
        this.options = Object.assign({
            isOpen: () => {},
            isClose: () => {}
        }, t), this.modal = document.querySelector(".modal"), this.speed = !1, this.animation = !1, this._reOpen = !1, this._nextContainer = !1, this.modalContainer = !1, this.isOpen = !1, this.previousActiveElement = !1, this._focusElements = ["a[href]", "input", "select", "textarea", "button", "iframe", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'], this._fixBlocks = document.querySelectorAll(".fix-block"), this.events()
    }
    events() {
        this.modal && (document.addEventListener("click", function (t) {
            const e = t.target.closest("[data-graph-path]");
            if (e) {
                let t = e.dataset.graphPath,
                    s = e.dataset.graphAnimation,
                    i = e.dataset.graphSpeed;
                return this.animation = s || "fade", this.speed = i ? parseInt(i) : 100, this._nextContainer = document.querySelector(`[data-graph-target="${t}"]`), void this.open()
            }
            t.target.closest(".js-modal__close") && this.close()
        }.bind(this)), window.addEventListener("keydown", function (t) {
            27 == t.keyCode && this.modalContainer.classList.contains("modal-open") && this.close(), 9 == t.which && this.isOpen && this.focusCatch(t)
        }.bind(this)), this.modal.addEventListener("click", function (t) {
            t.target.classList.contains("modal__container") || t.target.closest(".modal__container") || !this.isOpen || this.close()
        }.bind(this)))
    }
    open(t) {
        let that = this

        console.log(this.modal)
        let value = $('#timeRange').val().replace(";","-");
        $('#timeRange').val(value)

        if (this.previousActiveElement = document.activeElement, this.isOpen) return this.reOpen = !0, void this.close();
        this.modalContainer = this._nextContainer, t && (this.modalContainer = document.querySelector(`[data-graph-target="${t}"]`)), this.modal.style.setProperty("--transition-time", `${this.speed/1e3}s`), this.modal.classList.add("is-open"), this.disableScroll(), this.modalContainer.classList.add("modal-open"), this.modalContainer.classList.add(this.animation), setTimeout(() => {
            this.options.isOpen(this), this.modalContainer.classList.add("animate-open"), this.isOpen = !0, this.focusTrap()
        }, this.speed)
		
		if (typeof ym !== 'undefined') {
			ym(24468002,'reachGoal','calculator_open');
		}
    }
    close() {
        let that = this
        this.modal.classList.add('animate-close')
        // setTimeout(function(){
        that.modalContainer && (that.modalContainer.classList.remove("animate-open"),
            that.modalContainer.classList.remove(that.animation), that.modal.classList.remove("is-open"),

            that.modalContainer.classList.remove("modal-open"),
            that.enableScroll(),
            that.options.isClose(that),
            that.isOpen = !1, that.focusTrap(),
            that.reOpen && (that.reOpen = !1, that.open()))
        // },1000)

    }
    focusCatch(t) {
        const e = this.modalContainer.querySelectorAll(this._focusElements),
            s = Array.prototype.slice.call(e),
            i = s.indexOf(document.activeElement);
        t.shiftKey && 0 === i && (s[s.length - 1].focus(), t.preventDefault()), t.shiftKey || i !== s.length - 1 || (s[0].focus(), t.preventDefault())
    }
    focusTrap() {
        const t = this.modalContainer.querySelectorAll(this._focusElements);
        this.isOpen ? t.length && t[0].focus() : this.previousActiveElement.focus()
    }
    disableScroll() {
        let t = window.scrollY;
        this.lockPadding(), document.body.classList.add("disable-scroll"), document.body.dataset.position = t, document.body.style.top = -t + "px"
    }
    enableScroll() {
        let t = parseInt(document.body.dataset.position, 10);
        this.unlockPadding(), document.body.style.top = "auto", document.body.classList.remove("disable-scroll"), window.scroll({
            top: t,
            left: 0
        }), document.body.removeAttribute("data-position")
    }
    lockPadding() {
        let t = window.innerWidth - document.body.offsetWidth + "px";
        this._fixBlocks.forEach(e => {
            e.style.paddingRight = t
        }), document.body.style.paddingRight = t
    }
    unlockPadding() {
        this._fixBlocks.forEach(t => {
            t.style.paddingRight = "0px"
        }), document.body.style.paddingRight = "0px"
    }
}


const modal = new GraphModal({
    isOpen: (modal) => {
        if ($(modal.modalContainer).hasClass('modal__container-price')) {

        }
    },
});

// range

$("#computerCountRange, #computerCountRange2").ionRangeSlider({
    min: 1,
    from: 7,
    max: 100,
    max_postfix: "+",
    onChange: function (data) {
        // console.log(data.input[0].id)
        if (data.input[0].id == 'computerCountRange') {
            $('#computerCount').text(data.from)
        }
        if (data.input[0].id == 'computerCountRange2') {
            $('#computerCount2').text(data.from)
        }

        $("#modalComputerCount").val(data.from)
        $('.modal__container-recall input[name="pc_count"]').val(data.from)

        costCalculation()
    }
});


$("#serversCountRange, #serversCountRange2").ionRangeSlider({
    min: 0,
    from: 1,
    max: 25,
    max_postfix: "+",
    onChange: function (data) {
        if (data.input[0].id == 'serversCountRange') {
            $('#serversCount').text(data.from)
        }
        if (data.input[0].id == 'serversCountRange2') {
            $('#serversCount2').text(data.from)
        }
        $("#modalServCount").val(data.from)
        $('.modal__container-recall input[name="serv_count"]').val(data.from)
    
        costCalculation()
    }
});

$('#timeRange, #timeRange2').ionRangeSlider({
    type: "double",
    min: 0,
    max: 24,
    from: 9,
    to: 18,
    onChange: function (data) {
        if (data.input[0].id == 'timeRange') {
            $('#time').text(`${data.from_pretty}-${data.to_pretty}`)
        }
        if (data.input[0].id == 'timeRange2') {
            $('#time2').text(`${data.from_pretty}-${data.to_pretty}`)
        }
        $("#modalTime").val(`${data.from_pretty}-${data.to_pretty}`)
    
        $('.modal__container-recall input[name="hours_range"]').val(`${data.from_pretty}-${data.to_pretty}`)


        costCalculation()
    },
    onFinish: function(data) {
        let value = $('#timeRange').val().replace(";","-");
        $('#timeRange').val(value)
    }
})

setTimeout(function(){
    let value = $('#timeRange').val().replace(";","-");
    $('#timeRange').val(value)
},2000)



$(document).on('click', '.days', function () {
    $(this).toggleClass('active')

    var activeCount = $(this).parent().find('.days.active').length

    if (activeCount == 1) {
        $('.days.active').addClass('dsb')
    } else {
        $('.days.active').removeClass('dsb')
    }
    $('#modalDays, #tab2-days').val(activeCount)
    // console.log(activeCount)
    costCalculation()

})


$(document).on('click', '.btn-nav-js', function () {

    var indexTab = $(this).closest('.modal-footer-buttons').attr('attr-index-tab')


    if ($(this).hasClass('button-prev')) {
        console.log('prev')
        indexTab--

    }
    if ($(this).hasClass('button-next')) {
        console.log('next')
        indexTab++
        if (indexTab == 2) {
            $('.button-next').addClass('button-next--disabled')
        }
    }

    $(this).closest('.modal-footer-buttons').attr('attr-index-tab', indexTab)
    $('.price-tab').addClass('hide')
    $("#tab-" + indexTab).removeClass('hide')

    $('.form-nav__item').removeClass('form-nav__item--active')
    $('.form-nav__item').eq(indexTab - 1).addClass('form-nav__item--active')

    $('.button-prev').addClass('dsb')

    setTimeout(function () {
        $('.button-prev').removeClass('dsb')
    }, 300)


    if (indexTab == 1) {
        $('.button-prev').addClass('hidden-opacity')
        $('.button-next').removeClass('button-next--disabled')
        $('.button-next').removeClass('hide')
        $('.button-submit').addClass('hide')
    }

    if (indexTab == 2) {
        $('.button-prev').removeClass('hidden-opacity')
        $('.button-next').addClass('hide')
        $('.button-submit').removeClass('hide')
    }

    let value = $('#timeRange').val().replace(";","-");
    $('#timeRange').val(value)
})

function formPriceCheckInputValidate(el) {

    console.log(el)

    if (el.valid()) {
        el.addClass('valid-input')
    } else {
        el.removeClass('valid-input')
    }

    validCount = $('.valid-input').length
    validItem = $('.price-tab-person-data .input').length
    inputs = $('.price-tab-person-data .input')


    if (validCount == validItem) {
        $('.button-next').removeClass('button-next--disabled')
    } else {
        $('.button-next').addClass('button-next--disabled')
    }

    console.log(validItem)
    console.log(validCount)
}


function costCalculation() {
    if ($('.modal').hasClass('is-open')) {
        var computers = $('#computerCount').text()
        var servers = $('#serversCount').text()
        var hours = `${$('#time').text().split('-')[1] - $('#time').text().split('-')[0]}`
		var time1 = $('#time').text().split('-')[0]
		var time2 = $('#time').text().split('-')[1]
        var days = $('.modal .days.active').length
		var days_weekend = $('.modal .days.weekend.active').length

    } else {
        var computers = $('#computerCount2').text()
        var servers = $('#serversCount2').text()
        var hours = `${$('#time2').text().split('-')[1] - $('#time2').text().split('-')[0]}`
		var time1 = $('#time2').text().split('-')[0]
		var time2 = $('#time2').text().split('-')[1]
        var days = $('.tarifs .days.active').length
		var days_weekend = $('.tarifs .days.weekend.active').length
    }


    var countDevice = Math.round(+computers + +2.5*servers)
	if (days_weekend == 0) {
		var days = days <= 5 ? 0 : 1;
					$('.t18.p18').html(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11.5" fill="#BFBFBF" stroke="#BFBFBF"></circle>
                    <path d="M7 12H17" stroke="#282829" stroke-width="2" stroke-linecap="round"></path>
                    </svg>`)
	} else {
		var days = 1;
					$('.t18.p18').html(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11.5" fill="#247CFF" stroke="#247CFF"></circle>
                    <path d="M7 11.7222L10.8596 16L17 9" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                    </svg>`)
	}
    var reduction = [12000, 6000, 4000, 3000, 2400, 2000, 1714, 1500, 1333, 1200, 1255, 1000]
    var markup = [
        ['0', '0.30', '1.20'],
        ['0.40', '0.80', '2.00']
    ]
    var hourTable


    if ((hours <= 10) & (8 <= time1) & (time1 <= 19) & (8 <= time2) & (time2<= 19)) {
        hours = 0
        hourTable = 9
    } else if ((hours <= 12) & (6 <= time1) & (time1 <= 21) & (6 <= time2) & (time2<= 21)) {
        hours = 1
        hourTable = 12
    } else {
        hours = 2
        hourTable = 24
	}
	
	if (hourTable == 24) {
		days = 1;
	}

    $('.t18.p1 span, .t19.p1 span, .t20.p1 span').text(`${hourTable}/${days <= 0 ? 5:7}`)
	


    // коэффициент

    if (countDevice < 11) {
        coeff = reduction[countDevice - 1]
    }

    if (countDevice <= 49 && countDevice >= 11) {
        coeff = reduction[10] - (countDevice * 5)
    }

    if (countDevice > 49) {
        coeff = reduction[11]
    }

    // цена

    if (countDevice <= 10) {
        priceTariffOptimal = 2000
        priceTariffImproved = 2000
        priceTariffAdvanced = 2000
        // console.log('меньше девяти')
    }

    if (countDevice >= 11 && countDevice <= 49) {
        priceTariffOptimal = 2000
        priceTariffImproved = 2000
        priceTariffAdvanced = 2000
        // console.log('меньше 18')

    }
    if (countDevice >= 50) {
        priceTariffOptimal = 2000
        priceTariffImproved = 2000
        priceTariffAdvanced = 2000
        // console.log('больше 18')

    }

    sumHoursOptimal = getHoursOptimal(countDevice, coeff, priceTariffOptimal, markup[days][hours])

    sumOptimal = getHoursImproved(sumHoursOptimal) * priceTariffImproved 
    sumImproved = sumHoursOptimal * priceTariffOptimal
    sumAdvanced = getHoursAdvanced(sumHoursOptimal) * priceTariffAdvanced

    if (countDevice < 50) {
        sumOptimal = Math.round(sumOptimal / 50) * 50;
        sumImproved = Math.round(sumImproved / 50) * 50;
        sumAdvanced = Math.round(sumAdvanced / 50) * 50;
    }

    if ($('.modal').hasClass('is-open')) {
        $('.modal-footer__price').text(`от ${sumOptimal.toLocaleString('ru-RU')} ₽`)
		
		if (typeof ym !== 'undefined') {
			ym(24468002,'reachGoal','calculator');
		}
    }

    if (($('.tarifs').length) && (!$('.modal').hasClass('is-open'))) {
        $('#tarif-price18').text(`${sumOptimal.toLocaleString('ru-RU')}`)
        $('#tarif-price19').text(`${sumImproved.toLocaleString('ru-RU')}`)
        $('#tarif-price20').text(`${sumAdvanced.toLocaleString('ru-RU')}`)

        $('.t18.p2 span').text(+sumHoursOptimal + " часов поддержки")
        $('.t19.p2 span').text(getHoursImproved(+sumHoursOptimal) + " часов поддержки")
        $('.t20.p2 span').text(getHoursAdvanced(+sumHoursOptimal) + " часов поддержки")

        $('.t18.p9 span').text(priceTariffOptimal.toLocaleString() + " ₽")
        $('.t19.p9 span').text(priceTariffImproved.toLocaleString() + " ₽")
        $('.t20.p9 span').text(priceTariffAdvanced.toLocaleString() + " ₽")
		
		if (typeof ym !== 'undefined') {
			ym(24468002,'reachGoal','calculator');
		}
    }

}


function getHoursOptimal(countDevice, coeff, priceTariff, markup) {
	if (markup == 0) {
		countHoursOptimal = ((countDevice * coeff / priceTariff / 0.5) + ((countDevice * coeff / priceTariff / 0.5) * markup)) * 0.5;
		countHoursOptimal = (Math.round(countHoursOptimal * 2) / 2).toFixed(1)
	} else {
		countHoursOptimal = (Math.round((countDevice * coeff / priceTariff) * 2) / 2).toFixed(1);
		countHoursOptimal = (countHoursOptimal * 1 + (countHoursOptimal * markup));
		countHoursOptimal = (Math.round(countHoursOptimal))
	}


	if ((markup == 0.30) && (countDevice <= 5)) {
		countHoursOptimal = 8
	} else if ((markup == 0.30) && (countDevice < 11)) {
		countHoursOptimal = 8
	} else if ((markup == 1.20) && (countDevice <= 5)) {
		countHoursOptimal = 0
	} else if ((markup == 1.20) && (countDevice < 11)) {
		countHoursOptimal = 0
	} else if ((markup == 0.40) && (countDevice <= 8)) {
		countHoursOptimal = 9
	} else if ((markup == 0.40) && (countDevice < 11)) {
		countHoursOptimal = 9
	} else if ((markup == 0.80) && (countDevice <= 8)) {
		countHoursOptimal = 11
	} else if ((markup == 0.80) && (countDevice < 11)) {
		countHoursOptimal = 11
	} else if ((markup == 2.00) && (countDevice <= 8)) {
		countHoursOptimal = 18
	} else if ((markup == 2.00) && (countDevice < 11)) {
		countHoursOptimal = 18
	}

    return countHoursOptimal
}

function getHoursImproved(so) {
	return Math.round((+so + +so * -0.25) * 2) / 2;
}

function getHoursAdvanced(so) {
    return Math.round(+so + +so * 0.5);
}


// слайдер категорий
var categorySlider = new Swiper('#category-slider .swiper-container', {
    slidesPerView: 'auto',
    watchOverflow: true,
    navigation: {
        prevEl: '.category__prev-btn',
        nextEl: '.category__next-btn'
    },
    on: {
        init: function () {
            // $('#category-slider').addClass('category-slider-init')
        },
    },
})


// object map

var mapPage = document.getElementsByClassName('objects-page_map')

// console.log(mapPage[0])

if (mapPage[0]) {

    var mapList = mapPage[0].getAttribute('data-resource-url')

    var catId,
        region;

    ymaps.ready(allPlacemarks);

    function allPlacemarks() {
        var myMap = new ymaps.Map('map', {
                center: [59.958978, 30.358478],
                controls: ['zoomControl'],
                zoom: 10,

            }),

            clusterIcons = [{
                href: '/assets/img/iconClaster.svg',
                size: [38, 38],
                offset: [-19, -10],
            }];
        objectManager = new ymaps.ObjectManager({
            clusterize: true,
            preset: 'islands#invertedVioletClusterIcons',
            groupByCoordinates: false,
            zoomMargin: 100,
            gridSize: 128,

            clusterIcons: clusterIcons
        });

		myMap.behaviors.disable('scrollZoom');
		myMap.behaviors.disable('ruler');


        var ctrlKey = false;

        document.addEventListener('keydown', function (e) {
            if (e.which === 17 && !ctrlKey) {
                ctrlKey = true;
                myMap.behaviors.enable('scrollZoom');
            }
        });

        document.addEventListener('keyup', function (e) {
            if (e.which === 17) {
                ctrlKey = false;
                myMap.behaviors.disable('scrollZoom');
            }
        });




        MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="object-balloon top">' +
                '<a class="close" href="#">' +
                '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<g clip-path="url(#clip1)">' +
                '<path d="M5.07467 5.07426L11.0009 11.0005M16.9271 16.9267L11.0009 11.0005M11.0009 11.0005L5.07467 16.9267M11.0009 11.0005L16.9271 5.07426" stroke="#535354" stroke-width="2.5"/>' +
                '</g>' +
                '<clipPath id="clip1">' +
                '<rect width="22" height="22" fill="white"/>' +
                '</clipPath>' +
                '</svg>' +
                '</a>' +
                '<div class="arrow"></div>' +
                '<div class="object-balloon-inner">' +
                '$[[options.contentLayout observeSize minWidth=390 maxWidth=390 maxHeight=650]]' +
                '</div>' +
                '</div>', {

                    build: function () {
                        this.constructor.superclass.build.call(this);
                        this._$element = $('.object-balloon', this.getParentElement());
                        this.applyElementOffset();
                        this._$element.find('.close')
                            .on('click', $.proxy(this.onCloseClick, this));
                    },

                    clear: function () {
                        this._$element.find('.close')
                            .off('click');
                        this.constructor.superclass.clear.call(this);
                    },

                    onSublayoutSizeChange: function () {
                        MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
                        if (!this._isElement(this._$element)) {
                            return;
                        }
                        this.applyElementOffset();
                        this.events.fire('shapechange');
                    },

                    applyElementOffset: function () {
                        this._$element.css({
                            left: -(this._$element[0].offsetWidth - 60) / 2,
                            top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                        });
                    },
                    onCloseClick: function (e) {
                        e.preventDefault();

                        this.events.fire('userclose');
                    },

                    getShape: function () {
                        if (!this._isElement(this._$element)) {
                            return MyBalloonLayout.superclass.getShape.call(this);
                        }

                        var position = this._$element.position();

                        return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                            [position.left, position.top],
                            [
                                position.left / 2 + this._$element[0].offsetWidth,
                                position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                            ]
                        ]));
                    },
                    _isElement: function (element) {
                        return element && element[0] && element.find('.arrow')[0];
                    }
                }),

            MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                '<h3 class="object-balloon_title">$[properties.company]</h3>' +
                '<span class="object-balloon_description">$[properties.description]</span>'
            ),

            objectManager.objects.options.set({
                iconLayout: 'default#image',
                iconImageHref: '/assets/img/map-icon.svg',
                iconImageSize: [20, 20],
                iconImageOffset: [-10, -10],
                balloonLayout: MyBalloonLayout,
                balloonContentLayout: MyBalloonContentLayout,

            });


        if (window.matchMedia('(max-width: 767px)').matches) {
            myMap.options.set({
                balloonPanelMaxMapArea: 'Infinity'
            });

        }

        var activeObjectMonitor = new ymaps.Monitor(objectManager.clusters.state);


        getPlacemarks();

        myMap.geoObjects.add(objectManager);



        var filterMap = document.querySelectorAll('.object-filter-wrap li')


        for (var i = 0; i < filterMap.length; i++) {


            filterMap[i].addEventListener('click', function () {

                region = document.querySelectorAll('#region li.active')[0].getAttribute('data-ym-reg');
                catId = document.querySelectorAll('#services li.active')[0].getAttribute('data-ym-cat');

                console.log(region)
                console.log(catId)

                objectManager.removeAll();
                getPlacemarks(region, catId);

            })

        }

        function getPlacemarks(region, catId) {


            $.ajax({
                    url: mapList,
                    dataType: 'json',
                    data: {
                        region: region,
                        catId: catId
                    },
                })
                .done(function (data) {

                    objectManager.add(data);

                    var maxLat = 0,
                        maxLon = 0,
                        minLat = 100,
                        minLon = 100;

                    objectManager.objects.each(function (object) {
                        var lat = object.geometry.coordinates[0],
                            lon = object.geometry.coordinates[1];
                        maxLat = (lat <= maxLat) ? maxLat : lat;
                        maxLon = (lon <= maxLon) ? maxLon : lon;
                        minLat = (lat >= minLat) ? minLat : lat;
                        minLon = (lon >= minLon) ? minLon : lon;
                    }, myMap);

                    /*myMap.setBounds([
                        [minLat, minLon],
                        [maxLat, maxLon]
                    ]);*/


                    $('#map').removeClass('loading');
                })
                .fail(function () {
                    console.log("error");
                });
        }
    }
}

$('.filter__btn').click(function () {
    $(this).parent().find('.filter__btn--active').removeClass('filter__btn--active')
    $(this).addClass('filter__btn--active')
})

$('.filter-tariff .filter__btn').click(function () {
    tariff = $('.tarifs')
    index = $(this).index()

    $('.tarifs').addClass('hide')
	
    tariff[index].classList.remove('hide')
})


$('.services-slider__item').click(function () {
    var img = $('.services-slider .img')
    var index = $(this).index()
    $('.services-slider__item').removeClass('services-slider__item—active')
    $(this).addClass('services-slider__item—active')

    if (window.matchMedia("(min-width:767px)").matches) {
        $('.services-slider .img').addClass('hide')
        img[index].classList.remove('hide')
    }

})


$(window).scroll(function () {
    var b = $(".information-block");
    b.each(function (g, a) {
        var b = $(a).offset().top - 150,
            c = b + $(a).height(),
            d = $(window).scrollTop(),
            e = $(a).attr("id");
        d > b && d < c && ($(".information-block-nav li").removeClass("information-block-nav__item-active"),
                $(".information-block-nav a[href=\"#" + e + "\"]").parent().addClass("information-block-nav__item-active")),
            setTimeout(function () {
                $('.information-block__active-item span').text($('.information-block-nav__item-active a').text())
            }, 200)
    })
});


$(".information-block-nav, .privacy-dropdown").on("click", "a", function (d) {
    var of = 100
    d.preventDefault();
    var a = $(this).attr("href"),
        b = $(a).offset().top - of ;
    $("body,html").animate({
        scrollTop: b
    }, 600)
})

function autosize() {
   var text = $('.textarea');
   text.each(function () {
      $(this).attr('rows', 1);
      resize($(this));
   });
   text.on('input', function () {
      resize($(this));
   });

   function resize($text) {
      $text.css('height', 'auto');
      $text.css('height', $text[0].scrollHeight + 'px');
   }
}
autosize();

// Система тем для логотипа
function updateLogoTheme() {
    const header = document.querySelector('.header');
    const logoImages = document.querySelectorAll('.header__logo img[src*="logo_svg"]');
    const mobileLogoImages = document.querySelectorAll('.mobile-menu-header .header__logo img[src*="logo_svg"]');
    
    // Определяем текущую тему
    const isDarkTheme = header.classList.contains('header—black');
    const isScrolled = header.classList.contains('scroll');
    
    // Выбираем правильный логотип
    let logoPath = 'logo_svg.svg'; // для светлой темы по умолчанию
    
    if (isDarkTheme && !isScrolled) {
        logoPath = 'logo_svg_white.svg'; // теманя тема
    }
    
    // Обновляем все логотипы
    [...logoImages, ...mobileLogoImages].forEach(img => {
        const currentSrc = img.getAttribute('src');
        const newSrc = currentSrc.replace(/logo_svg[^.]*\.svg/, logoPath);
        if (currentSrc !== newSrc) {
            img.setAttribute('src', newSrc);
        }
    });
}

// Наблюдатель за изменениями классов header
const headerObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            updateLogoTheme();
        }
    });
});

// Запускаем наблюдение за header
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    if (header) {
        headerObserver.observe(header, {
            attributes: true,
            attributeFilter: ['class']
        });
        updateLogoTheme(); // Инициализация при загрузке
    }
});