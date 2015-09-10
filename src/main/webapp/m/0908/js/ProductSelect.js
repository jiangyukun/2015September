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

_.templateSettings = {
    interpolate: /\[\[(.+?)]]/g
};

$(function () {
    var $searchCondition = $('.search-condition');
    var $searchMenuList = $('.search-menu-list');

    function ProductSelectBox($container, searchBox) {
        this.$container = $container;
        this.searchBox = searchBox;
        this.init();
    }

    ProductSelectBox.prototype = {
        constructor: ProductSelectBox,
        init: function () {
            var self = this;
            this.searchBox.registerListener('add', function (id) {
                $('#' + id).addClass('selected');
            });
            this.searchBox.registerListener('addAreaClick', function () {
                self.$container.show();
            });
            this.searchBox.registerListener('remove', function (id) {
                var $correspondItem = $('#' + id);
                if ($correspondItem.is('span')) {
                    $correspondItem.removeClass('selected');
                } else if ($correspondItem.is('a')) {
                    $('#' + id + '_all').parent().removeClass('checked');
                }
            });
            this.$container.find('.close-container').click(function () {
                self.$container.hide();
            });
            this.$container.find('input[type=radio]').uniform();
            this.$container.find('.content').find('.sub-content:not(:first)').hide();
            this.productCategoryId = this.$container.find('ul li:first a').attr('id');
            // 左侧大分类
            this.$container.find('ul li').click(function () {
                var n = 0;
                var $current = $(this);
                self.productCategoryId = $current.find('a').attr('id');
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
            this.$container.find('.item').click(function () {
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
                self.searchBox.addSearchItem($(this).attr('id'), $(this).text());
            });
            // 全部radio
            this.$container.find('.select-all').click(function () {
                var n = 0, $currentSubContent = $(this).closest('.sub-content');
                $currentSubContent.find('span.item').each(function (index, element) {
                    var itemId = $(element).attr('id');
                    if (self.searchBox.searchItem(itemId)) {
                        self.searchBox.deleteSearchItem(itemId);
                    }
                });
                if (self.searchBox.searchItem(self.productCategoryId)) {
                    return;
                }
                self.searchBox.addSearchItem(self.productCategoryId, $('#' + self.productCategoryId).text());
            });
        }
    };

    var searchBox = new SearchBox($searchCondition, $searchMenuList);
    var productSelectBox = new ProductSelectBox($searchMenuList, searchBox);

});
