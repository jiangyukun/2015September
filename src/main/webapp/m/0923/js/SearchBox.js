function SearchBox($container, productManage) {
    this.$container = $container;
    this.productManage = productManage;
    this.$appendContainer = $('.item-container');
    this.$defaultTip = this.$appendContainer.find('.addTip');
    this._itemTemplate = _.template($('#itemTemplate').html());
    this.item = null;

    this.listenerList = [];
    this.init();
}

SearchBox.prototype = {
    constructor: SearchBox,
    init: function () {
    },
    addItem: function (item) {
        var self = this;
        this.$defaultTip.hide();
        this._remove();
        item._internalId = '__item_' + item.id;

        this.$appendContainer.append(this._itemTemplate({
            itemId: item._internalId,
            text: item.text
        }));
        var $item = this.$appendContainer.find('#' + item._internalId);
        this.item = item;
        this.trigger();
    },
    removeItem: function () {
        this.$defaultTip.show();
        this._remove();
        this.trigger();
    },
    _remove: function () {
        this.$appendContainer.children(':not(:first)').remove();
        if (this.item) {
            this.item.remove();
        }
        this.item = null;
    },
    addListener: function (listener) {
        this.listenerList.push(listener);
    },
    trigger: function () {
        var i;
        for (i = 0; i < this.listenerList.length; i++) {
            var listener = this.listenerList[i];
            listener(this.item);
        }
    },
    getSelectedProduct: function () {
        return this.item ? this.item.id : null;
    }
};
