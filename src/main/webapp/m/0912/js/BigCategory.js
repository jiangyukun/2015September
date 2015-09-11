function BigCategory($li, index, searchBox) {
    this.$li = $li;
    this.$subContent = $('.content .sub-content').eq(index);

    this.id = this.$li.find('a').attr('id');
    this.text = this.$li.find('a').text();
    this.smallCategoryList = [];
    this.searchBox = searchBox;
    this.init();
}

BigCategory.prototype = {
    constructor: BigCategory,
    init: function () {
        var self = this;

        this.$subContent.find('dl').each(function (index, element) {
            var $dl = $(element);
            self.smallCategoryList.push(new SmallCategory(self, $dl, self.searchBox));
        });
    }
};
