import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import courseService, { Lesson } from "../../../../services/course.service";
import LessonFileManager from "./LessonFileManager";

interface LessonManagerProps {
  courseId: number;
  sectionId: number;
  onLessonsChanged: () => void;
}

const LessonManager: React.FC<LessonManagerProps> = ({
  sectionId,
  onLessonsChanged,
}) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonVideoUrl, setLessonVideoUrl] = useState("");
  const [lessonDuration, setLessonDuration] = useState("");
  const [lessonOrder, setLessonOrder] = useState("");
  const [lessonFreePreview, setLessonFreePreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchLessons = useCallback(async () => {
    setLoading(true);
    try {
      const data = await courseService.getLessons(sectionId);
      setLessons(data);
    } catch (err: any) {
      const msg = err?.response?.data?.message || "ارگذاری درس‌ها با مشکل مواجه شد.";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setLoading(false);
    }
  }, [sectionId]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  const resetForm = () => {
    setLessonTitle("");
    setLessonDescription("");
    setLessonVideoUrl("");
    setLessonDuration("");
    setLessonOrder("");
    setLessonFreePreview(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle.trim()) {
      toast.error("Lesson title is required");
      return;
    }
    setSaving(true);
    try {
      await courseService.createLesson(sectionId, {
        title: lessonTitle.trim(),
        description: lessonDescription.trim() || undefined,
        videoUrl: lessonVideoUrl.trim() || undefined,
        durationMinutes: lessonDuration ? Number(lessonDuration) : undefined,
        displayOrder: lessonOrder ? Number(lessonOrder) : undefined,
        isFreePreview: lessonFreePreview,
      });
      toast.success("Lesson created successfully!");
      setShowAddModal(false);
      resetForm();
      fetchLessons();
      onLessonsChanged();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "ایجاد درس با مشکل مواجه شد.";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLesson) return;
    if (!lessonTitle.trim()) {
      toast.error("Lesson title is required");
      return;
    }
    setSaving(true);
    try {
      await courseService.updateLesson(selectedLesson.Id, {
        title: lessonTitle.trim(),
        description: lessonDescription.trim() || undefined,
        videoUrl: lessonVideoUrl.trim() || undefined,
        durationMinutes: lessonDuration ? Number(lessonDuration) : undefined,
        displayOrder: lessonOrder ? Number(lessonOrder) : undefined,
        isFreePreview: lessonFreePreview,
      });
      toast.success("Lesson updated successfully!");
      setShowEditModal(false);
      setSelectedLesson(null);
      resetForm();
      fetchLessons();
      onLessonsChanged();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "به‌روزرسانی درس با مشکل مواجه شد.";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedLesson) return;
    setSaving(true);
    try {
      await courseService.deleteLesson(selectedLesson.Id);
      toast.success("Lesson deleted successfully!");
      setShowDeleteModal(false);
      setSelectedLesson(null);
      fetchLessons();
      onLessonsChanged();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "حذف درس با مشکل مواجه شد.";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setSaving(false);
    }
  };

  const openEditModal = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setLessonTitle(lesson.Title);
    setLessonDescription(lesson.Description || "");
    setLessonVideoUrl(lesson.VideoUrl || "");
    setLessonDuration(lesson.DurationMinutes?.toString() || "");
    setLessonOrder(lesson.SortOrder?.toString() || "");
    setLessonFreePreview(lesson.IsFreePreview);
    setShowEditModal(true);
  };

  const openDeleteModal = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setShowDeleteModal(true);
  };

  const lessonForm = (
    <form onSubmit={showEditModal ? handleEdit : handleAdd}>
      <div className="modal-body">
        <div className="input-block">
          <label className="form-label">
            عنوان درس <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            placeholder="Enter lesson title"
            disabled={saving}
            autoFocus
          />
        </div>
        <div className="input-block">
          <label className="form-label">توضیحات</label>
          <textarea
            className="form-control"
            rows={3}
            value={lessonDescription}
            onChange={(e) => setLessonDescription(e.target.value)}
            placeholder="Brief lesson description"
            disabled={saving}
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="input-block">
              <label className="form-label">آدرس ویدئو</label>
              <input
                type="text"
                className="form-control"
                value={lessonVideoUrl}
                onChange={(e) => setLessonVideoUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
                disabled={saving}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-block">
              <label className="form-label">مدت زمان (دقیقه)</label>
              <input
                type="number"
                className="form-control"
                value={lessonDuration}
                onChange={(e) => setLessonDuration(e.target.value)}
                placeholder="0"
                min="0"
                disabled={saving}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="input-block">
              <label className="form-label">ترتیب نمایش </label>
              <input
                type="number"
                className="form-control"
                value={lessonOrder}
                onChange={(e) => setLessonOrder(e.target.value)}
                placeholder="Auto-assigned"
                min="1"
                disabled={saving}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-block">
              <label className="form-label">&nbsp;</label>
              <div className="form-check mt-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="freePreviewCheck"
                  checked={lessonFreePreview}
                  onChange={(e) => setLessonFreePreview(e.target.checked)}
                  disabled={saving}
                />
                <label className="form-check-label" htmlFor="freePreviewCheck">
                  قابل مشاهده به‌صورت رایگان
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            if (showAddModal) setShowAddModal(false);
            if (showEditModal) {
              setShowEditModal(false);
              setSelectedLesson(null);
            }
            resetForm();
          }}
          disabled={saving}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={saving}
        >
          {saving && (
            <span className="spinner-border spinner-border-sm me-2" />
          )}
          {showEditModal ? "ذخیره تغییرات" : "افزودن درس"}
        </button>
      </div>
    </form>
  );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0 text-muted">دروس</h6>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
        >
          <i className="fas fa-plus me-1" /> افزودن درس
        </button>
      </div>

      {loading ? (
        <div className="text-center py-3">
          <div className="spinner-border spinner-border-sm text-primary" />
        </div>
      ) : lessons.length === 0 ? (
        <div className="text-center py-4 text-muted">
          <i className="fas fa-book fa-2x mb-2 d-block" />
          <p className="mb-0">هنوز هیچ درسی اضافه نشده است.</p>
        </div>
      ) : (
        <div className="row">
          {lessons.map((lesson) => (
            <div className="col-md-12 mb-3" key={lesson.Id}>
              <div className="card border">
                <div className="card-body py-2 px-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center mb-1">
                        <strong className="me-2">{lesson.Title}</strong>
                        {lesson.IsFreePreview && (
                          <span className="badge bg-success">Free Preview</span>
                        )}
                      </div>
                      {lesson.Description && (
                        <p className="text-muted mb-1 small text-truncate">
                          {lesson.Description}
                        </p>
                      )}
                      <div className="d-flex gap-3 text-muted small">
                        {lesson.DurationMinutes != null && (
                          <span>
                            <i className="fas fa-clock me-1" />
                            {lesson.DurationMinutes} دقیقه
                          </span>
                        )}
                        {lesson.VideoUrl && (
                          <span>
                            <i className="fas fa-video me-1" />
                            Video
                          </span>
                        )}
                        <span>
                          <i className="fas fa-paperclip me-1" />
                          {lesson.LessonFiles?.length || 0} فایل ها
                        </span>
                      </div>
                    </div>
                    <div className="d-flex gap-1">
                      <button
                        className="edit-btn1"
                        title="Edit Lesson"
                        onClick={() => openEditModal(lesson)}
                      >
                        <i className="fas fa-pen" />
                      </button>
                      <button
                        className="delete-btn1"
                        title="Delete Lesson"
                        onClick={() => openDeleteModal(lesson)}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <LessonFileManager lessonId={lesson.Id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Lesson Modal */}
      {showAddModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"> افزودن درس</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                />
              </div>
              {lessonForm}
            </div>
          </div>
        </div>
      )}

      {/* Edit Lesson Modal */}
      {showEditModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">ویرایش درس</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedLesson(null);
                    resetForm();
                  }}
                />
              </div>
              {lessonForm}
            </div>
          </div>
        </div>
      )}

      {/* Delete Lesson Modal */}
      {showDeleteModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">حذف درس</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedLesson(null);
                  }}
                />
              </div>
              <div className="modal-body">
                <p>
                آیا از حذف این درس اطمینان دارید{" "}
                  <strong>{selectedLesson?.Title}</strong>?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedLesson(null);
                  }}
                  disabled={saving}
                >
                  لغو
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={saving}
                >
                  {saving && (
                    <span className="spinner-border spinner-border-sm me-2" />
                  )}
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LessonManager;
