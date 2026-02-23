"use client";

import { FcGoogle } from "react-icons/fc";

import handleGoogleLogin from "@/lib/hook/useGoogleLogin";

const SignInPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          로그인
        </h1>
        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-lg font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <FcGoogle size={24} />
          <span>Google로 로그인</span>
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
