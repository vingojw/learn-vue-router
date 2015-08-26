// Define some components
var Foo = Vue.extend({
    template: '<p>This is foo!</p>'
})

var Bar = Vue.extend({
    template: '<p>This is bar!</p>'
})

// The router needs a root component to render.
// For demo purposes, we will just use an empty one
// because we are using the HTML as the app template.
var App = Vue.extend({})

// Create a router instance.
// You can pass in additional options here, but let's
// keep it simple for now.
var router = new VueRouter()

// Define some routes.
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
var Foo = Vue.extend({
    template:
    '<div class="foo">' +
      '<h2>This is Foo!</h2>' +
    '</div>',
    route:{
    activate: function (transition) {
      console.log('从'+transition.from.path);
      console.log('去'+transition.to.path);
      console.log('Foo 激活!')
      transition.next()
    },
    deactivate: function (transition) {
      console.log('Foo 销毁!')
      transition.next()
    }
  }
})
var Bar = Vue.extend({
    template:
    '<div class="Bar">' +
      '<h2>This is Bar!</h2>' +
    '</div>',
    route:{
    activate: function (transition) {
      console.log('从'+transition.from.path);
      console.log('去'+transition.to.path);
      console.log('Bar 激活!')
      transition.next()
    },
    deactivate: function (transition) {
      console.log('Bar 销毁!')
      transition.next()
    }
  }
})

var Abort = Vue.extend({
    template:
    '<div class="Abort">' +
      '<h2>This is Abort!</h2>' +
    '</div>',
    route:{
    activate: function (transition) {
      console.log('从'+transition.from.path);
      console.log('去'+transition.to.path);

      transition.abort('back');
      console.log('Abort 激活!');
      //如果在这里手动中止，控制台会打出 两次销毁
      // Bar 销毁!
      // app.js:66 Abort 激活!
      // app.js:52 Bar 销毁!
      // app.js:48 Bar 激活!
      transition.next();
    },
    deactivate: function (transition) {
      console.log('Abort 销毁!')
      transition.next()
    }
  }
})


var Redirect = Vue.extend({
    template:
    '<div class="Redirect">' +
      '<h2>This is Redirect!</h2>' +
    '</div>',
    route:{
    activate: function (transition) {
      console.log('从'+transition.from.path);
      console.log('去'+transition.to.path);
      console.log('重定向到 /foo');
      transition.redirect('/foo');
      console.log('Redirect 激活!');
      //transition.next();  这里可要可不要
    },
    deactivate: function (transition) {
      console.log('Redirect 销毁!')
      transition.next()
    }
  }
})


router.map({
    '/foo': {
        component: Foo
    },
    '/bar': {
        component: Bar
    },
    '/abort':{
        component: Abort
    },
    '/redirect':{
        component: Redirect
    }
})

// Now we can start the app!
// The router will create an instance of App and mount to
// the element matching the selector #app.
router.start(App, '#app')