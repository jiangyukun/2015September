$(function () {
    var Todo = Backbone.Model.extend({
        defaults: {
            title: '',
            done: false
        }
    });

    var TodoList = Backbone.Collection.extend({
        model: Todo
    });

    var todoList = new TodoList();

    var TodoView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#').text()),
        initialize: function () {

        },
        render: function () {

        }
    });

    var AppView = Backbone.View.extend({
        events: {
            '': 'addTodo',
            'keypress': ''
        },
        initialize: function () {
            this.listeningTo(todoList, 'change', this.addTodo)
        },
        addTodo: function () {
            todoList.create({
                title: 'xxx'
            });
        },
        removeTodo: function () {

        },
        render: function () {

        }
    });

    new AppView();
});