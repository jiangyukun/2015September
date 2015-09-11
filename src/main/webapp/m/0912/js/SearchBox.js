function SearchBox($container) {
    this.$container = $container;
    this.$addArea = this.$container.find('.btn-tip');
    this.$appendContainer = $('.small-category-container');
    this.addAreaClickedListener = [];
    this.uid = 1;
    this.init();
}

SearchBox.prototype = {
    constructor: SearchBox,
    init: function () {
        var i, self = this;
        this.$addArea.click(function () {
            for (i = 0; i < self.addAreaClickedListener.length; i++) {
                self.addAreaClickedListener[i]();
            }
        });
    },
    addListener: function (listener) {
        this.addAreaClickedListener.push(listener);
    },
    addSmallCategory: function (smallCategory) {
        var id = smallCategory.id, html = smallCategory.html;
        this.$appendContainer.append(html);
        return this.$appendContainer.find('#' + id);
    },
    uuid: function () {
        try {
            return '__common_' + this.uid;
        } finally {
            this.uid++;
        }
    }
};
