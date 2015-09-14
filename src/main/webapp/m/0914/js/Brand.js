function Brand($container) {
    this.$container = $container;
    this.$brandItems = this.$container.find('.brand-items');
    this.$more = this.$container.find('.brand-more');
    this._brandItemTemplate = _.template($('#brandItemTemplate').text());
    this.brandItemList = [];
    this.current = null;
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
                self.brandItemList.push(new BrandItem(brandItem.id, brandItem.text, $('#' + brandItem.id)));
            }
            self.$more.hide();
        });
    },
    refreshBrand: function (brandItems) {
        var i, top = null, row = 0, self = this;
        this.$more.hide();
        this.$brandItems.children().remove();
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
            if (row > 3) {
                $brandItem.remove();
                this.$more.show();
                self.current = i;
                break;
            } else {
                var brandItem = new BrandItem(item.id, item.text, $brandItem);
                this.brandItemList.push(brandItem);
            }
        }
    },
    show: function () {
        this.$container.show();
    },
    hide: function () {
        this.$container.hide();
    }
};