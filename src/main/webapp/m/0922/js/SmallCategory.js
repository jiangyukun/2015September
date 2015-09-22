function SmallCategory(bigCategory, $dl, productManage) {
    this.bigCategory = bigCategory;
    this.$container = $dl;
    this.$smallCategory = this.$container.find('dt');
    this.productManage = productManage;

    this.uuid = this.productManage.uuid();
    this.text = this.$smallCategory.find('span').text();

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
    },
    itemClicked: function (item) {
        if (item.selectable) {
            this.productManage.addProductItem(item);
        } else {
            this.productManage.removeProductItem(item);
        }
    }
};
