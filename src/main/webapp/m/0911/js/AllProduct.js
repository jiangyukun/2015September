function AllProduct($ul, $content, searchBox) {
    this.$container = $ul;
    this.$content = $content;
    this.searchBox = searchBox;
    this.bigCategoryList = [];
    this.$current = this.$container.find('#current');
    this.index = 0;
    this.init();
}

AllProduct.prototype = {
    constructor: AllProduct,
    init: function () {
        var self = this;
        this.$container.find('li').each(function (index, element) {
            var $li = $(element);
            if (index == 0) {
                $li.find('a').addClass('hover');
                self.id = $li.find('a').attr('id');
                self.$beforeHover = $li;
                self.$beforeSubContent = self.$content.find('.sub-content').eq(index);
                self.$current.css('top', $li.position().top);
                self.index = index;
            }
            self.bigCategoryList.push(new BigCategory($li, index, self.searchBox));
            $li.hover(function () {
                if (index == self.index) return;
                var $subContent = self.$content.find('.sub-content').eq(index);
                $subContent.show();
                self.$beforeSubContent.hide();
                self.$beforeSubContent = $subContent;

                $li.find('a').addClass('hover');
                self.$beforeHover.find('a').removeClass('hover');
                self.$beforeHover = $li;
                self.$current.css('top', $li.position().top);
                self.index = index;
            });
        });
    },
    refresh: function () {
        this.$current.css('top', this.$container.find('li').eq(this.index).position().top);
    }
};
