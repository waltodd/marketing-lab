"use client"; // This directive makes it a client component
import { useState, useEffect } from "react";
import { rolesArray } from "@/constants";
import { check } from "@/assets";
import Image from "next/image";

interface RoleCardProps {
    onRoleSelect: (role: string | null) => void;
  }

const RoleCard = ({ onRoleSelect }: RoleCardProps) => {
  // Initialize selectedRole with the role of the first item in rolesArray
  const [activeRole, setActiveRole] = useState<string | null>(
    rolesArray[0]?.role || null
  );

  // Handle role selection
  const handleRoleSelect = (role: string) => {
    setActiveRole(role);
    onRoleSelect(role);
  };


  return (
    <div className="relative grid grid-cols-2 gap-4 justify-center items-center">
      {rolesArray.map((role) => (
        <p
          key={role.label} // Use a unique key based on role.label
          onClick={() => handleRoleSelect(role.role)} // Corrected onClick to call the function with the role
          className={`${activeRole === role.role ? "border-[1px] border-[#1dc071]" : "border-[1px] border-[#ddd]"}  flex  justify-center items-center px-2 py-2 rounded-lg w-full cursor-pointer`}
        >
          {activeRole === role.role && (
            <Image
              className=" mr-2"
              src={check}
              width={20}
              height={20}
              alt="check"
            />
          )}
          {role.label}
        </p>
      ))}
    </div>
  );
};

export default RoleCard;
