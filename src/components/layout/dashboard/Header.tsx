import { MenuIcon } from "@/assets/icons/MenuIcon";
import { UserIcon } from "@/assets/icons/UserIcon";
import { apiUrl } from "@/config/apiUrl";
import { useAuth } from "@/context/AuthContex";
import { Typography } from "componentsla";

export default function Header() {
  const { user } = useAuth();
  return (
    <header className="w-full bg-blue-700 py-4 flex items-center justify-between border-b border-b-white">
      <div className="w-36 flex items-center justify-center">
        <MenuIcon className="w-8 h-8 text-white" />
      </div>

      <div className="flex items-center gap-x-4 px-4">
        <Typography variant="p" text="paragraph" className="text-white text-xl">
          {user?.username}
        </Typography>
        {user?.image ? (
          <img
            src={`${apiUrl.back}/images/${user?.image}`}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <UserIcon className="w-8 h-8 text-white" />
        )}
      </div>
    </header>
  );
}
