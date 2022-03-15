import React, { useEffect } from 'react'
import { getProviders, signIn } from "next-auth/react";


function Login({ providers }) {
  return (
    <div className="flex flex-col gap-10 items-center bg-black min-h-screen w-full justify-center">
      <img className="w-72" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" alt="Spotify logo" />

      {Object.values(providers).map(provider =>
      (<div key={provider.id}>
        <button className="bg-[#1ed760] text-white p-5 rounded-full"
          onClick={() => signIn(provider.id, { callbackUrl: "/" })}
        >
          Login with {provider.name}
        </button>
      </div>)
      )}


    </div>
  )
}

export default Login;


export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  }
}
