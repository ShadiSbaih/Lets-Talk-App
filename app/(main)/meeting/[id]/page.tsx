"use client";

import Loading from "@/app/components/Loading";
import useGetCallById from "@/hooks";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useState } from "react";
import Alert from "@/app/components/Alert";
import MeetingSetup from "@/app/components/MeetingSetup";
import MeetingRoom from "@/app/components/MeetingRoom";

const MeetingPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return;
  }
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  if (!isLoaded || isCallLoading) return <Loading />;

  if (!call) {
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call not found
      </p>
    );
  }
  const notAllowed = call.type === "invited" && (!user || !call.state.members.find((member) => member.user_id === user.id));
  if (notAllowed) {
    return (
      <Alert title="You are not allowed to join this call" />
    );
  }
  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
