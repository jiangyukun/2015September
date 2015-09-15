var arrayUtil = {
    removeElementInPosition: function (array, position) {
        return array.slice(0, position).concat(array.slice(position + 1, array.length));
    }
};

