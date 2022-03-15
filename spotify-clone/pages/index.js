import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import Player from "../components/Player";
export default function Home() {

  return (

    <div className="">
      <main className="flex bg-black h-screen overflow-hidden">
        <Sidebar />

        <Center />


      </main>

      <div className="fixed bottom-0">
        <Player />
      </div>

    </div>

  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session: session
    }
  }
}
