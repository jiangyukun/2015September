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

$(function () {
    var $searchMenuList = $('.search-menu-list');
    var $searchCondition = $('.search-condition');
    var $btnTip = $('.btn-tip');
    var $closeContainer = $('.close-container');
    var $categoryMenuList = $('#category_menu_list');
    var $subContent = $('.sub-content');
    var templateStr = $('#template1').text();

    // init
    $('input[type=radio]').uniform();
    $('.content').find('.sub-content:not(:first)').hide();
    $searchMenuList.hide();

    // event
    $btnTip.click(function () {
        $searchMenuList.show();
    });
    $closeContainer.click(function () {
        $searchMenuList.hide();
    });
    $subContent.find('.select-all').click(function () {
        var n = 0, $currentSubContent = $(this).closest('.sub-content');
        $currentSubContent.find('span.item').each(function (index, element) {
            var itemId = $(element).attr('id');
            var $removeItem = $searchCondition.find('span[data-id="' + itemId + '"]');
            if ($removeItem.length != 0) {
                $('#' + itemId).removeClass('selected');
                $removeItem.parent().remove();
            }
        });
        var t = $currentSubContent;
        while (t.prev().length != 0) {
            n++;
            t = t.prev();
        }
        var $categoryMenuA = $categoryMenuList.find('li').eq(n).find('a');
        if ($searchCondition.find('span[data-id="' + $categoryMenuA.attr('id') + '"]').length != 0) {
            return;
        }
        var html = Mustache.to_html(templateStr, {
            id: $categoryMenuA.attr('id'),
            text: $categoryMenuA.text()
        });
        $btnTip.before(html);
    });
    $('.search-menu-list>ul>li').on('click', function () {
        var n = 0;
        var $current = $(this);
        while ($current.prev().length != 0) {
            n++;
            $current = $current.prev();
        }
        $('.sub-content').each(function (index, ele) {
            var $ele = $(ele);
            if (index == n) {
                $ele.show();
            } else {
                $ele.hide();
            }
        })
    });
    $('.sub-content .item').click(function () {
        var isExist;
        var id = $(this).attr('id');
        $searchCondition.find('span[data-id]').each(function (index, element) {
            var $ele = $(element);
            if (id == $ele.data('id')) {
                isExist = true;
                return true;
            }
        });
        if (isExist) {
            return;
        }
        var $selectAll = $(this).closest('.sub-content').find('.select-all');
        var allId = $selectAll.attr('id').split('_all')[0];

        var $categoryMenu = $searchCondition.find('span[data-id="' + allId + '"]');
        if ($categoryMenu.length != 0) {
            return;
        }

        var $dl = $(this).parent().parent();
        if ($(this).parent().is('dt')) {
            $dl.find('dd').each(function (index, element) {
                var removeId = $(element).find('span').attr('id');
                var t = $searchCondition.find('span[data-id="' + removeId + '"]');
                $('#' + removeId).removeClass('selected');
                t.parent().remove();
            });
        }
        if ($(this).parent().is('dd')) {
            var categoryId = $dl.find('dt span').attr('id');
            if ($searchCondition.find('span[data-id="' + categoryId + '"]').length != 0) {
                return;
            }
        }
        var html = Mustache.to_html(templateStr, {
            id: id,
            text: $(this).text()
        });
        $btnTip.before(html);
        $(this).addClass('selected');
    });
    $searchCondition.delegate('.remove-btn', 'click', function () {
        var id = $(this).prev().data('id');
        var $ele = $('#' + id);
        if ($ele.is('span')) {
            $ele.removeClass('selected');
        } else if ($ele.is('a')) {
            $('#' + id + '_all').parent().removeClass('checked');
        }
        $(this).parent().remove();
    });
});
