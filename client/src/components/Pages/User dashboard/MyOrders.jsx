import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import '../../../styles/myOrders.scss';
import PizzaContext from '../../../context/pizzaContext';

const ITEMS_PER_PAGE = 8;

const getBackgroundColor = (status) => {
  switch (status) {
    case 'preparing':
      return 'blue';
    case 'shipped':
      return 'grey';
    case 'delivered':
      return 'green';
    default:
      return 'transparent';
  }
};

const MyOrders = () => {
  const { orders, order } = useContext(PizzaContext);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    orders();
    // console.log(order)
  }, [orders]);

  const totalPages = Math.ceil(order.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = order.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className="tableClass">
      <main>
        {localStorage.getItem("token") ? (
          order.length === 0 ? ( // Check if there are no orders
            <div className="no-orders-message">
              Oops! You haven't placed any orders yet. Add some pizza to your order list.
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Status</th>
                  <th>Item Qty</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((data, index) => (
                  <tr key={index + 1}>
                    <td>{data._id}</td>
                    <td style={{ color: getBackgroundColor(data.orderStatus.toLowerCase()) }}>{data.orderStatus}</td>
                    <td>{data.pizzas.length}</td>
                    <td>₹{(data.totalAmount).toFixed()}</td>
                    <td>{data.paymentMethod}</td>
                    <td>
                      <Link to={`/orderDetails/${data._id}`}>
                        <AiOutlineEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          <div className="no-orders-message">
            Oops! You have to <Link style={{ textDecoration: "none" }} to="/login">login</Link> first to see the Order list.
          </div>
        )}
        <div className="pagination position-absolute bottom-0 end-60">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? 'active' : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </main>
    </section>
  );
};

export default MyOrders;
