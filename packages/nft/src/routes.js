
import Detail from './components/Detail.vue'
import Market from './components/Market.vue'


const routes = [
    { path: '/', component: Market, name: 'market' },
    
    { 
        path: '/:id',
        name: 'detail',
        component: Detail
    }
]

export default routes
