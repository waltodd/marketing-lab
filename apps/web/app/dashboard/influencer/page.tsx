"use client";

import React, { useState, useEffect } from "react";
<<<<<<< HEAD


const Page = () => {

  return (
    <div>
      DASHBOARD
     <p> user</p>
=======
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

export default Page;
