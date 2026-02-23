import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";

interface LoginButtonProps {
  className?: string;
}

const LoginButton = ({ className }: LoginButtonProps) => {
  const baseClassName =
    "flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-900 shadow-md transition-colors hover:bg-orange-200";

  const finalClassName =
    className ?? `fixed right-4 bottom-4 z-50 ${baseClassName}`;

  return (
    <Link href="/login" className={finalClassName}>
      로그인 하러가기
      <IoPersonOutline size={18} />
    </Link>
  );
};

export default LoginButton;
