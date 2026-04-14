import { useEffect, useState } from "react";
import { listTransactions } from "../services/transactionService";
import { toast } from "react-toastify";

const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
});

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
});

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [hasTransactions, setHasTransactions] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await listTransactions();
                const data = response?.data.transactions || [];
                setTransactions(data);
                setHasTransactions(data.length > 0);
            } catch (error) {
                toast.error(error?.response?.data?.error || error?.response?.data?.message || 'Unable to fetch transactions. Please try again.');
            }
        };

        fetchTransactions();
    }, []);

    return (
        <main className='transactions-page'>
            <section className='transactions-header'>
                <h1>Transactions</h1>
                <p>View all income and expense entries in a structured table.</p>
            </section>

            <section className='card transactions-table-card'>
                {hasTransactions ? (
                    <div className='table-wrap'>
                        <table className='transactions-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Type</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Payment Method</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction, index) => (
                                    <tr key={transaction.id}>
                                        <td>#{index + 1}</td>
                                        <td>
                                            <span>
                                                {transaction.type}
                                            </span>
                                        </td>
                                        <td>{transaction.category}</td>
                                        <td>{transaction.description}</td>
                                        <td className={transaction.type === 'expense' ? 'amount expense' : 'amount income'}>
                                            {transaction.type === 'expense' ? '-' : '+'}
                                            {currencyFormatter.format(transaction.amount)}
                                        </td>
                                        <td>{dateFormatter.format(new Date(transaction.date))}</td>
                                        <td>{transaction.payment_method}</td>
                                        <td>{new Date(transaction.created_at).toLocaleString('en-IN')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='table-empty-state'>
                        <h2>No transactions yet</h2>
                        <p>Use the Add page to create your first transaction entry.</p>
                    </div>
                )}
            </section>
        </main>
    );
};

export default Transactions;
