function SearchBox($searchContainer, $productSelectContainer) {
    this.$searchContainer = $searchContainer;
    this.$productSelectContainer = $productSelectContainer;
    this.$addArea = this.$searchContainer.find('.btn-tip');
    this.$itemList = [];
    this.itemAddedListener = [];
    this.itemRemovedListener = [];
    this.init();
}

SearchBox.prototype = {
    constructor: SearchBox,
    init: function () {
        var self = this;
        this.$addArea.click(function () {
            self.$productSelectContainer.show();
        });
    },
    registerListener: function (type, listener) {
        if (type == 'add') {
            this.itemAddedListener.push(listener);
        } else if (type == 'remove') {
            this.itemRemovedListener.push(listener);
        }
    },
    triggerRemove: function (id) {
        var i, listener;
        for (i = 0; i < this.itemRemovedListener.length; i++) {
            listener = this.itemRemovedListener[i];
            if (typeof listener === 'function') {
                listener(id);
            }
        }
    },
    addSearchItem: function (id, htmlStr) {
        var i, self = this;
        this.$addArea.before(htmlStr);
        var $item = this.$searchContainer.find('span[data-id=' + id + ']').parent();
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
        var i, $item;
        for (i = 0; i < this.$itemList.length; i++) {
            $item = this.$itemList[i];
            if ($item.find('span').data('id') == id) {
                this.triggerRemove(id);
                $item.remove();
                this.$itemList = this.$itemList.slice(0, i).concat(this.$itemList.slice(i + 1, this.$itemList.length));
            }
        }
    },
    searchItem: function (id) {
        var i, $item;
        for (i = 0; i < this.$itemList.length; i++) {
            $item = this.$itemList[i];
            if ($item.find('span').data('id')== id) {
                return true;
            }
        }
        return false;
    }
};
