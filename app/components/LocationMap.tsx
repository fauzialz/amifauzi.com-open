import SectionWrapper from "./Utils/SectionWrapper";

const MAP_EMBEDED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.4787825103076!2d102.53632071475825!3d-3.4758579974702015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e313b7d4f32df4f%3A0xfed4cd3d1030fa70!2sTaman%20Mini%20Perumnas%20Batu%20Galing!5e0!3m2!1sen!2sid!4v1650742704168!5m2!1sen!2sid";
const MAP_REDIRECT_URL =
  "https://www.google.com/maps/dir//Taman+Mini+Perumnas+Batu+Galing,+Jl.+Batu+Galing+No.60,+Talang+Rimbo+Lama,+Curup+Tengah,+Rejang+Lebong+Regency,+Bengkulu+39119/@-3.4758526,102.5363207,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x2e313b7d4f32df4f:0xfed4cd3d1030fa70!2m2!1d102.5385094!2d-3.475858!3e0";
const MAP_TITLE = "Taman Mini Perumnas Batu Galing";
const MAP_ADDRESS =
  "Jl. Batu Galing No.60, Talang Rimbo Lama, Kec. Curup Tengah, Kabupaten Rejang Lebong, Bengkulu 39119";

const LocationMap = () => {
  return (
    <div className="py-10 bg-[#EFEFEF]">
      <SectionWrapper>
        <div className="flex flex-col-reverse md:flex-row">
          <div className="w-full px-4 md:w-1/2">
            <div className="p-2 bg-white rounded-lg shadow-lg">
              <iframe
                src={MAP_EMBEDED_URL}
                className="w-full h-[580px] md:h-[450px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={MAP_TITLE}
                scrolling="no"
                aria-label={MAP_TITLE}
              />
            </div>
          </div>

          <div className="md:w-1/2 w-full px-4 mb-6 md:mb-0">
            <div className="sticky top-8 text-center md:text-left">
              <h3 className="text-3xl font-head font-bold mb-3 text-gray-700">
                Lokasi Pernikahan
              </h3>
              <h4 className="text-xl md:text-2xl mb-4 font-sans font-semibold text-gray-700">
                {MAP_TITLE}
              </h4>
              <p className="mb-16 md:mb-10 font-sans">{MAP_ADDRESS}</p>
              <div className="flex md:justify-start justify-center">
                <a
                  href={MAP_REDIRECT_URL}
                  target="_blank"
                  className="px-5 py-2 transition-all text-lg font-semibold rounded-md bg-contrast hover:bg-contrast-2 outline-contrast-3 text-white outline-4 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  rel="noreferrer"
                >
                  Buka Map
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default LocationMap;
