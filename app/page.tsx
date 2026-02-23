import LoginButton from "@/components/common/LoginButton";
import NaverMap from "@/components/common/NaverMap";
import PlaceDetailSideBar from "@/components/modal/PlaceDetailSideBar";
import Profile from "@/components/common/Profile";

import getKatsuPlaces from "@/lib/hook/useKatsuPlaces";
import { getCurrentUser } from "@/lib/hook/useServerGetUser";

const Home = async () => {
  const katsuPlaces = await getKatsuPlaces();
  const currentUser = await getCurrentUser();

  const name =
    currentUser &&
    (currentUser.user_metadata as { name?: string | null })?.name;

  return (
    <div>
      {currentUser ? (
        <Profile name={name} email={currentUser.email} />
      ) : (
        <LoginButton />
      )}

      <PlaceDetailSideBar />

      <NaverMap katsuPlaces={katsuPlaces} />
    </div>
  );
};

export default Home;
