function ProductManage($productContainer, $searchCondition) {
    this.$container = $productContainer;
    this.$allCategory = this.$container.find('.search-menu-list');
    this.$content = this.$container.find('.content');
    this.$btnArea = this.$container.find('.btn-tip');

    this.opened = false;
    this.listenerList = [];

    this.brand = new Brand($('.product-brand'), this);
    this.searchBox = new SearchBox($searchCondition, this);
    this.init();
}

ProductManage.prototype = {
    constructor: ProductManage,
    uid: 0,
    init: function () {
        var self = this;

        new AllCategory(this.$allCategory.find('ul'), this.$allCategory.find('.content'), this);
        this.$allCategory.hide();
        this.$allCategory.find('.content').find('.sub-content:not(:first)').hide();

        var close = function () {
            self.opened = false;
            self.$allCategory.hide();
            if (self.searchBox.smallCategoryList.length == 0) {
                self.searchBox.$appendContainer.hide();
            }
            self.changeClickTip();
            if (self.searchBox.currentSmallCategoryItemId) {
                self.brand.show();
            } else {
                self.brand.reset();
            }
            self.triggerListener('close');
        };

        this.$btnArea.click(function () {
            if (self.opened) {
                close();
                return;
            }
            self.opened = true;
            self.triggerListener('open');
            self.brand.hide();
            self.searchBox.$appendContainer.show();
            self.$allCategory.show();
        });
        this.$container.find('.close-container').click(function () {
            close();
        });
    },
    // open, close, brand, all
    addListener: function (type, listener) {
        if (type === 'brand') {
            this.brand.addListener(listener);
            return;
        }
        this.listenerList.push({
            type: type,
            callback: listener
        });
    },
    triggerListener: function (type) {
        var i;
        for (i = 0; i < this.listenerList.length; i++) {
            var listener = this.listenerList[i];
            if (type === 'all' || listener.type === type) {
                listener.callback(this.getProductInfo());
            }
        }
    },
    addSmallCategoryItem: function (smallCategoryId, item) {
        this.searchBox.addSmallCategoryItem(smallCategoryId, item);
    },
    removeSmallCategoryItem: function (smallCategoryId, item) {
        this.searchBox.removeSmallCategoryItem(smallCategoryId, item);
    },
    changeClickTip: function () {
        if (this.searchBox.smallCategoryList.length != 0) {
            this.$btnArea.find('.addTip').text('点此增减商品名称');
        } else {
            this.$btnArea.find('.addTip').text('点此添加商品名称');
        }
    },
    brandCallback: function (callback) {
        this.searchBox.addListener(callback, 'brand');
    },
    getProductInfo: function () {
        return {
            selectProduct: this.searchBox.getSelectedProduct(),
            selectedBrand: this.brand.getSelectedBrand(),
            smallCategoryId: this.searchBox.currentSmallCategoryItemId
        }
    },
    uuid: function () {
        try {
            return '__common_' + this.uid;
        } finally {
            this.uid++;
        }
    }
};
