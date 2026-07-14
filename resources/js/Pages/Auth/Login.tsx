import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const page = usePage<{
        flash?: {
            status?: string;
            phone?: string;
            otpStep?: boolean;
        };
    }>();

    const flashStatus = page.props.flash?.status || status;
    const flashPhone = page.props.flash?.phone || "";
    const otpStep = Boolean(page.props.flash?.otpStep);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false as boolean,
        otp: "",
    });

    // Keep email pre-filled going into the OTP step so it isn't lost.
    useEffect(() => {
        if (otpStep) reset("otp");
    }, [otpStep]);

    const credentialsSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            preserveScroll: true,
            onSuccess: () => reset("password"),
        });
    };

    const verifyOtp: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("mobile.otp.verify"), {
            preserveScroll: true,
            onFinish: () => reset("otp"),
        });
    };

    const resendOtp: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("mobile.otp.resend"), {
            preserveScroll: true,
        });
    };

    const backToPassword: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("mobile.otp.cancel"), {
            preserveScroll: true,
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <section className="gn-auth-page">
                <div className="gn-auth-shell">
                    {/* LEFT SIDE */}
                    <div className="gn-auth-left">
                        <div className="gn-auth-brand">
                            <span>🏠</span>
                            <span>GrihNirmaan</span>
                        </div>

                        <h1 className="gn-auth-title">
                            Your Gateway to Smarter Construction Management.
                        </h1>

                        <div className="gn-auth-points">
                            <div>
                                <span>✓</span>
                                Verified Admin Access
                            </div>

                            <div>
                                <span>✓</span>
                                Project & Lead Management
                            </div>
                        </div>

                        <div className="gn-robot-area">
                            <div className="gn-chat-bubble gn-chat-top">
                                <img
                                    src="/uploads/images/founder.jpg"
                                    alt="Admin"
                                />
                                <span>Can you summarize today's leads?</span>
                            </div>

                            <div className="gn-loop-line"></div>

                            <img
                                src="/uploads/images/Login-amico.svg"
                                alt="AI Robot"
                                className="gn-robot-image"
                            />

                            <div className="gn-chat-bubble gn-chat-bottom">
                                <div className="gn-bot-icon">🤖</div>
                                <span>
                                    Here's today's summary:
                                    <br />
                                    12 Leads, 4 Follow-ups.
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
                                <h2>Login</h2>
                            </div>

                            {flashStatus && (
                                <div className="gn-flash-message">
                                    {flashStatus}
                                </div>
                            )}

                            {/* STEP 1 — Email + Password (tabs removed) */}
                            {!otpStep && (
                                <form
                                    onSubmit={credentialsSubmit}
                                    className="gn-login-form"
                                >
                                    <div>
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            placeholder="Enter your email"
                                            className="gn-input"
                                            autoComplete="username"
                                            isFocused={true}
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
                                        <div className="gn-label-row">
                                            <InputLabel
                                                htmlFor="password"
                                                value="Password"
                                            />

                                            {canResetPassword && (
                                                <Link
                                                    href={route(
                                                        "password.request",
                                                    )}
                                                >
                                                    Forgot password?
                                                </Link>
                                            )}
                                        </div>

                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            placeholder="Enter password"
                                            className="gn-input"
                                            autoComplete="current-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />

                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    </div>

                                    <label className="gn-remember">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked,
                                                )
                                            }
                                        />

                                        <span>Remember me</span>
                                    </label>

                                    <PrimaryButton
                                        className="gn-submit-btn"
                                        disabled={processing}
                                    >
                                        {processing ? "Checking..." : "Login"}
                                    </PrimaryButton>
                                </form>
                            )}

                            {/* STEP 2 — OTP (appears only after password is verified) */}
                            {otpStep && (
                                <form
                                    onSubmit={verifyOtp}
                                    className="gn-login-form"
                                >
                                    <p className="gn-otp-hint">
                                        We sent a code to your registered mobile
                                        number {flashPhone && `(${flashPhone})`}
                                        .
                                    </p>

                                    <div>
                                        <InputLabel
                                            htmlFor="otp"
                                            value="Enter OTP"
                                        />

                                        <TextInput
                                            id="otp"
                                            type="text"
                                            name="otp"
                                            value={data.otp}
                                            maxLength={6}
                                            placeholder="Enter OTP"
                                            className="gn-input"
                                            autoComplete="one-time-code"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "otp",
                                                    e.target.value.replace(
                                                        /\D/g,
                                                        "",
                                                    ),
                                                )
                                            }
                                            required
                                        />

                                        <InputError
                                            message={errors.otp}
                                            className="mt-2"
                                        />
                                    </div>

                                    <PrimaryButton
                                        className="gn-submit-btn"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "Verifying..."
                                            : "Verify & Login"}
                                    </PrimaryButton>

                                    <div className="gn-otp-actions">
                                        <button
                                            type="button"
                                            onClick={resendOtp}
                                            className="gn-resend-otp"
                                        >
                                            Resend OTP
                                        </button>

                                        <button
                                            type="button"
                                            onClick={backToPassword}
                                            className="gn-change-number"
                                        >
                                            Back to login
                                        </button>
                                    </div>

                                    {import.meta.env.DEV && (
                                        <p className="gn-testing-otp">
                                            Local testing OTP: 123456
                                        </p>
                                    )}
                                </form>
                            )}

                            <p className="gn-signup-text">
                                Don't have account?{" "}
                                <Link href="/register">Sign Up Now !</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
