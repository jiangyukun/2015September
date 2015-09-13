function SmallCategory(bigCategory, $dl, searchBox) {
    this.bigCategory = bigCategory;
    this.$container = $dl;
    this.$smallCategory = this.$container.find('dt');
    this.text = this.$smallCategory.find('span').text();
    this.searchBox = searchBox;

    this._template = _.template($('#smallCategoryTemplate').text());
    this.uuid = null;
    this.itemList = [];
    this.appendItemList = [];
    this.$appendContainer = null;
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
        var add = true, self = this;
        $.each(this.appendItemList, function (index, exitItem) {
            if (exitItem.id == item.id) {
                add = false;
            }
        });
        // 小分类添加第一个
        if (add) {
            if (this.appendItemList.length == 0) {
                var uuid = self.uuid = this.searchBox.uuid();
                this.$appendContainer = this.searchBox.addSmallCategory({
                    id: uuid,
                    html: this._template({
                        smallCategoryId: uuid,
                        text: this.text
                    })
                });
            }
            this.$appendContainer.find('.item-container').append(item.html);
            var searchItem = this.$appendContainer.find('#' + item.id);
            searchItem.click(function () {
                self.searchBox.reset(item.id, item.text);
            });
            this.appendItemList.push({id: item.id});
            this.searchBox.addSmallCategoryItem(this.uuid, item);
        } else {
            this.$appendContainer.find('#' + item.id).remove();
            item.remove();
            $.each(this.appendItemList, function (index, exitItem) {
                if (exitItem.id == item.id) {
                    self.appendItemList = self.appendItemList.slice(0, index).concat(self.appendItemList.slice(index + 1, self.appendItemList.length));
                }
            });
            if (this.appendItemList.length == 0) {
                this.$appendContainer.remove();
            }
        }
    }
};
