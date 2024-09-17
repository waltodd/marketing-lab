"use client";
<<<<<<< HEAD
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
=======

import React, { useState, useEffect } from "react";
import { db } from "@/pages/api/instant";

const Page = () => {
  const { isLoading, user, error } = db.useAuth();
  const userId = user?.id;
  console.log(user);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Uh oh! {error.message}</div>;
  }
  return (
    <div>
      DASHBOARD
      {user ? <p className="text-white">Welcome, {user.email}!</p> : <p>Loading...</p>}
>>>>>>> origin/main
    </div>
  );
};

<<<<<<< HEAD
export default Page;
=======
export default Page;
>>>>>>> origin/main
