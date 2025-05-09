'use client';

import React, { useState } from "react";

const MailingListForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Submitted:", { name, email });
  };

  return (
    <section className="w-full max-w-md mx-auto p-6 bg-black text-white rounded-xl shadow-lg border border-yellow-400 backdrop-blur-md flex-1">
      <h2 className="text-2xl font-bold text-center mb-4 text-white">
        Join the Mailing List
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="email" className="sr-only">Email address</label>
        <input
          id="email"
          type="email"
          placeholder="Your.email@example.com"
          className="px-4 py-2 border border-white bg-transparent text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="name" className="sr-only">Your name</label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          className="px-4 py-2 border border-white bg-transparent text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md transition"
        >
          Submit
        </button>

        {submitted && <p className="text-green-400 text-sm mt-2 text-center">Thank you for signing up!</p>}
      </form>
    </section>
  );
};

export default MailingListForm;
