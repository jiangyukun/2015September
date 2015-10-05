function SmallCategory(bigCategory, $dl, productManage) {
    this.bigCategory = bigCategory;
    this.$container = $dl;
    this.$smallCategory = this.$container.find('dt');
    this.productManage = productManage;

    this.uuid = this.productManage.uuid();

    this.$smallCategoryInput = this.$smallCategory.find('input');
    this.itemList = [];
    this.init();
}

SmallCategory.prototype = {
    constructor: SmallCategory,
    init: function () {
        var self = this;
        this.$container.find('dd').each(function (index, element) {
            var $item = $(element);
            var item = new Item(self, $item, self.productManage);
            item.on('stateChanged', function () {
                self.changeCheckBoxState();
            });
            self.itemList.push(item);
        });
        this.$smallCategoryInput.change(function () {
            if (self.$smallCategoryInput.prop('checked')) {
                _.each(self.itemList, function (item, index) {
                    item.add();
                });
            } else {
                _.each(self.itemList, function (item, index) {
                    item.remove();
                });
            }
        });
    },
    changeState: function (item, type, triggerEvent) {
        if ('addToSearchBox' === type) {
            this.productManage.addSmallCategoryItem(this, item);
        } else if ('removeFromSearchBox' === type) {
            this.productManage.removeSmallCategoryItem(this.uuid, item, triggerEvent);
        } else {
            if (item.selectable) {
                this.productManage.addSmallCategoryItem(this, item);
            } else {
                this.productManage.removeSmallCategoryItem(this.uuid, item, triggerEvent);
            }
        }
    },
    remove: function () {
        _.each(this.itemList, function (item, index) {
            item.remove();
        });
    },
    changeCheckBoxState: function () {
        var selected = 0, unselected = 0;
        _.each(this.itemList, function (item, index) {
            if (item.selectable) {
                unselected++;
            } else {
                selected++;
            }

        });
        if (selected < this.itemList.length) {
            this.$smallCategoryInput.prop('checked', false);
        }
        if (unselected == 0) {
            this.$smallCategoryInput.prop('checked', true);
        }
    }
};
