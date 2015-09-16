function BrandItem(id, text, type, brand) {
    this.id = id;
    this.text = text;
    this.type = type;
    this.brand = brand;
    this.$brandItem = brand.$brandItems.find('#' + id);
    this.isSelected = false;
    this.className = 'brand-item-clicked';
    this.init();
}

BrandItem.prototype = {
    constructor: BrandItem,
    init: function () {
        var self = this;
        this.$brandItem.click(function () {
            if (self.isSelected) {
                self.$brandItem.removeClass(self.className);
            } else {
                if (self.type == 'all') {
                    $.each(self.brand.brandItemList, function (index, brandItem) {
                        if (brandItem != self) {
                            brandItem.reset();
                        }
                    });
                } else if (self.type == 'item') {
                    self.brand.brandItemList[0].reset();
                }
                self.$brandItem.addClass(self.className);
            }
            self.isSelected = !self.isSelected;
        });
    },
    reset: function () {
        this.isSelected = false;
        this.$brandItem.removeClass(this.className);
    }
};