function SearchBox($container) {
    this.$container = $container;
    this.$addArea = this.$container.find('.btn-tip');
    this.$appendContainer = $('.small-category-container');
    this.$brandContainer = $('.product-brand');
    this._brandItemTemplate = _.template($('#brandItemTemplate').text());
    this.smallCategoryList = [];
    this.addAreaClickedListener = [];
    this.uid = 1;
    this.currentSmallCategoryItemId = null;
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
    addListener: function (listener) {
        this.addAreaClickedListener.push(listener);
    },
    addSmallCategory: function (smallCategory) {
        var id = smallCategory.id, html = smallCategory.html;
        this.$appendContainer.append(html);
        var $container = this.$appendContainer.find('#' + id);
        this.smallCategoryList.push({
            id: smallCategory.id,
            itemList: [],
            $container: $container
        });
        return $container;
    },
    addSmallCategoryItem: function (smallCategoryId, item) {
        var self = this;
        $.each(this.smallCategoryList, function (index, smallCategory) {
            if (smallCategory.id == smallCategoryId) {
                smallCategory.itemList.push(item);
            }
        });
    },
    reset: function (itemId, itemText) {
        var i, self = this;
        $.each(this.smallCategoryList, function (index, element) {
            $.each(element.itemList, function (i, item) {
                var $item = self.$appendContainer.find('#' + item.id);

                if (item.id == itemId) {
                    if ($item.hasClass('search-container-item-clicked')) {
                        self.currentSmallCategoryItemId = null;
                        $item.removeClass('search-container-item-clicked');
                    } else {
                        self.$appendContainer.find('#' + item.id).addClass('search-container-item-clicked');
                        self.currentSmallCategoryItemId = itemId;
                    }
                } else {
                    $item.removeClass('search-container-item-clicked');
                }
            });
        });
        if (this.currentSmallCategoryItemId != null) {
            var top = null, row = 0, current;
            var $brandItems = this.$brandContainer.find('.brand-items'), $brandItem;
            var $brandMore = this.$brandContainer.find('.brand-more');
            $brandItems.find(':not(:first)').remove();
            $brandMore.hide();
            this.$brandContainer.show();
            for (i = 1; i < 40; i++) {
                var brandItemId = '__brand_item_' + i;
                $brandItems.append(this._brandItemTemplate({brandItemId: brandItemId, text: itemText + i}));
                $brandItem = $('#' + brandItemId);
                if (top != $brandItem.position().top) {
                    top = $brandItem.position().top;
                    row++;
                }
                if (row > 3) {
                    $brandItem.remove();
                    $brandMore.show();
                    current = i;
                    $brandMore.off('click').click(function () {
                        for (i = current; i < 40; i++) {
                            $brandItems.append(self._brandItemTemplate({brandItemId: brandItemId, text: itemText + i}));
                        }
                        $brandMore.hide();
                    });
                    break;
                }
            }
        } else {
            this.$brandContainer.hide();
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
