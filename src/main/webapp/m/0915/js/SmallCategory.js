function SmallCategory(bigCategory, $dl, searchBox) {
    this.bigCategory = bigCategory;
    this.$container = $dl;
    this.$smallCategory = this.$container.find('dt');
    this.searchBox = searchBox;

    this.uuid = this.searchBox.uuid();
    this.text = this.$smallCategory.find('span').text();
    this._template = _.template($('#smallCategoryTemplate').text());
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
            // 小分类添加第一个
            if (this.searchBox.getSmallCategory(this.uuid) == null) {
                this.searchBox.addSmallCategory({
                    id: this.uuid,
                    html: this._template({
                        smallCategoryId: this.uuid,
                        text: this.text
                    })
                });
            }
            this.searchBox.addSmallCategoryItem(this.uuid, item);
        } else {
            this.searchBox.removeSmallCategoryItem(this.uuid, item);
        }
    }
};
