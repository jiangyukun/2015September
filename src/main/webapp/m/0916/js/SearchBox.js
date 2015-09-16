function SearchBox($container, productManage) {
    this.$container = $container;
    this.productManage = productManage;
    this.$appendContainer = $('.small-category-container');
    this.smallCategoryList = [];
    this.brandListener = null;
    this.uid = 1;
    this.currentSmallCategoryItemId = null;
    this.init();
}

SearchBox.prototype = {
    constructor: SearchBox,
    init: function () {
        var self = this;
        this.productManage.addListener('open', function () {
            $.each(self.smallCategoryList, function (index, smallCategory) {
                smallCategory.$container.find('.small-category-text').addClass('clickable');
            });
        });
        this.productManage.addListener('close', function () {
            $.each(self.smallCategoryList, function (index, smallCategory) {
                smallCategory.$container.find('.small-category-text').removeClass('clickable');
            });
        });
    },
    addListener: function (listener, type) {
        if (type == 'brand') {
            this.brandListener = listener;
        }
    },
    addSmallCategory: function (smallCategory) {
        var id = smallCategory.id, html = smallCategory.html, self = this;
        this.$appendContainer.append(html);
        var $container = this.$appendContainer.find('#' + id);
        $container.find('.small-category-text').click(function () {
            if (self.productManage.opened) {
                self.removeSmallCategory(smallCategory.id);
            }
        });
        this.smallCategoryList.push({
            id: smallCategory.id,
            itemList: [],
            $container: $container,
            $itemContainer: $container.find('.item-container')
        });
    },
    removeSmallCategory: function (smallCategoryId) {
        var self = this;
        var smallCategory = this.getSmallCategory(smallCategoryId);
        smallCategory.$container.remove();
        $.each(smallCategory.itemList, function (index, item) {
            self.removeSmallCategoryItem(smallCategoryId, item);
        });
        this.smallCategoryList = arrayUtil.removeElement(self.smallCategoryList, smallCategory);
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
        var smallCategory = this.getSmallCategory(smallCategoryId);
        smallCategory.itemList.push(item);
        smallCategory.$itemContainer.append(item.html);
        var $item = smallCategory.$itemContainer.find('#' + item.id);
        $item.click(function () {
            self.itemClick(smallCategoryId, item.id, item.text);
        });
    },
    removeSmallCategoryItem: function (smallCategoryId, item) {
        var emptySmallCategory = false, self = this;
        var smallCategory = this.getSmallCategory(smallCategoryId);
        item.remove();
        smallCategory.$container.find('#' + item.id).remove();
        $.each(smallCategory.itemList, function (index, exitItem) {
            if (exitItem.id == item.id) {
                smallCategory.itemList = arrayUtil.removeElementInPosition(smallCategory.itemList, index);
            }
        });
        if (smallCategory.itemList.length == 0) {
            emptySmallCategory = true;
        }
        if (self.currentSmallCategoryItemId == item.id) {
            self.currentSmallCategoryItemId = null;
        }
        if (emptySmallCategory) {
            self.removeSmallCategory(smallCategoryId);
        }
    },
    itemClick: function (smallCategoryId, itemId, itemText) {
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
                        if (beforeSmallCategoryItemId == itemId) {
                            self.currentSmallCategoryItemId = null;
                        }
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
            if (typeof this.brandListener == 'function') {
                brandItems = this.brandListener(itemId, itemText);
                if (!brandItems.length) return;
                this.productManage.brand.refreshBrand(brandItems);
            }
        } else {
            this.productManage.brand.hide();
        }
    },
    getSelectedProduct: function () {
        var productList = [];
        $.each(this.smallCategoryList, function (index, smallCategory) {
            var itemList = [];
            $.each(smallCategory.itemList, function (index, item) {
                itemList.push(item.getId());
            });
            productList.push(itemList);
        });
        return productList;
    },
    uuid: function () {
        try {
            return '__common_' + this.uid;
        } finally {
            this.uid++;
        }
    }
};
