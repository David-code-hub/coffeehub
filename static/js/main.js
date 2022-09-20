const Order = { template: "<order></order>"}
const Reviews = { template: "<reviews></reviews>"}
const Orders = {template: "<orders></orders>"}
const Profile = {template: "<profile></profile>"}


// const Profile = { template: "<profile></profile>"}
// const Notifications = { template: "<notifications></notifications>"}
// const Friends = { template: "<friends></friends>"}
// const Appdetail = { template: "<appdetail></appdetail>"}


const routes = [
  { path: '/order', component: Order ,name:'order'},
  { path: '/reviews', component: Reviews ,name:'reviews'},
  { path: '/orders', component: Orders ,name:'orders'},
  { path: '/profile', component: Profile ,name:'profile'},



]

var router = new VueRouter({
  routes, // short for `routes: routes`
 // mode:'history'
})

router.afterEach(() => {
  NProgress.done()
});
NProgress.set(0.4);
NProgress.inc(); 
NProgress.configure({ ease: 'ease', speed: 1000 });
NProgress.configure({trickleSpeed: 500 }); 
NProgress.configure({ showSpinner: false });


new Vue({
  
  router,
  vuetify: new Vuetify(),
  el: '#app',
   
  data() {
  	return{
      
  		drawer: true,
      notifications:[],
      newNotifications:[], 
      snackbar: false,
      value:1,
      showBackOnline:true,

  	}
  	
  },
   computed: {
      color () {
        switch (this.value) {
          case 0: return 'blue'
          case 1: return 'brown'
          case 2: return 'teal'
          case 3: return 'indigo'
          default: return 'blue-grey'
        }
      },
    },
   

}).$mount('#app')