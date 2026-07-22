import Product from "./Product"

function ProductList({ products }) {
    return (
        <>
            <section className='products'>
                { products.length > 0 ? (
                <div className='row'>
                    { products.map((product) => {       
                        return <Product key={product.id} product={product} />  
                    })}
                </div>
                ) : (
                <h3>You need to add some products</h3>
                )}
            </section>
        </>
    )
}

export default ProductList