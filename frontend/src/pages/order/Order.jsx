import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../features/order/orderSlice"; // Adjust path to your slice
import Navbar from "../../components/Navbar";

function Order() {
  const dispatch = useDispatch();

  // Assuming orders array is stored in state.order.orders
  const { orders = [], isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // Helper for status badge colors
  const getBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "paid":
        return "bg-success";
      case "pending":
        return "bg-warning text-dark";
      case "failed":
      case "cancelled":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary mb-3" role="status"></div>
        <h3>Loading your orders...</h3>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3 className="fw-bold mb-3">No Orders Found</h3>
        <p className="text-muted mb-4">You haven't placed any orders yet.</p>
        <Link to="/" className="btn btn-primary px-4 py-2 rounded-pill">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    
    <div className="container py-5">
      <Navbar />
      <h2 className="fw-bold mb-4">Order History</h2>

      <div className="d-flex flex-column gap-4">
        {orders.map((order) => {
          const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div key={order._id} className="card shadow-sm border-0 rounded-4 overflow-hidden">
              {/* Card Header with Order Meta */}
              <div className="card-header bg-light border-0 p-3 p-md-4">
                <div className="row align-items-center g-2">
                  <div className="col-md-3">
                    <small className="text-muted d-block">Order Placed</small>
                    <span className="fw-semibold">{formattedDate}</span>
                  </div>
                  <div className="col-md-3">
                    <small className="text-muted d-block">Order ID</small>
                    <span className="fw-monospace text-truncate d-block">{order._id}</span>
                  </div>
                  <div className="col-md-3">
                    <small className="text-muted d-block">Total</small>
                    <span className="fw-bold text-primary">${order.total?.toFixed(2)}</span>
                  </div>
                  <div className="col-md-3 text-md-end">
                    <span className={`badge ${getBadgeClass(order.paymentStatus)} px-3 py-2 rounded-pill me-2`}>
                      Payment: {order.paymentStatus}
                    </span>
                    {order.paymentStatus === "Pending" && (
                      <Link
                        to={`/payment/${order._id}`}
                        className="btn btn-sm btn-outline-primary rounded-pill mt-2 mt-md-0"
                      >
                        Pay Now
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Body with Items */}
              <div className="card-body p-3 p-md-4">
                <div className="d-flex flex-column gap-3">
                  {order.items?.map((item) => {
                    const product = item.product || {};
                    const price = item.price || product.price || 0;

                    return (
                      <div
                        key={item._id || product._id}
                        className="d-flex align-items-center justify-content-between pb-3 border-bottom last-no-border"
                      >
                        <div className="d-flex align-items-center gap-3">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.title}
                              className="rounded-3 border"
                              style={{ width: "65px", height: "65px", objectFit: "cover" }}
                            />
                          ) : (
                            <div
                              className="bg-light rounded-3 d-flex align-items-center justify-content-center text-muted"
                              style={{ width: "65px", height: "65px" }}
                            >
                              No Image
                            </div>
                          )}
                          <div>
                            <h6 className="fw-bold mb-1">{product.title || "Product"}</h6>
                            <small className="text-muted">
                              Qty: {item.quantity} × ${price.toFixed(2)}
                            </small>
                          </div>
                        </div>

                        <div className="text-end">
                          <strong className="d-block">${(price * item.quantity).toFixed(2)}</strong>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Subtotal / Tax Footer Breakdown */}
                <div className="mt-3 pt-2 d-flex justify-content-end gap-4 text-muted small">
                  <span>Subtotal: ${(order.subtotal || 0).toFixed(2)}</span>
                  <span>Tax: ${(order.tax || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Order