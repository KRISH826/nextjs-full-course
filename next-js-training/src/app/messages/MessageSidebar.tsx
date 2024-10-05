"use client"
import { Chip } from "@nextui-org/react";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { GoInbox } from "react-icons/go";
import { MdOutlineOutbox } from "react-icons/md";

const MessageSidebar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setselected] = useState<string>(searchParams.get('container') || 'inbox');
  const items = [
    {
      key: "inbox",
      label: "Inbox",
      icon: <GoInbox />,
      chip: true,
    },
    {
      key: "outbox",
      label: "Outbox",
      icon: <MdOutlineOutbox />,
      chip: true,
    },
  ];
  const handleSelect = (key: string) => {
    setselected(key);
    const params = new URLSearchParams();
    params.set('container', key);
    router.replace(`${pathname}?${params}`)
  }
  return (
    <div className="flex flex-col shadow-md cursor-pointer rounded-lg">
      {items.map(({ key, label, icon, chip }) => (
        <div
          key={key}
          className={clsx("flex flex-row items-center gap-2 p-3 rounded-t-lg", {
            "text-secondary font-semibold": selected == key,
            "text-black hover:text-secondary/70": selected !== key,
          })}
          onClick={() => handleSelect(key)}
        >
          {icon}
          <div className="flex justify-between flex-grow">
            <span>{label}</span>
            {chip && (
              <>
                <Chip>5</Chip>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSidebar;
