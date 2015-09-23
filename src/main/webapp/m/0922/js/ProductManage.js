function ProductManage($productContainer, $searchCondition) {
    this.$container = $productContainer;
    this.$allCategory = this.$container.find('.search-menu-list');
    this.$content = this.$container.find('.content');
    this.$btnArea = this.$container.find('.item-container');
    this.$selectBrandArea = this.$container.find('.select-brand-tip');
    this.$selectBrandBtn = this.$container.find('.select-brand-tip span');
    this.$emptyProductTip = this.$container.find('.empty-product-item-tip');
    this._brandItemTemplate = _.template($('#selectedBrandTemplate').html());

    this.opened = false;
    this.listenerList = [];

    this.brand = new Brand($('.product-brand'), this);
    this.searchBox = new SearchBox($searchCondition, this);
    this._brandCallback = null;
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
            self.changeState();
        });
        this.$container.find('.close-container').click(function () {
            self.close();
        });
        this.$selectBrandArea.click(function () {
            var item = self.searchBox.item, brandItems;
            if (!item) {
                self.$emptyProductTip.show();
            } else {
                if (self.brand.isOpened) {
                    self.brand.hide();
                } else {
                    self.$emptyProductTip.hide();
                    brandItems = self._brandCallback(item.id, item.text);
                    self.brand.refreshBrand(brandItems);
                }
            }
        });
        this.$emptyProductTip.click(function () {
            self.$emptyProductTip.hide();
        });
        this.searchBox.addListener(function (item) {
            self.$selectBrandArea.find(':not(:first)').remove();
            self.$selectBrandBtn.show();
            self.brand.hide();
        });
        this.brand.addListener(function (brandItem) {
            if (!brandItem) {
                self.$selectBrandArea.show();
            } else {
                var brandItemHtml = self._brandItemTemplate({
                    selectedBrandItemId: brandItem.id,
                    selectedBrandItemName: brandItem.text
                });
                self.$selectBrandArea.find(':not(:first)').remove();
                self.$selectBrandArea.append(brandItemHtml);
                var selectedBrandItem = self.$selectBrandArea.find('span[data-id="' + brandItem.id + '"]');
                selectedBrandItem.click(function () {
                    self.brand.show();
                });
                self.$selectBrandBtn.hide();
            }
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
    close: function () {
        var self = this;
        self.opened = false;
        self.$allCategory.hide();

        self.triggerListener('close');
    },
    open: function () {
        var self = this;
        self.opened = true;
        self.triggerListener('open');
        self.$allCategory.show();
    },
    changeState: function () {
        if (this.opened) {
            this.close();
            return;
        }
        this.open();
    },
    addProductItem: function (item) {
        this.searchBox.addItem(item);
    },
    removeProductItem: function () {
        this.searchBox.removeItem();
    },
    brandCallback: function (callback) {
        this._brandCallback = callback;
    },
    getProductInfo: function () {
        return {
            selectProduct: this.searchBox.getSelectedProduct(),
            selectedBrand: this.brand.getSelectedBrand()
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
