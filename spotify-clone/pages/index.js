import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import { getSession, SessionProvider, useSession } from "next-auth/react";

export default function Home() {

  return (

    <div className="">
      <main className="flex bg-black h-screen overflow-hidden">
        <Sidebar />

        <Center />


      </main>

      <div>
        {/* Player */}
      </div>

    </div>

  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session: session
    }
  }
}
