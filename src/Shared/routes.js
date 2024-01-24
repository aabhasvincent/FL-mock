import Home from './Home';
import Grid from './Grid';
import Message from './Message';
import { fetchPopularRepos } from './api'
const routes = [
    {
        path:'/',
        exact: true,
        component: Home
    },
    {
        path:'/message',
        exact: true,
        component : Message,
    },
    {
        path:'/popular/:id',
        component : Grid,
        fetchInitialData :(path = '') => fetchPopularRepos(path.split('/').pop())
    }
] 
export default routes