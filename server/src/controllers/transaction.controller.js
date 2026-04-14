import pool from "../db/db.js";

export const addTransaction = async (req, res) => {
    try {
        const user_id = req.user.id;
        const {
            type,
            amount,
            category,
            description,
            date,
            payment_method
        } = req.body;

        const query = `
            INSERT INTO transactions
            (user_id, type, amount, category, description, date, payment_method)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `

        const values = [user_id, type, amount, category, description, date, payment_method];
        const result = await pool.query(query, values);
        res.status(201).json({
        success: true,
        transaction: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const listTransactions = async (req, res) => {
    try {
        const user_id = req.user.id;
        const query = `
            SELECT * FROM transactions
            WHERE user_id = $1
            ORDER BY date DESC
        `;
        const values = [user_id];
        const result = await pool.query(query, values);
        res.status(200).json({
            success: true,
            transactions: result.rows
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}