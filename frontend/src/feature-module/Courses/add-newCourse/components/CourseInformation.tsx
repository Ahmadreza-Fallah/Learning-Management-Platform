import React, { useState } from "react";
import toast from "react-hot-toast";
import DefaultEditor from "react-simple-wysiwyg";
import courseService, {
  Category,
  Level,
} from "../../../../services/course.service";
import uploadService from "../../../../services/upload.service";

interface CourseInformationProps {
  categories: Category[];
  levels: Level[];
  initialData?: any;
  onComplete: (courseId: number) => void;
}

const CourseInformation: React.FC<CourseInformationProps> = ({
  categories,
  levels,
  initialData,
  onComplete,
}) => {
  const getApiUrl = () => "http://localhost:3000";
  const [title, setTitle] = useState(initialData?.Title || "");
  const [shortDescription, setShortDescription] = useState(
    initialData?.ShortDescription || "",
  );
  const [description, setDescription] = useState(
    initialData?.Description || "",
  );
  const [price, setPrice] = useState(initialData?.Price?.toString() || "");
  const [discountPrice, setDiscountPrice] = useState(
    initialData?.DiscountPrice?.toString() || "",
  );
  const [categoryId, setCategoryId] = useState(
    initialData?.CategoryId?.toString() || "",
  );
  const [levelId, setLevelId] = useState(
    initialData?.Level_Id?.toString() || "",
  );
  const [durationMinutes, setDurationMinutes] = useState(
    initialData?.DurationMinutes?.toString() || "",
  );
  const buildThumbnailUrl = (path?: string) =>
    path ? `${getApiUrl()}${path}` : "";

  const [thumbnail, setThumbnail] = useState(initialData?.Thumbnail || "");

  const [thumbnailPreview, setThumbnailPreview] = useState(
    buildThumbnailUrl(initialData?.Thumbnail),
  );

  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("فقط فایل تصویری مجاز است.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("حداکثر حجم تصویر ۵ مگابایت است.");
      return;
    }

    setThumbnailPreview(URL.createObjectURL(file));

    try {
      setUploadingImage(true);

      const result = await uploadService.uploadCourseImage(file);

      setThumbnail(result.path);
      setThumbnailPreview(`${getApiUrl()}${result.path}`);
      toast.success("تصویر با موفقیت آپلود شد.");
    } catch {
      toast.error("آپلود تصویر انجام نشد.");
    } finally {
      setUploadingImage(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("عنوان دوره اجباری است.");
      return;
    }
    if (!categoryId) {
      toast.error("لطفاً یک دسته‌بندی انتخاب کنید.");
      return;
    }
    if (!price || Number(price) < 0) {
      toast.error("لطفاً یک قیمت معتبر وارد کنید.");
      return;
    }

    if (!thumbnail) {
      toast.error("لطفاً تصویر دوره را آپلود کنید.");
      return;
    }
    setSubmitting(true);
    try {
      if (initialData?.Id) {
        await courseService.updateCourse(initialData.Id, {
          title: title.trim(),
          shortDescription: shortDescription.trim() || undefined,
          description: description.trim() || undefined,
          price: Number(price),
          discountPrice: discountPrice ? Number(discountPrice) : undefined,
          categoryId: Number(categoryId),
          levelId: levelId ? Number(levelId) : undefined,
          durationMinutes: durationMinutes
            ? Number(durationMinutes)
            : undefined,
          thumbnail: thumbnail.trim() || undefined,
        });
        toast.success("دوره با موفقیت بروزرسانی شد.");
        onComplete(initialData.Id);
      } else {
        const course = await courseService.createCourse({
          title: title.trim(),
          shortDescription: shortDescription.trim() || undefined,
          description: description.trim() || undefined,
          price: Number(price),
          discountPrice: discountPrice ? Number(discountPrice) : undefined,
          categoryId: Number(categoryId),
          levelId: levelId ? Number(levelId) : undefined,
          durationMinutes: durationMinutes
            ? Number(durationMinutes)
            : undefined,
          thumbnail: thumbnail.trim() || undefined,
        });
        toast.success("دوره با موفقیت ایجاد شد.");
        onComplete(course.Id);
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || "ذخیره دوره با خطا مواجه شد.";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-inner wizard-form-card">
      <div className="title">
        <h5>اطلاعات دوره</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="input-block">
              <label className="form-label">
                عنوان دوره<span className="text-danger ms-1">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="عنوان دوره را وارد کنید"
                disabled={submitting}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-block">
              <label className="form-label">
                دسته بندی<span className="text-danger ms-1">*</span>
              </label>
              <select
                className="form-control"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                disabled={submitting}
              >
                <option value="">انتخاب دسته بندی</option>
                {categories.map((cat) => (
                  <option key={cat.Id} value={cat.Id}>
                    {cat.Title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-block">
              <label className="form-label">سطح</label>
              <select
                className="form-control"
                value={levelId}
                onChange={(e) => setLevelId(e.target.value)}
                disabled={submitting}
              >
                <option value="">انتخاب سطح</option>
                {levels.map((lvl) => (
                  <option key={lvl.Id} value={lvl.Id}>
                    {lvl.LevelName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-12">
            <div className="input-block">
              <label className="form-label">
                معرفی دوره<span className="text-danger ms-1">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="معرفی کوتاهی از دوره بنویسید"
                disabled={submitting}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="input-block">
              <label className="form-label">توضیحات دوره</label>
              <div className="summernote">
                <DefaultEditor
                  value={description}
                  onChange={(e: any) => setDescription(e.target.value)}
                  disabled={submitting}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-block">
              <label className="form-label">
                هزینه (ریال)<span className="text-danger ms-1">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={submitting}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-block">
              <label className="form-label">قیمت با تخفیف (اختیاری)</label>
              <input
                type="number"
                className="form-control"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={submitting}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-block">
              <label className="form-label">مدت دوره (دقیقه)</label>
              <input
                type="number"
                className="form-control"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                placeholder="0"
                min="0"
                disabled={submitting}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="input-block">
              <label className="form-label">
                تصویر کاور دوره
                <span className="text-danger ms-1">*</span>
              </label>

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleThumbnailUpload}
                disabled={uploadingImage || submitting}
              />

              <small className="text-muted">
                فرمت‌های مجاز: JPG، PNG، WEBP - حداکثر حجم: ۵ مگابایت
              </small>

              {uploadingImage && (
                <div className="mt-2">
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  در حال آپلود تصویر...
                </div>
              )}

              {thumbnailPreview && (
                <div className="mt-3">
                  <img
                    src={thumbnailPreview}
                    alt="Course Thumbnail"
                    style={{
                      maxWidth: "320px",
                      maxHeight: "200px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      border: "1px solid #ddd",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="add-form-btn widget-next-btn submit-btn d-flex justify-content-end mb-0">
          <div className="btn-left">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                />
              )}
              {initialData?.Id ? "ذخیره تغییرات" : "ذخیره و ادامه"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
