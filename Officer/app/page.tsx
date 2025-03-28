import Booked from "@/components/Booked";
import CarForm from "@/components/CarForm";
import Confiramtion from "@/components/Confiramtion";
import HomeE from "@/components/HomeE";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpdateCarsDetail from "@/components/CarsDetail";
import Feedback from "@/components/Feedback";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { useState } from "react";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  return (
    <main>
      <Navbar />
      <section className="relative top-16 w-full ">
        <Tabs defaultValue="home" className=" py-5 md-py-10">
          <div className="flex w-full bg-primary-50 bg-dotted-pattern bg-cover bg-center border-[1px] border-gray-200 py-5 md:p-10 sm:text-left overflow-x-auto">
            <TabsList className="wrapper gap-5 py-5 flex min-w-max">
              <Image
                src={"/car-logo.png"}
                alt="car logo"
                width={100}
                height={100}
                className="min-h-[30px] object-cover object-center"
              />
              <TabsTrigger
                value="home"
                className="w-full py-[11px] px-[28px] text-base font-bold rounded-full data-[state=active]:bg-primary-blue data-[state=active]:text-white "
              >
                Home
              </TabsTrigger>
              <TabsTrigger
                value="carForm"
                className="md:w-full w-max py-[11px] px-[28px] text-base font-bold rounded-full data-[state=active]:bg-primary-blue data-[state=active]:text-white"
              >
                Register Car
              </TabsTrigger>
              <TabsTrigger
                value="updateCars"
                className="md:w-full w-max py-[11px] px-[28px] text-base font-bold rounded-full data-[state=active]:bg-primary-blue data-[state=active]:text-white"
              >
                Update Car's Detail
              </TabsTrigger>
              <TabsTrigger
                value="confirmation"
                className="w-full py-[11px] px-[28px] text-base font-bold rounded-full data-[state=active]:bg-primary-blue data-[state=active]:text-white"
              >
                Confirmation
              </TabsTrigger>
              <TabsTrigger
                value="booked"
                className="w-full m-3 py-[11px] px-[28px] text-base font-bold rounded-full data-[state=active]:bg-primary-blue data-[state=active]:text-white"
              >
                Booked
              </TabsTrigger>
              <TabsTrigger
                value="feedback"
                className="w-full m-3 py-[11px] px-[28px] text-base font-bold rounded-full data-[state=active]:bg-primary-blue data-[state=active]:text-white"
              >
                Feedbacks
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="wrapper justify-between grid-cols-1 md:grid-cols-2 2xl:max-w-7xl ">
            
            <TabsContent value="home">
              <HomeE />
            </TabsContent>
            <TabsContent value="carForm">
              <CarForm type="Create" />
            </TabsContent>
            <TabsContent value="updateCars">
              <UpdateCarsDetail />
            </TabsContent>
            <TabsContent value="confirmation">
              <Confiramtion />
            </TabsContent>
            <TabsContent value="booked">
              <Booked />
            </TabsContent>
            <TabsContent value="feedback">
              <Feedback />
            </TabsContent>
          </div>
        </Tabs>
      </section>
    </main>
  );
};

export default Home;
