const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User.model");
const Order = require("../model/order.model")
const sendMail = require("../utils/sendMail");

const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;

            if (!name || !email || !password) return res.status(400).json({
                message: "Fill the following credentials"
            })

            if (!validateEmail(email)) return res.status(400).json({
                message: "Fill the correct email address"
            })

            const user = await User.findOne({ email })
            if (user) return res.status(400).json({
                message: "This email is already exists !!!"
            })

            if (password.length < 4) return res.status(400).json({
                message: "password will be of 4 charactor"
            })

            const hashPassword = await bcrypt.hash(password, 12)

            const newUser = {
                name, email, password: hashPassword, role
            }

            const authToken = getTokenKey(newUser)

            const url = ` ${process.env.CLIENT_URL}/verification/${authToken} `
            sendMail(email, url, "Verify your account")

            res.json({
                success: true,
                message: "You are almost there Verify the account and Enjoy our Pizzas !!!",
                newUser, authToken, url
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    verification: async (req, res) => {
        try {
            const { authToken } = req.body
            const user = jwt.verify(authToken, process.env.TOKEN_KEY) || { name: '', email: '', password: '' };

            const { name, email, password } = user

            const check = await User.findOne({ email })
            if (check) return res.status(400).json({ msg: "This email already exists." })

            const newUser = new User({
                name, email, password
            })

            await newUser.save()

            res.json({ msg: "Account activated Enjoy our pizzas !!!" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email })
            if (!user) return res.status(400).json({ message: "This email dosen't exists." })

            const comparePassword = await bcrypt.compare(password, user.password)
            if (!comparePassword) return res.status(400).json({ message: "Password dosen't match." })

            const refreshToken = getTokenKey({ id: user._id })
            res.cookie("refreshtoken", refreshToken, {
                httpOnly: true,
                path: "/token"
            })
            res.json({ success: true, message: "Login Successfully !!!", refreshToken })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    forgotPassword: async (req, res) => {
        try {
            console.log(req.cookies)

            const { email } = req.body

            const user = await User.findOne({ email })
            if (!user) return res.status(400).json({ message: "This email dosen't exists." })

            const accessToken = getTokenKey({ id: user._id })

            const url = ` ${process.env.CLIENT_URL}/reset/${accessToken} `
            sendMail(email, url, "Reset your password")

            res.json({success: true, message: "Change Your password go to your email address and verify" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    resetPassword: async (req, res) => {
        try {
            const {password} = req.body
            // console.log(password)
            const passwordHash = await bcrypt.hash(password, 12)

            await User.findOneAndUpdate({id: req.user._id}, {
                password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getUserInfor: async (req, res) => {
        try {
            const userId = req.params.userId
            const user = await User.findById(userId).select("-password");

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json({ error: "An error occurred" });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { name } = req.body
            await User.findByIdAndUpdate({ _id: req.user.id }, {
                name
            })

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUsersAllInfor: async (req, res) => {
        try {
            const users = await User.find().select('-password')
            res.json(users)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUserRole: async (req, res) => {
        try {
            const { id } = req.params;
            const { role } = req.body;

            if (!id) {
                return res.status(400).json({ message: 'User ID not provided.' });
            }

            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            if (role !== undefined && typeof role === "number") {
                user.role = role;
            } else {
                return res.status(400).json({ message: 'Invalid role value.' });
            }

            await user.save();

            res.json({success: true, message: 'User role updated successfully.', user });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.json({ msg: "Deleted Success!" });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getAdminUsers: async (req, res, next) => {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            users,
        });
    },

    getAdminStats: async (req, res, next) => {
        const usersCount = await User.countDocuments();
      
        const orders = await Order.find({});
      
        const preparingOrders = orders.filter((i) => i.orderStatus === "Preparing");
        const shippedOrders = orders.filter((i) => i.orderStatus === "Shipped");
        const deliveredOrders = orders.filter((i) => i.orderStatus === "Delivered");
      
        let totalIncome = 0;
      
        orders.forEach((i) => {
          totalIncome += i.totalAmount;
        });
      
        res.status(200).json({
          success: true,
          usersCount,
          ordersCount: {
            total: orders.length,
            preparing: preparingOrders.length,
            shipped: shippedOrders.length,
            delivered: deliveredOrders.length,
          },
          totalIncome,
        });
      },
      getUser: async (req, res) => {
        try {            
            const userId = req.user.id
            const user = await User.findById( userId ).select("-password")
    
    
            res.json({ user, success:true })
            
        } catch (err) {
            res.status(500).json(err.message)
        }
      }
}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const getTokenKey = (payload) => {
    return jwt.sign(payload, process.env.TOKEN_KEY || "fallback-secret-key");
};

module.exports = userCtrl;
