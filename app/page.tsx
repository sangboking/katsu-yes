import NaverMap from '@/components/common/NaverMap'
import PlaceDetailSideBar from "@/components/modal/PlaceDetailSideBar";

import getKatsuPlaces from '@/lib/hook/useKatsuPlaces';


const Home = async () => {
  const katsuPlaces = await getKatsuPlaces();

  return (
    <div>
      <PlaceDetailSideBar />
    
      <NaverMap katsuPlaces={katsuPlaces} />
    </div>
  )
}

export default Home