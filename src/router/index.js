
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import( '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

const asyncRoutes = [
  {
    path: '/about2',
    name: 'About2',
    component: () => import( '../views/About2.vue')
  }
]


function merge(){
  return new Promise(resolve=>{
    setTimeout(() => {
      asyncRoutes.forEach(item=>{
        router.addRoute(item)
      })
      resolve()
    }, 3000);
  })
}
var flag="0"

router.beforeEach((to, from, next) => {
  console.log(to.name)
  console.log(flag);
  if(flag =="1"){ // 这里一定要加上这个临界条件，否则会死循环
    next()
  }else{
    merge().then(()=>{
      flag="1"
      console.log("finally");
      next({ ...to, replace: true })
    })
  }
  
});

export default router
