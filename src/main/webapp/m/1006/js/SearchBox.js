function SearchBox($container, productManage) {
    this.$container = $container;
    this.productManage = productManage;
    this.$appendContainer = $('#smallCategoryContainer');
    this.$selectTip = this.$container.find('#selectTip');
    this.$openSelectTip = this.$selectTip.find('.tip1');
    this.$onlyOneSmallCategoryTip = this.$selectTip.find('.tip2');
    this.$reelectAndRemoveTip = this.$selectTip.find('.tip3');

    this.$reelectBtn = this.$container.find('.reelect-btn');
    this._smallCategoryTemplate = _.template($('#smallCategoryTemplate').text());
    this._itemTemplate = _.template($('#itemTemplate').text());

    this.smallCategoryList = [];
    this._brandCallback = null;
    this.currentSmallCategoryItemId = null;
    this.init();
}

_.extend(SearchBox.prototype, Backbone.Events, {
    init: function () {
        var self = this;
        this.productManage.addListener('close', function () {
            self.$reelectBtn.hide();
            if (self.smallCategoryList.length != 0) {
                self.$openSelectTip.show();
            }
        });
        this.productManage.addListener('open', function () {
            if (self.smallCategoryList.length != 0) {
                self.$reelectBtn.show();
                self.$reelectAndRemoveTip.show();
            }
            self.$openSelectTip.hide();
        });
        this.$reelectBtn.click(function () {
            self.productManage.clickArea = 1;
            _.each(self.smallCategoryList, function (smallCategory, index) {
                self.removeSmallCategory(smallCategory.uuid);
            });
        });
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
        var self = this;
        var uuid = smallCategory.uuid;
        var html = this._smallCategoryTemplate({smallCategoryId: smallCategory.uuid, text: smallCategory.text});
        if (this.smallCategoryList.length > 0) {
            _.each(this.smallCategoryList, function (smallCategory, index) {
                self.removeSmallCategory(smallCategory.uuid);
                self.trigger('smallCategoryChanged');
            });
            this.$onlyOneSmallCategoryTip.show();
            this.$reelectAndRemoveTip.hide();
        } else {
            this.$reelectAndRemoveTip.show();
        }
        this.$appendContainer.append(html);
        var $container = this.$appendContainer.find('#' + uuid);
        var localSmallCategory = {
            uuid: smallCategory.uuid,
            itemList: [],
            $container: $container,
            $itemContainer: $container.find('.item-container')
        };
        this.smallCategoryList.push(localSmallCategory);
        return localSmallCategory;
    },
    addSmallCategoryItem: function (smallCategory, item, isSingleOperation) {
        var self = this;
        item.internalId = '__item_' + item.id;
        var localSmallCategory = this.getSmallCategory(smallCategory.uuid);
        if (localSmallCategory == null) {
            localSmallCategory = this.addSmallCategory(smallCategory);
        } else if (isSingleOperation == false) {
            this.$onlyOneSmallCategoryTip.hide();
            this.$reelectAndRemoveTip.show();
        }
        if (arrayUtil.isExist(localSmallCategory.itemList, item)) {
            return;
        }
        localSmallCategory.itemList.push(item);
        localSmallCategory.$itemContainer.append(this._itemTemplate({itemId: item.internalId, text: item.text}));
        var $item = localSmallCategory.$itemContainer.find('#' + item.internalId);
        $item.click(function () {
            self.itemClick(localSmallCategory, item);
            return false;
        });
        this.$reelectBtn.show();
        this.trigger('productSelected');
    },
    removeSmallCategory: function (smallCategoryId) {
        var self = this;
        var smallCategory = this.getSmallCategory(smallCategoryId);
        smallCategory.$container.remove();
        $.each(smallCategory.itemList, function (index, item) {
            self.removeSmallCategoryItem(smallCategory.uuid, item, true);
        });
        this.smallCategoryList = arrayUtil.removeElement(self.smallCategoryList, smallCategory);
        if (this.smallCategoryList.length == 0) {
            this.$reelectBtn.hide();
            this.$reelectAndRemoveTip.hide();
            this.trigger('productIsEmpty');
        }
    },
    removeSmallCategoryItem: function (smallCategoryId, item, triggerEvent) {
        var self = this;
        var smallCategory = this.getSmallCategory(smallCategoryId);
        if (triggerEvent) {
            item.trigger('itemRemoved');
        }
        smallCategory.$container.find('#' + item.internalId).remove();
        $.each(smallCategory.itemList, function (index, exitItem) {
            if (exitItem.id == item.id) {
                smallCategory.itemList = arrayUtil.removeElementInPosition(smallCategory.itemList, index);
            }
        });
        if (smallCategory.itemList.length == 0) {
            self.removeSmallCategory(smallCategoryId);
        } else {
            this.$onlyOneSmallCategoryTip.hide();
            this.$reelectAndRemoveTip.show();
        }
        if (self.currentSmallCategoryItemId == item.id) {
            self.currentSmallCategoryItemId = null;
        }
        this.trigger('productDeSelected');
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
                        self.removeSmallCategoryItem(smallCategory.uuid, _item, true);
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
