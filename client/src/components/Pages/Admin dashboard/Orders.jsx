import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { AiOutlineEye } from "react-icons/ai"
import { GiArmoredBoomerang } from "react-icons/gi"
import PizzaContext from "../../../context/pizzaContext"

const ITEMS_PER_PAGE = 5;

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

const Orders = () => {
  const { orders, order } = useContext(PizzaContext)
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(order.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = order.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = async (id) =>{
    await fetch(`http://localhost:5000/api/orders/admin/stats/${ id }`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    })
  }

  useEffect(() => {
    orders()
  }, [orders])

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
    <section className="tableClass" style={{ marginTop: "4rem" }}>
      <main>
        {order.length === 0 ? (
          <p style={{ color: "grey", textAlign: "center" }}>No orders placed.</p>
        ) : (
          <>
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
                    <td style={{ color: "green" }}>{data._id}</td>
                    <td style={{ color: getBackgroundColor(data.orderStatus.toLowerCase()) }}>{data.orderStatus}</td>
                    <td>{data.pizzas.length}</td>
                    <td>₹{(data.totalAmount).toFixed(0,5)}</td>
                    <td>{data.paymentMethod}</td>
                    <td>
                      <Link to={`/orderDetails/${data._id}`}>
                        <AiOutlineEye />
                      </Link>
                      <button>
                        <GiArmoredBoomerang onClick={() => handleClick(data._id)} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          </>
        )}
      </main>
    </section>
  )
}

export default Orders;
