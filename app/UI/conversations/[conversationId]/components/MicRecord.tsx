"use client";

import { useCallback, useEffect, useState } from "react";
import { LongPressEventType, useLongPress } from "use-long-press";
import { AiOutlineAudio } from "react-icons/ai";
import axios from "axios";

interface MicRecordProps {
  conversationId: string;
  recordingBlob?: Blob;
  startRecording: () => void;
  stopRecording: () => void;
  setLongPressed: any;
}

const MicRecord: React.FC<MicRecordProps> = ({
  conversationId,
  recordingBlob,
  startRecording,
  stopRecording,
  setLongPressed,
}) => {
  useEffect(() => {
    if (!recordingBlob) return;
    const fd = new FormData();
    fd.append("file", recordingBlob);
    fetch("/BLL/api/file", {
      body: fd,
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        axios.post("/BLL/api/messages", {
          audio: data.filename,
          conversationId,
        });
      });
  }, [recordingBlob]);

  const [enabled, setEnabled] = useState(true);

  const callback = useCallback(() => {
    setLongPressed(true);
  }, []);

  const bind = useLongPress(enabled ? callback : null, {
    onStart: () => {
      startRecording();
    },
    onFinish: () => {
      setLongPressed(false);
      stopRecording();
    },
    onCancel: () => {
      console.log("录音时间太短");
    },
    filterEvents: () => true,
    threshold: 1000,
    captureEvent: true,
    cancelOnMovement: false,
    cancelOutsideElement: true,
    detect: LongPressEventType.Pointer,
  });

  return (
    <div
      {...bind()}
      className="rounded-full p-2 cursor-pointer active:bg-slate-100 transition"
    >
      <AiOutlineAudio size={23} className="text-sky-500" />
    </div>
  );
};

export default MicRecord;
