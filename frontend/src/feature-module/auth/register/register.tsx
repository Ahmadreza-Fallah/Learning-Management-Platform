import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import Slider from "react-slick";
import { all_routes } from "../../router/all_routes";
import { useAuth } from "../../../context/AuthContext";
import authService from "../../../services/auth.service";
const hasNumber = (value: string): boolean => {
  return /[0-9]/.test(value);
};

const hasMixed = (value: string): boolean => {
  return /[a-z]/.test(value) && /[A-Z]/.test(value);
};

const hasSpecial = (value: string): boolean => {
  return /[!#@$%^&*)(+=._-]/.test(value);
};

const strengthColor = (count: number): string => {
  if (count < 1) return "poor";
  if (count < 2) return "weak";
  if (count < 3) return "strong";
  if (count < 4) return "heavy";
  return "poor";
};

const Register: React.FC = () => {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      debugger;
      navigate(all_routes.homeone);
    }
  }, [isAuthenticated, navigate]);

  const [eye, setEye] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [validationError, setValidationError] = useState<number>(0);
  const [strength, setStrength] = useState<string>("");
  const [eyeConfirmPassword, setEyeConfirmPassword] = useState<boolean>(true);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const route = all_routes;

  const handleSubmit = async (event: React.FormEvent) => {
    debugger;
    event.preventDefault();
    setError("");
    try {
      const res = await authService.register({
        firstName,
        lastName,
        userName,
        mobile,
        email,
        password,
      });
      if (res) {
        debugger;
        navigate(route.login);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    }
  };

  const onEyeClick = () => {
    setEye((prev) => !prev);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setValidationError(1);
    } else if (value.length < 8) {
      setValidationError(2);
    } else if (!/[0-9]/.test(value)) {
      setValidationError(3);
    } else if (!/[!@#$%^&*()]/.test(value)) {
      setValidationError(4);
    } else {
      setValidationError(5);
    }
  };

  const loginSLider = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const messages = () => {
    switch (validationError) {
      case 2:
        return (
          <span
            id="poor"
            className="active mt-2"
            style={{ fontSize: 14, color: "#DC3545", marginTop: "8px" }}
          >
            ضعیف. رمز عبور باید حداقل ۸ کاراکتر داشته باشد.
          </span>
        );
      case 3:
        return (
          <span
            id="weak"
            className="active mt-2"
            style={{ fontSize: 14, color: "#FFC107", marginTop: "8px" }}
          >
            متوسط. از حروف و اعداد برای افزایش امنیت استفاده کنید.
          </span>
        );
      case 4:
        return (
          <span
            id="strong"
            className="active mt-2"
            style={{ fontSize: 14, color: "#0D6EFD", marginTop: "8px" }}
          >
            خوب. برای امنیت بیشتر، حداقل یک نماد مانند ! @ # $ % اضافه کنید.
          </span>
        );
      case 5:
        return (
          <span
            id="heavy"
            className="active mt-2"
            style={{ fontSize: 14, color: "#4BB543", marginTop: "8px" }}
          >
            عالی! رمز عبور شما امن است.
          </span>
        );
      default:
        return null;
    }
  };

  const strengthIndicator = (value: string): number => {
    let strengths = 0;
    if (value.length >= 8) strengths = 1;
    if (hasNumber(value) && value.length >= 8) strengths = 2;
    if (hasSpecial(value) && value.length >= 8 && hasNumber(value))
      strengths = 3;
    if (
      hasMixed(value) &&
      hasSpecial(value) &&
      value.length >= 8 &&
      hasNumber(value)
    )
      strengths = 3;
    return strengths;
  };

  useEffect(() => {
    if (password) {
      let strengthValue = strengthIndicator(password);
      let color = strengthColor(strengthValue);
      setStrength(color);
    } else {
      setStrength("");
    }
  }, [password]);

  return (
    <>
      <div className="main-wrapper">
        <div className="login-content">
          <div className="row">
            <div className="col-md-6 login-bg d-none d-lg-flex">
              <Slider {...loginSLider} className="login-carousel">
                <div>
                  <div className="login-carousel-section mb-3">
                    <div className="login-banner">
                      <ImageWithBasePath
                        src="assets/img/auth/auth-1.svg"
                        className="img-fluid"
                        alt="Logo"
                      />
                    </div>
                    <div className="mentor-course text-center">
                      <h3 className="mb-2">
                        Welcome to <br />
                        Dreams<span className="text-secondary">LMS</span>{" "}
                        Courses.
                      </h3>
                      <p>
                        Platform designed to help organizations, educators, and
                        learners manage, deliver, and track learning and
                        training activities.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="login-carousel-section mb-3">
                    <div className="login-banner">
                      <ImageWithBasePath
                        src="assets/img/auth/auth-1.svg"
                        className="img-fluid"
                        alt="Logo"
                      />
                    </div>
                    <div className="mentor-course text-center">
                      <h3 className="mb-2">
                        Welcome to <br />
                        Dreams<span className="text-secondary">LMS</span>{" "}
                        Courses.
                      </h3>
                      <p>
                        Platform designed to help organizations, educators, and
                        learners manage, deliver, and track learning and
                        training activities.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="login-carousel-section mb-3">
                    <div className="login-banner">
                      <ImageWithBasePath
                        src="assets/img/auth/auth-1.svg"
                        className="img-fluid"
                        alt="Logo"
                      />
                    </div>
                    <div className="mentor-course text-center">
                      <h3 className="mb-2">
                        Welcome to <br />
                        Dreams<span className="text-secondary">LMS</span>{" "}
                        Courses.
                      </h3>
                      <p>
                        Platform designed to help organizations, educators, and
                        learners manage, deliver, and track learning and
                        training activities.
                      </p>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
            <div className="col-md-6 login-wrap-bg">
              <div className="login-wrapper">
                <div className="loginbox">
                  <div className="w-100">
                    <div className="d-flex align-items-center justify-content-between login-header">
                      <ImageWithBasePath
                        src="assets/img/logo.svg"
                        className="img-fluid"
                        alt="Logo"
                      />
                      <Link to={route.homeone} className="link-1">
                        Back to Home
                      </Link>
                    </div>
                    <h1 className="fs-32 fw-bold topic">ثبت نام</h1>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    <form onSubmit={handleSubmit} className="mb-3 pb-3">
                      <div className="mb-3 position-relative">
                        <label className="form-label">
                          <span className="text-danger ms-1">*</span>
                          نام
                        </label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                          <span>
                            <i className="isax isax-user input-icon text-gray-7 fs-14" />
                          </span>
                        </div>
                      </div>
                      <div className="mb-3 position-relative">
                        <label className="form-label">
                          <span className="text-danger ms-1">*</span>
                          نام خانوادگی
                        </label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                          <span>
                            <i className="isax isax-user input-icon text-gray-7 fs-14" />
                          </span>
                        </div>
                      </div>
                      <div className="mb-3 position-relative">
                        <label className="form-label">
                          <span className="text-danger ms-1">*</span> نام کاربری
                        </label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            value={userName}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                          <span>
                            <i className="isax isax-user input-icon text-gray-7 fs-14" />
                          </span>
                        </div>
                      </div>
                      <div className="mb-3 position-relative">
                        <label className="form-label">
                          <span className="text-danger ms-1">*</span> موبایل
                        </label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            required
                          />
                          <span>
                            <i className="isax isax-sms input-icon text-gray-7 fs-14" />
                          </span>
                        </div>
                      </div>
                      <div className="mb-3 position-relative">
                        <label className="form-label">
                          <span className="text-danger ms-1">*</span> ایمیل
                        </label>
                        <div className="position-relative">
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <span>
                            <i className="isax isax-sms input-icon text-gray-7 fs-14" />
                          </span>
                        </div>
                      </div>
                      <div className="mb-3 position-relative">
                        <label className="form-label">
                          <span className="text-danger"> *</span> رمزعبور
                        </label>
                        <div className="position-relative" id="passwordInput">
                          <input
                            className="form-control pass-input"
                            type={eye ? "password" : "text"}
                            onChange={handlePasswordChange}
                            required
                          />
                          <span
                            onClick={onEyeClick}
                            className={`toggle-passwords text-gray-7 fs-14 isax isax-eye-slash ${
                              eye ? "isax-eye-slash" : "isax-eye"
                            }`}
                          />
                        </div>
                        <div
                          id="passwordStrength"
                          style={{ display: "flex" }}
                          className={`password-strength ${
                            strength === "poor"
                              ? "poor-active"
                              : strength === "weak"
                                ? "avg-active"
                                : strength === "strong"
                                  ? "strong-active"
                                  : strength === "heavy"
                                    ? "heavy-active"
                                    : ""
                          }`}
                        >
                          <span id="poor" className="active"></span>
                          <span id="weak" className="active"></span>
                          <span id="strong" className="active"></span>
                          <span id="heavy" className="active"></span>
                        </div>
                        <div id="passwordInfo">{messages()}</div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="remember-me d-flex align-items-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label mb-0 d-inline-flex remember-me fs-14"
                            htmlFor="flexCheckDefault"
                          >
                            I agree with{" "}
                            <Link
                              to={route.termsConditions}
                              className="link-2 mx-2"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              to={route.privacyPolicy}
                              className="link-2 mx-2"
                            >
                              Privacy Policy
                            </Link>
                          </label>
                        </div>
                      </div>
                      <div className="d-grid">
                        <button
                          className="btn btn-secondary btn-lg"
                          type="submit"
                        >
                          ثبت نام <i className="isax isax-arrow-right-3 ms-1" />
                        </button>
                      </div>
                    </form>
                    <div className="d-flex align-items-center justify-content-center or fs-14 mb-3">
                      Or
                    </div>
                    <div className="d-flex align-items-center justify-content-center mb-3">
                      <Link to="#" className="btn btn-light me-2">
                        <ImageWithBasePath
                          src="assets/img/icons/google.svg"
                          alt="img"
                          className="me-2"
                        />
                        Google
                      </Link>
                      <Link to="#" className="btn btn-light">
                        <ImageWithBasePath
                          src="assets/img/icons/facebook.svg"
                          alt="img"
                          className="me-2"
                        />
                        Facebook
                      </Link>
                    </div>
                    <div className="fs-14 fw-normal d-flex align-items-center justify-content-center">
                      Already you have an account?
                      <Link to={route.login} className="link-2 ms-1">
                        {" "}
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
