import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpGetShow } from "../../API/event";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  SubTitle,
} from "chart.js";

import { Pie, Bar, Doughnut } from "react-chartjs-2";
import { bar } from "../../charts/bar";
import { pie } from "../../charts/pie";
import { Transition } from "@headlessui/react";

ChartJS.register(
  BarElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  SubTitle
);

export default function DetailLaporan() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [barChart, setBarChart] = useState(null);
  const [pieChart, setPieChart] = useState(null);
  const [sortedCandidate, setCandidate] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    httpGetShow(id)
      .then((res) => {
        setEvent(res);
        setBarChart(bar(res));
        setPieChart(pie(res));
        setCandidate(
          res.candidates.sort((a, b) => b.total_vote - a.total_vote)
        );
      })
      .catch((err) => console.log(err));
    setTimeout(() => {
      setShow(true);
    }, 250);
  }, []);

  return (
    <>
      {event != null ? (
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {event.name}
            </h1>
          </div>
        </header>
      ) : (
        ""
      )}

      {event != null ? (
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mx-4 md:mx-0">
              <Transition
                show={show}
                enter="transition transform duration-300"
                enterFrom="opacity-0 scale-110"
                enterTo="opacity-100 scale-100"
                leave="transition transform duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-90"
                className="px-4 py-2 rounded-md shadow-md flex flex-col justify-start item-start"
              >
                <div className="">
                  <h2 className="font-semibold text-lg bg-slate-200 my-2 text-center w-full rounded-md px-3 py-1.5">
                    Perolehan Voting
                  </h2>
                  <Bar
                    data={barChart.data}
                    options={barChart.options}
                    width={500}
                    height={500}
                    className="max-h-[450px]"
                  />
                </div>
              </Transition>
              <Transition
                show={show}
                enter="transition transform duration-300 delay-[200ms]"
                enterFrom="opacity-0 scale-110"
                enterTo="opacity-100 scale-100"
                leave="transition transform duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-90"
                className="px-4 py-2 rounded-md shadow-md flex flex-col justify-start item-start"
              >
                <div className="">
                  <h2 className="font-semibold text-lg bg-slate-200 my-2 text-center w-full rounded-md px-3 py-1.5">
                    Daftar Partisipan
                  </h2>
                  <Pie
                    data={pieChart.data}
                    options={pieChart.options}
                    width={400}
                    height={200}
                    className="max-h-[450px]"
                  />
                </div>
              </Transition>
              <Transition
                show={show}
                enter="transition transform duration-300 delay-[400ms]"
                enterFrom="opacity-0 scale-110"
                enterTo="opacity-100 scale-100"
                leave="transition transform duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-90"
                className="px-4 w-full md:col-span-2 py-2 grid-cols-1 rounded-md shadow-md flex flex-col justify-start item-start"
              >
                <div className="">
                  <h2 className="font-semibold text-lg bg-slate-200 my-2 mb-6 text-center w-full rounded-md px-3 py-1.5">
                    Daftar Kandidat
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 w-full">
                    {sortedCandidate.map((item, i) => (
                      <Transition
                        show={show}
                        enter={`transition transform duration-300 delay-[${
                          (i + 1) * 100 + 500
                        }ms]`}
                        enterFrom="opacity-0 scale-110"
                        enterTo="opacity-100 scale-100"
                        leave="transition transform duration-300"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-90"
                        className={`grid place-items-center  px-4 py-2 border-[6px] relative rounded-xl border-white ${
                          i == 0 && sortedCandidate.length <= 2
                            ? "row-span-2 md:col-span-2 bg-yellow-400/60"
                            : i == 0 && sortedCandidate.length > 2
                            ? "row-span-2 bg-yellow-400/60"
                            : i == 1 && sortedCandidate.length <= 2
                            ? "bg-slate-400/60 row-span-2 md:col-span-2"
                            : i == 1
                            ? "bg-slate-400/60"
                            : i == 2
                            ? "bg-red-400/60"
                            : "bg-lime-50"
                        }`}
                        key={i}
                      >
                        <div className="flex flex-col justify-center items-center my-3">
                          <div
                            className={`absolute top-2 left-2 w-fit px-4 py-2 rounded-md text-slate-50 opacity-100 bg-emerald-600 ${
                              i == 0 ? "text-7xl" : "text-4xl"
                            }`}
                          >
                            <div className="flex justify-center items-center gap-4">
                              <i className="bi bi-trophy text-3xl"></i>
                              <span>{i + 1}</span>
                            </div>
                          </div>
                          <div
                            className={`overflow-hidden mb-3 border-4 border-white rounded-md ${
                              i == 0 ? "w-52 h-52" : "w-36 h-36"
                            }`}
                          >
                            <img
                              src={item.user.gambar}
                              alt=""
                              className="w-full h-full rounded-md object-cover object-center"
                            />
                          </div>
                          <div className="flex mb-3 justify-center items-center gap-4">
                            <h2 className="font-semibold text-xl">
                              {item.user.name}
                            </h2>
                          </div>

                          <div className="flex justify-center items-center gap-4">
                            <i className="bi bi-pin-angle"></i>
                            <span className="text-md">
                              <b className="text-xl">{item.total_vote}</b>{" "}
                              Voting Diperoleh
                            </span>
                          </div>
                        </div>
                      </Transition>
                    ))}
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </main>
      ) : (
        ""
      )}
    </>
  );
}
