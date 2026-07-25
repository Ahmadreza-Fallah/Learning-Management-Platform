import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import courseService, { Category, Level } from "../../../services/course.service";
import toast from "react-hot-toast";
import Stepper from "./components/Stepper";
import CourseInformation from "./components/CourseInformation";
import SectionManager from "./components/SectionManager";
import CourseSummary from "./components/CourseSummary";

const STEPS = [
  { label: "اطلاعات دوره", icon: "fas fa-info-circle" },
  { label: "سرفصل ها", icon: "fas fa-layer-group" },
  { label: "دروس", icon: "fas fa-book" },
  { label: "فایل های دروس", icon: "fas fa-paperclip" },
  { label: "انتشار", icon: "fas fa-rocket" },
];

const AddNewCourse = () => {
  const route = all_routes;
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [courseId, setCourseId] = useState<number | null>(null);
  const [courseData, setCourseData] = useState<any>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, lvls] = await Promise.all([
          courseService.getCategories(),
          courseService.getLevels(),
        ]);
        setCategories(cats);
        setLevels(lvls);
      } catch {
        toast.error("Failed to load categories or levels");
      }
    };
    fetchData();
  }, []);

  const handleCourseCreated = useCallback(async (id: number) => {
    setCourseId(id);
    try {
      const course = await courseService.getCourse(id);
      setCourseData(course);
    } catch {
    
    }
    setCurrentStep(1);
  }, []);

  const handlePublished = useCallback(() => {
    navigate(route.instructorCourse);
  }, [navigate, route]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="add-course-item">
            <CourseInformation
              categories={categories}
              levels={levels}
              initialData={courseData}
              onComplete={handleCourseCreated}
            />
          </div>
        );
      case 1:
        return (
          <div className="add-course-item">
            <div className="wizard-form-card">
              <div className="title d-flex justify-content-between align-items-center">
                <h5 className="mb-0">سرفصل های دوره</h5>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setCurrentStep(0)}
                  title="Edit course info"
                >
                  <i className="fas fa-edit me-1" /> ویرایش دوره 
                </button>
              </div>
              {courseId && <SectionManager courseId={courseId} />}
              <div className="add-form-btn widget-next-btn submit-btn d-flex justify-content-between mb-0">
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentStep(0)}
                >
                  <i className="fas fa-arrow-right me-1" /> قبلی
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setCurrentStep(2)}
                >
                  بعدی: دروس <i className="fas fa-arrow-left ms-1" />
                </button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="add-course-item">
            <div className="wizard-form-card">
              <div className="title d-flex justify-content-between align-items-center">
                <h5 className="mb-0">دروس</h5>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setCurrentStep(1)}
                >
                  <i className="fas fa-arrow-left me-1" /> بازگشت به سرفصل ها
                </button>
              </div>
              {courseId && <SectionManager courseId={courseId} />}
              <div className="add-form-btn widget-next-btn submit-btn d-flex justify-content-between mb-0">
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentStep(1)}
                >
                  <i className="fas fa-arrow-right me-1" /> قبلی
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setCurrentStep(3)}
                >
                  بعدی: فایل های دروس  <i className="fas fa-arrow-left ms-1" />
                </button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="add-course-item">
            <div className="wizard-form-card">
              <div className="title d-flex justify-content-between align-items-center">
                <h5 className="mb-0">فایل های دروس</h5>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setCurrentStep(2)}
                >
                  <i className="fas fa-arrow-left me-1" /> بازگشت به دروس 
                </button>
              </div>
              <p className="text-muted mb-3">
                فایل‌های مربوط به هر درس را مدیریت کنید. سرفصل ها را باز کنید تا درس‌ها را ببینید، سپس فایل‌ها را به هر درس اضافه کنید.
              </p>
              {courseId && <SectionManager courseId={courseId} />}
              <div className="add-form-btn widget-next-btn submit-btn d-flex justify-content-between mb-0">
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentStep(2)}
                >
                  <i className="fas fa-arrow-right me-1" /> قبلی
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setCurrentStep(4)}
                >
                  بعدی: انتشار <i className="fas fa-arrow-Left ms-1" />
                </button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="add-course-item">
            <div className="wizard-form-card">
              <div className="title d-flex justify-content-between align-items-center">
                <h5 className="mb-0">انتشار دوره</h5>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setCurrentStep(3)}
                >
                  <i className="fas fa-arrow-left me-1" /> بازگشت به فایل های دروس
                </button>
              </div>
              {courseId && (
                <CourseSummary courseId={courseId} onPublished={handlePublished} />
              )}
              <div className="add-form-btn widget-next-btn submit-btn d-flex justify-content-start mb-0">
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentStep(3)}
                >
                  <i className="fas fa-arrow-right me-1" /> قبلی
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <div className="content mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <Stepper steps={STEPS} currentStep={currentStep} />
              {renderStep()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewCourse;
