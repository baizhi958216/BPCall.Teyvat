import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div
      className="
      flex
      min-h-full
      flex-col
      justify-center
      py-12
      sm:px-6
      lg:px-8
      bg-gray-100
      "
    >
      <div
        className="
      sm:mx-auto sm:w-full sm:max-w-md"
      >
        <Image
          alt="Logo"
          height="56"
          width="56"
          className="mx-auto w-auto"
          src="/images/twt.png"
        />
        <h2
          className="
          mt-6
          text-center
          text-3xl
          font-bold
          tracking-tight
          text-gray-900
          "
        >
          提瓦特BB机
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
