Ember.Application.initializer({
    name: 'userapp',
    initialize: function(container, application) {
        Ember.UserApp.setup(application, { appId: '54ff1830d2c38' });
    }
});


App = Ember.Application.create();


App.Router.map(function(){
    this.route('login');
    this.route('signup');
    this.resource('about');
    this.resource('create');
    this.resource('posts', function(){
        this.resource('post', { path: ':post_id'});
    });
    
});



App.ApplicationRoute = Ember.Route.extend(Ember.UserApp.ApplicationRouteMixin);
App.SignupController = Ember.Controller.extend(Ember.UserApp.FormControllerMixin);
App.LoginController = Ember.Controller.extend(Ember.UserApp.FormControllerMixin);
App.IndexRoute = Ember.Route.extend(Ember.UserApp.ProtectedRouteMixin);


App.PostsRoute = Ember.Route.extend({
    model: function(){
        return posts;
    }
});



App.PostRoute = Ember.Route.extend({
    model: function(params) {
        return posts.findBy('id', params.post_id);
    }
});

/*Add Controller*/
App.PostRoute = Ember.Route.extend({
    addBlog: function() {
        return posts
    }
});


/*Edit Controller*/
App.PostController = Ember.ObjectController.extend({
    isEditing: false,
    
    actions: {
        edit: function() {
            this.set('isEditing', true);
        },
        doneEditing: function() {
            this.set('isEditing', false);
        }
    }
});

/*Helper format the date*/
Ember.Handlebars.helper('format-date', function(date) {
    return moment(date).fromNow();
});

/*Helper format the html text*/
/*var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
    return new Handlebars.SafeString(showdown.makeHtml(input));
});*/


var posts = [{
    id: '1',
    title: 'Flying is amazing',
    author: {name: "Vadim Lavric"},
    date: new Date('05-28-2014'),
    excerpt: "This is a greate soft that enybody can use.It's free and it's greate.",
    body: "This is the body of this article. the rest of the text is bla lba bla because it't not inportant the text, but the project it's self."
}, {
    id: '2',
    title: 'Blogging is fine',
    author: {name: "Krishna Bhandari"},
    date: new Date('01-02-2015'),
    excerpt: "This is a greate soft that enybody can use. It's not free, but it's greate.",
    body: "This is the body of this article. the rest of the text is bla lba bla because it't not inportant the text, but the project it's self."
}];
