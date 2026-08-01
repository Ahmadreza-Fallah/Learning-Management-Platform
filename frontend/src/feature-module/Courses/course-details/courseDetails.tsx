import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../core/common/Breadcrumb/breadcrumb";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { Link, useNavigate, useParams } from "react-router-dom";
import VideoModal from "../../HomePages/home-one/section/videoModal";
import { all_routes } from "../../router/all_routes";
import courseService, { Course } from "../../../services/course.service";
import cartService from "../../../services/cart.service";
import { api_base_url } from "../../../environment";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [addingToCart, setAddingToCart] = useState(false);
  const [cartError, setCartError] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    loadCourse();
  }, [id]);
  const isEnrolled = false;
  const totalSections = course?.CourseSections?.length ?? 0;
  const totalLessons =
    course?.CourseSections?.reduce(
      (sum, section) => sum + (section.Lessons?.length ?? 0),
      0,
    ) ?? 0;
  const totalDuration =
    course?.CourseSections?.reduce(
      (sum, section) =>
        sum +
        (section.Lessons ?? []).reduce(
          (lessonSum, lesson) => lessonSum + (lesson.DurationMinutes ?? 0),
          0,
        ),
      0,
    ) ?? 0;
  const loadCourse = async () => {
    try {
      setLoading(true);

      const data = await courseService.getCourse(Number(id));

      setCourse(data);
    } catch {
      setError("Course not found");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!course) return;

    try {
      setAddingToCart(true);
      setCartError("");
      await cartService.addToCart(course.Id);
      setAddedToCart(true);
      navigate(route.courseCart);
    } catch (err: any) {
      setCartError(
        err?.response?.data?.message || "خطا در افزودن دوره به سبد خرید",
      );
    } finally {
      setAddingToCart(false);
    }
  };

  const route = all_routes;

  return (
    <>
      {/* Course detail */}
      <section className="course-details-two mt-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card bg-light">
                <div className="card-body d-lg-flex align-items-center">
                  <div className="position-relative">
                    <img
                      style={{ height: "300px", width: "700px" }}
                      src={
                        course?.Thumbnail
                          ? `${api_base_url}${course?.Thumbnail}`
                          : "/assets/img/course/course-09.jpg"
                      }
                      alt={course?.Title}
                      className="img-fluid"
                    />
                  </div>
                  <div className="w-100 ps-lg-4">
                    <h3 className="mb-2">{course?.Title}</h3>
                    <p className="fs-14 mb-3">{}</p>
                    <div className="d-flex align-items-center gap-2 gap-sm-3 gap-xl-4 flex-wrap my-3 my-sm-0">
                      <p className="fw-medium d-flex align-items-center mb-0">
                        <ImageWithBasePath
                          className="me-2"
                          src="./assets/img/icons/book.svg"
                          alt="img"
                        />
                        {totalSections} سرفصل
                      </p>
                      <p className="fw-medium d-flex align-items-center mb-0">
                        <ImageWithBasePath
                          className="me-2"
                          src="./assets/img/icons/book.svg"
                          alt="img"
                        />
                        {totalLessons} درس
                      </p>
                      <p className="fw-medium d-flex align-items-center mb-0">
                        <ImageWithBasePath
                          className="me-2"
                          src="./assets/img/icons/timer-start.svg"
                          alt="img"
                        />
                        {course?.DurationMinutes} دقیقه
                      </p>

                      <span className="badge badge-sm rounded-pill bg-warning fs-12">
                        {course?.Category?.Title}
                      </span>
                    </div>
                    <div className="d-sm-flex align-items-center justify-content-sm-between mt-3">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-lg">
                          <ImageWithBasePath
                            className="rounded-circle"
                            src="./assets/img/avatar/avatar10.jpg"
                            alt="img"
                          />
                        </div>
                        <div className="ms-2">
                          <h5 className="fs-18 fw-semibold">
                            <Link to={route.instructorDetails}>
                              {course?.Users?.FirstName}{" "}
                              {course?.Users?.LastName}
                            </Link>
                          </h5>
                          <p className="fs-14">مدرس این دوره</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-8">
              <div>
                <ImageWithBasePath
                  src="assets/img/course/course-details-two-2.jpg"
                  alt="img"
                  className="img-fluid mb-4"
                />
              </div>
              <div className="course-page-content pt-0">
                <div className="card mb-4">
                  <div className="card-body">
                    <h6 className="mb-2">توضیحات دوره</h6>
                    <p>{course?.Description}</p>

                    <h6 className="mb-2">What you'll learn</h6>
                    <ul className="custom-list mb-3">
                      <li className="list-item">Become a UX designer</li>
                      <li className="list-item">
                        You will be able to add UX designer to your CV
                      </li>
                      <li className="list-item">Become a UI designer</li>
                      <li className="list-item">
                        Build &amp; test a full website design.
                      </li>
                      <li className="list-item">
                        Build &amp; test a full mobile app.
                      </li>
                    </ul>
                    <h6 className="mb-2">Requirements</h6>
                    <ul className="custom-list mb-0">
                      <li className="list-item">
                        You will need a copy of Adobe XD 2019 or above. A free
                        trial can be downloaded from Adobe.
                      </li>
                      <li className="list-item">
                        No previous design experience is needed.
                      </li>
                      <li className="list-item">
                        No previous Adobe XD skills are needed.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="d-flex justify-content-between flex-wrap">
                      <h5 className="subs-title mb-2 mb-sm-3">محتوای دوره</h5>
                      <h6 className="fs-16 fw-medium text-gray-7 mb-3">
                        {totalSections} فصل • {totalLessons} درس
                        <span className="text-secondary">
                          {" "}
                          ({totalDuration} دقیقه)
                        </span>
                      </h6>
                    </div>
                    <div
                      className="accordion accordion-customicon1 accordions-items-seperate p-0"
                      id="courseAccordion"
                    >
                      {course?.CourseSections?.map((section, sectionIndex) => {
                        const lessons = section.Lessons ?? [];

                        const lessonCount = lessons.length;

                        const duration = lessons.reduce(
                          (sum, lesson) => sum + (lesson.DurationMinutes ?? 0),
                          0,
                        );

                        return (
                          <div className="accordion-item" key={section.Id}>
                            <h2
                              className="accordion-header"
                              id={`heading-${section.Id}`}
                            >
                              <button
                                className={`accordion-button ${
                                  sectionIndex === 0 ? "" : "collapsed"
                                }`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse-${section.Id}`}
                              >
                                <div className="d-flex justify-content-between w-100 me-3">
                                  <span>{section.Title}</span>

                                  <small className="text-muted">
                                    {lessonCount} درس • {duration} دقیقه
                                  </small>
                                </div>

                                <i className="fa-solid fa-chevron-down" />
                              </button>
                            </h2>

                            <div
                              id={`collapse-${section.Id}`}
                              className={`accordion-collapse collapse ${
                                sectionIndex === 0 ? "show" : ""
                              }`}
                              data-bs-parent="#courseAccordion"
                            >
                              {course?.CourseSections?.map(
                                (section, sectionIndex) => {
                                  const lessons = section.Lessons ?? [];

                                  return (
                                    <div key={section.Id}>
                                      <div className="accordion-body p-0">
                                        {lessons.length === 0 ? (
                                          <div className="p-4 text-center text-muted">
                                            درسی برای این فصل ثبت نشده است.
                                          </div>
                                        ) : (
                                          <ul>
                                            {lessons.map((lesson) => (
                                              <li
                                                key={lesson.Id}
                                                className="p-4 px-3 d-flex justify-content-between align-items-center"
                                              >
                                                <div>
                                                  <ImageWithBasePath
                                                    className="me-2"
                                                    src="./assets/img/icons/play.svg"
                                                    alt=""
                                                  />

                                                  {lesson.Title}
                                                </div>

                                                <div className="d-flex gap-4 align-items-center">
                                                  {isEnrolled ? (
                                                    <Link
                                                      to={`/learn/${course.Id}/lesson/${lesson.Id}`}
                                                      className="preview-link"
                                                    >
                                                      شروع
                                                    </Link>
                                                  ) : lesson.IsFreePreview ? (
                                                    <Link
                                                      to={`/preview/${lesson.Id}`}
                                                      className="preview-link"
                                                    >
                                                      پیش نمایش
                                                    </Link>
                                                  ) : (
                                                    <span className="text-muted">
                                                      <i className="fas fa-lock me-1"></i>
                                                      قفل
                                                    </span>
                                                  )}

                                                  <span>
                                                    {lesson.DurationMinutes ??
                                                      0}{" "}
                                                    دقیقه
                                                  </span>
                                                </div>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </div>
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="subs-title mb-4">About the instructor</h5>
                    <div className="d-flex align-items-center justify-content-between mt-4 gap-2 flex-wrap">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-lg">
                          <ImageWithBasePath
                            className="rounded-circle"
                            src="./assets/img/avatar/avatar10.jpg"
                            alt="img"
                          />
                        </div>
                        <div className="ms-2">
                          <Link
                            to={route.instructorDetails}
                            className="name-link"
                          >
                            Nicole Brown
                          </Link>
                          <p className="mb-0 fs-14">UX/UI Designer</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-star text-warning me-1" />
                        <i className="fa-solid fa-star text-warning me-1" />
                        <i className="fa-solid fa-star text-warning me-1" />
                        <i className="fa-solid fa-star text-warning me-1" />
                        <i className="fa-solid fa-star text-warning me-2" />
                        <p className="mb-0 fs-14">4.5</p>
                      </div>
                    </div>
                    <div className="course-info align-items-center d-flex gap-2 gap-xl-3 mt-3 mb-3 flex-wrap">
                      <p className="fw-medium d-flex align-items-center fs-14 mb-0">
                        <ImageWithBasePath
                          className="me-2"
                          src="./assets/img/icons/play2.svg"
                          alt="img"
                        />
                        5 Courses
                      </p>
                      <p className="fw-medium d-flex align-items-center fs-14 mb-0">
                        <ImageWithBasePath
                          className="me-2"
                          src="./assets/img/icons/book2.svg"
                          alt="img"
                        />
                        12+ Lesson
                      </p>
                      <p className="fw-medium d-flex align-items-center fs-14 mb-0">
                        <ImageWithBasePath
                          className="me-2"
                          src="./assets/img/icons/timer-start2.svg"
                          alt="img"
                        />
                        9hr 30min
                      </p>
                      <p className="fw-medium d-flex align-items-center fs-14 mb-0">
                        <ImageWithBasePath
                          className="me-2"
                          src="./assets/img/icons/people.svg"
                          alt="img"
                        />
                        270,866 students enrolled
                      </p>
                    </div>
                    <p>
                      UI/UX Designer, with 7+ Years Experience. Guarantee of
                      High Quality Work.
                    </p>
                    <h6 className="fs-16 mb-2">Skills: </h6>
                    <p>
                      Web Design, UI Design, UX/UI Design, Mobile Design, User
                      Interface Design, Sketch, Photoshop, GUI, Html, Css, Grid
                      Systems, Typography, Minimal, Template, English,
                      Bootstrap, Responsive Web Design, Pixel Perfect, Graphic
                      Design, Corporate, Creative, Flat, Luxury and much more.
                    </p>
                    <h6 className="fs-16 mb-2">Available for:</h6>
                    <ol className="ordered-list">
                      <li className="list-items">Full Time Office Work</li>
                      <li className="list-items">Remote Work</li>
                      <li className="list-items">Freelance</li>
                      <li className="list-items">Contract</li>
                      <li className="list-items mb-0">Worldwide</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="course-sidebar-sec mt-0">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h2 className="text-success fs-30">FREE</h2>
                      <p className="fs-14 mb-0">
                        <span className="text-decoration-line-through me-2"></span>
                        {course?.Price} ریال
                      </p>
                    </div>
                    {cartError && (
                      <div
                        className="alert alert-danger py-2 fs-14"
                        role="alert"
                      >
                        {cartError}
                      </div>
                    )}
                    {isEnrolled ? (
                      <Link
                        to={`/learn/${course?.Id}`}
                        className="btn btn-primary w-100 mt-3 btn-enroll"
                      >
                        ادامه یادگیری
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary w-100 mt-3 btn-enroll"
                        onClick={handleAddToCart}
                        disabled={addingToCart || !course}
                      >
                        {addingToCart
                          ? "در حال افزودن..."
                          : addedToCart
                            ? "افزوده شد ✓"
                            : "خرید دوره"}
                      </button>
                    )}
                  </div>
                </div>
                <div className="card">
                  <div className="card-body cou-features">
                    <h5 className="subs-title">ویژگی های دوره </h5>
                    <ul>
                      <li>
                        <p className="mb-0">
                          <ImageWithBasePath
                            className="me-2"
                            src="./assets/img/icons/people2.svg"
                            alt="img"
                          />
                          دسته بندی : {course?.Category.Title}
                        </p>
                      </li>
                      <li>
                        <p className="mb-0">
                          <ImageWithBasePath
                            className="me-2"
                            src="./assets/img/icons/chart.svg"
                            alt="img"
                          />
                          سطح : {course?.Level?.LevelName}
                        </p>
                      </li>
                      <li>
                        <p className="mb-0">
                          <ImageWithBasePath
                            className="me-2"
                            src="./assets/img/icons/timer-start3.svg"
                            alt="img"
                          />
                          مدت زمان : {course?.DurationMinutes}
                        </p>
                      </li>
                      <li>
                        <p className="mb-0">
                          <ImageWithBasePath
                            className="me-2"
                            src="./assets/img/icons/note.svg"
                            alt="img"
                          />
                          تعداد سرفصل ها : {totalSections}
                        </p>
                      </li>
                      <li>
                        <p className="mb-0">
                          <ImageWithBasePath
                            className="me-2"
                            src="./assets/img/icons/play3.svg"
                            alt="img"
                          />
                          تعداد دروس : {totalLessons}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="subs-title mb-4">
                      دوره های منتوریتو شامل موارد زیر میباشد
                    </h5>
                    <p className="mb-3">
                      <ImageWithBasePath
                        className="me-2"
                        src="./assets/img/icons/play.svg"
                        alt="img"
                      />
                      ویدیوهای آموزشی باکیفیت
                    </p>
                    <p className="mb-3">
                      <ImageWithBasePath
                        className="me-2"
                        src="./assets/img/icons/import.svg"
                        alt="img"
                      />
                      منابع قابل دانلود
                    </p>
                    <p className="mb-3">
                      <ImageWithBasePath
                        className="me-2"
                        src="./assets/img/icons/key.svg"
                        alt="img"
                      />
                      دسترسی مادام‌العمر کامل
                    </p>
                    <p className="mb-3">
                      <ImageWithBasePath
                        className="me-2"
                        src="./assets/img/icons/monitor-mobbile.svg"
                        alt="img"
                      />
                      دسترسی روی موبایل و تلویزیون
                    </p>
                    <p className="mb-3">
                      <ImageWithBasePath
                        className="me-2"
                        src="./assets/img/icons/cloud-lightning.svg"
                        alt="img"
                      />
                      تمرین‌ها و پروژه‌های عملی
                    </p>
                    <p className="mb-0">
                      <ImageWithBasePath
                        className="me-2"
                        src="./assets/img/icons/teacher.svg"
                        alt="img"
                      />
                      گواهی پایان دوره
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Course detail */}
    </>
  );
};

export default CourseDetails;
