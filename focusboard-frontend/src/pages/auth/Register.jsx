import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";
import AuthInput from "../../components/ui/AuthInput";
import AuthButton from "../../components/ui/AuthButtons";
import AuthLeftPanel from "../../components/ui/AuthLeftPanel";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/auth/register', form);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            toast.success(`Welcome, ${data.user.name}!`);
            navigate('/dashboard');
        } catch (err) {
            const errors = err.response?.data?.errors;
            if (errors) {
                errors.forEach(e => toast.error(e.message));
            } else {
                toast.error(err.response?.data?.message || 'Registration failed');
            }
        } finally {
            setLoading(false);
        }  
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Left Panel*/}
            <AuthLeftPanel />

            {/* Right Panel*/}
            <div className="flex items-center justify-center px-8 py-16">
                <div className="w-full max-w-sm flex flex-col gap-8">
                    
                    <div>
                        <h2 className="text-4xl mb-2" style={{ color: 'var(--text-primary)'}}>Create Account</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Start planning smarter today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <AuthInput
                            label="Full Name"
                            name="name"
                            type="text"
                            placeholder="Daniel Pombo"
                            value={form.name}
                            onChange={handleChange}
                            autoFocus
                        />
                        <AuthInput 
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            autoFocus
                        />

                        <AuthInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                        />

                        <AuthButton loading={loading} label="Sign Up"/>
                    </form>

                    <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Already have an account?{' '}
                        <Link  to="/login" className="font-medium hover:underline" style={{ color: 'var(--accent)' }}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}