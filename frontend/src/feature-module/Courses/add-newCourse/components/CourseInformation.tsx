import React, { useState } from "react";
import toast from "react-hot-toast";
import courseService, {
  Category,
  Level,
} from "../../../../services/course.service";

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
  const [title, setTitle] = useState(initialData?.Title || "");
  const [shortDescription, setShortDescription] = useState(
    initialData?.ShortDescription || ""
  );
  const [description, setDescription] = useState(
    initialData?.Description || ""
  );
  const [price, setPrice] = useState(
    initialData?.Price?.toString() || ""
  );
  const [discountPrice, setDiscountPrice] = useState(
    initialData?.DiscountPrice?.toString() || ""
  );
  const [categoryId, setCategoryId] = useState(
    initialData?.CategoryId?.toString() || ""
  );
  const [levelId, setLevelId] = useState(
    initialData?.Level_Id?.toString() || ""
  );
  const [durationMinutes, setDurationMinutes] = useState(
    initialData?.DurationMinutes?.toString() || ""
  );
  const [thumbnail, setThumbnail] = useState(
    initialData?.Thumbnail || ""
  );
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Course title is required");
      return;
    }
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }
    if (!price || Number(price) < 0) {
      toast.error("Please enter a valid price");
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
          durationMinutes: durationMinutes ? Number(durationMinutes) : undefined,
          thumbnail: thumbnail.trim() || undefined,
        });
        toast.success("Course updated successfully!");
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
          durationMinutes: durationMinutes ? Number(durationMinutes) : undefined,
          thumbnail: thumbnail.trim() || undefined,
        });
        toast.success("Course created successfully!");
        onComplete(course.Id);
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "Failed to save course";
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
                 <span className="text-danger ms-1"> * </span> 
                عنوان دوره
               
              </label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter course title"
                disabled={submitting}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-block">
              <label className="form-label">
                <span className="text-danger ms-1"> * </span>
                دسته بندی
                
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
              <label className="form-label">معرفی دوره</label>
              <input
                type="text"
                className="form-control"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief description of the course"
                disabled={submitting}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="input-block">
              <label className="form-label">توضیحات</label>
              <textarea
                className="form-control"
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter course description"
                disabled={submitting}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-block">
              <label className="form-label">
               <span className="text-danger ms-1">*</span> هزینه  (ریال)
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
              <label className="form-label">Discount Price (ریال)</label>
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
              <label className="form-label">مدت زمان (دقیقه)</label>
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
              <label className="form-label">Thumbnail URL</label>
              <input
                type="text"
                className="form-control"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://example.com/thumbnail.jpg"
                disabled={submitting}
              />
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
              {initialData?.Id ? "به روز رسانی " : "ایجاد دوره"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
