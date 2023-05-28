import { Fragment } from "react";
import { useLoaderData } from "@remix-run/react";
import type { LoaderDataType } from "~/controls";
import TextWithLine from "./Utils/TextWithLine";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  const { remark: recipient } = useLoaderData<LoaderDataType>();

  return (
    <div
      className={
        "fixed h-screen w-screen left-0 top-0 z-10 transition-all duration-1000" +
        (!isOpen ? " -translate-y-full" : "")
      }
    >
      <div className="bg-background h-screen w-screen flex flex-row justify-center items-start fixed overflow-auto py-20 box-border">
        <div className="flex flex-col items-center p-5 my-auto w-full md:w-[500]">
          <h5 className="text-center font-medium font-sans text-xl md:text-2xl mb-2 md:mb-3 text-gray-500">
            Undangan Pernikahan
          </h5>
          <h4 className="text-center font-head text-5xl md:text-6xl mb-6 text-gray-800">
            Ami & Fauzi
          </h4>

          <div className="w-[350px] mb-12">
            {!recipient ? null : (
              <Fragment>
                <div className="mb-5">
                  <TextWithLine>Untuk</TextWithLine>
                </div>
                <div
                  className={
                    recipient.length < 50
                      ? "text-center font-sans text-gray-700 leading-7 text-lg py-1"
                      : "text-center font-sans text-gray-700 leading-7 px-4 md:px-0"
                  }
                >
                  {recipient}
                </div>
              </Fragment>
            )}
          </div>

          <button
            type="button"
            className="px-5 transition-all py-3 font-sans font-medium rounded-md bg-contrast hover:bg-contrast-2 outline-contrast-3 text-white outline-4 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            onClick={onClose}
          >
            Buka Undangan
          </button>
        </div>
      </div>
    </div>
  );
}
