import React from 'react'
import ImageWithBasePath from '../../../../core/common/imageWithBasePath'

const Benefits = () => {
    return (
        <>
            {/* benefits */}
            <section className="benefit-section">
             <div className="container">
  <div className="section-header text-center">
    <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">
      چرا ما؟
    </span>

    <h2>تجربه‌ای حرفه‌ای از یادگیری آنلاین</h2>

    <p>
      با بهره‌گیری از دوره‌های تخصصی، مدرسان باتجربه و ابزارهای آموزشی
      پیشرفته، مسیر یادگیری خود را با اطمینان آغاز کنید و مهارت‌های موردنیاز
      برای موفقیت تحصیلی و شغلی را کسب نمایید.
    </p>
  </div>

  <div className="row">
    <div className="col-lg-4 col-md-6">
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <div className="position-absolute top-0 end-0 mt-n3 me-n4">
            <ImageWithBasePath src="./assets/img/shapes/bg-1.png" alt="img" />
          </div>

          <div className="p-4 rounded-pill bg-primary-transparent d-inline-flex">
            <i className="isax isax-book-1 fs-24" />
          </div>

          <h5 className="mt-3 mb-1">یادگیری انعطاف‌پذیر</h5>

          <p>
            در هر زمان و از هر مکان به دوره‌های آموزشی دسترسی داشته باشید و
            با سرعت و برنامه دلخواه خود مسیر یادگیری را ادامه دهید.
          </p>
        </div>
      </div>
    </div>

    <div className="col-lg-4 col-md-6">
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <div className="position-absolute top-0 end-0 mt-n3 me-n4">
            <ImageWithBasePath src="assets/img/shapes/bg-2.png" alt="img" />
          </div>

          <div className="p-4 rounded-pill bg-secondary-transparent d-inline-flex">
            <i className="isax isax-bookmark5 fs-24" />
          </div>

          <h5 className="mt-3 mb-1">دسترسی همیشگی به محتوا</h5>

          <p>
            پس از ثبت‌نام در دوره، محتوای آموزشی، فایل‌ها و منابع موردنیاز در
            حساب کاربری شما ذخیره می‌شود تا هر زمان که نیاز داشتید به آن‌ها
            مراجعه کنید.
          </p>
        </div>
      </div>
    </div>

    <div className="col-lg-4 col-md-6">
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <div className="position-absolute top-0 end-0 mt-n3 me-n4">
            <ImageWithBasePath src="assets/img/shapes/bg-3.png" alt="img" />
          </div>

          <div className="p-4 rounded-pill bg-skyblue-transparent d-inline-flex">
            <i className="isax isax-chart-26 fs-24" />
          </div>

          <h5 className="mt-3 mb-1">مدرسان متخصص و باتجربه</h5>

          <p>
            از دانش و تجربه مدرسان حرفه‌ای بهره‌مند شوید و مهارت‌های کاربردی
            را با آموزش‌های به‌روز، پروژه‌محور و متناسب با نیاز بازار کار
            فرا بگیرید.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
            </section>
            {/* benefits */}
        </>

    )
}

export default Benefits
