
const address=[
    {
        path:'/address',
        name:'address',
        component:()=>import('../../views/address/Address')
    },
    {
        path:'/city',
        name:'city',
        component:()=>import('../../views/address/City')
    }
]
export default address