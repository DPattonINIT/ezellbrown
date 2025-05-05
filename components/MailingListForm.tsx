import React, { useState } from "react";

const MailingListForm = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitted:", { name, email });
        // TODO: Connect to API or mailing service here
    };

    return (
        <section className="w-full max-w-md mx-auto mt-16 p-6 bg-black dark:bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4 text-black dark:text-black">
                Join the Mailing List
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="px-4 py-2 border border-black text-black placeholder-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="your-name"
                    className="px-4 py-2 border border-black text-black placeholder-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />


                <button
                    type="submit"
                    className="bg-black hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                >
                    Submit
                </button>
            </form>
        </section>
    );
};

export default MailingListForm;
