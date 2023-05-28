import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { LoaderDataType } from "~/controls";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useFetcher, useLoaderData } from "@remix-run/react";

const PER_PAGE = 5;

interface MessageProps {
  isMobile: boolean;
}

const Message = ({ isMobile }: MessageProps) => {
  const { messages } = useLoaderData<LoaderDataType>();
  const fetcher = useFetcher<{ ok: boolean }>();
  const formRef = useRef<HTMLFormElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(0);

  const messagesSantized = messages.filter((message) => !message.hide);
  const messagesDisplay = messagesSantized.slice(
    PER_PAGE * page,
    PER_PAGE * (page + 1)
  );

  const totalPages = Math.ceil(messagesSantized.length / PER_PAGE);
  const paginationArr = [...Array(totalPages).keys()];
  const paginationDisplay = paginationArr.filter((num) => {
    const leftBoundary = page - 2;
    const rightBoundary = page + 2;
    return (
      (num >= leftBoundary && num <= rightBoundary) ||
      (page < 4 && num < 4) ||
      (page > totalPages - 5 && num > totalPages - 5)
    );
  });

  const scrollTop = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onChangePage = useCallback(
    (newPage: number) => {
      setPage(newPage);
      if (isMobile) {
        scrollTop();
      }
    },
    [isMobile]
  );

  useEffect(() => {
    if (fetcher.data?.ok && fetcher.state === "loading") {
      formRef.current?.reset();
      onChangePage(0);
    }
  }, [fetcher, onChangePage]);

  const sendMessage = useGoogleLogin({
    onSuccess: async (res) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${res.access_token}` },
        }
      );

      const formData = new FormData(formRef.current!);
      formData.append("google_name", userInfo.data.name);
      fetcher.submit(formData, { method: "post" });
    },
  });

  return (
    <div>
      <h4 className="text-3xl font-head font-bold text-center mb-10 md:mb-16 text-gray-700 px-4">
        Berikan doa terbaik untuk kami
      </h4>
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 px-4">
          <div className="rounded-lg shadow-lg p-6 md:p-8 bg-white sticky top-8 mb-6 md:mb-0">
            <form
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <fieldset disabled={fetcher.state === "submitting"}>
                <input
                  className="w-full bg-[#f8fafc] rounded border px-3 py-1.5 mb-6 outline-[#CE7BB0]"
                  placeholder="Nama Anda"
                  name="name"
                  required
                  maxLength={70}
                />
                <textarea
                  className="w-full bg-[#f8fafc] rounded border px-3 py-1.5 min-h-[6rem] mb-4 outline-[#CE7BB0]"
                  placeholder="Tuliskan doa atau ucapan untuk kami"
                  name="message"
                  required
                  maxLength={750}
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    id="submit-message-btn"
                    className="px-5 py-2 transition-all text-lg font-semibold rounded-md bg-[#CE7BB0] hover:bg-[#A267AC] outline-[#6867AC] text-white outline-4 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    Kirim
                  </button>
                </div>
              </fieldset>

              {fetcher.data?.ok === false && (
                <p className="pt-4 text-red-500">Gagal mengirim pesan.</p>
              )}
            </form>
          </div>
        </div>

        <div className="w-full md:w-1/2 px-4" ref={messagesRef}>
          <div className="pt-4">
            {fetcher.state === "loading" && (
              <div className="mb-5 animate-pulse">
                <div className="h-[22.39px] w-[120px] bg-background mb-2 rounded-md" />
                <div className="h-[20px] w-[300px] bg-background rounded-md" />
              </div>
            )}

            {messagesDisplay.map((message, i) => {
              if (
                fetcher.state === "loading" &&
                i === messagesDisplay.length - 1
              ) {
                return null;
              }

              return (
                <div className="mb-7 md:mb-5" key={i}>
                  <h5 className="font-black font-sans text-gray-700 mb-1">
                    {message.name}
                  </h5>
                  <p className="whitespace-pre-wrap font-sans text-gray-800 leading-6">
                    {message.message}
                  </p>
                </div>
              );
            })}
          </div>

          {/* PAGINATION */}
          {totalPages === 1 ? null : (
            <div className="flex items-center justify-center pl-2 pt-4">
              <button
                className="mr-2 text-2xl text-gray-700 transition-all hover:text-[#CE7BB0] disabled:opacity-50 disabled:hover:text-gray-700 pt-1"
                onClick={() => onChangePage(page - 1)}
                disabled={page === 0}
                aria-label="page-left"
              >
                <i className="bx bx-chevron-left" />
              </button>

              {paginationDisplay[0] > 0 ? (
                <Fragment>
                  <button
                    className={
                      "mr-2 px-1 font-semibold text-lg text-gray-700 transition-all hover:text-[#CE7BB0]"
                    }
                    onClick={() => onChangePage(0)}
                  >
                    1
                  </button>
                  <div className="font-semibold text-lg mr-2">...</div>
                </Fragment>
              ) : null}

              {paginationDisplay.map((num) => (
                <button
                  className={
                    "mr-2 px-1 font-semibold text-lg " +
                    (num === page
                      ? "text-[#CE7BB0]"
                      : "text-gray-700 transition-all hover:text-[#CE7BB0]")
                  }
                  key={num}
                  onClick={() => onChangePage(num)}
                >
                  {num + 1}
                </button>
              ))}

              {paginationDisplay[paginationDisplay.length - 1] <
              totalPages - 1 ? (
                <Fragment>
                  <div className="font-semibold text-lg mr-2">...</div>
                  <button
                    className={
                      "mr-2 px-1 font-semibold text-lg text-gray-700 transition-all hover:text-[#CE7BB0]"
                    }
                    onClick={() => onChangePage(totalPages - 1)}
                  >
                    {totalPages}
                  </button>
                </Fragment>
              ) : null}

              <button
                className="text-2xl mr-2 text-gray-700 transition-all hover:text-[#CE7BB0] disabled:opacity-50 disabled:hover:text-gray-700 pt-1"
                onClick={() => onChangePage(page + 1)}
                disabled={page === totalPages - 1}
                aria-label="page-right"
              >
                <i className="bx bx-chevron-right" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Message);
