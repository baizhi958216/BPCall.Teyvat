"use client";

import useConversation from "@/app/UI/hooks/useConversation";
import { FullMessageType } from "@/app/UI/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/UI/libs/pusher";
import { find } from "lodash";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  // 副作用: 发送消息设置已读
  useEffect(() => {
    axios.post(`/BLL/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  // 副作用: 双方会话消息订阅
  useEffect(() => {
    pusherClient.subscribe(conversationId);
    // 将消息滚动到底部
    bottomRef?.current?.scrollIntoView();

    const messagesHandler = (message: FullMessageType) => {
      axios.post(`/BLL/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });
      // 将消息滚动到底部
      bottomRef?.current?.scrollIntoView();
    };

    const updateMessagesHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    pusherClient.bind("messages:new", messagesHandler);
    pusherClient.bind("message:update", updateMessagesHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messagesHandler);
      pusherClient.unbind("messages:update", updateMessagesHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
