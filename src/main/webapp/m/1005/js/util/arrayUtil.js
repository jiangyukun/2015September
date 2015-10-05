var arrayUtil = {
    removeElement: function (array, element) {
        var i;
        for (i = 0; i < array.length; i++) {
            if (array[i] == element) {
                break;
            }
        }
        return this.removeElementInPosition(array, i);
    },
    removeElementInPosition: function (array, position) {
        return array.slice(0, position).concat(array.slice(position + 1, array.length));
    },
    isExist: function (array, item) {
        var i;
        for (i = 0; i < array.length; i++) {
            if (array[i] == item) {
                return true;
            }
        }
        return false;
    }
};
