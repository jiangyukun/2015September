function Brand($container, productManage) {
    this.$container = $container;
    this.productManage = productManage;
    this.$brandItems = this.$container.find('.brand-items');
    this.$brandItemAll = this.$brandItems.find('#brand-item-all');
    this.$more = this.$container.find('.brand-more');
    this.$confirmBtn = this.$container.find('.brand-confirm-btn .btn');

    this._brandItemTemplate = _.template($('#brandItemTemplate').text());
    this.brandItemList = [];
    this.brandItemAll = new BrandItem(this.$brandItemAll.attr('id'), this.$brandItemAll.text(), 'all', this);
    this.current = null;
    this.listenerList = [];
    this.init();
}

Brand.prototype = {
    constructor: Brand,
    init: function () {
        var i, self = this;
        self.brandItemList.push(this.brandItemAll);
        this.$more.click(function () {
            for (i = self.current; i < self.brandItems.length; i++) {
                var brandItem = self.brandItems[i];
                self.$brandItems.append(self._brandItemTemplate({
                    brandItemId: brandItem.id,
                    text: brandItem.text
                }));
                self.brandItemList.push(new BrandItem(brandItem.id, brandItem.text, 'item', self));
            }
            self.$more.hide();
        });
        this.$confirmBtn.click(function () {
            var productInfo = self.productManage.getProductInfo();
            for (i = 0; i < self.listenerList.length; i++) {
                var listener = self.listenerList[i];
                listener(productInfo);
            }
        });
    },
    addListener: function (listener) {
        this.listenerList.push(listener);
    },
    reset: function () {
        this.$container.hide();
        this.$more.hide();
        this.brandItemAll.reset();
        this.brandItemList = [];
        this.brandItemList.push(this.brandItemAll);
        this.$brandItems.children(':not(:first)').remove();
    },
    refreshBrand: function (brandItems) {
        var i, top = null, row = 0;
        this.reset();
        this.$container.show();
        this.brandItems = brandItems;

        for (i = 0; i < brandItems.length; i++) {
            var item = brandItems[i];
            this.$brandItems.append(this._brandItemTemplate({brandItemId: item.id, text: item.text}));
            var $brandItem = $('#' + item.id);
            if (top != $brandItem.position().top) {
                top = $brandItem.position().top;
                row++;
            }
            if (row <= 3) {
                this.brandItemList.push(new BrandItem(item.id, item.text, 'item', this));
            } else {
                $brandItem.remove();
                this.$more.show();
                this.current = i;
                break;
            }
        }
    },
    show: function () {
        this.$container.show();
    },
    hide: function () {
        this.$container.hide();
    },
    getSelectedBrand: function () {
        var brandList = [];
        $.each(this.brandItemList, function (index, brandItem) {
            if (brandItem.isSelected) {
                brandList.push(brandItem.id);
            }
        });
        return brandList;
    }
};