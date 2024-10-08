import { User } from "@/types/user";

export const VnDong = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export const getUserAvatar = (user: User) => {
  if (user.imageUrl && user.imageUrl !== "") {
    return user.imageUrl;
  } else {
    const dicebearUrl = process.env.NEXT_PUBLIC_DICEBEAR_API;
    const params = new URLSearchParams({
      seed: user.fullName,
    });
    return `${dicebearUrl}?${params.toString()}`;
  }
};
