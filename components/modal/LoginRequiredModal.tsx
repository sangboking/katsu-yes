"use client";

import Modal from "@/components/common/Modal";
import LoginButton from "@/components/common/LoginButton";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginRequiredModal = ({ isOpen, onClose }: LoginRequiredModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      containerClassName="w-auto max-w-[450px]"
    >
      <div className="p-5 text-center space-y-4">
        <p className="mb-4 text-lg font-semibold">
          로그인 후 리뷰 작성 가능합니다!
        </p>
        <LoginButton className="inline-flex items-center justify-center rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-900 shadow-md transition-colors hover:bg-orange-200" />
      </div>
    </Modal>
  );
};

export default LoginRequiredModal;
