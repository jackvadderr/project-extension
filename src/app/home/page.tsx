import { auth } from "@/lib/auth";
import Layout from "./layout";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "@/components/home/carousel/EmblaCarousel";

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Page = async () => {

  return (
    <div className="bg-gray-100 rounded-lg p-4 text-center max-w-3xl mx-auto">
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  );
};

export default Page;