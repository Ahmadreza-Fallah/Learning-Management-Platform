import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../../../core/common/imageWithBasePath";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { all_routes } from "../../../router/all_routes";
import courseService, {
  Category,
  Course,
} from "../../../../services/course.service";
import toast from "react-hot-toast";
import { api_base_url } from "../../../../environment";

const BannerSection = () => {
  const route = all_routes;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedItems, setSelectedItems] = useState(Array(4).fill(false));
  const [latestCourses, setLatestCourses] = useState<Course[]>([]);
  const handleItemClick = (index: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, latest] = await Promise.all([
          courseService.getCategories(),
          courseService.browseCourses({
            page: 1,
            pageSize: 3,
            sortBy: "newest",
          }),
        ]);

        setCategories(cats);
        setLatestCourses(latest.data);
      } catch {
        toast.error("خطا در بارگذاری اطلاعات");
      }
    };

    fetchData();
  }, []);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) {
      params.append("search", search);
    }
    if (categoryId) {
      params.append("categoryId", categoryId);
    }

    navigate(`${route.courseGrid}?${params.toString()}`);
  };

  return (
    <>
      {/* banner */}
      <section className="banner-section">
        <ImageWithBasePath
          className="img-fluid d-none d-lg-flex banner-bg1"
          src="./assets/img/bg/bg-15.png"
          alt="img"
        />
        <ImageWithBasePath
          className="img-fluid d-none d-lg-flex banner-bg2"
          src="./assets/img/bg/bg-16.png"
          alt="img"
        />
        <ImageWithBasePath
          className="img-fluid d-none d-lg-flex banner-bg3"
          src="./assets/img/bg/bg-17.png"
          alt="img"
        />
        <ImageWithBasePath
          className="img-fluid d-none d-lg-flex banner-bg4"
          src="./assets/img/bg/bg-18.png"
          alt="img"
        />
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-xl-7 col-lg-7">
              <div className="banner-content pe-xxl-5">
                <span className="hero-title">پیشرو در آموزش آنلاین</span>
                <h1 className="mb-4 text-white">
                  بهترین <span>دوره‌ها</span> را از بهترین <span>مربیان</span>{" "}
                  بیابید
                </h1>
                <p className="fs-lg text-center text-md-start pb-2 pb-md-3 mb-4">
                  دوره‌های آنلاین تخصصی ما به گونه‌ای طراحی شده‌اند که تجربه
                  حضور در کلاس درس را، فارغ از اینکه کجا هستید، برای شما فراهم
                  کنند.
                </p>
                <form onSubmit={handleSubmit} className="banner-search">
                  <div className="input-block col-6">
                    <select
                      className="form-control"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option value="">انتخاب دسته بندی</option>
                      {categories?.map((cat) => (
                        <option key={cat.Id} value={cat.Id}>
                          {cat.Title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    value={search}
                    type="text"
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                    className="border-0 form-control p-0 ms-2 me-2"
                    placeholder="جستجوی دوره"
                  />
                  <button type="submit" className="btn btn-secondary ms-auto">
                    <i className="isax isax-arrow-left" />
                  </button>
                </form>
                <div className="d-flex align-items-center gap-4 justify-content-lg-between justify-content-center flex-wrap">
                  <div className="counter-item">
                    <div className="counter-icon flex-shrink-0">
                      <ImageWithBasePath
                        src="assets/img/icons/icon-32.svg"
                        alt="img"
                      />
                    </div>
                    <div className="count-content">
                      <p>دانشجوی فعال </p>
                    </div>
                  </div>
                  <div className="counter-item">
                    <div className="counter-icon flex-shrink-0">
                      <ImageWithBasePath
                        src="assets/img/icons/icon-33.svg"
                        alt="img"
                      />
                    </div>
                    <div className="count-content">
                      <p>دوره تخصصی </p>
                    </div>
                  </div>
                  <div className="counter-item">
                    <div className="counter-icon flex-shrink-0">
                      <ImageWithBasePath
                        src="assets/img/icons/icon-34.svg"
                        alt="img"
                      />
                    </div>
                    <div className="count-content">
                      <p> اساتید مجرب</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5">
              <Swiper effect="cards" grabCursor modules={[EffectCards]}>
                {latestCourses?.map((course) => (
                  <SwiperSlide key={course.Id}>
                    <div key={course.Id} className="col-12">
                      <Link to={`${all_routes.courseDetails}/${course.Id}`}>
                        <div className="course-item-two course-item mx-0 h-100 shadow-sm border-0 rounded-4 overflow-hidden transition-all">
                          <div className="course-img position-relative overflow-hidden">
                            <img
                              src={
                                course.Thumbnail
                                  ? `${api_base_url}${course.Thumbnail}`
                                  : "/assets/img/course/course-09.jpg"
                              }
                              alt={course.Title}
                              className="img-fluid"
                            />
                          </div>

                          <div className="course-content p-3">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                              <div className="d-flex align-items-center">
                                <Link
                                  to={all_routes.instructorDetails}
                                  className="avatar avatar-sm border"
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
                                    className="link-default fs-14 fw-medium text-truncate d-block"
                                    style={{ maxWidth: "120px" }}
                                  >
                                    {course?.Users?.FirstName}{" "}
                                    {course?.Users?.LastName}
                                  </Link>
                                </div>
                              </div>
                              <div className="d-flex flex-column align-items-end gap-1">
                                <span className="badge rounded-pill bg-light text-dark fs-13 fw-medium px-3 py-1">
                                  {course?.Category?.Title}
                                </span>
                                <span className="badge rounded-pill bg-primary-subtle text-primary fs-13 fw-medium px-3 py-1">
                                  {course?.Level?.LevelName}
                                </span>
                              </div>
                            </div>

                            <h6 className="title mb-3 lh-base">
                              <Link
                                to={all_routes.courseDetails}
                                className="text-dark stretched-link-hover"
                              >
                                {course.Title}
                              </Link>
                            </h6>

                            <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                              <h5 className="text-secondary fw-bold mb-0">
                                {course.Price}
                              </h5>
                              <Link
                                to={`${all_routes.courseDetails}/${course.Id}`}
                                className="btn btn-primary btn-sm rounded-pill d-inline-flex align-items-center px-3"
                              >
                                مشاهده دوره
                                <i className="isax isax-arrow-left-3 ms-1" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      {/* banner */}
    </>
  );
};

export default BannerSection;
