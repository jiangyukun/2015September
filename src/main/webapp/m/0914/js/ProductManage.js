function ProductManage($productContainer, $searchCondition) {
    this.$container = $productContainer;
    this.$allCategory = this.$container.find('.search-menu-list');
    this.$content = this.$container.find('.content');
    this.$btnArea = this.$container.find('.btn-tip');
    this.searchBox = new SearchBox($searchCondition, $productContainer);
    this.searchBox.productManage = this;

    this.opened = false;
    this.brand = new Brand($('.product-brand'));

    this.init();
}

ProductManage.prototype = {
    constructor: ProductManage,
    init: function () {
        var self = this;

        new AllProduct(this.$allCategory.find('ul'), this.$allCategory.find('.content'), this.searchBox);
        this.$allCategory.hide();
        this.$allCategory.find('.content').find('.sub-content:not(:first)').hide();

        this.$btnArea.click(function () {
            self.opened = true;
            self.brand.hide();
            self.searchBox.$appendContainer.show();
            self.$allCategory.show();
        });
        this.$container.find('.close-container').click(function () {
            self.opened = false;
            self.$allCategory.hide();
            if (self.searchBox.smallCategoryList.length == 0) {
                self.searchBox.$appendContainer.hide();
            }
            self.changeClickTip();
            if (self.searchBox.currentSmallCategoryItemId) {
                self.brand.show();
            }
        });
    },
    changeClickTip: function () {
        if (this.searchBox.smallCategoryList.length != 0) {
            this.$btnArea.find('.addTip').text('点此增减商品名称');
        } else {
            this.$btnArea.find('.addTip').text('点此添加商品名称');
        }
    },
    brandCallback: function (callback) {
        this.searchBox.addListener(callback, 'searchProductChanged');
    }
};
