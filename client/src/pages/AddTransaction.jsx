import { useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addTransaction } from '../services/transactionService';
import { useNavigate } from 'react-router-dom';

const categoryOptions = ['Food', 'Rent', 'Salary', 'Transport', 'Shopping'];
const paymentMethods = ['Cash', 'Card', 'Bank', 'Mobile Wallet', 'Other'];
const formatDateInput = (date) => date.toISOString().split('T')[0];

const AddTransaction = () => {
    const navigation = useNavigate();
    const today = useMemo(() => new Date(), []);
    const [formData, setFormData] = useState({
        type: 'Expense',
        amount: '',
        category: 'Food',
        description: '',
        date: formatDateInput(today),
        payment_method: 'Cash'
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            type: formData.type,
            amount: Number(formData.amount),
            category: formData.category,
            description: formData.description,
            date: formData.date,
            payment_method: formData.payment_method
        };

        addTransaction(payload)
            .then(() => {
                toast.success('Transaction added successfully.');
                navigation('/transactions');
            })
            .catch((err) => {
                toast.error(err?.response?.data?.error || err?.response?.data?.message || 'Unable to add transaction. Please try again.');
            });
    };

    return (
        <main className='transaction-page'>
            <section className='transaction-header'>
                <h1>Add Transaction</h1>
                <p>Capture a new income or expense entry with all required transaction details.</p>
            </section>

            <section className='transaction-layout'>
                <article className='card transaction-form-card'>
                    <form className='transaction-form' onSubmit={handleSubmit}>
                        <div className='field-group'>
                            <label htmlFor='type'>Type</label>
                            <select id='type' name='type' value={formData.type} onChange={handleChange}>
                                <option value='Expense'>Expense</option>
                                <option value='Income'>Income</option>
                            </select>
                        </div>

                        <div className='field-group'>
                            <label htmlFor='amount'>Amount</label>
                            <input
                                id='amount'
                                name='amount'
                                type='number'
                                min='0'
                                step='0.01'
                                placeholder='2500'
                                value={formData.amount}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='field-group'>
                            <label htmlFor='category'>Category</label>
                            <select id='category' name='category' value={formData.category} onChange={handleChange}>
                                {categoryOptions.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='field-group'>
                            <label htmlFor='date'>Date</label>
                            <input
                                id='date'
                                name='date'
                                type='date'
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='field-group'>
                            <label htmlFor='payment_method'>Payment Method</label>
                            <select
                                id='payment_method'
                                name='payment_method'
                                value={formData.payment_method}
                                onChange={handleChange}
                            >
                                {paymentMethods.map((method) => (
                                    <option key={method} value={method}>
                                        {method}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='field-group full-width'>
                            <label htmlFor='description'>Description</label>
                            <textarea
                                id='description'
                                name='description'
                                rows='4'
                                placeholder='Dinner at restaurant'
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='transaction-actions full-width'>
                            <button type='submit'>Save Transaction</button>
                        </div>
                    </form>
                </article>
            </section>

            <ToastContainer position='top-right' autoClose={2500} />
        </main>
    );
};

export default AddTransaction;
