"use client";

import useConversation from "@/app/UI/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import { AiOutlineSend } from "react-icons/ai";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";
import MicRecord from "./MicRecord";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { useState } from "react";

const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      messages: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });

    axios.post("/BLL/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleImageUpload = (result: any) => {
    axios.post("/BLL/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  const { startRecording, stopRecording, recordingBlob, recordingTime } =
    useAudioRecorder();

  const [longPressed, setLongPressed] = useState(false);

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MicRecord
          conversationId={conversationId}
          startRecording={startRecording}
          stopRecording={stopRecording}
          recordingBlob={recordingBlob}
          setLongPressed={setLongPressed}
        />
        {(!longPressed && (
          <MessageInput
            id="message"
            register={register}
            errors={errors}
            required
            placeholder="在这里输入..."
          />
        )) || (
          <div className="text-gray-300 relative py-2 px-4 bg-neutral-100 w-full rounded-full text-center animate-bounce">
            正在录音 {recordingTime}s...
          </div>
        )}
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={handleImageUpload}
          uploadPreset="提瓦特BB机"
        >
          <HiPhoto size={25} className="text-sky-500" />
        </CldUploadButton>
        <button
          type="submit"
          className="rounded-full p-2 cursor-pointer transition"
        >
          <AiOutlineSend size={23} className="text-sky-500" />
        </button>
      </form>
    </div>
  );
};

export default Form;
