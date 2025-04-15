import NavBar from "@/app/components/NavBar";
import React from "react";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative">
       <NavBar />
      <section className="flex flex-col gap-4 flex-1 min-h-full px-6 p-b-6 pt-28 max-md:pb-14 sm:px-14">
        <div className=" w-full  ">
          {children}
        </div>
      </section>
    </main>
  );
};
export default HomeLayout;
