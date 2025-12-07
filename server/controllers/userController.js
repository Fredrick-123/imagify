import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import razorpay from 'razorpay';
import Transaction from '../models/transactionModel.js';

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Please enter all fields" });
        }

        let existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "User already exists " });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new User(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ success: true, token, user: { name: user.name } });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

            res.json({ success: true, token, user: { name: user.name } });
        }
        else {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

const userCredits = async (req, res) => {
    try {
        const userId = req.user;

        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        res.json({ success: true, credits: user.creditbalance, user: { name: user.name } });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const paymentRazorpay = async (req, res) => {
    try {
        const userId = req.user;
        const { planId } = req.body;

        const userData = await User.findById(userId);

        if (!userData || !planId) {
            res.json({ success: false, message: 'Missing details' })
        }

        let credits, plan, amount, date;

        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 1
                amount = 10
                break;

            case 'Advanced':
                plan = 'Advanced'
                credits = 5
                amount = 50
                break;

            case 'Business':
                plan = 'Business'
                credits = 50
                amount = 250
                break;
            default:
                return res.json({ success: false, message: 'Plan not found' });
        }

        date = new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour12: false
        });

        const transactionData = {
            userId, plan, amount, credits, date
        }

        const newTransaction = await Transaction.create(transactionData);

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id

        }
        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                res.json({ success: false, message: error.message });
            }
            res.json({ success: true, order });
        });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const userId = req.user;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === 'paid') {
            const transactionData = await Transaction.findById(orderInfo.receipt)
            if (transactionData.payment) {
                return res.json({ success: false, message: "Payment Failed" })
            }

            const userData = await User.findById(transactionData.userId);

            const creditBalance = userData.creditbalance + transactionData.credits;

            await User.findByIdAndUpdate(userData._id, { creditbalance: creditBalance })

            await Transaction.findByIdAndUpdate(transactionData._id, { payment: true })

            res.json({ success: true, message: "Credits Added" });
        }
        else {
            res.json({ success: false, message: "Payment Failed" })
        }

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay };