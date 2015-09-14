function SearchBox($container) {
    this.$container = $container;
    this.$appendContainer = $('.small-category-container');
    this.smallCategoryList = [];
    this.addAreaClickedListener = [];
    this.smallCategoryItemChangedListener = null;
    this.uid = 1;
    this.currentSmallCategoryItemId = null;
    this.init();
}

SearchBox.prototype = {
    constructor: SearchBox,
    init: function () {
    },
    addListener: function (listener, type) {
        if (type == 'searchProductChanged') {
            this.smallCategoryItemChangedListener = listener;
        }
        this.addAreaClickedListener.push(listener);
    },
    addSmallCategory: function (smallCategory) {
        var id = smallCategory.id, html = smallCategory.html;
        this.$appendContainer.append(html);
        var $container = this.$appendContainer.find('#' + id);
        this.smallCategoryList.push({
            id: smallCategory.id,
            itemList: [],
            $container: $container,
            $itemContainer: $container.find('.item-container')
        });
    },
    getSmallCategory: function (smallCategoryId) {
        var sc = null;
        $.each(this.smallCategoryList, function (index, smallCategory) {
            if (smallCategory.id == smallCategoryId) {
                sc = smallCategory;
                return true;
            }
        });
        return sc;
    },
    addSmallCategoryItem: function (smallCategoryId, item) {
        var self = this;
        $.each(this.smallCategoryList, function (index, smallCategory) {
            if (smallCategory.id == smallCategoryId) {
                smallCategory.itemList.push(item);
                smallCategory.$itemContainer.append(item.html);
                var $item = smallCategory.$itemContainer.find('#' + item.id);
                $item.click(function () {
                    self.itemClick(item.id, item.text);
                });
            }
        });
    },
    removeSmallCategoryItem: function (smallCategoryId, item) {
        var emptySmallCategory = false, current, self = this;
        $.each(this.smallCategoryList, function (index, smallCategory) {
            if (smallCategory.id == smallCategoryId) {
                current = index;
                item.remove();
                smallCategory.$container.find('#' + item.id).remove();
                $.each(smallCategory.itemList, function (index, exitItem) {
                    if (exitItem.id == item.id) {
                        smallCategory.itemList = smallCategory.itemList.slice(0, index).
                            concat(smallCategory.itemList.slice(index + 1, smallCategory.itemList.length));
                    }
                });
                if (smallCategory.itemList.length == 0) {
                    emptySmallCategory = true;
                    smallCategory.$container.remove();
                }
                if (self.currentSmallCategoryItemId == item.id) {
                    self.currentSmallCategoryItemId = null;
                }
            }
        });
        if (emptySmallCategory) {
            this.smallCategoryList = this.smallCategoryList.slice(0, current).
                concat(this.smallCategoryList.slice(current + 1, this.smallCategoryList.length));
        }
    },
    itemClick: function (itemId, itemText) {
        var i, j, self = this, brandItems;
        for (i = 0; i < this.smallCategoryList.length; i++) {
            var smallCategory = this.smallCategoryList[i];
            var itemList = smallCategory.itemList;
            var beforeSmallCategoryItemId = self.currentSmallCategoryItemId;
            for (j = 0; j < itemList.length; j++) {
                var item = itemList[j];
                var $item = self.$appendContainer.find('#' + item.id);
                if (item.id == itemId) {
                    if (self.productManage.opened) {
                        self.removeSmallCategoryItem(smallCategory.id, item);
                        $item.remove();
                        return;
                    }
                    if ($item.hasClass('search-container-item-clicked')) {
                        self.currentSmallCategoryItemId = null;
                        $item.removeClass('search-container-item-clicked');
                    } else {
                        $item.addClass('search-container-item-clicked');
                        self.currentSmallCategoryItemId = itemId;
                    }
                } else if (item.id != beforeSmallCategoryItemId || !self.productManage.opened) {
                    $item.removeClass('search-container-item-clicked');
                }
            }
        }
        if (this.currentSmallCategoryItemId != null) {
            if (typeof this.smallCategoryItemChangedListener == 'function') {
                brandItems = this.smallCategoryItemChangedListener(itemId, itemText);
                if (!brandItems.length) return;
                this.productManage.brand.refreshBrand(brandItems);
            }
        } else {
            this.productManage.brand.hide();
        }
    },
    uuid: function () {
        try {
            return '__common_' + this.uid;
        } finally {
            this.uid++;
        }
    }
};
