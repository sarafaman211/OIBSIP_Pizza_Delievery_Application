import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import pizzaContext from "../../../context/pizzaContext";
import Spinner from "../../Utils/Spinner";
const OrderDetails = () => {
    const { id } = useParams();
    const { orderById, orderId } = useContext(pizzaContext)

    useEffect(() => {
        orderById(id)
        // console.log(orderId)
        // console.log(id)
    }, [id, orderById, orderId])

    if (orderId === null || orderId === undefined) {
        return <Spinner />;
    }

    const formattedCreatedAt = new Date(orderId.createdAt).toLocaleString();

    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = (`${phoneNumber}`).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phoneNumber;
    };

    // const calculateTotalAmount = (orderId) => {
    //     let totalAmount = 0;

    //     for (const pizza of orderId.pizzas) {
    //         const pizzaTotal = pizza.isPredefined
    //             ? pizza.quantity * orderId.itemsPrice
    //             : pizza.quantity + orderId.itemsPrice;

    //         totalAmount += pizzaTotal;
    //     }

    //     return totalAmount;
    // };
    // const totalAmount = calculateTotalAmount(orderId);

    return (
        <section className="orderDetails">

            <main>
                <h1>Order Details</h1>
                <div className="row">

                    <div className="col-md-6 g-4">
                        <div className="card" style={{ width: "25rem" }}>
                            <div className="card-body">
                                <h5 className="card-title my-3">Status</h5>
                                <div>
                                    <div className="d-flex justify-content-between align-items-center my-2">
                                        <h5 className="card-subtitle text-body-secondary">Order Status</h5>
                                        <p className="card-text">  {orderId.orderStatus}</p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center my-2" >
                                        <h5 className="card-subtitle text-body-secondary">Placed At</h5>
                                        <p className="card-text">{formattedCreatedAt}</p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center my-2">
                                        <h5 className="card-subtitle text-body-secondary">Delivered At</h5>
                                        <p className="card-text"> {orderId.paidAt?orderId.paidAt : "it will update soon" }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-6 g-4">
                        <div className="card" style={{ width: "25rem" }}>
                            <div className="card-body">
                                <h5 className="card-title my-3">Payment</h5>
                                <div>
                                    <div className="d-flex justify-content-between align-items-center my-2">
                                        <h5 className="card-subtitle text-body-secondary">Payment Method</h5>
                                        <p className="card-text">{orderId.paymentMethod}</p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center my-2" >
                                        <h5 className="card-subtitle text-body-secondary">Payment Reference</h5>
                                        <p className="card-text">#{orderId._id}</p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center my-2">
                                        <h5 className="card-subtitle text-body-secondary">Paid At</h5>
                                        <p className="card-text"> {orderId.paidAt?orderId.paidAt : "it will update soon" }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 g-4">
                        <div className="card" style={{ width: "25rem" }}>
                            <div className="card-body">
                                <h5 className="card-title my-3">Amount</h5>
                                <div>
                                    <div className="d-flex justify-content-between align-items-center my-2">
                                        <h5 className="card-subtitle text-body-secondary">Items Total</h5>
                                        <p className="card-text">₹{orderId.pizzas.length}</p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center my-2">
                                        <h5 className="card-subtitle text-body-secondary">Shipping Charges</h5>
                                        <p className="card-text">₹{orderId.shippingCharges}</p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center my-2" >
                                        <h5 className="card-subtitle text-body-secondary">Tax</h5>
                                        <p className="card-text">₹{(orderId.taxPrice).toFixed()}</p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center my-2">
                                        <h5 className="card-subtitle text-body-secondary">Total Amount</h5>
                                        <p className="card-text">₹{(orderId.totalAmount).toFixed()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 g-4">
                        <div className="card" style={{ width: "25rem" }}>
                            <div className="card-body">
                                <h4 className="card-title my-3">Shipping</h4>
                                <div>
                                    <div className="d-flex justify-content-between align-items-center my-2">
                                        <h5 className="card-subtitle text-body-secondary">Address</h5>
                                        <p className="card-text" style={{ marginLeft: '3rem' }}>{orderId.shippingInfo.hNo}, {orderId.shippingInfo.city}, {orderId.shippingInfo.state},
                                            {orderId.shippingInfo.pinCode}, {orderId.shippingInfo.country}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 g-4">
                        <div className="card" style={{ width: "25rem" }}>
                            <div className="card-body">
                                <h5 className="card-title my-3">Contact</h5>
                                <div>
                                    <div className="d-flex justify-content-between align-items-center my-2">
                                        <h5 className="card-subtitle text-body-secondary">Name</h5>
                                        <p className="card-text">   { orderId.user.name }</p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center my-2" >
                                        <h5 className="card-subtitle text-body-secondary">Phone</h5>
                                        <p className="card-text"> {formatPhoneNumber(orderId.shippingInfo.phoneNo)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <article>
                    <h1>Ordered Items</h1>

                    {orderId.pizzas.map((pizza, index) => (
                        <div key={index}>
                            {pizza.isPredefined ? (
                                <div>
                                    <div>
                                        <h4>Predefined Pizza</h4>
                                        <p>Pizza Name: {pizza.predefinedPizza.pizza.name}</p>
                                    </div>
                                    <div>
                                        <span>{pizza.quantity}</span> x <span>₹{pizza.predefinedPizza.pizza.varients[0]?.price || 99}</span>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h4>Custom Pizza</h4>
                                    <div>
                                        <span>{pizza.quantity}</span> x <span>₹{pizza.customPizza.price}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <div>
                    <div>
                            <h4 style={{ fontWeight: 800 }}>Tax</h4>
                            <div style={{ fontWeight: 800 }}>₹{(orderId.taxPrice).toFixed()}</div>
                        </div>
                        <div>
                            <h4 style={{ fontWeight: 800 }}>Sub Totals</h4>
                            <div style={{ fontWeight: 800 }}>₹{(orderId.totalAmount).toFixed()}</div>
                        </div>
                    </div>
                </article>

            </main>
        </section >

    );
};

export default OrderDetails;
