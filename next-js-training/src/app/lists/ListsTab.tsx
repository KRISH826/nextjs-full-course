"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { Member } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Key, useTransition } from "react";
import MembarCard from "../members/MembarCard";
import LoadingComponent from "@/components/LoadingComponent";

type Props = {
  members: Member[];
  likeIds: string[];
};

const ListsTab = ({ members, likeIds }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const tabs = [
    { id: "source", label: "Members I have Liked" },
    { id: "target", label: "Members That Like Me" },
    { id: "mutual", label: "Mutual Likes" },
  ];

  const handleTabChange = (key: Key) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("type", key.toString());
      router.replace(`${pathname}?${params.toString()}`);
    });
  };
  return (
    <>
      <div className="flex w-full flex-col gap-3">
        <Tabs
          aria-label="like tabs"
          items={tabs}
          color="secondary"
          onSelectionChange={(key) => handleTabChange(key)}
        >
          {(item) => (
            <Tab key={item.id} title={item.label}>
              {isPending ? (
                <>
                  <LoadingComponent />
                </>
              ) : (
                <>
                  {members.length > 0 ? (
                    <>
                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
                        {members.map((member) => (
                          <MembarCard
                            key={member.id}
                            member={member}
                            likeIds={likeIds}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <p>No Member For This Filer</p>
                    </>
                  )}
                </>
              )}
            </Tab>
          )}
        </Tabs>
      </div>
    </>
  );
};

export default ListsTab;
