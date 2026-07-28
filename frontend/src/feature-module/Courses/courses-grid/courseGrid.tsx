import React, { useEffect, useState } from "react";
import type { SliderSingleProps } from "antd";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { all_routes } from "../../router/all_routes";
import courseService, { Course } from "../../../services/course.service";

const CourseGrid = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      debugger;
      setLoading(true);

      const result = await courseService.browseCourses({
        page: 1,
        pageSize: 12,
      });

      setCourses(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const formatter: NonNullable<SliderSingleProps["tooltip"]>["formatter"] = (
    value,
  ) => `$${value}`;
  return (
    <>
      {/* Course */}
      <section className="course-content mt-5">
        <div className="container mt-3">
          <div className="row align-items-baseline">
            <div className="col-lg-3 theiaStickySidebar">
              <div className="filter-clear">
                <div className="clear-filter mb-4 pb-lg-2 d-flex align-items-center justify-content-between">
                  <h5>
                    <i className="feather-filter me-2" />
                    فیلترها
                  </h5>
                  <Link to="#" className="clear-text">
                    پاک کردن
                  </Link>
                </div>
                <div className="accordion accordion-customicon1 accordions-items-seperate">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingcustomicon1One">
                      <Link
                        to="#"
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsecustomicon1One"
                        aria-expanded="false"
                        aria-controls="collapsecustomicon1One"
                      >
                        Categories <i className="fa-solid fa-chevron-down" />
                      </Link>
                    </h2>
                    <div
                      id="collapsecustomicon1One"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingcustomicon1One"
                      data-bs-parent="#accordioncustomicon1Example"
                      style={{}}
                    >
                      <div className="accordion-body">
                        <div>
                          <label className="custom_check">
                            <input type="checkbox" name="select_specialist" />
                            <span className="checkmark" /> General (2)
                          </label>
                        </div>
                        <div>
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="select_specialist"
                              defaultChecked
                            />
                            <span className="checkmark" /> IT &amp; Software (2)
                          </label>
                        </div>

                        <Link to="#" className="see-more-btn">
                          See More
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingcustomicon1Two">
                      <Link
                        to="#"
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsecustomicon1Two"
                        aria-expanded="false"
                        aria-controls="collapsecustomicon1Two"
                      >
                        Instructors
                        <i className="fa-solid fa-chevron-down" />
                      </Link>
                    </h2>
                    <div
                      id="collapsecustomicon1Two"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingcustomicon1Two"
                      data-bs-parent="#accordioncustomicon1Example"
                    >
                      <div className="accordion-body">
                        <div>
                          <label className="custom_check">
                            <input type="checkbox" name="select_specialist" />
                            <span className="checkmark" /> Keny White (10)
                          </label>
                        </div>
                        <div>
                          <label className="custom_check">
                            <input type="checkbox" name="select_specialist" />
                            <span className="checkmark" /> Hinata Hyuga (5)
                          </label>
                        </div>
                        <div>
                          <label className="custom_check">
                            <input type="checkbox" name="select_specialist" />
                            <span className="checkmark" /> John Doe (3)
                          </label>
                        </div>
                        <div>
                          <label className="custom_check mb-0">
                            <input
                              type="checkbox"
                              name="select_specialist"
                              defaultChecked
                            />
                            <span className="checkmark" /> Nicole Brown
                          </label>
                        </div>
                        <Link to="#" className="see-more-btn">
                          See More
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2
                      className="accordion-header"
                      id="headingcustomicon1Three"
                    >
                      <Link
                        to="#"
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsecustomicon1Three"
                        aria-expanded="false"
                        aria-controls="collapsecustomicon1Three"
                      >
                        Price
                        <i className="fa-solid fa-chevron-down" />
                      </Link>
                    </h2>
                    <div
                      id="collapsecustomicon1Three"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingcustomicon1Three"
                      data-bs-parent="#accordioncustomicon1Example"
                    >
                      <div className="accordion-body">
                        <div>
                          <label className="custom_check custom_one">
                            <input type="checkbox" name="select_specialist" />
                            <span className="checkmark" /> All (10)
                          </label>
                        </div>
                        <div>
                          <label className="custom_check custom_one">
                            <input type="checkbox" name="select_specialist" />
                            <span className="checkmark" /> Free (5)
                          </label>
                        </div>
                        <div>
                          <label className="custom_check custom_one mb-0">
                            <input type="checkbox" name="select_specialist" />
                            <span className="checkmark" /> Paid (3)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2
                      className="accordion-header"
                      id="headingcustomicon1Five"
                    >
                      <Link
                        to="#"
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsecustomicon1Five"
                        aria-expanded="false"
                        aria-controls="collapsecustomicon1Five"
                      >
                        Level
                        <i className="fa-solid fa-chevron-down" />
                      </Link>
                    </h2>
                    <div
                      id="collapsecustomicon1Five"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingcustomicon1Five"
                      data-bs-parent="#accordioncustomicon1Example"
                    >
                      <div className="accordion-body">
                        <div>
                          <label className="custom_check custom_one">
                            <input type="checkbox" name="select_specialist" />
                            <span className="checkmark" />
                            Beginner (10)
                          </label>
                        </div>
                        <div>
                          <label className="custom_check custom_one">
                            <input type="checkbox" name="select_specialist" />
                            <span className="checkmark" /> Intermediate (5)
                          </label>
                        </div>
                        <div>
                          <label className="custom_check custom_one">
                            <input type="checkbox" name="select_specialist" />
                            <span className="checkmark" />
                            Advanced (21)
                          </label>
                        </div>
                        <div>
                          <label className="custom_check custom_one mb-0">
                            <input type="checkbox" name="select_specialist" />
                            <span className="checkmark" />
                            Expert (3)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              {/* Filter */}
              <div className="showing-list mb-4">
                <div className="row align-items-center">
                  <div className="col-lg-8">
                    <div className="show-filter add-course-info">
                      <form action="#">
                        <div className="d-sm-flex justify-content-center justify-content-lg-end mb-1 mb-lg-0">
                          <div className="view-icons mb-2 mb-sm-0">
                            <Link
                              to={all_routes.courseGrid}
                              className="grid-view active"
                            >
                              <i className="isax isax-element-3" />
                            </Link>
                            <Link
                              to={all_routes.courseList}
                              className="list-view"
                            >
                              <i className="isax isax-task" />
                            </Link>
                          </div>
                          <select className="form-select">
                            <option>Newly Published </option>
                            <option>Trending Courses</option>
                            <option>Top Rated</option>
                            <option>Free Courses</option>
                          </select>
                          <div className=" search-group">
                            <i className="isax isax-search-normal-1" />
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Filter */}
              <div className="row">
                {courses.map((course) => (
                  <div className="col-xl-4 col-md-6">
                    <div className="course-item-two course-item mx-0">
                      <div className="course-img">
                        <Link to={all_routes.courseDetails}>
                          <ImageWithBasePath
                            src="assets/img/course/course-09.jpg"
                            alt="img"
                            className="img-fluid"
                          />
                        </Link>
                        <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-3">
                          <Link to="#" className="fav-icon ms-auto">
                            <i className="isax isax-heart" />
                          </Link>
                        </div>
                      </div>
                      <div className="course-content">
                        <div className="d-flex justify-content-between mb-2">
                          <div className="d-flex align-items-center">
                            <Link
                              to={all_routes.instructorDetails}
                              className="avatar avatar-sm"
                            >
                              <ImageWithBasePath
                                src="assets/img/user/user-36.jpg"
                                alt="img"
                                className="img-fluid avatar avatar-sm rounded-circle"
                              />
                            </Link>
                            <div className="ms-2">
                              <Link
                                to={all_routes.instructorDetails}
                                className="link-default fs-14"
                              >
                                {course?.Users?.FirstName}
                                {course?.Users?.LastName}
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex flex-column">
                            <div className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium mb-0">
                              {course?.Category?.Title}
                            </div>
                            <div className="badge badge-light rounded-pill bg-primary  d-inline-flex align-items-center fs-13 fw-medium mb-0">
                              {course?.Level?.LevelName}
                            </div>
                          </div>
                        </div>
                        <h6 className="title mb-2">
                          <Link to={all_routes.courseDetails}>
                            {course.Title}
                          </Link>
                        </h6>

                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="text-secondary mb-0">
                            {course.Price}
                          </h5>
                          <Link
                            to={all_routes.courseDetails}
                            className="btn btn-dark btn-sm d-inline-flex align-items-center"
                          >
                            View Course
                            <i className="isax isax-arrow-right-3 ms-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* /pagination */}
              <div className="row align-items-center">
                <div className="col-md-2">
                  <p className="pagination-text">Page 1 of 2</p>
                </div>
                <div className="col-md-10">
                  <ul className="pagination lms-page justify-content-center justify-content-md-end mt-2 mt-md-0">
                    <li className="page-item prev">
                      <Link className="page-link" to="#" tabIndex={-1}>
                        <i className="fas fa-angle-left" />
                      </Link>
                    </li>
                    <li className="page-item first-page active">
                      <Link className="page-link" to="#">
                        1
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        2
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        3
                      </Link>
                    </li>
                    <li className="page-item next">
                      <Link className="page-link" to="#">
                        <i className="fas fa-angle-right" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /pagination */}
            </div>
          </div>
        </div>
      </section>
      {/* /Course */}
    </>
  );
};

export default CourseGrid;
