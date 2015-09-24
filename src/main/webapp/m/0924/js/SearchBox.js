function SearchBox($container, productManage) {
    this.$container = $container;
    this.productManage = productManage;
    this.$appendContainer = $('#smallCategoryContainer');
    this._smallCategoryTemplate = _.template($('#smallCategoryTemplate').text());
    this._itemTemplate = _.template($('#itemTemplate').text());

    this.smallCategoryList = [];
    this._brandCallback = null;
    this.currentSmallCategoryItemId = null;
    this.init();
}

_.extend(SearchBox.prototype, Backbone.Events, {
    init: function () {
    },
    brandCallback: function (callback) {
        this._brandCallback = callback;
    },
    getSmallCategory: function (smallCategoryId) {
        var sc = null;
        $.each(this.smallCategoryList, function (index, smallCategory) {
            if (smallCategory.uuid == smallCategoryId) {
                sc = smallCategory;
                return true;
            }
        });
        return sc;
    },
    addSmallCategory: function (smallCategory) {
        var uuid = smallCategory.uuid;
        var html = this._smallCategoryTemplate({smallCategoryId: smallCategory.uuid, text: smallCategory.text});
        this.$appendContainer.append(html);
        var $container = this.$appendContainer.find('#' + uuid);
        var localSmallCategory = {
            uuid: smallCategory.uuid,
            itemList: [],
            $container: $container,
            $itemContainer: $container.find('.item-container')
        };
        this.smallCategoryList.push(localSmallCategory);
        this.trigger('productSelected');
        return localSmallCategory;
    },
    addSmallCategoryItem: function (smallCategory, item) {
        var self = this;
        item.internalId = '__item_' + item.id;
        var localSmallCategory = this.getSmallCategory(smallCategory.uuid);
        if (localSmallCategory == null) {
            localSmallCategory = this.addSmallCategory(smallCategory);
        }
        localSmallCategory.itemList.push(item);
        localSmallCategory.$itemContainer.append(this._itemTemplate({itemId: item.internalId, text: item.text}));
        var $item = localSmallCategory.$itemContainer.find('#' + item.internalId);
        $item.click(function () {
            self.itemClick(localSmallCategory, item);
            return false;
        });
    },
    removeSmallCategory: function (smallCategoryId) {
        var self = this;
        var smallCategory = this.getSmallCategory(smallCategoryId);
        smallCategory.$container.remove();
        $.each(smallCategory.itemList, function (index, item) {
            self.removeSmallCategoryItem(smallCategory.uuid, item);
        });
        this.smallCategoryList = arrayUtil.removeElement(self.smallCategoryList, smallCategory);
        if (this.smallCategoryList.length == 0) {
            this.trigger('productIsEmpty');
        }
    },
    removeSmallCategoryItem: function (smallCategoryId, item) {
        var emptySmallCategory = false, self = this;
        var smallCategory = this.getSmallCategory(smallCategoryId);
        item.remove();
        smallCategory.$container.find('#' + item.internalId).remove();
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
    itemClick: function (localSmallCategory, item) {
        var i, j, self = this, brandItems, itemId = item.id, itemText = item.text;
        for (i = 0; i < this.smallCategoryList.length; i++) {
            var smallCategory = this.smallCategoryList[i];
            var itemList = smallCategory.itemList;
            var beforeSmallCategoryItemId = self.currentSmallCategoryItemId;
            for (j = 0; j < itemList.length; j++) {
                var _item = itemList[j];
                var $item = self.$appendContainer.find('#' + _item.internalId);
                if (_item.id == itemId) {
                    if (self.productManage.opened) {
                        self.removeSmallCategoryItem(smallCategory.uuid, _item);
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
                } else if (_item.id != beforeSmallCategoryItemId || !self.productManage.opened) {
                    $item.removeClass('search-container-item-clicked');
                }
            }
        }
        if (this.currentSmallCategoryItemId != null) {
            brandItems = this._brandCallback(itemId, itemText);
            if (!brandItems.length) return;
            this.productManage.brand.refreshBrand(brandItems);
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
    }
});
