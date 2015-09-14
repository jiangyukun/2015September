function SearchBox($container) {
    this.$container = $container;
    this.$addArea = this.$container.find('.btn-tip');
    this.$appendContainer = $('.small-category-container');
    this.$brandContainer = $('.product-brand');
    this._brandItemTemplate = _.template($('#brandItemTemplate').text());
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
        var i, self = this;
        this.$addArea.click(function () {
            for (i = 0; i < self.addAreaClickedListener.length; i++) {
                self.addAreaClickedListener[i]();
            }
        });
        this.$brandContainer.delegate('.brand-item', 'click', function () {
            var $brandItem = $(this);
            if ($brandItem.hasClass('brand-item-clicked')) {
                $brandItem.removeClass('brand-item-clicked');
            } else {
                $brandItem.addClass('brand-item-clicked');
            }
        });
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
        var i, self = this, brandItems;
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
            $brandItems.children().remove();
            $brandMore.hide();
            this.$brandContainer.show();
            if (typeof this.smallCategoryItemChangedListener == 'function') {
                brandItems = this.smallCategoryItemChangedListener(itemId, itemText);
                if (!brandItems.length) return;
                for (i = 0; i < brandItems.length; i++) {
                    var brandItem = brandItems[i];
                    $brandItems.append(this._brandItemTemplate({brandItemId: brandItem.id, text: brandItem.text}));
                    $brandItem = $('#' + brandItem.id);
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
                                $brandItems.append(self._brandItemTemplate({
                                    brandItemId: brandItem.id,
                                    text: brandItem.text
                                }));
                            }
                            $brandMore.hide();
                        });
                        break;
                    } else {
                    }
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
