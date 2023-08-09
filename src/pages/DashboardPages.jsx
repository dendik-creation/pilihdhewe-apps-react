import React, { Component } from "react";
import DashboardComponent from "../components/Dashboard/DashboardComponent";
import { LinkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";

export default class DashboardPages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transition: false,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ transition: true });
    }, 350);
  }
  render() {
    return (
      <>
        <DashboardComponent />
        <Transition
          show={this.state.transition}
          enter="transform transition duration-[500ms]"
          enterFrom="opacity-0 -translate-y-12"
          enterTo="opacity-100 translate-y-0"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100 rotate-0 scale-100 "
          leaveTo="opacity-0 scale-95 "
        >
          <div className="grid grid-rows-1 grid-flow-col mt-12 mx-4 md:mx-0">
            <div className=" bg-stone-200 h-52 w-full rounded-lg flex justify-center flex-col gap-2 items-center relative overflow-hidden group">
              <div className="font-semibold text-3xl text-gray-800">
                Check Live Result
              </div>
              <div className="font-normal text-sm text-gray-800">
                Live Result Ditampilkan pada halaman web berbeda
              </div>
              <LinkIcon className="absolute text-stone-900 w-72 h-72 opacity-20 left-0 top-0 transition-all" />
              <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-8 bg-gray-800 opacity-90 flex items-center cursor-pointer justify-center hover:opacity-100 transition-all">
                <Link
                  to={"https://linkedwithvote.000webhostapp.com/"}
                  target="_blank"
                  className="text-slate-50 hidden group-hover:block w-full text-center"
                >
                  Lihat Sekarang
                </Link>
              </div>
            </div>
          </div>
        </Transition>
      </>
    );
  }
}
