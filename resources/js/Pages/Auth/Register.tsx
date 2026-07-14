import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <section className="gn-auth-page">
                <div className="gn-auth-shell">
                    {/* LEFT SIDE */}
                    <div className="gn-auth-left">
                        <div className="gn-auth-brand">
                            <span>🏠</span>
                            <span>GrihNirmaan</span>
                        </div>

                        <h1 className="gn-auth-title">
                            Start Your Smart Construction Journey.
                        </h1>

                        <div className="gn-auth-points">
                            <div>
                                <span>✓</span>
                                Secure Customer Portal Access
                            </div>

                            <div>
                                <span>✓</span>
                                Track Projects, Documents & Milestones
                            </div>
                        </div>

                        <div className="gn-robot-area">
                            <div className="gn-chat-bubble gn-chat-top">
                                <img
                                    src="/uploads/images/founder.jpg"
                                    alt="Admin"
                                />

                                <span>Can I track my home progress online?</span>
                            </div>

                            <div className="gn-loop-line"></div>

                            <img
                                src="/uploads/images/Sign up-amico.svg"
                                alt="AI Robot"
                                className="gn-robot-image"
                            />

                            <div className="gn-chat-bubble gn-chat-bottom">
                                <div className="gn-bot-icon">🤖</div>

                                <span>
                                    Yes! Create your account
                                    <br />
                                    and manage everything securely.
                                </span>
                            </div>

                            <img
                                src="/uploads/images/city.png"
                                alt=""
                                className="gn-city-image"
                            />
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="gn-auth-right">
                        <div className="gn-login-card">
                            <div className="gn-login-heading">
                                <h2>Create Account </h2>
                                
                            </div>

                            <form onSubmit={submit} className="gn-login-form">
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Full Name"
                                    />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        placeholder="Enter full name"
                                        className="gn-input"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="Email Address"
                                    />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        placeholder="Enter email address"
                                        className="gn-input"
                                        autoComplete="username"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="phone"
                                        value="Phone Number"
                                    />

                                    <TextInput
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        value={data.phone}
                                        placeholder="Enter mobile number"
                                        className="gn-input"
                                        autoComplete="tel"
                                        maxLength={10}
                                        onChange={(e) =>
                                            setData(
                                                "phone",
                                                e.target.value.replace(
                                                    /\D/g,
                                                    "",
                                                ),
                                            )
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.phone}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        placeholder="Create password"
                                        className="gn-input"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                    />

                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        placeholder="Confirm password"
                                        className="gn-input"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>

                                <PrimaryButton
                                    className="gn-submit-btn"
                                    disabled={processing}
                                >
                                    {processing
                                        ? "Creating account..."
                                        : "Create Account"}
                                </PrimaryButton>
                            </form>

                            <p className="gn-signup-text">
                                Already registered?{" "}
                                <Link href={route("login")}>Login Now !</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
