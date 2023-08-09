import { CalendarDaysIcon, UsersIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { ACTIVE_USER, APP_URL } from "../../utils/constant";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";

export default class DashboardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dashboard: [],
      transition: false,
    };
  }
  componentDidMount() {
    this.getDashboard();
    setTimeout(() => {
      this.setState({ transition: true });
    }, 350);
  }

  getDashboard() {
    axios
      .get(`${APP_URL}/dashboard`, {
        headers: {
          Authorization: `Bearer ${ACTIVE_USER.token}`,
        },
      })
      .then((result) => {
        let dashboard = result.data;
        this.setState({ dashboard: dashboard });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let { dashboard } = this.state;
    return (
      <>
        <div className="grid gap-12 grid-cols-2 tablet:grid-cols-1 mx-4 md:mx-0">
          <Transition
            show={this.state.transition}
            enter="transform transition duration-[300ms]"
            enterFrom="opacity-0 -translate-x-12"
            enterTo="opacity-100 translate-x-0"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100 rotate-0 scale-100 "
            leaveTo="opacity-0 scale-95 "
          >
            <div className=" bg-stone-200 h-52 w-full rounded-lg flex justify-center flex-col gap-2 items-center relative overflow-hidden group">
              <div className="font-semibold text-8xl text-gray-800">
                {dashboard.total_event}
              </div>
              <CalendarDaysIcon className="absolute text-stone-900 w-72 h-72 opacity-20 left-0 top-0 transition-all" />
              <div className="text-xl mb-3">Events</div>
              <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-8 bg-gray-800 opacity-90 flex items-center cursor-pointer justify-center hover:opacity-100 transition-all">
                <Link
                  to={"/events"}
                  className="text-slate-50 hidden group-hover:block w-full text-center"
                >
                  Lihat Events
                </Link>
              </div>
            </div>
          </Transition>

          <Transition
            show={this.state.transition}
            enter="transform transition duration-[500ms]"
            enterFrom="opacity-0 translate-x-12"
            enterTo="opacity-100 translate-x-0"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100 rotate-0 scale-100 "
            leaveTo="opacity-0 scale-95 "
          >
            <div className=" bg-stone-200 h-52 w-full rounded-lg flex justify-center flex-col gap-2 items-center relative overflow-hidden group">
              <div className="font-semibold text-8xl text-gray-800">
                {dashboard.total_siswa}
              </div>
              <UsersIcon className="absolute text-stone-900 w-72 h-72 opacity-20 left-0 top-0" />
              <div className="text-xl mb-3">Siswa</div>
              <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-8 bg-gray-800 flex items-center justify-center cursor-pointer opacity-90 hover:opacity-100 transition-all">
                <Link
                  to={"/siswa"}
                  className="text-slate-50 w-full hidden group-hover:block text-center"
                >
                  Lihat Siswa
                </Link>
              </div>
            </div>
          </Transition>
        </div>
      </>
    );
  }
}
