function ProductManage($productContainer, $searchCondition) {
    this.$container = $productContainer;
    this.$allCategory = this.$container.find('.search-menu-list');
    this.$content = this.$container.find('.content');
    this.$btnArea = this.$container.find('.btn-tip');
    this.$selectedProductArea = this.$container.find('#selectedProducts');
    this.$selectCaption = this.$selectedProductArea.find('#selectCaption');

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
        this.$btnArea.click(function () {
            if (self.opened) {
                self.close();
                return;
            }
            self.open();
            return false;
        });
        this.$container.find('.close-container').click(function () {
            self.close();
        });
        this.$selectedProductArea.click(function () {
            self.changeState();
            return false;
        });
        this.searchBox.on('productSelected', function () {
            self.$btnArea.hide();
            self.$selectedProductArea.show();
        });
        this.searchBox.on('productIsEmpty', function () {
            self.$btnArea.show();
            self.$selectedProductArea.hide();
        });
        this.$allCategory.click(function () {
            return false;
        });
        $('html').click(function () {
            if (self.opened) {
                self.close();
            }
        });
    },
    // open, close, brand, all
    addListener: function (type, listener) {
        if (type === 'selectBrand') {
            this.brand.on('selectBrand', listener);
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
    close: function () {
        this.opened = false;
        this.$allCategory.hide();
        if (this.searchBox.currentSmallCategoryItemId) {
            this.brand.show();
        } else {
            this.brand.reset();
        }
        this.$selectCaption.text('重选');
        this.triggerListener('close');
    },
    open: function () {
        this.opened = true;
        this.brand.hide();
        this.$allCategory.show();
        this.$selectCaption.text('确定');
        this.triggerListener('open');
    },
    changeState: function () {
        if (this.opened) {
            this.close();
            return;
        }
        this.open();
    },
    addSmallCategoryItem: function (smallCategoryId, item) {
        this.searchBox.addSmallCategoryItem(smallCategoryId, item);
    },
    removeSmallCategoryItem: function (smallCategoryId, item) {
        this.searchBox.removeSmallCategoryItem(smallCategoryId, item);
    },
    brandCallback: function (callback) {
        this.searchBox.brandCallback(callback);
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
