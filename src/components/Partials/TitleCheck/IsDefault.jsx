import React from "react";
import { useLocation } from "react-router-dom";

export default function IsDefault() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {currentPath == "/"
              ? "Dashboard"
              : currentPath == "/events"
              ? "Events"
              : currentPath == "/siswa"
              ? "Siswa"
              : currentPath == "/events/create"
              ? "Event Baru"
              : currentPath == "/my-profile"
              ? "My Profile"
              : currentPath == "/laporan"
              ? "Laporan"
              : currentPath == "/about"
              ? "About Application"
              : ""}
          </h1>
        </div>
      </header>
    </>
  );
}
