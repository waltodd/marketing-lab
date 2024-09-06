"use client";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { db } from "@/pages/api/instant";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const Page = () => {
  const { isLoading, user, error } = db.useAuth();
  const userEmail = user?.email;
  const router = useRouter();



  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Uh oh! {error.message}</div>;
  }

 
  const handleLogOut = async() =>{

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.success) {
        // Handle success, such as saving token in client-side storage (not sensitive data)
         console.log('User authenticated:', data.user);

        router.push("/");
      } else {
        console.error("Authentication failed:", data.message);
      }
    } catch (error) {
      console.error("Error during verification:", error);
    }
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
