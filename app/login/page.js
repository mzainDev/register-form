"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation"; // to handle redirects
import Swal from "sweetalert2"; // Import SweetAlert
import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";

// Validation Schema
const validationSchema = Yup.object({
    email: Yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
    password: Yup.string()
        .required("كلمة المرور مطلوبة")
        .min(6, "يجب أن تكون كلمة المرور على الأقل 6 أحرف"),
    remember: Yup.boolean(), // Validation for the remember checkbox
});

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter(); // for redirecting
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            remember: true, // Default value is true
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                // Send login request to the backend
                // const response = await fetch("http://localhost:5000/api/auth/signin", {
                const response = await fetch("https://rawdhat.com/api/auth/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("Login successful:", data);
                    // Get 'code' and 'centerId' from the backend response
                    const { code, centerId } = data;

                    // Redirect to the desired URL with 'code' and 'centerId' as query parameters
                    // router.push(`http://localhost:3000/signin/?code=${code}&centerId=${centerId}`);
                    router.push(`https://rawdhat.com/signin/?code=${code}&centerId=${centerId}`);
                } else {
                    console.error("Login failed:", data.message);

                    if (data.message === "Email not found") {
                        // Show SweetAlert if "Email not found"
                        Swal.fire({
                            icon: "error",
                            title: "البريد الإلكتروني غير موجود",
                            text: "يرجى التحقق من بريدك الإلكتروني أو إنشاء حساب.",
                            confirmButtonText: "الانتقال إلى التسجيل",
                        }).then(() => {
                            // Redirect to signup page after user closes SweetAlert
                            router.push("/signup");
                        });
                    } else {
                        // If it's another error, show it as Link normal alert
                        Swal.fire({
                            icon: "error",
                            title: "فشل تسجيل الدخول",
                            text: "كلمة مرور غير صحيحة",
                            confirmButtonText: "حاول مرة أخرى",
                        });
                    }
                }
            } catch (error) {
                console.error("Error during login:", error);
                alert("حدث خطأ. يرجى المحاولة مرة أخرى.");
            }
        }
    });

    const passwordStyles = {
        wrapper: {
            position: 'relative',
            width: '100%'
        },
        eye: {
            position: 'absolute',
            left: '10px',
            top: '40%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            userSelect: 'none',
            fontSize: '20px'
        },
        input: {
            paddingLeft: '35px',
            width: '100%'
        }
    };

    return (
        <div className="login-container">
            <div className="left-side">
                <ExportedImage
                    unoptimized="true"
                    width={500}
                    height={500}
                    src="./login1.png"
                    alt="Login Illustration"
                    className="signup-image"
                />
            </div>

            <div className="right-side">
                <div className="form-container">
                    <div className="form-header">
                        <ExportedImage
                            unoptimized="true"
                            width={100}
                            height={100}
                            src="./logo.png"
                            alt="Logo"
                            className="signlogo"
                        />
                        <h6 className="green login-title">مركز وقت الطفل لضيافة الأطفال</h6>

                        <h4 className="py-3">تسجيل الدخول</h4>
                    </div>

                    <form onSubmit={formik.handleSubmit}>
                        <input
                            className="input-field"
                            type="email"
                            name="email"
                            placeholder=":البريد الإلكتروني"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="error-message">{formik.errors.email}</div>
                        )}

                        <div style={passwordStyles.wrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="كلمة المرور:"
                                style={passwordStyles.input}
                                className="input-field"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            <span
                                style={passwordStyles.eye}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </span>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <div className="error-message">{formik.errors.password}</div>
                        )}

                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                name="remember"
                                id="remember"
                                checked={formik.values.remember}
                                onChange={formik.handleChange}
                                className="checkbox-input"
                            />
                            <label htmlFor="remember" className="checkbox-label">:تذكرني</label>
                        </div>

                        <button type="submit" className="submit-btn">
                            تسجيل الدخول
                        </button>
                    </form>

                    <p className="register-link">
                        هل لديك حساب بالفعل؟{" "}
                        <Link href="/">إنشاء حساب</Link>
                    </p>
                </div>
            </div>

            <style jsx>{`
        .form-header {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .checkbox-container {
          display: flex;
          align-items: center;
          margin-top: 10px;
          margin-bottom: 20px;
          direction:rtl;
        }

        .checkbox-input {
          margin-left: 10px;
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .checkbox-label {
          font-size: 14px;
          color: #333;
        }

        .checkbox-label:hover {
          text-decoration: underline;
        }
      `}</style>
        </div>
    );
};

export default Login;
