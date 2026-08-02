import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../../core/common/imageWithBasePath";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { all_routes } from "../../../router/all_routes";
import courseService, { Course } from "../../../../services/course.service";
import { api_base_url } from "../../../../environment";

const Featuredcourse = () => {
  //Feature Course Slider
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadCourses();
  }, []);
  const loadCourses = async () => {
    try {
      debugger;
      setLoading(true);

      const result = await courseService.browseCourses({
        sortBy: "newest",
      });

      setCourses(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const featurecourseslider = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const route = all_routes;
  return (
    <>
      {/* featured course */}
      <section className="featured-courses-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">
              دوره‌های منتخب
            </span>
            <h2>تازه‌ترین دوره‌های منتشرشده</h2>
            <p>
              مجموعه‌ای از برترین دوره‌های آموزشی را بررسی کنید و مهارت‌های
              موردنیاز برای موفقیت شغلی را کسب کنید.
            </p>
          </div>
          <div className="feature-course-slider-22 top-courses-slider">
            <Slider {...featurecourseslider}>
              {courses?.map((course) => (
                <div key={course.Id}>
                  <div className="course-item" style={{ direction: "rtl" }}>
                    <div className="course-img">
                      <Link to={`${route.courseDetails}/${course.Id}`}>
                        <img
                          src={
                            course.Thumbnail
                              ? `${api_base_url}${course.Thumbnail}`
                              : "/assets/img/course/course-09.jpg"
                          }
                          alt="img"
                          className="img-fluid"
                        />
                      </Link>
                      <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-2">
                        <span className="price-badge ms-auto">
                          {course.Price}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="badge badge-md badge-soft-info rounded-pill">
                        {course.Category.Title}
                      </span>
                    </div>
                    <div className="pb-3 border-bottom mb-3">
                      <h5>
                        <Link to={`${route.courseDetails}/${course.Id}`}>
                          {course.Title}
                        </Link>
                      </h5>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="course-rating">
                        <span className="course-user">
                          <ImageWithBasePath
                            src="assets/img/user/user-06.jpg"
                            alt="img"
                            className="img-fluid"
                          />
                        </span>
                        {course.Users?.FirstName} {course.Users?.LastName}
                      </div>
                    </div>
                    <Link
                      to={`${route.courseDetails}/${course.Id}`}
                      className="btn buy-course-btn"
                    >
                      خرید دوره
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <Link to={route.courseGrid} className="btn btn-primary btn-md">
              نمایش همه دوره ها
            </Link>
          </div>
        </div>
      </section>
      {/* /featured course */}
    </>
  );
};

export default Featuredcourse;
