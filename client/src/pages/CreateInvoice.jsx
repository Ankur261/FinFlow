import React, { useState } from 'react';
import axios from 'axios';

const CreateInvoice = () => {
  const [invoice, setInvoice] = useState({
    invoiceNumber: '',
    amount: '',
    dueDate: '',
    issueDate: '',
    status: '',
    customerId: '',
    merchantId: ''
  });

  const handleChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7261/api/invoice', invoice);
      alert('Invoice created successfully!');
      setInvoice({
        invoiceNumber: '',
        amount: '',
        dueDate: '',
        issueDate: '',
        status: '',
        customerId: '',
        merchantId: ''
      });
    } catch (err) {
      console.error('Error creating invoice:', err);
      alert('Failed to create invoice.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Invoice</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {['invoiceNumber', 'amount', 'status', 'customerId', 'merchantId'].map(field => (
          <input
            key={field}
            name={field}
            type="text"
            value={invoice[field]}
            onChange={handleChange}
            placeholder={field}
            className="w-full p-2 border"
          />
        ))}
        <input type="date" name="issueDate" value={invoice.issueDate} onChange={handleChange} className="w-full p-2 border" />
        <input type="date" name="dueDate" value={invoice.dueDate} onChange={handleChange} className="w-full p-2 border" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Create</button>
      </form>
    </div>
  );
};

export default CreateInvoice;
