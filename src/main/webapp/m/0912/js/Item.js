function Item(smallCategory, $span, searchBox) {
    this.smallCategory = smallCategory;
    this.$item = $span;
    this.searchBox = searchBox;
    this._template = _.template($('#itemTemplate').text());
    this.id = '__item_' + this.$item.find('span').attr('id');
    this.text = this.$item.find('span').text();
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
            self.$item.find('span').addClass('selected');
            self.smallCategory.itemClicked(self);
        });
    },
    remove: function () {
        this.$item.find('span').removeClass('selected');
    }
};
