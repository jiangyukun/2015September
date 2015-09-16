function Item(smallCategory, $span, searchBox) {
    this.smallCategory = smallCategory;
    this.$item = $span;
    this.searchBox = searchBox;
    this._template = _.template($('#itemTemplate').text());

    this.originalId = this.$item.find('span').attr('id');
    this.id = '__item_' + this.originalId;
    this.text = this.$item.find('span').text();
    this.selectable = true;
    this.secondSetFlag = false;
    this.init();
}

Item.prototype = {
    constructor: Item,
    init: function () {
        var self = this;
        this.html = this._template({
            itemId: this.id,
            text: this.text
        });
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
