import Image from "next/image";
import Link from "next/link";
import React from "react";

const SiteHeader = () => {
  return (
    
      <header className="bg-white z-10">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 border-b">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Image src={"/logo.svg"} width={50} height={30} alt="logo"/>
            </div>
            <h1 className="text-xl mx-auto font-bold">
                LeyLine Technologies Backend Challenge
            </h1>
          </div>
        </div>
      </header>
   
  );
};

export default SiteHeader;
