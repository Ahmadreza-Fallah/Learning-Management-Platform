import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import courseService, { Section, Lesson } from "../../../../services/course.service";
import LessonManager from "./LessonManager";

interface SectionManagerProps {
  courseId: number;
}

const SectionManager: React.FC<SectionManagerProps> = ({ courseId }) => {
  const [sections, setSections] = useState<(Section & { Lessons?: Lesson[] })[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionOrder, setSectionOrder] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchSections = useCallback(async () => {
    setLoading(true);
    try {
      const data = await courseService.getSections(courseId);
      setSections(data);
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to load sections";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectionTitle.trim()) {
      toast.error("عنوان سرفصل اجباری میباشد.");
      return;
    }
    setSaving(true);
    try {
      await courseService.createSection(courseId, {
        title: sectionTitle.trim(),
        displayOrder: sectionOrder ? Number(sectionOrder) : undefined,
      });
      toast.success("سرفصل با موفقیت ایجاد شد.");
      setShowAddModal(false);
      setSectionTitle("");
      setSectionOrder("");
      fetchSections();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to create section";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSection) return;
    if (!sectionTitle.trim()) {
      toast.error("Section title is required");
      return;
    }
    setSaving(true);
    try {
      await courseService.updateSection(selectedSection.Id, {
        title: sectionTitle.trim(),
        displayOrder: sectionOrder ? Number(sectionOrder) : undefined,
      });
      toast.success("Section updated successfully!");
      setShowEditModal(false);
      setSelectedSection(null);
      setSectionTitle("");
      setSectionOrder("");
      fetchSections();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to update section";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedSection) return;
    setSaving(true);
    try {
      await courseService.deleteSection(selectedSection.Id);
      toast.success("Section deleted successfully!");
      setShowDeleteModal(false);
      setSelectedSection(null);
      fetchSections();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to delete section";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setSaving(false);
    }
  };

  const openEditModal = (section: Section) => {
    setSelectedSection(section);
    setSectionTitle(section.Title);
    setSectionOrder(section.DisplayOrder?.toString() || "");
    setShowEditModal(true);
  };

  const openDeleteModal = (section: Section) => {
    setSelectedSection(section);
    setShowDeleteModal(true);
  };

  const toggleExpand = (sectionId: number) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">سرفصل های دوره</h5>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setSectionTitle("");
              setSectionOrder("");
              setShowAddModal(true);
            }}
          >
            <i className="fas fa-plus me-1" /> افزودن سرفصل
          </button>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status" />
            </div>
          ) : sections.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="fas fa-layer-group fa-3x mb-3 d-block" />
              <p>هنوز هیچ سرفصلی ایجاد نشده است. برای شروع، اولین سرفصل را اضافه کنید.</p>
            </div>
          ) : (
            <div className="accordion accordions-items-seperate" id="sectionsAccordion">
              {sections.map((section, index) => (
                <div className="accordion-item" key={section.Id}>
                  <div className="accordion-header d-flex justify-content-between align-items-center">
                    <button
                      className="accordion-button"
                      type="button"
                      onClick={() => toggleExpand(section.Id)}
                      style={{
                        boxShadow: "none",
                        backgroundColor:
                          expandedSection === section.Id ? undefined : "#f8f9fa",
                      }}
                    >
                      <span className="me-2">
                        <i className="fas fa-grip-vertical text-muted" />
                      </span>
                      <div>
                        <strong>
                          Section {index + 1}: {section.Title}
                        </strong>
                        <span className="badge bg-secondary ms-2">
                          {section.Lessons?.length || 0} دروس
                        </span>
                      </div>
                    </button>
                    <div className="d-flex align-items-center pe-3" style={{ position: "relative", zIndex: 10 }}>
                      <button
                        className="edit-btn1"
                        title="Edit Section"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(section);
                        }}
                      >
                        <i className="fas fa-pen" />
                      </button>
                      <button
                        className="delete-btn1 ms-2"
                        title="Delete Section"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(section);
                        }}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  </div>
                  {expandedSection === section.Id && (
                    <div className="accordion-collapse collapse show">
                      <div className="accordion-body">
                        <LessonManager
                          courseId={courseId}
                          sectionId={section.Id}
                          onLessonsChanged={fetchSections}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Section Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">افزودن سرفصل</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                />
              </div>
              <form onSubmit={handleAdd}>
                <div className="modal-body">
                  <div className="input-block">
                    <label className="form-label">
                      Section Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={sectionTitle}
                      onChange={(e) => setSectionTitle(e.target.value)}
                      placeholder="Enter section title"
                      disabled={saving}
                      autoFocus
                    />
                  </div>
                  <div className="input-block">
                    <label className="form-label">ترتیب نمایش</label>
                    <input
                      type="number"
                      className="form-control"
                      value={sectionOrder}
                      onChange={(e) => setSectionOrder(e.target.value)}
                      placeholder="Auto-assigned"
                      min="1"
                      disabled={saving}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setShowAddModal(false)}
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
                    Add Section
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Section Modal */}
      {showEditModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">ویرایش سرفصل</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                />
              </div>
              <form onSubmit={handleEdit}>
                <div className="modal-body">
                  <div className="input-block">
                    <label className="form-label">
                      Section Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={sectionTitle}
                      onChange={(e) => setSectionTitle(e.target.value)}
                      placeholder="Enter section title"
                      disabled={saving}
                      autoFocus
                    />
                  </div>
                  <div className="input-block">
                    <label className="form-label">ترتیب نمایش </label>
                    <input
                      type="number"
                      className="form-control"
                      value={sectionOrder}
                      onChange={(e) => setSectionOrder(e.target.value)}
                      placeholder="Auto-assigned"
                      min="1"
                      disabled={saving}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setShowEditModal(false)}
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
                    ذخیره تغییرات
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Section Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">حذف سرفصل</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                />
              </div>
              <div className="modal-body">
                <p>
                  از حذف کردن سرفصل اطمینان دارید{" "}
                  <strong>{selectedSection?.Title}</strong>?
                </p>
                <p className="text-muted mb-0">
                  تمام درس‌های این بخش نیز حذف خواهند شد.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setShowDeleteModal(false)}
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

export default SectionManager;
