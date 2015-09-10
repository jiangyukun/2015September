function SmallCategory(bigCategory, $dl, searchBox) {
    this.bigCategory = bigCategory;
    this.$container = $dl;
    this.$smallCategory = this.$container.find('dt');
    this.id = this.$smallCategory.find('span').attr('id');
    this.text = this.$smallCategory.find('span').text();
    this.itemList = [];
    this.searchBox = searchBox;
    this.init();
}

SmallCategory.prototype = {
    constructor: SmallCategory,
    init: function () {
        var self = this;
        this.$smallCategory.click(function () {
            if (self.searchBox.searchItem(self.id)) return;
            if (self.bigCategory.isInSearchBox()) return;
            $.each(self.itemList, function (index, item) {
                self.searchBox.deleteSearchItem(item.id);
            });
            self.$smallCategory.addClass('selected');
            self.searchBox.addSearchItem(self);
        });
        this.$container.find('dd').each(function (index, element) {
            var $item = $(element);
            var item = new Item(self, $item, self.searchBox);
            self.itemList.push(item);
        });
    },
    remove: function () {
        if (this.searchBox.searchItem(this.id)) {
            this.$smallCategory.removeClass('selected');
        }
    },
    isInSearchBox: function () {
        return this.bigCategory.isInSearchBox() || this.searchBox.searchItem(this.id);
    }
};
