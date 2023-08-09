import { UserPlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import IsDefault from "./TitleCheck/isDefault";

export default function TitleComponent() {
  return (
    <>
      <Routes>
        <Route path="*" element={<IsDefault />} />
      </Routes>
    </>
  );
}
