"use client";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { db } from "@/pages/api/instant";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const Page = () => {
  const { isLoading, user, error } = db.useAuth();
  const userId = user?.id;
  const router = useRouter();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Uh oh! {error.message}</div>;
  }

  const handleLogOut = () =>{
    Cookies.remove("accessToken");
    router.push("/");
  }
  return (
    <div>
      DASHBOARD
      {user ? <p className="text-white">Welcome, {user.email}!</p> : <p>Loading...</p>}
       <Button onClick={handleLogOut} className=" border-none  bg-[#80D77E] text-white"
            variant="outline">Logout</Button>
    </div>
  );
};

export default Page;
