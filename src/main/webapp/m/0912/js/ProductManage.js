_.templateSettings = {
    interpolate: /\[\[(.+?)]]/g
};

$(function () {
    var $searchCondition = $('.search-condition');
    var $searchMenuList = $('.search-menu-list');

    function ProductManage($container, searchBox) {
        this.$container = $container;
        this.searchBox = searchBox;
        this.init();
    }

    ProductManage.prototype = {
        constructor: ProductManage,
        init: function () {
            var self = this;

            var allProduct = new AllProduct(this.$container.find('ul'), this.$container.find('.content'), this.searchBox);
            this.$container.hide();
            this.$container.find('input[type=radio]').uniform();
            this.$container.find('.content').find('.sub-content:not(:first)').hide();

            this.searchBox.addListener(function () {
                self.$container.show();
            });
            this.$container.find('.close-container').click(function () {
                self.$container.hide();
            });
        },
        setSearchProductChanged: function (callback) {
            this.searchBox.addListener(callback, 'searchProductChanged');
        }
    };

    var searchBox = new SearchBox($searchCondition, $searchMenuList);
    var productManage = new ProductManage($searchMenuList, searchBox);

    // 品牌回调
    productManage.setSearchProductChanged(function (id, text) {
        var brandItems = [];
        brandItems.push({
            id: '__brandItem_all',
            text: '全部'
        });
        for (var i = 0; i < 40; i++) {
            brandItems.push({
                id: '__brandItem_' + id + i,
                text: text + i
            })
        }
        return brandItems;
    });
});
