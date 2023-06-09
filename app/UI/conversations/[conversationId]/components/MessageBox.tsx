"use client";

import Avatar from "@/app/UI/components/Avatar";
import { FullMessageType } from "@/app/UI/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import ImageModal from "./ImageModal";
import { HiStop, HiPlay } from "react-icons/hi";

interface MessageBoxProp {
  isLast?: boolean;
  data: FullMessageType;
}

const MessageBox: React.FC<MessageBoxProp> = ({ isLast, data }) => {
  const session = useSession();

  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session?.data?.user?.email === data?.sender?.email;

  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");

  const avatar = clsx(isOwn && "order-2");

  const body = clsx("flex flex-col gap-2", isOwn && "items-end");

  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3",
    data.audio ? "bg-white" : ""
  );

  const [oggPlaying, setoggPlaying] = useState(false);

  const audioObj = useRef<HTMLAudioElement>();

  const toggleAudio = (oggName: string) => {
    if (!audioObj.current || !audioObj.current.src.includes(oggName)) {
      audioObj.current = new Audio(`/media/${oggName}`);
    }
    if (oggPlaying == false) {
      setoggPlaying(true);
      audioObj.current.currentTime = 0;
      audioObj.current.play();
      audioObj.current.addEventListener("ended", () => {
        setoggPlaying(false);
      });
    } else {
      setoggPlaying(false);
      audioObj.current.pause();
    }
  };

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createAt), "p")}
          </div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              onClick={() => setImageModalOpen(true)}
              alt="Image"
              height="288"
              width="288"
              src={data.image}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : data.audio ? (
            <div onClick={() => toggleAudio(data.audio!)}>
              <div className="text-black flex items-center cursor-pointer">
                {oggPlaying ? (
                  <HiStop size={35} className="text-sky-500" />
                ) : (
                  <HiPlay size={35} className="text-sky-500" />
                )}
                <div>||||||||||||||||||||||||||||</div>
              </div>
            </div>
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">
            {`${seenList}已读`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
