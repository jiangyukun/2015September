function ProductManage($productContainer, $searchCondition) {
    this.$container = $productContainer;
    this.$allCategory = this.$container.find('.search-menu-list');
    this.$content = this.$container.find('.content');
    this.$searchContainer = this.$container.find('.search-condition');
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

        var autoAdjustProductSelect = function () {
            self.$allCategory.css({
                top: self.$searchContainer.outerHeight(true) + 3
            });
        };
        new AllCategory(this.$allCategory, this);
        this.$btnArea.click(function () {
            self.changeState();
            return false;
        });
        this.$container.find('.close-container').click(function () {
            self.close();
        });

        this.searchBox.on('productSelected', function () {
            autoAdjustProductSelect();
        });
        this.searchBox.on('productDeSelected', function () {
            autoAdjustProductSelect();
        });
        this.$selectCaption.click(function () {
            self.changeState();
            return false;
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
        if (type === 'brand') {
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
        if (this.searchBox.smallCategoryList.length == 0) {
            this.$btnArea.show();
            this.$selectedProductArea.hide();
            this.$searchContainer.css({display: 'inline-block'});
        }
        this.$selectCaption.removeClass('glyphicon-remove').addClass('glyphicon-plus');
        this.triggerListener('close');
    },
    open: function () {
        this.opened = true;
        this.brand.hide();
        this.$allCategory.show();
        this.$selectCaption.removeClass('glyphicon-plus').addClass('glyphicon-remove');
        this.$btnArea.hide();
        this.$selectedProductArea.show();
        this.$searchContainer.css({display: 'block'});
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
