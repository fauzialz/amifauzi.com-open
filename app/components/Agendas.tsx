const CALENDAR_URL = `https://www.google.com/calendar/render?
action=TEMPLATE&
text=Pernikahan+Ami+%26+Fauzi+%F0%9F%92%8C&
location=Taman%20Mini%20Perumnas%20Batu%20Galing%2C%20Jl.%20Batu%20Galing%20No.60%2C%20Talang%20Rimbo%20Lama%2C%20Kec.%20Curup%20Tengah%2C%20Kabupaten%20Rejang%20Lebong%2C%20Bengkulu%2039119%2C%20Indonesia&
details=Dengan%20segala%20kerendahan%20hati%20dan%20sukacita%2C%20kami%20menyampaikan%20kabar%20bahagia%20mengenai%20pernikahan%20kami%3A%20Rossiani%20Hutami%20dan%20Fauzi%20Al%20Aziz.%0A%0ATautan%20undangan%3A%0Ahttps%3A%2F%2Fwww.amifauzi.com%2F%0A%0AMerupakan%20kebahagiaan%20bagi%20kami%20jika%20Bapak%2FIbu%2FSaudara%2Fi%20turut%20hadir%20dalam%20acara%20resepsi%20kami%20dan%2Fatau%20berkenan%20memberikan%20doa%20restu%20pada%20tautan%20di%20atas.%0A%0AAtas%20perhatiannya%2C%20kami%20ucapkan%20terima%20kasih.%0A%0AYang%20berbahagia%2C%0AAmi%20%26%20Fauzi&
dates=20220730T010000Z%2F20220730T080000Z`;

const Agendas = () => {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="mb-4 text-gray-500 font-head md:text-lg font-medium">
        Pernikahan kami akan dilaksanakan pada:
      </div>
      <h3 className="text-3xl md:text-4xl font-black mb-6 text-cente text-gray-700 font-sans">
        SABTU, 30 JULI 2022
      </h3>
      <div className="px-12 flex max-w-md mx-auto mb-10">
        <a
          href={CALENDAR_URL}
          target={"_blank"}
          className="px-8 py-4 transition-all text-lg font-semibold w-full rounded-lg bg-contrast hover:bg-contrast-2 outline-contrast-3 text-white outline-4 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          rel="noreferrer"
        >
          Simpan di Kalender
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center text-2xl px-4 py-8 md:py-16 md:px-0 md:text-3xl font-black">
        <div className="col-span-1 text-gray-400 text-left md:text-center font-sans">
          AKAD NIKAH
        </div>
        <div className="col-span-1 text-gray-700 text-right md:text-center font-sans">
          08.00 WIB
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center text-2xl px-4 py-8 md:py-16 md:px-0 md:text-3xl  font-black">
        <div className="col-span-1 text-gray-400 text-left md:text-center font-sans">
          RESEPSI
        </div>
        <div className="col-span-1 text-gray-700 text-right md:text-center font-sans">
          11.00 WIB
        </div>
      </div>
    </div>
  );
};

export default Agendas;
