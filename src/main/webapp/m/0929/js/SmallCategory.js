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
            var item = new Item(self, $item, self.searchBox);
            self.itemList.push(item);
        });
        this.$smallCategoryInput.change(function () {
            _.each(self.itemList, function (item, index) {
                item.click();
            });
        });
    },
    itemClicked: function (item) {
        if (item.selectable) {
            this.productManage.addSmallCategoryItem(this, item);
        } else {
            this.productManage.removeSmallCategoryItem(this.uuid, item);
        }
    },
    remove: function () {
        _.each(this.itemList, function (item, index) {
            item.remove();
        });
    }
};
