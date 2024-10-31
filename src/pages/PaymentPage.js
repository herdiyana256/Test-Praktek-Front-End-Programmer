import React, { useState } from 'react';
import { makePayment } from '../services/paymentService'; // Import fungsi dari service

const PaymentPage = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePayment = async () => {
    setError('');
    setSuccess('');

    try {
      const response = await makePayment(amount);
      setSuccess(`Payment successful: ${response.data.message}`);
    } catch (error) {
      setError('Payment failed: ' + error.response.data.message);
      console.error('Payment failed', error);
    }
  };

  return (
    <div>
      <h2>Make a Payment</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={handlePayment}>Pay</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default PaymentPage;
