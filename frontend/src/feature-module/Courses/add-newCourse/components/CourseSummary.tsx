import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import courseService, { Course, Section } from "../../../../services/course.service";

interface CourseSummaryProps {
  courseId: number;
  onPublished: () => void;
}

const CourseSummary: React.FC<CourseSummaryProps> = ({ courseId, onPublished }) => {
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
      const msg = err?.response?.data?.message || "Failed to load course data";
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
    0
  );

  const totalFiles = sections.reduce(
    (sum, s) =>
      sum +
      (s.Lessons?.reduce((lSum, l) => lSum + (l.LessonFiles?.length || 0), 0) ||
        0),
    0
  );

  const handlePublish = async () => {
    setPublishing(true);
    try {
      await courseService.publishCourse(courseId);
      toast.success("Course published successfully!");
      onPublished();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "Failed to publish course";
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
        <h5 className="mb-0">Course Summary</h5>
      </div>
      <div className="card-body">
        <div className="row mb-4">
          <div className="col-md-6">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-muted" style={{ width: "140px" }}>
                    Title
                  </td>
                  <td>
                    <strong>{course.Title}</strong>
                  </td>
                </tr>
                <tr>
                  <td className="text-muted">Category</td>
                  <td>{course.Category?.Title || "-"}</td>
                </tr>
                <tr>
                  <td className="text-muted">Level</td>
                  <td>{course.Level?.LevelName || "Not set"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-muted" style={{ width: "140px" }}>
                    Price
                  </td>
                  <td>
                    <strong>${course.Price}</strong>
                  </td>
                </tr>
                <tr>
                  <td className="text-muted">Discount Price</td>
                  <td>
                    {course.DiscountPrice != null
                      ? `$${course.DiscountPrice}`
                      : "Not set"}
                  </td>
                </tr>
                <tr>
                  <td className="text-muted">Status</td>
                  <td>
                    {course.IsPublished ? (
                      <span className="badge bg-success">Published</span>
                    ) : (
                      <span className="badge bg-warning text-dark">
                        Draft
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
              <small className="text-muted">Sections</small>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="border rounded p-3">
              <h3 className="text-primary mb-1">{totalLessons}</h3>
              <small className="text-muted">Lessons</small>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="border rounded p-3">
              <h3 className="text-primary mb-1">{totalFiles}</h3>
              <small className="text-muted">Files</small>
            </div>
          </div>
        </div>

        <div className="text-center">
          {course.IsPublished ? (
            <div className="py-3">
              <i className="fas fa-check-circle fa-3x text-success mb-3" />
              <p className="text-muted mb-0">This course is already published.</p>
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
              Publish Course
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSummary;
