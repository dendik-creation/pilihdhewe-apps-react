import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  LinkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import DashboardPages from "../pages/DashboardPages";
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import EventPages from "../pages/EventPages";
import SiswaPages from "../pages/SiswaPages";
import TitleComponent from "../components/Partials/TitleComponent";
import EventDetailComponent from "../components/Event/EventDetailComponent";
import { EventCreate } from "../components/Event/EventCreate";
import { Logout } from "../API/auth";
import Swal from "sweetalert2";
import { ACTIVE_USER, APP_NAME } from "../utils/constant";
import { AdminOnly } from "../router/Middleware";
import { EventEdit } from "../components/Event/EventEdit";
import { MyProfile } from "../pages/MyProfile";
import LaporanPages from "../pages/LaporanPages";
import AboutPages from "../pages/AboutPages";
import DetailLaporan from "../components/Laporan/DetailLaporan";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const credentials = {
    name: ACTIVE_USER.user.name,
    number_card: ACTIVE_USER.user.number_card,
    gambar: ACTIVE_USER.user.gambar,
  };
  const navigation = [
    { name: "Dashboard", href: "/", current: true, access: "admin" },
    { name: "Events", href: "/events", current: false, access: "both" },
    { name: "Siswa", href: "/siswa", current: false, access: "admin" },
    { name: "Laporan", href: "/laporan", current: false, access: "admin" },
  ];

  const navigate = useNavigate();

  const userNavigation = [
    {
      name: "My Profile",
      current: false,
      path: "/my-profile",
      click: () => goToProfile(),
      icon:
        ACTIVE_USER.user.role == "admin" ? "bi-incognito" : "bi-person-rolodex",
    },
    {
      name: "About App",
      current: false,
      path: "/about",
      click: () => goToAbout(),
      icon: "bi-info-circle",
    },
    {
      name: "Log out",
      current: false,
      path: "/logout",
      click: () => beforeLogout(),
      icon: "bi-door-open",
    },
  ];

  const goToProfile = () => {
    navigate("/my-profile");
  };

  const goToAbout = () => {
    navigate("/about");
  };

  const beforeLogout = () => {
    Swal.fire({
      title: "Apakah Yakin Logout ?",
      text: "Sesi Anda akan dihapus dan harus login kembali",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Logout();
      }
    });
  };

  let isCurrentUserNav = () => {
    const location = useLocation();
    let currentPath = location.pathname;
    userNavigation.map((item) => {
      if (currentPath == item.path) {
        item.current = true;
      } else {
        item.current = false;
      }
      return item;
    });
    return userNavigation;
  };

  let isActiveNav = () => {
    const location = useLocation();
    let currentPath = location.pathname;
    let splitUrl = currentPath.split("/");
    let eventEdit = parseInt(splitUrl[3]);
    let eventShow = parseInt(splitUrl[2]);
    let laporanShow = parseInt(splitUrl[3]);
    navigation.forEach((item) => {
      if (currentPath == item.href) {
        item.current = true;
      } else if (currentPath == `${item.href}/edit/${eventEdit}`) {
        item.current = true;
      } else if (currentPath == `${item.href}/${eventShow}`) {
        item.current = true;
      } else if (currentPath == `${item.href}/create`) {
        item.current = true;
      } else if (currentPath == `${item.href}/detail/${laporanShow}`) {
        item.current = true;
      } else {
        item.current = false;
      }
      return item;
    });
    return navigation;
  };

  let isAllowNav = isActiveNav().filter(
    (item) => item.access == ACTIVE_USER.user.role || item.access == "both"
  );
  let showUserNav = isCurrentUserNav();
  return (
    <>
      <div className="min-h-full">
        <Disclosure
          as="nav"
          className="bg-gray-800 backdrop-blur-xl sticky top-0 z-50"
        >
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    {ACTIVE_USER.user.role == "siswa" ? (
                      <div className="flex items-center justify-start gap-2">
                        <LinkIcon className=" text-slate-200 h-8 w-8" />
                        <NavLink
                          to={"/events"}
                          className="text-slate-100 font-semibold"
                        >
                          {APP_NAME}
                        </NavLink>
                      </div>
                    ) : (
                      <div className="flex items-center justify-start gap-2">
                        <LinkIcon className=" text-slate-200 h-8 w-8" />
                        <NavLink
                          to={"/"}
                          className="text-slate-100 font-semibold"
                        >
                          {APP_NAME}
                        </NavLink>
                      </div>
                    )}
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-12">
                        {isAllowNav.map((item, i) => (
                          <NavLink
                            key={i}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-700 text-white transition-all"
                                : "text-gray-300 transition-all hover:bg-gray-700 hover:transition-all  hover:text-white",
                              "rounded-md py-2 text-sm font-medium w-24 text-center transition-all"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center group rounded-md group px-4 py-2 bg-gray-800 text-sm focus:outline-none focus:bg-gray-700">
                            <span className="sr-only">Open user menu</span>
                            <div className="flex justify-start items-center">
                              <img
                                className="h-8 w-8 ring-1 ring-offset-1 ring-slate-50 object-cover rounded-full me-3"
                                src={credentials.gambar}
                                alt=""
                              />
                              {credentials.name !== null ? (
                                <div className="text-gray-300 text-sm me-2 w-40 line-clamp-1">
                                  {credentials.name}
                                </div>
                              ) : (
                                ""
                              )}
                              <ChevronDownIcon className="w-4 h-4 text-slate-50 group-hover:rotate-180 group-hover:transition-all transition-all" />
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {showUserNav.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <button
                                    to={item.href}
                                    onClick={item.click}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      item.current ? "bg-gray-300" : "",
                                      "flex px-4 py-2 text-sm text-gray-700 w-full items-center"
                                    )}
                                    aria-current={
                                      item.current ? "page" : undefined
                                    }
                                  >
                                    <i className={`bi ${item.icon} me-3`}></i>
                                    <span>{item.name}</span>
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-2 px-2 pb-3 pt-2 sm:px-3">
                  {isAllowNav.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="div"
                      className={classNames(
                        item.current
                          ? "bg-gray-700 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <NavLink className="w-full flex" to={item.href}>
                        {item.name}
                      </NavLink>
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 ring-1 ring-offset-1 ring-slate-50 object-cover rounded-full me-2"
                        src={credentials.gambar}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium my-1 leading-none text-white">
                        {credentials.name}
                      </div>
                      <div className="text-sm font-medium my-1 leading-none text-gray-400">
                        {credentials.number_card}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {showUserNav.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="button"
                        onClick={item.click}
                        className={`flex w-full rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white ${
                          item.current ? "bg-gray-700 text-gray-100" : ""
                        }`}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <i className={`bi ${item.icon} me-3`}></i>
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Routes>
          <Route path="*" element={<TitleComponent />} />
          <Route
            path="/events/create/*"
            element={
              <AdminOnly>
                <EventCreate />
              </AdminOnly>
            }
          />
          <Route path="/events/:id" element={<EventDetailComponent />} />
          <Route path="/laporan/detail/:id" element={<DetailLaporan />} />
          <Route
            path="/events/edit/:id"
            element={
              <AdminOnly>
                <EventEdit />
              </AdminOnly>
            }
          />
        </Routes>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/events" element={<EventPages />} />
              <Route
                path="/"
                element={
                  <AdminOnly>
                    <DashboardPages />
                  </AdminOnly>
                }
              />
              <Route
                path="/siswa"
                element={
                  <AdminOnly>
                    <SiswaPages />
                  </AdminOnly>
                }
              />
              <Route
                path="/laporan"
                element={
                  <AdminOnly>
                    <LaporanPages />
                  </AdminOnly>
                }
              />

              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/about" element={<AboutPages />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
}
