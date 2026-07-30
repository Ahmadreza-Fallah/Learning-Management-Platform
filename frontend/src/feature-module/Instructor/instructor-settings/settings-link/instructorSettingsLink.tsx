import React from "react";
import { all_routes } from "../../../router/all_routes";
import { Link, useLocation } from "react-router-dom";

const InstructorSettingsLink = () => {
  const route = all_routes;

  const location = useLocation();

  return (
    <>
      <ul className="settings-nav d-flex align-items-center flex-wrap border bg-light-900 rounded">
        <li>
          <Link
            to={route.instructorsettings}
            className={`${location.pathname === "/instructor/instructor-settings" ? "active" : ""}`}
          >
            ویرایش پروفایل
          </Link>
        </li>
        <li>
          <Link
            to={route.instructorChangePassword}
            className={`${location.pathname === "/instructor/instructor-change-password" ? "active" : ""}`}
          >
            تغییر رمز عبور
          </Link>
        </li>
      </ul>
    </>
  );
};

export default InstructorSettingsLink;
