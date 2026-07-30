import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import courseService, {
  Course,
  Section,
} from "../../../../services/course.service";

interface CourseSummaryProps {
  courseId: number;
  onPublished: () => void;
}

const CourseSummary: React.FC<CourseSummaryProps> = ({
  courseId,
  onPublished,
}) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [courseData, sectionsData] = await Promise.all([
        courseService.getCourse(courseId),
        courseService.getSections(courseId),
      ]);
      setCourse(courseData);
      setSections(sectionsData);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "بارگذاری اطلاعات دوره با خطا مواجه شد.";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalLessons = sections.reduce(
    (sum, s) => sum + (s.Lessons?.length || 0),
    0,
  );

  const totalFiles = sections.reduce(
    (sum, s) =>
      sum +
      (s.Lessons?.reduce((lSum, l) => lSum + (l.LessonFiles?.length || 0), 0) ||
        0),
    0,
  );

  const handlePublish = async () => {
    setPublishing(true);
    try {
      await courseService.publishCourse(courseId);
      toast.success("دوره با موفقیت منتشر شد.");
      onPublished();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "انتشار دوره با خطا مواجه شد.";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">خلاصه دوره</h5>
      </div>
      <div className="card-body">
        <div className="row mb-4">
          <div className="col-md-6">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-muted" style={{ width: "140px" }}>
                    عنوان
                  </td>
                  <td>
                    <strong>{course.Title}</strong>
                  </td>
                </tr>
                <tr>
                  <td className="text-muted">دسته‌بندی</td>
                  <td>{course.Category?.Title || "-"}</td>
                </tr>
                <tr>
                  <td className="text-muted">سطح</td>
                  <td>{course.Level?.LevelName || "تعیین نشده"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-muted" style={{ width: "140px" }}>
                    قیمت
                  </td>
                  <td>
                    <strong>{course.Price} ریال</strong>
                  </td>
                </tr>
                <tr>
                  <td className="text-muted">قیمت با تخفیف</td>
                  <td>
                    {course.DiscountPrice != null
                      ? `${course.DiscountPrice} ریال`
                      : "تعیین نشده"}
                  </td>
                </tr>
                <tr>
                  <td className="text-muted">وضعیت</td>
                  <td>
                    {course.IsPublished ? (
                      <span className="badge bg-success">منتشر شده</span>
                    ) : (
                      <span className="badge bg-warning text-dark">
                        پیش‌نویس
                      </span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="row text-center mb-4">
          <div className="col-md-4 mb-3">
            <div className="border rounded p-3">
              <h3 className="text-primary mb-1">{sections.length}</h3>
              <small className="text-muted">سرفصل‌ها</small>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="border rounded p-3">
              <h3 className="text-primary mb-1">{totalLessons}</h3>
              <small className="text-muted">دروس</small>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="border rounded p-3">
              <h3 className="text-primary mb-1">{totalFiles}</h3>
              <small className="text-muted">فایل‌ها</small>
            </div>
          </div>
        </div>

        <div className="text-center">
          {course.IsPublished ? (
            <div className="py-3">
              <i className="fas fa-check-circle fa-3x text-success mb-3" />
              <p className="text-muted mb-0">این دوره قبلاً منتشر شده است.</p>
            </div>
          ) : (
            <button
              className="btn btn-success btn-lg px-5"
              onClick={handlePublish}
              disabled={publishing}
            >
              {publishing && (
                <span className="spinner-border spinner-border-sm me-2" />
              )}
              <i className="fas fa-rocket me-2" />
              انتشار دوره
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSummary;
