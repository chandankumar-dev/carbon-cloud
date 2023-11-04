'use client'
import { useContext } from "react";
import { useRouter } from "next/router";
import { FileContext } from "../context/FileContext";

const Button = () => {
  const { setFile } = useContext(FileContext);
  const router = useRouter();

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && setFile) {
      setFile(files[0]);
      console.log("yes");
      router.push("/dashboard");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        console.log(2);
      }}>
      <input type="file" id="locationData" onChange={handleFileChange} />
      <label
        className="flex transition-all flex-row w-32 mt-28  ml-98 text-lg rounded-lg p-1 text-white font-semibold hover:bg-blue-300 bg-blue-400 cursor-pointer hover:scale-105"
        htmlFor="locationData">
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="rounded-lg fill-white"
            height="32"
            viewBox="0 -960 960 960"
            width="48">
            <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
          </svg>
          <p className="pr-1">Upload!</p>
        </button>
      </label>
    </form>
  );
};

export default Button;
