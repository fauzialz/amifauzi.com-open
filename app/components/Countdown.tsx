import { memo, useEffect, useState } from "react";

const EVENT_DATE = "Juliy 30, 2022 08:00:00";
const COUNTDOWN_DATE = new Date(EVENT_DATE).getTime();

interface COUNTDOWNTYPE {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const countdownBase: COUNTDOWNTYPE = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const Countdown = memo(() => {
  const [countdown, setCountdown] = useState<COUNTDOWNTYPE>(countdownBase);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();

      const delta = COUNTDOWN_DATE - now;

      const days = Math.floor(delta / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((delta % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });

      if (delta < 0) {
        clearInterval(interval);
        setCountdown(countdownBase);
      }
    }, 1000);
  }, []);

  return (
    <div className="w-full px-1 md:px-4">
      <div className="text-3xl font-head font-bold text-center mb-10 pt-10 text-gray-700 px-2">
        <h4 className="mb-1">Hitung Mundur</h4>
        <h4>Menuju Pernikahan Kami</h4>
      </div>

      <div className="flex justify-center pb-20">
        <NumberCard number={countdown.days} label="Hari" />
        <NumberCard number={countdown.hours} label="Jam" />
        <NumberCard number={countdown.minutes} label="Menit" />
        <NumberCard number={countdown.seconds} label="Detik" />
      </div>
    </div>
  );
});

Countdown.displayName = "Countdown";

interface NumberCardProps {
  number: number;
  label: string;
}

const NumberCard = memo(({ number, label }: NumberCardProps) => {
  const numberString = number < 100 ? ("0" + number).slice(-2) : String(number);

  return (
    <div className="rounded-lg bg-[#EFEFEF] py-7 px-2 w-24 text-center mx-2 text-gray-700 font-sans">
      <div className="text-3xl mb-2">{numberString}</div>
      <div>{label}</div>
    </div>
  );
});

NumberCard.displayName = "NumberCard";

export default Countdown;
