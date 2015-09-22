function SearchBox($container, productManage) {
    this.$container = $container;
    this.productManage = productManage;
    this.$appendContainer = $('.item-container');
    this.$defaultTip = this.$appendContainer.find('.addTip');
    this._itemTemplate = _.template($('#itemTemplate').html());
    this.item = null;
    this.init();
}

SearchBox.prototype = {
    constructor: SearchBox,
    init: function () {

    },
    addItem: function (item) {
        var self = this;
        this.$defaultTip.hide();
        if (this.item) {
            this.item.remove();
            this.$appendContainer.children(':not(:first)').remove();
        }
        item._internalId = '__item_' + item.id;

        this.$appendContainer.append(this._itemTemplate({
            itemId: item._internalId,
            text: item.text
        }));
        var $item = this.$appendContainer.find('#' + item._internalId);
        $item.click(function () {
            self.productManage.changeState();
        });
        this.item = item;
    },
    removeItem: function () {
        this.$appendContainer.children(':not(:first)').remove();
        this.$defaultTip.show();
        this.item = null;
    }
};
