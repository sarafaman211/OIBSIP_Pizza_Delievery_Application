const Order = require("../model/order.model");
const Payment = require("../model/Payment.model")
const Razorpay = require("razorpay")
const Crypto = require("crypto");

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

const orderCtrl = {
    placeOrder: async (req, res, next) => {
        try {
            const { shippingInfo, pizzas, paymentMethod, paymentInfo, itemsPrice, taxPrice, shippingCharges, totalAmount, orderStatus } = req.body;

            const user = req.user.id;
            // console.log(user)

            const orderOptions = { shippingInfo, pizzas, user, paymentMethod, paymentInfo, itemsPrice, taxPrice, shippingCharges, totalAmount, orderStatus };

            const createdOrder = new Order(orderOptions);

            const saveOrder = await createdOrder.save()

            res.status(201).json({
                success: true,
                message: "Order Placed Successfully via Cash On Delievery",
                order: saveOrder,
            });
        } catch (error) {
            next(error);
        }
    },

    placeOrderOnline: async (req, res, next) => {
        const { shippingInfo, pizzas, paymentMethod, paymentInfo, itemsPrice, taxPrice, shippingCharges, totalAmount, orderStatus } = req.body;

        const user = req.user.id;
        const orderOptions = { shippingInfo, pizzas, user, paymentMethod, paymentInfo, itemsPrice, taxPrice, shippingCharges, totalAmount, orderStatus,  paidAt: new Date(Date.now()) };

        try {
            const options = {
                amount: Number(req.body.totalAmount * 100),
                currency: "INR",
            };

            // Create a Razorpay order
            const order = await instance.orders.create(options);

            // Create a new Payment document and save it to the database
            const payment = new Payment({
                razorpay_order_id: order.id, // Store the Razorpay order ID
                razorpay_payment_id: req.body.razorpay_payment_id, // Include the payment ID
                razorpay_signature: req.body.razorpay_signature, // Include the signature
                // Add other payment-related fields as needed
            });

            // Create a new Order document and reference the payment using the ObjectId
            const createdOrder = new Order(orderOptions);
            createdOrder.paymentInfo = payment._id;

            await createdOrder.save();

            res.status(200).json({
                success: true,
                order,
                orderOptions
            });
        } catch (error) {
            next(error);
        }
    },

    paymentVerification: async (req, res, next) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = Crypto
            .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        console.log(isAuthentic);

        if (isAuthentic) {
            // Create Payment record first
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            });

            try {
                await payment.save();
                console.log("Payment saved:", payment);

                // Now create the Order record
                const order = new Order({
                    ...orderOptions,
                    paidAt: new Date(Date.now()),
                    paymentInfo: payment._id,
                });

                await order.save();
                console.log("Order saved:", order);

                res.redirect(
                    `http://localhost:3000/paymentSuccess?reference=${razorpay_payment_id}`
                );
            } catch (error) {
                console.error("Error saving payment or order:", error);
                res.status(500).json({
                    success: false,
                    error: "Internal server error",
                });
            }
        } else {
            res.status(400).json({
                success: false,
                error: "Payment verification is failed",
            });
        }
    },




    getOrders: async (req, res, next) => {
        try {
            const { search, page, pageSize, predefinedPizza, customPizza } = req.query;
    
            const filter = {};
            if (predefinedPizza) {
                filter["pizzas.predefinedPizza._id"] = predefinedPizza;
            }
            if (customPizza) {
                filter["pizzas.customPizza._id"] = customPizza;
            }
    
            const searchConditions = [];
            if (search) {
                searchConditions.push(
                    { "shippingInfo.city": { $regex: search, $options: "i" } },
                    { "user.name": { $regex: search, $options: "i" } }
                    // Add more search conditions for other fields if needed
                );
            }
            if (searchConditions.length > 0) {
                filter["$or"] = searchConditions;
            }
    
            const options = {
                skip: (parseInt(page) - 1) * parseInt(pageSize) || 0,
                limit: parseInt(pageSize) || 10,
            };
    
            const orders = await Order.find(filter)
                .populate("user", "name")
                .skip(options.skip)
                .limit(options.limit)
                .exec();
    
            const totalItems = await Order.countDocuments(filter);
    
            const predefinedPizzaCount = await Order.countDocuments({
                ...filter,
                "pizzas.isPredefined": true,
            });
    
            const customPizzaCount = await Order.countDocuments({
                ...filter,
                "pizzas.isPredefined": false,
            });
    
            const totalPages = Math.ceil(totalItems / options.limit);
    
            res.status(200).json({
                success: true,
                totalItems,
                totalPages,
                itemsPerPage: options.limit,
                predefinedPizzaCount,
                customPizzaCount,
                orders,
            });
        } catch (error) {
            console.log(error);
        }
    },
    

    getOrderDetails: async (req, res) => {
        const order = await Order.findById(req.params.id).populate('user', 'name');

        if (!order) return res.status(404).json({ message: "Invalid Order Id" });

        res.status(200).json({
            success: true,
            order,
        });
    },

    getAdminOrders: async (req, res, next) => {

        try {
            if (!req.user) {
                return res.status(400).json({ message: "No User found" });
            }

            const userId = req.user.id;
            const { search, page, pageSize, predefinedPizza, customPizza } =
                req.query;

            const filter = { user: userId };
            if (predefinedPizza) {
                filter["pizzas.predefinedPizza._id"] = predefinedPizza;
            }
            if (customPizza) {
                filter["pizzas.customPizza._id"] = customPizza;
            }

            const searchConditions = [];
            if (search) {
                searchConditions.push(
                    { "shippingInfo.city": { $regex: search, $options: "i" } },
                    { "user.name": { $regex: search, $options: "i" } }
                    // Add more search conditions for other fields if needed
                );
            }
            if (searchConditions.length > 0) {
                filter["$or"] = searchConditions;
            }

            const options = {
                skip: (parseInt(page) - 1) * parseInt(pageSize) || 0,
                limit: parseInt(pageSize) || 10,
            };

            const orders = await Order.find(filter)
                .populate("user", "name")
                .skip(options.skip)
                .limit(options.limit)
                .exec();

            const totalItems = await Order.countDocuments(filter);

            const predefinedPizzaCount = await Order.countDocuments({
                ...filter,
                "pizzas.isPredefined": true,
            });

            const customPizzaCount = await Order.countDocuments({
                ...filter,
                "pizzas.isPredefined": false,
            });

            const totalPages = Math.ceil(totalItems / options.limit);

            res.status(200).json({
                success: true,
                totalItems,
                totalPages,
                itemsPerPage: options.limit,
                predefinedPizzaCount,
                customPizzaCount,
                orders,
            });
        } catch (error) {
            next(error);
        }
    },

    processOrder: async (req, res, next) => {
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ message: "Invalid Order Id" });

        if (order.orderStatus === "Preparing") order.orderStatus = "Shipped";
        else if (order.orderStatus === "Shipped") {
            order.orderStatus = "Delivered";
            order.deliveredAt = new Date(Date.now());
        } else if (order.orderStatus === "Delivered")
            return next(new ErrorHandler("Food Already Delivered", 400));

        await order.save();

        res.status(200).json({
            success: true,
            message: "Status Updated Successfully",
        });
    }


};

module.exports = orderCtrl;
