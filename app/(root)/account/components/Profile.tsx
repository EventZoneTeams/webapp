import { Badge } from "@/components/ui/badge";
import { getUserAvatar } from "@/lib/format";
import { User } from "@/types/user";
import Image from "next/image";

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  console.log(user);
  return (
    <div className="space-y-4 divide-y-2">
      <div className="flex p-2 backdrop-blur-3xl">
        <Image
          src={getUserAvatar(user)}
          alt={user.fullName}
          width={100}
          height={100}
          className="rounded-lg"
        />
        <div className="px-4">
          <p className="text-lg font-semibold">{user.fullName}</p>
          {/* <p className="text-primary/50">{user.email}</p> */}
          <Badge className="mt-2">
            {user.role.roleName === "ADMIN" ? "Admin" : "User"}
          </Badge>
        </div>
      </div>
      <div className="space-y-2 py-4">
        <div className="space-x-2">
          <span className="text-sm text-primary/50">Email:</span>
          <span>{user.email}</span>
        </div>

        <div className="space-x-2">
          <span className="text-sm text-primary/50">Work at:</span>
          <span>{user.workAt}</span>
        </div>
      </div>
    </div>
  );
}
