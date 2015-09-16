function AllCategory($ul, $content, productManage) {
    this.$container = $ul;
    this.$content = $content;
    this.bigCategoryList = [];

    this.index = 0;
    this.$current = this.$container.find('#current');

    this.productManage = productManage;
    this.init();
}

AllCategory.prototype = {
    constructor: AllCategory,
    init: function () {
        var self = this;
        this.$container.find('li.big-category').each(function (index, element) {
            var $li = $(element);
            if (index == 0) {
                $li.find('a').addClass('hover');
                self.id = $li.find('a').attr('id');
                self.$beforeHover = $li;
                self.$beforeSubContent = self.$content.find('.sub-content').eq(index);
                self.index = index;
            }
            self.bigCategoryList.push(new BigCategory($li, index, self.productManage));
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
    }
};
