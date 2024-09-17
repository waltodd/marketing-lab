"use client";
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";


const Page = () => {
  const { signOut } = useClerk();
  return (
    <div>
      DASHBOARD
     <p className="text-white">influencer</p>
     <button onClick={() => signOut({ redirectUrl: '/' })}>Sign out</button>
    </div>
  );
};

export default Page;
