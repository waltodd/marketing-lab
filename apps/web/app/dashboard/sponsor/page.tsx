"use client";
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";


const Page = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/signin'); // Redirect to login or home page
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div>
      DASHBOARD
     <p> sponsor</p>
     <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Page;