"use client";

import React, { useState, useEffect } from "react";
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
const Page = () => {
  const router = useRouter();

  const { signOut } = useClerk();
  return (
    <div>
      DASHBOARD
      <p className="text-white">Welcome, ADMIN </p>
      <Button
        onClick={() => signOut({ redirectUrl: '/' })}
    
        className=" border-none  bg-[#80D77E] text-white"
        variant="outline"
      >
        Logout
      </Button>
    </div>
  );
};

export default Page;
