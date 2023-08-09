import React from "react";
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
