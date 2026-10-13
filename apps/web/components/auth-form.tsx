"use client";
import { useState } from "react";
import { authClient } from "../lib/auth-client";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const result = await authClient.signIn.email({
                email,
                password,
            });
            if (result?.error) {
                setError(result.error.message || "Login failed");
            } else {
                setSuccess("Signed in successfully!");
            }
        } catch (err) {
            console.error("Login failed:", err);
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold">Sign In</h2>
            {error && (
                <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-md">
                    {error}
                </div>
            )}
            {success && (
                <div className="p-3 text-sm text-green-700 bg-green-100 border border-green-300 rounded-md">
                    {success}
                </div>
            )}
            <div>
                <label htmlFor="email" className="block text-sm font-medium">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
                {isLoading ? "Signing in..." : "Sign In"}
            </button>
        </form>
    );
}

export function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const result = await authClient.signUp.email({
                email,
                password,
                name,
            });
            if (result?.error) {
                setError(result.error.message || "Sign up failed");
            } else {
                setSuccess("Account created successfully!");
            }
        } catch (err) {
            console.error("Sign up failed:", err);
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold">Sign Up</h2>
            {error && (
                <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-md">
                    {error}
                </div>
            )}
            {success && (
                <div className="p-3 text-sm text-green-700 bg-green-100 border border-green-300 rounded-md">
                    {success}
                </div>
            )}
            <div>
                <label htmlFor="name" className="block text-sm font-medium">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <div>
                <label htmlFor="signup-email" className="block text-sm font-medium">
                    Email
                </label>
                <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <div>
                <label htmlFor="signup-password" className="block text-sm font-medium">
                    Password
                </label>
                <input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
                {isLoading ? "Signing up..." : "Sign Up"}
            </button>
        </form>
    );
}
