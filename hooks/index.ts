import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState<boolean>(true);
  const client = useStreamVideoClient();
  useEffect(() => {
    if (!client) return;
    const loadCall = async () => {
      try {
        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });
        if (calls.length > 0) {
          setCall(calls[0]);
          setIsCallLoading(false);
        } else {
          setIsCallLoading(true); //here
        }
      } catch (error) {
        console.error("Error fetching call:", error);
        setIsCallLoading(true);
      }
    };
    loadCall();
  }, [client, id]);
  return { call, isCallLoading };
};

export default useGetCallById;