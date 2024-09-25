const {default: SummaryApi} = require("../common")

const fetchCategorywiseProduct = async(category)=>{
    const response = await fetch(SummaryApi.categorywiseProduct.url,{
        method: SummaryApi.categorywiseProduct.method,
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify({
          category: category
        })
    })

    const dataResponse = await response.json()

    return dataResponse
} 

export default fetchCategorywiseProduct;