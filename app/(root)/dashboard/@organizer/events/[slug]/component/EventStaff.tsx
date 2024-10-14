"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user";
import { Staff } from "@/lib/api/staff";
import { User as UserAPI } from "@/lib/api/user";
import debounce from "lodash.debounce";
import { toast } from "sonner";

type EventStaffProps = {
  eventId: string;
};

export default function EventStaff({ eventId }: EventStaffProps) {
  const [searchEmail, setSearchEmail] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [staffList, setStaffList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStaffList = useCallback(async () => {
    const response = await Staff.getStaffFromEvent(eventId);
    if (response.isSuccess) {
      setStaffList(response.data || []);
    }
  }, [eventId, toast]);

  useEffect(() => {
    fetchStaffList();
  }, [fetchStaffList]);

  const debouncedSearch = useCallback(
    debounce(async (email: string) => {
      if (email) {
        setIsLoading(true);
        const response = await UserAPI.getAll({ SearchEmail: email });
        setIsLoading(false);
        if (response.isSuccess) {
          setUsers(response.data || []);
        } else {
          toast.error("Failed to search users");
        }
      } else {
        setUsers([]);
      }
    }, 300),
    [toast],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setSearchEmail(email);
    debouncedSearch(email);
  };

  const handleAddStaff = async (user: User) => {
    const response = await Staff.addStaffToEvent({
      eventId,
      userId: user.id,
      note: "",
    });
    if (response.isSuccess) {
      toast.success("Staff added successfully");
      fetchStaffList();
      setSearchEmail("");
      setUsers([]);
    } else {
      toast.error("Failed to add staff");
    }
  };

  const handleRemoveStaff = async (userId: string) => {
    const response = await Staff.removeStaffFromEvent(eventId, userId);
    if (response.isSuccess) {
      toast.success("Staff removed successfully");
      fetchStaffList();
    } else {
      toast.error("Failed to remove staff");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Staff</h2>
      </div>
      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Search staff by email"
          value={searchEmail}
          onChange={handleSearchChange}
        />
        {isLoading && (
          <p className="text-sm text-muted-foreground">Loading...</p>
        )}
        {users.length > 0 && (
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex items-center justify-between rounded-lg bg-white/5 p-3"
              >
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={user.imageUrl} alt={user.fullName} />
                    <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Button onClick={() => handleAddStaff(user)}>Add Staff</Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Current Staff</h3>
        {staffList.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No staff members added yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {staffList.map((staff) => (
              <li
                key={staff.id}
                className="flex items-center justify-between rounded-lg bg-white/5 p-3"
              >
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={staff.imageUrl} alt={staff.fullName} />
                    <AvatarFallback>{staff.fullName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{staff.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {staff.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveStaff(staff.id)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
