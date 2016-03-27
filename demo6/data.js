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
    data: function (){   // 要定义一下 message 否则 控制台会有警告
      return {
        message:''
      }
    },
    template:
      '<div>'+
      '  <div v-if="$loadingRouteData">Loading ...2秒</div>'+
      '  <div v-if="!$loadingRouteData">'+
      '    show message: {{message}}'+
      '  </div>'+
      '</div>',
    route:{
      data: function (transition) {
        console.log('在 activate 调用后');
        setTimeout(function () {
          transition.next({
            message: '收到的消息'
          })

          console.log('收到信息');
        }, 2000)
      },
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

router.map({
    '/foo': {
        component: Foo
    },
    '/bar': {
        component: Bar
    }
})

// Now we can start the app!
// The router will create an instance of App and mount to
// the element matching the selector #app.
router.start(App, '#app')