"use client";
import {
  Avatar,
  Button,
  Card,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Key, useCallback, useState } from "react";
import { MessageDto } from "../types";
import { AiFillDelete } from "react-icons/ai";
import { deleteMessage } from "../actions/messageActions";
import { truncateString } from "@/libs/utils";

type Props = {
  messages: MessageDto[];
};

const MessageTable = ({ messages }: Props) => {
  const searchParams = useSearchParams();
  const isOutbox = searchParams.get("container") === "outbox";
  const router = useRouter();
  const [deleting, setdeleting] = useState({ id: "", loading: false });

  const Columns = [
    {
      key: isOutbox ? "recipientName" : "senderName",
      label: isOutbox ? "Reciepement Name" : "Sender Name",
    },
    {
      key: "text",
      label: "message",
    },
    {
      key: "created",
      label: isOutbox ? "Date Sent" : "Date Received",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  const handleRowSelect = (key: Key) => {
    const message = messages.find((m) => m.id === key);
    const url = isOutbox
      ? `/members/${message?.recipientId}`
      : `/members/${message?.senderId}`;
    router.push(url + "/chats");
  };

  const handleDeleteMessage = useCallback(async (message: MessageDto) => {
    console.log('its deleting message');
    setdeleting({ id: message.id, loading: true });
    await deleteMessage(message.id, isOutbox);
    router.refresh();
    setdeleting({ id: "", loading: false });
  }, [isOutbox, router]);

  const renderCell = useCallback(
    (item: MessageDto, columnKey: keyof MessageDto) => {
      const cellValue = item[columnKey];
      switch (columnKey) {
        case "recipientName":
        case "senderName":
          return (
            <div className="flex items-center cursor-pointer gap-2">
              <Avatar
                alt="image of user"
                src={
                  (isOutbox ? item?.recipientImage : item?.senderImage) ||
                  "/images/user.png"
                }
              />
              <span>{cellValue} </span>
            </div>
          );

        case "text":
          return <div className="">{truncateString(cellValue, 100)}</div>;

        case "created":
          return <div>{cellValue}</div>;

        default:
          return (
            <Button
              isIconOnly
              variant="light"
              isLoading={deleting.id === item.id && deleting.loading}
              onClick={() => handleDeleteMessage(item)}
            >
              <AiFillDelete
                size={24}
                className="cursor-pointer text-danger-600"
              />
            </Button>
          );
      }
    },
    [deleting.id, deleting.loading, handleDeleteMessage, isOutbox]
  );

  return (
    <Card className="flex flex-col h-[calc(100vh-115px)] overflow-auto">
      <Table
        aria-label="Table with messages"
        selectionMode="single"
        onRowAction={(key) => {
          handleRowSelect(key);
        }}
        shadow="none"
      >
        <TableHeader columns={Columns}>
          {(column) => (
            <TableColumn width={column.key === 'text' ? '50%' : undefined} key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={messages}
          emptyContent="No Messages For This Container"
        >
          {(item) => (
            <TableRow key={item.id} className="cursor-pointer">
              {(columnKey) => (
                <TableCell
                  className={`${
                    !item.dateRead && !isOutbox ? "font-semibold" : ""
                  }`}
                >
                  {renderCell(item, columnKey as keyof MessageDto)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default MessageTable;
