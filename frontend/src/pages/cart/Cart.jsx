import { useSelector } from 'react-redux'

function Cart() {

  const { items } = useSelector(
    (state) => state.cart
  )
  console.log(items)
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Shopping Cart</h2>
          <p className="text-muted mb-0">{ items.length } Items</p>
        </div>

        <button className="btn btn-outline-dark rounded-pill px-4">
          Continue Shopping
        </button>
      </div>

      <div className="row g-4">
        {/* Cart Items */}
        <div className="col-lg-8">

          {/* Product Card */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">

              <div className="row align-items-center">

                {/* Product Image */}
                <div className="col-md-3 text-center mb-3 mb-md-0">
                  <img
                    // src={product.image} 
                    // alt={product.title}
                    className="img-fluid rounded-4 border p-2"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="col-md-5">

                  <h4 className="fw-bold">
                    Nike Air Max 270
                  </h4>

                  <div className="mb-2 text-warning">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-half"></i>

                    <span className="text-muted ms-2">
                      (4.5)
                    </span>
                  </div>

                  <p className="text-muted mb-1">
                    Running Shoes
                  </p>

                  <span className="badge bg-success-subtle text-success mb-3">
                    <i className="bi bi-check-circle-fill me-1"></i>
                    In Stock
                  </span>

                  <div>
                    <button className="btn btn-link text-danger p-0 me-4">
                      <i className="bi bi-trash me-1"></i>
                      Remove
                    </button>

                    <button className="btn btn-link text-dark p-0">
                      <i className="bi bi-heart me-1"></i>
                      Save for Later
                    </button>
                  </div>

                </div>

                {/* Quantity & Price */}
                <div className="col-md-4">

                  <div className="text-end mb-3">
                    <h3 className="fw-bold">$120</h3>
                  </div>

                  <div className="d-flex justify-content-end align-items-center mb-3">

                    <button className="btn btn-light border rounded-circle">
                      <i className="bi bi-dash"></i>
                    </button>

                    <span className="mx-3 fw-bold fs-5">
                      2
                    </span>

                    <button className="btn btn-dark rounded-circle">
                      <i className="bi bi-plus"></i>
                    </button>

                  </div>

                  <div className="text-end">
                    <span className="text-muted">
                      Total
                    </span>

                    <h4 className="fw-bold text-primary">
                      $240
                    </h4>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Second Product */}
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">

              <div className="row align-items-center">

                <div className="col-md-3 text-center mb-3 mb-md-0">
                  <img
                    src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600"
                    alt="Adidas"
                    className="img-fluid rounded-4 border p-2"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="col-md-5">

                  <h4 className="fw-bold">
                    Adidas Ultraboost
                  </h4>

                  <div className="mb-2 text-warning">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star"></i>

                    <span className="text-muted ms-2">
                      (4.0)
                    </span>
                  </div>

                  <p className="text-muted mb-1">
                    Sports Shoes
                  </p>

                  <span className="badge bg-success-subtle text-success mb-3">
                    <i className="bi bi-check-circle-fill me-1"></i>
                    In Stock
                  </span>

                  <div>
                    <button className="btn btn-link text-danger p-0 me-4">
                      <i className="bi bi-trash me-1"></i>
                      Remove
                    </button>

                    <button className="btn btn-link text-dark p-0">
                      <i className="bi bi-heart me-1"></i>
                      Save for Later
                    </button>
                  </div>

                </div>

                <div className="col-md-4">

                  <div className="text-end mb-3">
                    <h3 className="fw-bold">$80</h3>
                  </div>

                  <div className="d-flex justify-content-end align-items-center mb-3">

                    <button className="btn btn-light border rounded-circle">
                      <i className="bi bi-dash"></i>
                    </button>

                    <span className="mx-3 fw-bold fs-5">
                      1
                    </span>

                    <button className="btn btn-dark rounded-circle">
                      <i className="bi bi-plus"></i>
                    </button>

                  </div>

                  <div className="text-end">
                    <span className="text-muted">
                      Total
                    </span>

                    <h4 className="fw-bold text-primary">
                      $80
                    </h4>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Order Summary */}
        <div className="col-lg-4">

          <div
            className="card border-0 shadow rounded-4"
            style={{ position: "sticky", top: "90px" }}
          >
            <div className="card-body p-4">

              <h3 className="fw-bold mb-4">
                Order Summary
              </h3>

              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <strong>$320</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>
                <strong className="text-success">Free</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Tax</span>
                <strong>$20</strong>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <h4>Total</h4>
                <h4 className="text-primary">$340</h4>
              </div>

              <button className="btn btn-dark btn-lg w-100 rounded-pill mb-3">
                Checkout
              </button>

              <button className="btn btn-outline-dark w-100 rounded-pill">
                Continue Shopping
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Cart;