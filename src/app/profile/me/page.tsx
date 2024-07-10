"use client";

import { Post } from "@/app/profile/me/components/Post";
import useAuth from "@/hooks/useAuth";
import useEvent from "@/hooks/useEvent";
import { useEffect } from "react";
import { IoIosSchool } from "react-icons/io";

export default function page() {
  const { authUser } = useAuth();
  const { eventsMutation, setQueryObj, queryObj } = useEvent();

  useEffect(() => {
    if (authUser) {
      setQueryObj({
        UserId: authUser.Id,
      });
    }
  }, [authUser]);

  useEffect(() => {
    eventsMutation.mutate(queryObj);
  }, [queryObj]);
  return (
    <div className="bg-background grid grid-cols-5 gap-4 pb-5">
      <div className="h-40 col-span-2 rounded-md p-2 flex flex-col gap-2 divide-y divide-border mt-4">
        <div className="flex items-center gap-2">
          <IoIosSchool size={30} className="text-secondary" />
          <span className="">
            {authUser ? authUser?.University : "Full Name"}
          </span>
        </div>
        {/* <div className="flex items-center gap-2 py-1">
          <FaCalendar size={28} className="text-secondary" />
          <span className="">23/12/2003</span>
        </div> */}
      </div>
      <div className="col-span-3 rounded-md">
        {eventsMutation.isPending ? (
          <div>Loading...</div>
        ) : eventsMutation.data?.Data.length === 0 ? (
          <div>No Event Found</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {eventsMutation.data?.Data.map((event, index) => (
              <div key={index}>
                <Post {...event} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
