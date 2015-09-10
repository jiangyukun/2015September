function SearchBox($container) {
    this.$container = $container;
    this.$addArea = this.$container.find('.btn-tip');
    this.$itemList = [];
    this.itemAddedListener = [];
    this.itemRemovedListener = [];
    this.addAreaClickedListener = [];
    this._searchItemTemplate = _.template($('#template1').text());
    this.init();
}

SearchBox.prototype = {
    constructor: SearchBox,
    init: function () {
        var i, self = this;
        this.$addArea.click(function () {
            for (i = 0; i < self.addAreaClickedListener.length; i++) {
                self.addAreaClickedListener[i]();
            }
        });
    },
    registerListener: function (type, listener) {
        if (type == 'add') {
            this.itemAddedListener.push(listener);
        } else if (type == 'remove') {
            this.itemRemovedListener.push(listener);
        } else if (type == 'addAreaClick') {
            this.addAreaClickedListener.push(listener);
        }
    },
    addSearchItem: function (id, text) {
        var i, self = this;
        var htmlStr = this._searchItemTemplate({id: id, text: text});
        this.$addArea.before(htmlStr);
        var $item = this.$container.find('span[data-id=' + id + ']').parent();
        this.$itemList.push($item);
        $item.find('.remove-btn').click(function () {
            self.deleteSearchItem($(this).prev().data('id'));
        });
        for (i = 0; i < self.itemAddedListener.length; i++) {
            var listener = self.itemAddedListener[i];
            if (typeof listener === 'function') {
                listener($item.find('span').data('id'));
            }
        }
    },
    deleteSearchItem: function (id) {
        var i, j, $item, listener;
        for (i = 0; i < this.$itemList.length; i++) {
            $item = this.$itemList[i];
            if ($item.find('span').data('id') == id) {
                for (j = 0; j < this.itemRemovedListener.length; j++) {
                    listener = this.itemRemovedListener[j];
                    if (typeof listener === 'function') {
                        listener(id);
                    }
                }
                $item.remove();
                this.$itemList = this.$itemList.slice(0, i).concat(this.$itemList.slice(i + 1, this.$itemList.length));
            }
        }
    },
    searchItem: function (id) {
        var i, $item;
        for (i = 0; i < this.$itemList.length; i++) {
            $item = this.$itemList[i];
            if ($item.find('span').data('id') == id) {
                return true;
            }
        }
        return false;
    }
};
