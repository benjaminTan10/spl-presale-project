// components/SubscribeForm.js
import { useState } from 'react';

const SubscribeForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Example API call (replace with your actual endpoint)
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            setMessage('Thank you for subscribing!');
            setEmail('');
        } else {
            setMessage('Subscription failed. Please try again.');
        }
    };

    return (
        <div className="max-w-md p-4 mx-auto rounded-lg2 bg-yellow-00">
            <h2 className="mb-4 text-3xl font-bold text-green-700">Subscribe to our Newsletter</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full p-2 mb-4 text-green-900 bg-[#text-cB] border border-gray-300 rounded"
                // className="w-full p-2 mb-4 text-green-900 bg-yellow-300 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Subscribe
                </button>
            </form>
            {message && <p className="mt-2 text-center">{message}</p>}
        </div>
    );
};

export default SubscribeForm;
