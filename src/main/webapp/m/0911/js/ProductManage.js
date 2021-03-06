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

            var allProduct = new AllProduct(this.$container.find('ul'), this.$container.find('.content'), this.searchBox);
            this.$container.hide();
            this.$container.find('input[type=radio]').uniform();
            this.$container.find('.content').find('.sub-content:not(:first)').hide();

            /*this.searchBox.registerListener('add', function (id) {
                $('#' + id).addClass('selected');
            });
            this.searchBox.registerListener('remove', function (id) {
                var $correspondItem = $('#' + id);
                if ($correspondItem.is('span')) {
                    $correspondItem.removeClass('selected');
                } else if ($correspondItem.is('a')) {
                    $('#' + id + '_all').parent().removeClass('checked');
                }
            });*/

            this.searchBox.registerListener('addAreaClick', function () {
                self.$container.show();
                allProduct.refresh();
            });
            this.$container.find('.close-container').click(function () {
                self.$container.hide();
            });
        }
    };

    var searchBox = new SearchBox($searchCondition, $searchMenuList);
    new ProductSelectBox($searchMenuList, searchBox);

});
