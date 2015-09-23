function Brand($container, productManage) {
    this.$container = $container;
    this.productManage = productManage;
    this.$brandItems = this.$container.find('.brand-items');
    this.$more = this.$container.find('.brand-more');

    this._brandItemTemplate = _.template($('#brandItemTemplate').html());

    this.isOpened = false;
    this.brandItemList = [];
    this.current = null;
    this.currentSelectedBrand = null;
    this.listenerList = [];
    this.init();
}

Brand.prototype = {
    constructor: Brand,
    init: function () {
        var i, self = this;
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
    },
    addListener: function (listener) {
        this.listenerList.push(listener);
    },
    reset: function () {
        this.hide();
        this.$more.hide();
        this.brandItemList = [];
        this.$brandItems.children().remove();
    },
    select: function () {
        var i;
        for (i = 0; i < this.listenerList.length; i++) {
            var listener = this.listenerList[i];
            listener(this.currentSelectedBrand);
        }
        this.hide();
    },
    refreshBrand: function (brandItems) {
        var i, top = null, row = 0;
        this.reset();
        this.show();
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
        this.isOpened = true;
        this.$container.show();
    },
    hide: function () {
        this.isOpened = false;
        this.$container.hide();
    },
    getSelectedBrand: function () {
        return this.currentSelectedBrand ? this.currentSelectedBrand.id : null;
    }
};