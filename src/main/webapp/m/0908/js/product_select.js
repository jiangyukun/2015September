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
    var $searchCondition = $('.search-condition');
    var $searchMenuList = $('.search-menu-list');
    var $categoryMenuList = $('#category_menu_list');
    var templateStr = $('#template1').text();

    function ProductSelectBox($productSelectContainer, searchBox) {
        this.$productSelectContainer = $productSelectContainer;
        this.searchBox = searchBox;
        this.init();
    }

    ProductSelectBox.prototype = {
        constructor: ProductSelectBox,
        init: function () {
            var self = this;
            this.$productSelectContainer.hide();
            self.searchBox.registerListener('add', function (id) {
                $('#' + id).addClass('selected');
            });
            self.searchBox.registerListener('remove', function (id) {
                $('#' + id).removeClass('selected');
            });
            this.$productSelectContainer.find('.close-container').click(function () {
                self.$productSelectContainer.hide();
            });
            this.$productSelectContainer.find('input[type=radio]').uniform();
            this.$productSelectContainer.find('.content').find('.sub-content:not(:first)').hide();
            // 左侧大分类
            this.$productSelectContainer.find('ul li').click(function () {
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
            this.$productSelectContainer.find('.item').click(function () {
                var id = $(this).attr('id');
                // 自身已添加
                if (self.searchBox.searchItem(id)) {
                    return;
                }
                //小分类已添加
                var $category = $(this).closest('.sub-content').find('.select-all');
                var categoryId = $category.attr('id').split('_all')[0];
                if (self.searchBox.searchItem(categoryId)) {
                    return;
                }
                var $dl = $(this).parent().parent();
                // 添加小分类，取消小分类下的商品
                if ($(this).parent().is('dt')) {
                    $dl.find('dd').each(function (index, element) {
                        var productId = $(element).find('span').attr('id');
                        if (self.searchBox.searchItem(productId)) {
                            self.searchBox.deleteSearchItem(productId);
                        }
                    });
                }
                // 对应小分类已添加
                if ($(this).parent().is('dd')) {
                    categoryId = $dl.find('dt span').attr('id');
                    if (self.searchBox.searchItem(categoryId)) {
                        return;
                    }
                }
                // 可以添加
                var html = Mustache.to_html(templateStr, {
                    id: $(this).attr('id'),
                    text: $(this).text()
                });
                self.searchBox.addSearchItem($(this).attr('id'), html);
            });
            this.$productSelectContainer.find('.select-all').click(function () {
                var n = 0, $currentSubContent = $(this).closest('.sub-content');
                $currentSubContent.find('span.item').each(function (index, element) {
                    var itemId = $(element).attr('id');
                    if (self.searchBox.searchItem(itemId)) {
                        self.searchBox.deleteSearchItem(itemId);
                    }
                });
                var t = $currentSubContent;
                while (t.prev().length != 0) {
                    n++;
                    t = t.prev();
                }
                var $categoryMenuA = $categoryMenuList.find('li').eq(n).find('a');
                if (self.searchBox.searchItem($categoryMenuA.attr('id'))) {
                    return;
                }
                var html = Mustache.to_html(templateStr, {
                    id: $categoryMenuA.attr('id'),
                    text: $categoryMenuA.text()
                });
                self.searchBox.addSearchItem($categoryMenuA.attr('id'), html);
            });
        }
    };

    var searchBox = new SearchBox($searchCondition, $searchMenuList);
    var productSelectBox = new ProductSelectBox($searchMenuList, searchBox);

});
