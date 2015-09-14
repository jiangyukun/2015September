function BrandItem(id, text, $brandItem) {
    this.id = id;
    this.text = text;
    this.$brandItem = $brandItem;
    this.selected = false;
    this.className = 'brand-item-clicked';
    this.init();
}

BrandItem.prototype = {
    constructor: BrandItem,
    init: function () {
        var self = this;
        this.$brandItem.click(function () {
            if (self.selected) {
                self.$brandItem.removeClass(self.className);
            } else {
                self.$brandItem.addClass(self.className);
            }
            self.selected = !self.selected;
        });
    }
};