"use client";
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";


const Page = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  
  return (
    <div>
      DASHBOARD
     <p> sponsor</p>
     <button onClick={() => signOut({ redirectUrl: '/' })}>Sign out</button>

    </div>
  );
};


export default Page;

