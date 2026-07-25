import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import courseService, { LessonFile } from "../../../../services/course.service";

interface LessonFileManagerProps {
  lessonId: number;
}

const LessonFileManager: React.FC<LessonFileManagerProps> = ({ lessonId }) => {
  const [files, setFiles] = useState<LessonFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<LessonFile | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await courseService.getLessonFiles(lessonId);
      setFiles(data);
    } catch {
      // Silent fail for files
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) {
      toast.error("File name is required");
      return;
    }
    if (!fileUrl.trim()) {
      toast.error("File URL is required");
      return;
    }
    setSaving(true);
    try {
      await courseService.createLessonFile(lessonId, {
        fileName: fileName.trim(),
        fileUrl: fileUrl.trim(),
      });
      toast.success("File added successfully!");
      setShowAddModal(false);
      setFileName("");
      setFileUrl("");
      fetchFiles();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to add file";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedFile) return;
    setSaving(true);
    try {
      await courseService.deleteLessonFile(selectedFile.Id);
      toast.success("File deleted successfully!");
      setShowDeleteModal(false);
      setSelectedFile(null);
      fetchFiles();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to delete file";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center gap-2 flex-wrap">
        <small className="text-muted me-1">
          <i className="fas fa-paperclip me-1" /> Files:
        </small>
        {loading ? (
          <span className="spinner-border spinner-border-sm" />
        ) : files.length === 0 ? (
          <small className="text-muted">No files</small>
        ) : (
          files.map((file) => (
            <span
              key={file.Id}
              className="badge bg-light text-dark border d-flex align-items-center gap-1"
            >
              <i className="fas fa-paperclip" />
              {file.FileName || "Untitled"}
              <button
                type="button"
                className="btn-close btn-close-sm"
                style={{ fontSize: "0.55rem", filter: "none" }}
                title="Remove file"
                onClick={() => {
                  setSelectedFile(file);
                  setShowDeleteModal(true);
                }}
              />
            </span>
          ))
        )}
        <button
          className="btn btn-link btn-sm p-0 text-primary"
          onClick={() => setShowAddModal(true)}
        >
          <i className="fas fa-plus" />
        </button>
      </div>

      {/* Add File Modal */}
      {showAddModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Lesson File</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowAddModal(false);
                    setFileName("");
                    setFileUrl("");
                  }}
                />
              </div>
              <form onSubmit={handleAdd}>
                <div className="modal-body">
                  <div className="input-block">
                    <label className="form-label">
                      File Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      placeholder="e.g. course-material.pdf"
                      disabled={saving}
                      autoFocus
                    />
                  </div>
                  <div className="input-block">
                    <label className="form-label">
                      File URL <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={fileUrl}
                      onChange={(e) => setFileUrl(e.target.value)}
                      placeholder="https://example.com/file.pdf"
                      disabled={saving}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      setShowAddModal(false);
                      setFileName("");
                      setFileUrl("");
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
                    Add File
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete File Modal */}
      {showDeleteModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete File</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedFile(null);
                  }}
                />
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete file{" "}
                  <strong>{selectedFile?.FileName}</strong>?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedFile(null);
                  }}
                  disabled={saving}
                >
                  Cancel
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
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LessonFileManager;
