function Item(smallCategory, $span, productManage) {
    this.smallCategory = smallCategory;
    this.$item = $span;
    this.productManage = productManage;

    this.id = this.$item.find('span').attr('id');
    this.text = this.$item.find('span').text();
    this.selectable = true;
    this.init();
}

_.extend(Item.prototype, Backbone.Events, {
    init: function () {
        var self = this;
        this.$item.click(function () {
            self.toggle();
        });
        this.on('itemRemoved', function () {
            self.selectable = true;
            self.$item.find('span').removeClass('selected');
            self.trigger('stateChanged');
        });
    },
    toggle: function () {
        if (this.selectable) {
            this.$item.find('span').addClass('selected');
        } else {
            this.$item.find('span').removeClass('selected');
        }
        this.smallCategory.changeState(this);
        this.selectable = !this.selectable;
        this.trigger('stateChanged');
    },
    add: function () {
        if (!this.selectable) return;
        this.$item.find('span').addClass('selected');
        this.selectable = false;
        this.smallCategory.changeState(this, 'addToSearchBox', true);
        this.trigger('stateChanged');
    },
    remove: function () {
        if (this.selectable) return;
        this.selectable = true;
        this.smallCategory.changeState(this, 'removeFromSearchBox', true);
        this.trigger('stateChanged');
    },
    getId: function () {
        return this.id;
    }
});

