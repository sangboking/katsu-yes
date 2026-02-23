import type { FC } from "react";

interface ProfileProps {
  name?: string | null;
  email?: string | null;
}

const Profile: FC<ProfileProps> = ({ name, email }) => {
  const displayName = name || email || "사용자";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <button
      type="button"
      className="fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-900 shadow-md"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-200 text-xs font-bold">
        {initial}
      </div>
      <span className="max-w-[140px] truncate">{displayName}</span>
    </button>
  );
};

export default Profile;
