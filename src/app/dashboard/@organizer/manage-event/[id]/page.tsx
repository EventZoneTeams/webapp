"use client";

import useEvent from "@/hooks/useEvent";
import { useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { getEventByIdMutation } = useEvent();

  useEffect(() => {
    getEventByIdMutation.mutate(Number(params.id));
  }, []);
  return (
    <div>
      {getEventByIdMutation.isPending && "Loading..."}
      {getEventByIdMutation.isError && "Error"}
      {getEventByIdMutation.isSuccess && "Success"}
      {getEventByIdMutation.data && getEventByIdMutation.data.Name}
    </div>
  );
}
