import React, { useState, useEffect } from "react";
import Breadcrumb from "../../../core/common/Breadcrumb/breadcrumb";
import { useNavigate } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import courseService, {
  Category,
  Level,
} from "../../../services/course.service";
import toast from "react-hot-toast";

const AddNewCourse = () => {
  const route = all_routes;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [levelId, setLevelId] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      debugger;
      try {
        const [cats, lvls] = await Promise.all([
          courseService.getCategories(),
          courseService.getLevels(),
        ]);
        console.log("Categories:", cats);
        console.log("Levels:", lvls);
        setCategories(cats);
        setLevels(lvls);
      } catch (err) {
        toast.error("Failed to load categories or levels");
      }
    };
    fetchData();
  }, []);

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
      await courseService.createCourse({
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
      navigate(route.instructorCourse);
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to create course";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Breadcrumb title="Add New Course" />

      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="add-course-item">
                <form onSubmit={handleSubmit}>
                  <div className="form-inner wizard-form-card">
                    <div className="title">
                      <h5>Course Information</h5>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="input-block">
                          <label className="form-label">
                            Course Title
                            <span className="text-danger ms-1">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter course title"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block">
                          <label className="form-label">
                            Course Category
                            <span className="text-danger ms-1">*</span>
                          </label>
                          <select
                            className="form-control"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                          >
                            <option value="">Select Category</option>
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
                          <label className="form-label">Course Level</label>
                          <select
                            className="form-control"
                            value={levelId}
                            onChange={(e) => setLevelId(e.target.value)}
                          >
                            <option value="">Select Level</option>
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
                            Short Description
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={shortDescription}
                            onChange={(e) =>
                              setShortDescription(e.target.value)
                            }
                            placeholder="Brief description of the course"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="input-block">
                          <label className="form-label">
                            Course Description
                          </label>
                          <textarea
                            className="form-control"
                            rows={6}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter course description"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-block">
                          <label className="form-label">
                            Price ($)<span className="text-danger ms-1">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-block">
                          <label className="form-label">
                            Discount Price ($)
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={discountPrice}
                            onChange={(e) => setDiscountPrice(e.target.value)}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-block">
                          <label className="form-label">
                            Duration (Minutes)
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={durationMinutes}
                            onChange={(e) => setDurationMinutes(e.target.value)}
                            placeholder="0"
                            min="0"
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
                          {submitting ? "Creating..." : "Create Course"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewCourse;
