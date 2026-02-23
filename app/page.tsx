import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";

import NaverMap from "@/components/common/NaverMap";
import PlaceDetailSideBar from "@/components/modal/PlaceDetailSideBar";

import getKatsuPlaces from "@/lib/hook/useKatsuPlaces";

const Home = async () => {
  const katsuPlaces = await getKatsuPlaces();

  return (
    <div>
      <Link
        href="/login"
        className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-900 shadow-md transition-colors hover:bg-orange-200"
      >
        로그인 하러가기
        <IoPersonOutline size={18} />
      </Link>

      <PlaceDetailSideBar />

      <NaverMap katsuPlaces={katsuPlaces} />
    </div>
  );
};

export default Home;
