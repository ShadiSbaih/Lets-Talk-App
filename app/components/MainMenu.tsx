"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MenuItemCard from "./MenuItemCard";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";
import { getYear } from "./../../node_modules/date-fns/fp/getYear";
import { getMonth } from "date-fns";
import { useUser } from "@clerk/nextjs";
import Loading from "./Loading";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";

// Manual implementation of range function to replace lodash dependency
const range = (start: number, end: number, step: number = 1): number[] => {
  const result: number[] = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
};

const initValues = {
  link: "",
  description: "",
  dateTime: new Date(),
};
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MainMenu = () => {
  const { user } = useUser();
  const router = useRouter();
  const [values, setValues] = React.useState(initValues);
  const [meetingState, setMeetingState] = React.useState<
    "Schedule" | "Instant" | undefined
  >(undefined);

  const [startDate, setStartDate] = React.useState(new Date());
  const years = range(1990, getYear(new Date()) + 1, 1);
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!user) return router.push("/login");
    if (!client) return router.push("/");
    try {
      if (!values.dateTime) {
        toast.error("Please select a date and time", {
          duration: 3000,
          className: "!bg-gray-400 !rounded-3xl !py-8 !px-5 !justify-center",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call");
      const StartsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "No description provided";
      await call.getOrCreate({
        data: {
          starts_at: StartsAt,
          custom: {
            description,
          },
        },
      });
      await call.updateCallMembers({
        update_members: [{ user_id: user.id }],
      });
      if (meetingState === "Instant") {
        router.push(`/meeting/${call.id}`);
        toast("Setting up your meeting...", {
          duration: 3000,
          className: "!bg-gray-400 !rounded-3xl !py-8 !px-5 !justify-center",
        });
      }
      if (meetingState === "Schedule") {
        router.push(`/upcoming`);
        toast(`Your Meeting is scheduled at ${values.dateTime}`, {
          duration: 3000,
          className: "!bg-gray-400 !rounded-3xl !py-8 !px-5 !justify-center",
        });
      }
    } catch (error: any) {
      toast(`Failed to create Meeting ${error.message}`, {
        duration: 3000,
        className: "!bg-gray400  !rounded-3xl !py-8 !px-5 !justify-center",
      });
    }
  };
  React.useEffect(() => {
    if (meetingState) {
      createMeeting();
    }
  }, [meetingState]);

  if (!client || !user) return <Loading />;
  return (
    <section className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
      <Dialog>
        <DialogTrigger>
          <MenuItemCard
            img="/DesignAssets/new-meeting.svg"
            title="New Meeting"
            bgColor="bg-orange-500"
            hoverColor="hover:bg-orange-800"
          />
        </DialogTrigger>
        <DialogContent className=" bg-gray-200 px-16 py-10 text-gray-900 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black leading-relaxed text-center ">
              Start an Instant Meeting 🤝
            </DialogTitle>
            <DialogDescription className="flex flex-col items-center overflow-y-auto max-h-[400px]">
              Add a meeting description
              <Textarea
                className="inputs p-5 overflow-y-auto max-w-[400px]  text-blue-700"
                rows={4}
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
              />
              <Button
                className="mt-5 font-extrabold text-lg text-white rounded-xl bg-blue-700 py-5 px-10 hover:bg-blue-900 hover:scale-110 transition ease-in-out delay-75 duration-200 hover:-translate-y-1 cursor-pointer"
                onClick={() => setMeetingState("Instant")}
              >
                Create Meeting
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger>
          <MenuItemCard
            img="/DesignAssets/join-meeting.svg"
            title="Join Meeting"
            bgColor="bg-blue-600"
            hoverColor="hover:bg-blue-800"
          />
        </DialogTrigger>
        <DialogContent className=" bg-gray-200 px-16 py-10 text-gray-900 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black leading-relaxed text-center mb-5 ">
              Type the Meeting link here
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-3 items-center">
              <Input
                type="text"
                placeholder="Meeting Link"
                onChange={(e) => setValues({ ...values, link: e.target.value })}
                className="inputs"
              />

              <Button
                className="mt-5 font-extrabold text-lg text-white rounded-xl bg-blue-700 py-5 px-10 hover:bg-blue-900 hover:scale-110 transition ease-in-out delay-75 duration-200 hover:-translate-y-1 cursor-pointer"
                onClick={() => router.push(values.link)}
              >
                Join Meeting
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger>
          <MenuItemCard
            img="/DesignAssets/calendar.svg"
            title="Schedule"
            bgColor="bg-blue-600"
            hoverColor="hover:bg-blue-800"
          />
        </DialogTrigger>
        <DialogContent className=" bg-gray-200 px-16 py-10 text-gray-900 !rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black leading-relaxed text-center mb-5 ">
              Schedule Meeting
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-3 overflow-y-auto max-h-[400px]">
              Add a meeting description
              <Textarea
                className="inputs p-5 overflow-y-auto max-h-[400px] text-blue-700"
                rows={4}
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
              />
            </DialogDescription>
            <div className="flex w-full flex-col gap-2.5">
              <label className="text-base font-normal leading-[22.4px] text-sky-2">
                Select Date and Time
              </label>
              <DatePicker
                className=" border-2 border-[#1447e6] rounded-lg p-2 cursor-pointer"
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div
                    style={{
                      margin: 10,
                      display: "flex",
                      justifyContent: "center",
                      border: "1px solid #000",
                      borderRadius: "10px",
                      padding: "10px",
                      backgroundColor: "#1447e6",
                      color: "#fff",
                    }}
                  >
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                    >
                      {"<"}
                    </button>
                    <select
                    
                      value={getYear(date)}
                      onChange={({ target: { value } }) =>
                        changeYear(Number(value))
                      }
                    >
                      {years.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <select
                   
                      value={months[getMonth(date)]}
                      onChange={({ target: { value } }) =>
                        changeMonth(months.indexOf(value))
                      }
                    >
                      {months.map((option) => (
                        <option  style={{
                          margin: 10,
                          display: "flex",
                          justifyContent: "center",
                          border: "1px solid #000",
                          borderRadius: "10px",
                          padding: "10px",
                          backgroundColor: "#1447e6",
                          color: "#fff",
                        }} key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                    >
                      {">"}
                    </button>
                  </div>
                )}
                selected={startDate}
                onChange={(date) => {
                  if (date) setStartDate(date);
                }}
              />
            </div>
            <Button
              className="!mt-5 font-extrabold text-lg text-white rounded-xl bg-blue-700 py-5 px-10 hover:bg-blue-900 hover:scale-110 transition ease-in-out delay-75 duration-200 hover:-translate-y-1 cursor-pointer"
              onClick={() => setMeetingState("Schedule")}
            >
              Submit
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <MenuItemCard
        img="/DesignAssets/recordings2.svg"
        title="Recordings"
        bgColor="bg-blue-600"
        hoverColor="hover:bg-blue-800"
        handleClick={() => router.push("/recordings")}
      />
    </section>
  );
};

export default MainMenu;
