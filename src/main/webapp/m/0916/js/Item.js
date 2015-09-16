function Item(smallCategory, $span) {
    this.smallCategory = smallCategory;
    this.$item = $span;
    this.secondSetFlag = false;

    this.originalId = this.$item.find('span').attr('id');
    this.id = '__item_' + this.originalId;
    this.text = this.$item.find('span').text();
    this.selectable = true;
    this.init();
}

Item.prototype = {
    constructor: Item,
    init: function () {
        var self = this;
        this.$item.click(function () {
            if (self.selectable) {
                self.$item.find('span').addClass('selected');
            }
            self.secondSetFlag = true;
            self.smallCategory.itemClicked(self);
            self.secondSetFlag = false;
            self.selectable = !self.selectable;
        });
    },
    remove: function () {
        if (!this.secondSetFlag) {
            this.selectable = true;
        }
        this.$item.find('span').removeClass('selected');
    },
    getId: function () {
        return this.originalId;
    }
};
