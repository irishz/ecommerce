import axios from 'axios'
import React from 'react'

function AdminProduct() {
    

    axios.get('/api/product')
        .then((res) => {
            
        })
    
    return (
        <div>

        </div>
    )
}

export default AdminProduct
