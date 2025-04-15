"use client";

import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";
import { tokenProvider } from "@/actions/stream.actions";
import Loading from "@/app/components/Loading";

const API = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const StreamProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!API) throw new Error("Missing Stream API Key");
    const client = new StreamVideoClient({
      apiKey: API,
      user: {
        id: user?.id,
        name: user?.firstName || user?.username || "User",
        image: user?.imageUrl,
      },
      tokenProvider,
    });
    //user disconnects from the client when the component unmounts
    setVideoClient(client);
    return () => {
      client.disconnectUser();
      setVideoClient(undefined);
    };
  }, [user, isLoaded]);

  if (!videoClient) return <Loading />;

  return <StreamVideo client={videoClient}>
           {children}
         </StreamVideo>;
};

export default StreamProvider;
