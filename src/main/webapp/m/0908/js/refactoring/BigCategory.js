function BigCategory($li, index, searchBox) {
    this.$li = $li;
    this.$subContent = $('.content .sub-content').eq(index);

    this.id = this.$li.find('a').attr('id');
    this.text = this.$li.find('a').text();
    this.$selectAll = this.$subContent.find('.select-all');
    this.smallCategoryList = [];
    this.searchBox = searchBox;
    this.init();
}

BigCategory.prototype = {
    constructor: BigCategory,
    init: function () {
        var self = this;
        this.$selectAll.click(function () {
            if (!self.searchBox.searchItem(self.id)) {
                self.searchBox.addSearchItem(self.id, self.text);
                $.each(self.smallCategoryList, function (i, smallCategory) {
                    smallCategory.remove();
                });
            }
        });
        this.$subContent.find('dl').each(function (index, element) {
            var $dl = $(element);
            self.smallCategoryList.push(new SmallCategory(self, $dl, self.searchBox));
        });
    },
    remove: function () {
        if (this.searchBox.searchItem(this.id)) {
            this.searchBox.deleteSearchItem(this.id);
        }
    },
    isInSearchBox: function () {
        return this.searchBox.searchItem(this.id);
    }
};
