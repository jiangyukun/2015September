$(function () {
    var $li = $('ul li');
    var $current = $('#current');
    $current.css('top', $('.hover').position().top);
    $li.hover(function () {
        $current.css('top', $(this).position().top);
    }, function () {
        $current.css('top', $('.hover').position().top);
    });

    $li.click(function () {
        for (var i = 0; i < $li.size(); i++) {
            if (this == $li.get(i)) {
                $li.eq(i).children('a').addClass('hover');
            } else {
                $li.eq(i).children('a').removeClass('hover');
            }
        }
    })
});
