function Item(smallCategory, $span, searchBox) {
    this.smallCategory = smallCategory;
    this.$item = $span;
    this.searchBox = searchBox;
    this.id = this.$item.find('span').attr('id');
    this.text = this.$item.find('span').text();
    this.init();
}

Item.prototype = {
    constructor: Item,
    init: function () {
        var self = this;
        this.$item.click(function () {
            // 小分类已添加，无法添加子分类
            if (self.smallCategory.isInSearchBox()) return;
            // 自身已添加
            if (self.searchBox.searchItem(self.id)) return;

            self.searchBox.addSearchItem(self.id, self.text);
        });
    },
    remove: function () {
        if (this.searchBox.searchItem(this.id)) {
            this.searchBox.deleteSearchItem(this.id);
        }
    }
};