"use client";

import ProfileModal from "@/components/modal/ProfileModal";

import { useCurrentProfile } from "@/lib/hook/useServerGetProfile";
import { useModalState } from "@/store/useModalState";

const Profile = () => {
  const { data: profile } = useCurrentProfile();
  const { isProfileModalOpen, openProfileModal, closeProfileModal } =
    useModalState();

  return (
    <>
      <button
        type="button"
        onClick={openProfileModal}
        className="cursor-pointer fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-900 shadow-md"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-200 text-xs font-bold">
          {profile?.nickname[0]}
        </div>
      </button>

      <ProfileModal isOpen={isProfileModalOpen} onClose={closeProfileModal} />
    </>
  );
};

export default Profile;
