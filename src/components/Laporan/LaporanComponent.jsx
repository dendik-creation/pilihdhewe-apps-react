import React, { useEffect, useState } from "react";
import { httpGetIndex } from "../../API/event";
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  SubTitle,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Transition } from "@headlessui/react";
import { bar } from "../../charts/bar";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  SubTitle
);

export default function LaporanComponent() {
  const navigate = useNavigate();
  const [events, setEvents] = useState(null);
  const [recent, setRecent] = useState(null);
  const [barChart, setBarChart] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    httpGetIndex()
      .then((res) => {
        setBarChart(bar(res[0]));
        setRecent(res[0]);
        setEvents(res.slice(1));
      })
      .then(() => {
        setTimeout(() => {
          setShow(true);
        }, 250);
      })
      .catch((err) => console.log(err));
  }, []);

  const beforeDetail = (id) => {
    setShow(false);
    setTimeout(() => {
      navigate(`detail/${id}`);
    }, 850);
  };

  return (
    <>
      {events != null ? (
        <div className="">
          <Transition
            show={show}
            enter={`transition transform duration-300 delay-[200ms]`}
            enterFrom="opacity-0 scale-110"
            enterTo="opacity-100 scale-100"
            leave="transition transform duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
            className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 py-4 shadow-md rounded-md mb-8 md:mx-0"
          >
            <div className="flex flex-col items-start justify-around" id="info">
              <div className="">
                <h2 className="text-xl font-semibold mb-5">{recent.name}</h2>
                <div className="flex items-center justify-start gap-2 mb-2">
                  <i className="bi bi-activity"></i>
                  <span className="text-slate-700">{recent.status}</span>
                </div>
                <div className="flex items-center justify-start gap-2 mb-2">
                  <i className="bi bi-people"></i>
                  <span className="text-slate-700">
                    {recent.candidates.length} Kandidat
                  </span>
                </div>
                <div className="flex items-center justify-start gap-2 mb-2">
                  <i className="bi bi-calendar2-event"></i>
                  <span className="text-slate-700">
                    {recent.start_date} - {recent.end_date}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-2 mb-2">
                  <i className="bi bi-pin-angle"></i>
                  <span className="text-slate-700">
                    {recent.partisipan.length} / {recent.total_partisipan} Telah
                    Berpartisipasi
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => beforeDetail(recent.id)}
                className={`w-full flex justify-center hover:text-white hover:transition-all transition-all rounded-md px-2 gap-3 py-1 mt-2 ${
                  recent.status == "Inactive"
                    ? "bg-yellow-300 hover:bg-yellow-500"
                    : recent.status == "Active"
                    ? "bg-blue-300 hover:bg-blue-500"
                    : recent.status == "Selesai"
                    ? "bg-red-300 hover:bg-red-500"
                    : ""
                }`}
              >
                <i className="bi bi-person-gear"></i>
                <span className="">Check Event</span>
              </button>
            </div>

            <div className="relative">
              <Bar
                data={barChart.data}
                options={barChart.options}
                width={500}
                height={300}
              />
            </div>
          </Transition>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-4 md:mx-0">
            {events.map((item, i) => (
              <Transition
                show={show}
                key={i}
                enter={`transition transform duration-300 delay-[${
                  (i + 2) * 100
                }ms]`}
                enterFrom="opacity-0  translate-y-12"
                enterTo="opacity-100  translate-y-0"
                leave="transition transform duration-300 delay-[100ms]"
                leaveFrom="opacity-100  translate-y-0"
                leaveTo="opacity-0 translate-y-12"
                className="flex flex-col items-start justify-start px-4 hover:bg-slate-50 hover:transition-all transition-all py-2 rounded-md shadow-md"
              >
                <h2 className="font-semibold mb-5 line-clamp-1">{item.name}</h2>
                <div className="flex items-center text-sm justify-start gap-2 mb-2">
                  <i className="bi bi-activity"></i>
                  <span className="text-slate-700">{item.status}</span>
                </div>
                <div className="flex items-center text-sm justify-start gap-2 mb-2">
                  <i className="bi bi-people"></i>
                  <span className="text-slate-700">
                    {item.candidates.length} Kandidat
                  </span>
                </div>
                <div className="flex items-center text-sm justify-start gap-2 mb-2">
                  <i className="bi bi-calendar2-event"></i>
                  <span className="text-slate-700">
                    {item.start_date} - {item.end_date}
                  </span>
                </div>
                <div className="flex items-center text-sm justify-start gap-2 mb-2">
                  <i className="bi bi-pin-angle"></i>
                  <span className="text-slate-700">
                    {item.partisipan.length} / {item.total_partisipan} Telah
                    Berpartisipasi
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => beforeDetail(item.id)}
                  className={`w-full flex mb-2 text-sm justify-center hover:text-white hover:transition-all transition-all rounded-md px-2 gap-3 py-1 mt-2 ${
                    item.status == "Inactive"
                      ? "bg-yellow-300 hover:bg-yellow-500"
                      : item.status == "Active"
                      ? "bg-blue-300 hover:bg-blue-500"
                      : item.status == "Selesai"
                      ? "bg-red-300 hover:bg-red-500"
                      : ""
                  }`}
                >
                  <i className="bi bi-person-gear"></i>
                  <span className="">Check Event</span>
                </button>
              </Transition>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
