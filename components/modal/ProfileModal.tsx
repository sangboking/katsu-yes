"use client";

import { useState } from "react";
import Image from "next/image";

import Modal from "@/components/common/Modal";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

import { useCurrentProfile } from "@/lib/hook/useServerGetProfile";
import { useUpdateNickname } from "@/lib/hook/useUpdateNickname";
import { useLogout } from "@/lib/hook/useLogout";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { data: profile } = useCurrentProfile();
  const { mutate: updateNickname } = useUpdateNickname();
  const { mutate: logout } = useLogout();

  const [nickname, setNickname] = useState(profile?.nickname ?? "");
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEdit = () => {
    if (isEditing && nickname && nickname !== profile?.nickname) {
      updateNickname(nickname);
    }

    setIsEditing((prev) => !prev);
  };

  const handleCancelEdit = () => {
    setNickname(profile?.nickname ?? "");
    setIsEditing(false);
  };

  const handleModalClose = () => {
    setNickname(profile?.nickname ?? "");
    setIsEditing(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      containerClassName="w-full max-w-[360px]"
    >
      <div className="p-6 space-y-6">
        <div className="flex flex-col items-center gap-3">
          {profile?.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.nickname ?? "프로필 이미지"}
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover border"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-200 text-xl font-bold text-orange-900">
              {profile?.nickname[0]}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              닉네임
            </label>
            <div className="flex items-center gap-2">
              {isEditing && (
                <button
                  type="button"
                  className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                  onClick={handleCancelEdit}
                >
                  수정 취소
                </button>
              )}
              <button
                type="button"
                className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200"
                onClick={handleToggleEdit}
              >
                {isEditing ? "수정 완료" : "닉네임 수정"}
              </button>
            </div>
          </div>
          {profile && (
            <Input
              value={isEditing ? nickname : profile?.nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={
                isEditing
                  ? ""
                  : "cursor-not-allowed bg-gray-50 pointer-events-none text-gray-400"
              }
            />
          )}
        </div>

        <div className="space-y-3">
          <Button className="w-full" onClick={logout}>
            로그아웃
          </Button>
          <Button
            className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300"
            onClick={handleModalClose}
          >
            닫기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
