$(function () {


});

function vegaFormSubmit(form, url, success) {
    $.post(url, $(form).serialize(), function (data) {
        if (success instanceof Function) success(data);
    })
        .fail(function (data) {
            errors = data.responseJSON.errors;
            $(form + ' .vega_form_row').each(function () {
                $(this).removeClass('error');
                $(this).find('.error_msg').text('')
            })
            for (var key in errors) {
                $(form + ' input[name='+key+']').parent().addClass('error')
                $(form + ' input[name='+key+']').parent().find('.error_msg').text(errors[key])
            }
        });
}

function vegaBlockLoad(elem, url) {
    $(elem).load(url)
}

