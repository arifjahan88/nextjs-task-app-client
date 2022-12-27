import Head from "next/head";
import Homemain from "./Component/Homemain";
import Navber from "./Component/Navber";
import Toaster from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Head>
        <title>Task Management App</title>
      </Head>
      <div>
        <Navber></Navber>
        <Homemain></Homemain>
      </div>
    </>
  );
}
