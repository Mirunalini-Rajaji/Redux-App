const productReducer = function myReducer(state=null,action){
    var products=[
        {
            id:1,  
            name:'nokia',
            image:'bag.jpeg',
            price:2000,
            quantity:3,
            category:'Mobiles',
            manufacturer:'Nokia pvt',
            supplier:'poorvika',
            stock:'inStock',
            rating:4
        },
        {
            id:2,
            name:'jbl',
            image:'bag.jpeg',
            price:2000,
            quantity:3,
            category:'Electronics',
            manufacturer:'Nokia pvt',
            supplier:'poorvika',
            stock:'InStock',
            rating:4
        },
        {
            id:3,
            name:'realme',
            image:'bag.jpeg',
            price:2000,
            quantity:3,
            category:'Mobiles',
            manufacturer:'realme pvt',
            supplier:'poorvika',
            stock:'InStock',
            rating:4
        }
    ]
  
    switch (action.type) {
        // case "VIEW_PRODUCT":
        //     console.log(action.payload)
        //     return action.payload
        case "NEW_PRODUCT":
            let length=state.length
            let newProduct = [{id:length+1,name:action.payload.name,
                                image:action.payload.image,
                                price:action.payload.price,
                                quantity:action.payload.quantity,
                                category:action.payload.category,manufacturer:action.payload.manufacturer,
                                 supplier:action.payload.supplier,stock:action.payload.stock,rating:action.payload.rating},...state]
            console.log(newProduct)
            return newProduct;
        case "UPDATE_PRODUCT":
            // return state.filter(p=>{if(p.id===action.payload.id){
                return [...state.filter(products=>{return products.id !== action.payload.id  }),{id:action.payload.id,name:action.payload.name,
                    image:action.payload.image,price:action.payload.price,
                    quantity:action.payload.quantity,
                    category:action.payload.category,manufacturer:action.payload.manufacturer,
                    supplier:action.payload.supplier,stock:action.payload.stock,rating:action.payload.rating}]
                // }});
          
         
        case "DELETE_PRODUCT":
             console.log("reducers")
             console.log(action.payload.id)
            return state.filter(products=>{return products.id !== action.payload.id  })   
           
            
        case "SEARCH_PRODUCT":
            // if(action.payload.length!==0){
            // return action.payload
            // }
            products=products.filter((p) =>{
                return   (p.name.toLowerCase().match(action.payload.toLowerCase().trim()) ||
                            p.category.toLowerCase().match(action.payload.toLowerCase().trim()))
            })
        
            return products
    
        default:
            break;
    }
    return products
}
export default productReducer