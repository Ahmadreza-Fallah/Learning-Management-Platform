import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../../../core/common/imageWithBasePath";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { all_routes } from "../../../router/all_routes";
import toast from "react-hot-toast";
import courseService, { Category } from "../../../../services/course.service";
import { api_base_url } from "../../../../environment";

const Topcourses = () => {
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        debugger;
        const [cats] = await Promise.all([courseService.getCategories()]);
        setCategories(cats);
      } catch {
        toast.error("خطا در بارگذاری اطلاعات");
      }
    };

    fetchData();
  }, []);
  //Top Course SLider
  const topcourseslider = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleCategory = (id: any) => {
    const params = new URLSearchParams();
    params.append("categoryId", id);
    navigate(`${all_routes.courseGrid}?${params}`);
  };
  return (
    <>
      {/* top courses */}
      <section className="top-courses-sec">
        <ImageWithBasePath
          className="top-courses-bg"
          src="./assets/img/bg/bg-20.png"
          alt="img"
        />
        <div className="container">
          <div className="section-header text-center">
            <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">
              دسته بندی دوره ها
            </span>
            <h2> دسته‌بندی‌های برتر دوره‌ها</h2>
            <p>
              یک دوره آموزشی مناسب که توسط مربی‌ای متخصص هدایت شود، می‌تواند
              بینش‌های ارزشمند و مهارت‌های کاربردی فراهم آورد.
            </p>
          </div>
          <Slider {...topcourseslider} className="top-courses-slider lazy m-3">
            {categories?.map((cat) => (
              <div key={cat?.Id} onClick={() => handleCategory(cat?.Id)}>
                <div className="categories-item categories-item-three mb-0">
                  <img
                    className="mx-auto"
                    src={`${api_base_url}${cat?.Icon}`}
                    alt="img"
                  />
                  <h6 className="title">
                    <Link to="#">{cat?.Title}</Link>
                  </h6>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      {/* /top courses */}
    </>
  );
};

export default Topcourses;
