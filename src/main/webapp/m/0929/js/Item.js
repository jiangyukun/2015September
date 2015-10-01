function Item(smallCategory, $span) {
    this.smallCategory = smallCategory;
    this.$item = $span;
    this.secondSetFlag = false;

    this.id =  this.$item.find('span').attr('id');
    this.text = this.$item.find('span').text();
    this.selectable = true;
    this.init();
}

Item.prototype = {
    constructor: Item,
    init: function () {
        var self = this;
        this.$item.click(function () {
            self.click();
        });
    },
    click: function () {
        if (this.selectable) {
            this.$item.find('span').addClass('selected');
        }
        this.secondSetFlag = true;
        this.smallCategory.itemClicked(this);
        this.secondSetFlag = false;
        this.selectable = !this.selectable;
    },
    remove: function () {
        if (!this.secondSetFlag) {
            this.selectable = true;
        }
        this.$item.find('span').removeClass('selected');
    },
    getId: function () {
        return this.id;
    }
};
