import NaverMap from '@/components/common/NaverMap'
import getKatsuPlaces from '@/lib/hook/useKatsuPlaces';

const Home = async () => {
  const katsuPlaces = await getKatsuPlaces();

  return (
    <div><NaverMap katsuPlaces={katsuPlaces} /></div>
  )
}

export default Home