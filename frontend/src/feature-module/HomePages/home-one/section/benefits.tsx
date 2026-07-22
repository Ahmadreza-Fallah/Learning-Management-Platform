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
                            Our Benefits
                        </span>
                        <h2>بر مهارت‌های پیشبرد مسیر شغلی خود مسلط شوید</h2>
                        <p>
                        یک دوره آموزشی مناسب که توسط مربی‌ای متخصص هدایت شود، می‌تواند بینش‌ها و مهارت‌های عملی ارزشمندی را فراهم آورد.
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
                                    <h5 className="mt-3 mb-1">یادگیری منعطف</h5>
                                    <p>
                                       ما بر این باوریم که آموزش باکیفیت باید برای همگان قابل دسترسی باشد. مدل‌های قیمت‌گذاری ما نیز با همین هدف طراحی شده‌اند.
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
                                    <h5 className="mt-3 mb-1">دسترسی مادام‌العمر</h5>
                                    <p>
                                       وقتی در دوره‌های ما ثبت‌نام می‌کنید، صرفاً برای یک تجربه یادگیری موقت اقدام نمی‌کنید.
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
                                    <h5 className="mt-3 mb-1">آموزش تخصصی</h5>
                                    <p>
                                     مربیان ما متخصصانی کارآزموده با سال‌ها تجربه در حوزه‌های تخصصی خود هستند و مشاوره‌هایی کارشناسانه ارائه می‌دهند.
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
