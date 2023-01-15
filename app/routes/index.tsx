import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Agendas from "~/components/Agendas";
import BrideAndGroom from "~/components/BrideAndGroom";
import Countdown from "~/components/Countdown";
import DigitalEnvelope from "~/components/DigitalEnvelope";
import LocationMap from "~/components/LocationMap";
import Message from "~/components/Massage";
import SectionWrapper from "~/components/Utils/SectionWrapper";
import WelcomeModal from "~/components/WelcomeModal";
import { indexAction, indexLoader, LoaderDataType } from "~/controls";
import heroBg from "~/images/hero-bg.jpg";
import heroBgMobile from "~/images/hero-bg-mobile.jpg";
import MusicPlayer from "~/components/MusicPlayer";
import GalleryPhotos from "~/components/GalleryPhotos";
import { useLoaderData } from "remix";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const loader = indexLoader;
export const action = indexAction;

export default function Index() {
  const { ENV } = useLoaderData<LoaderDataType>();
  const isSmallScreen = useMediaQuery({ query: `(max-width: 768px)` });

  const [openWelcome, setOpenWelcome] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const onCloseWelcomeModal = () => {
    setOpenWelcome(false);
    document.body.style.overflow = "auto";
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    setIsMobile(isSmallScreen);
  }, [isSmallScreen]);

  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
      className="bg-[#f9f9f9]"
    >
      <WelcomeModal isOpen={openWelcome} onClose={onCloseWelcomeModal} />

      <div
        className="flex justify-center items-center h-screen md:h-[750px] bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${isMobile ? heroBgMobile : heroBg})` }}
      >
        <div className="mb-1">
          <h4
            className="text-center font-head font-bold text-5xl mb-4 text-[#EFEFEF]"
            style={{ textShadow: "3px 3px 1px #CE7BB0" }}
          >
            Ami & Fauzi
          </h4>
          <div
            className="text-center font-black font-sans text-md text-[#EFEFEF] italic border-t-2 border-[#CE7BB0] pt-3"
            style={{ textShadow: "2px 2px 1px #CE7BB0" }}
          >
            30.07.2022
          </div>
        </div>
      </div>

      <SectionWrapper className="bg-[#EFEFEF]">
        <BrideAndGroom />
      </SectionWrapper>

      <SectionWrapper className="mb-36 pt-24">
        <Countdown />
      </SectionWrapper>

      <SectionWrapper className="mb-36">
        <Agendas />
      </SectionWrapper>

      <div className="mb-24">
        <LocationMap />
      </div>

      <SectionWrapper className="mb-36">
        <GalleryPhotos />
      </SectionWrapper>

      <GoogleOAuthProvider clientId={ENV.GOOGLE_CLIENT_ID!}>
        <SectionWrapper className="mb-36">
          <Message />
        </SectionWrapper>
      </GoogleOAuthProvider>

      <SectionWrapper className="mb-36">
        <DigitalEnvelope />
      </SectionWrapper>

      <div className="py-24 bg-[#EFEFEF] text-gray-700 relative text-center font-sans">
        © 2022 by <span className="font-semibold">Fauzi</span>
      </div>

      <MusicPlayer play={!openWelcome} />
    </div>
  );
}
