const db = require('../config/db'); 

// Save a new payment method
exports.savePaymentMethod = async (req, res) => {
    try {
        const { payment_type, account_number } = req.body;
        
        // Assuming your auth middleware attaches the user object to req.user
        const userId = req.user.id || req.user.userId; 

        if (!payment_type || !account_number) {
            return res.status(400).json({ message: "Please provide payment type and account number." });
        }

        const query = 'INSERT INTO payment_methods (user_id, payment_type, account_number) VALUES (?, ?, ?)';
        await db.query(query, [userId, payment_type, account_number]);

        res.status(201).json({ message: "Payment method saved successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while saving payment method." });
    }
};

// Get all payment methods for the logged-in user
exports.getMyPaymentMethods = async (req, res) => {
    try {
        const userId = req.user.id || req.user.userId;
        const query = 'SELECT * FROM payment_methods WHERE user_id = ?';
        
        const [methods] = await db.query(query, [userId]);
        res.status(200).json(methods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while fetching payment methods." });
    }
};