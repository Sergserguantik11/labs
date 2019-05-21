$(document).on("click", "input[name='radioBtn']", function() {//кнопки в начало и конец
    thisRadio = $(this);
    if (thisRadio.hasClass("imChecked")) {
        thisRadio.removeClass("imChecked");
        thisRadio.prop('checked', false);
    } else {
        thisRadio.prop('checked', true);
        thisRadio.addClass("imChecked");
    };
})
$(function() {
    $("form").submit(function(event) {//тут хранятся строки из таблицы и записываются в объект
        event.preventDefault();
        var textValue = event.currentTarget[2].value;
        var colorValue = event.currentTarget[3].value;
        var screen = $('.screen');
        var newElement = $("<p id='new'>" + textValue + "</p>").css("background-color", colorValue);
        var radioValue = $('input:radio:checked').val();
        if (!isEmpty(textValue)) {
            if (radioValue == 1) {
                screen.append(newElement);
            } else {
                screen.prepend(newElement);
            }
        }
    });
});

function isEmpty(str) {//проверка длины строки
    return (!str || 0 === str.length);
}
$(document).on("click", ".screen > p#new", function() {//удаление
    $(this).remove();
});

$(document).on("click", ".stat", function() {//вывод статистики
    var countElement = 0;
    var str = " ";
    $('.screen > #new').each(function(i) {
        countElement++;
        str += $(this).text() + ".";
    })
    str = str.replace(/^/, "всего элементов " + countElement + ", их общий текст ");
    alert(str);
});