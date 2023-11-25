import React, { Fragment, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Card from "../public/card.png";
import Image from "next/image";

export default function Biocard(props) {
  const { data: session, status } = useSession();

  return (
    <Fragment>
      <div>
        <div className="relative bg-rounded-md overflow-hidden shadow-md max-w-7xl mx-auto mt-10s w-11/12">
          <Image src={Card} alt="Card" className="w-full h-[340px]" />
          <div className="absolute top-[1.5vw] left-[2vw] right-[2vw]">
            <div className="grid grid-cols-3 mx-2.5 mt-2">
              <label className="text-white text-md ml-2">Nama</label>
              <label className="text-white text-md ml-2">Jenis Kelamin</label>
              <label className="text-white text-md ml-2">Usia</label>
            </div>
            <div className="grid grid-cols-3 mx-2.5">
              <p className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded pl-2.5">
                {props.profile.nama}
              </p>
              <p className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded px-1">
                {props.profile.jenisKelamin}
              </p>
              <p className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded pl-2.5">
                {props.profile.usia}
              </p>
            </div>
            <div className="mx-2.5">
              <label className="text-white text-md ml-2">Nomor Telepon</label>
              <p className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded pl-3">
                {props.profile.telepon}
              </p>
            </div>
            <div className="mx-2.5">
              <label className="text-white text-md ml-2">Email</label>
              <p className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded pl-3">
                {session.user.email}
              </p>
            </div>
            <div className="mx-2.5 mb-5">
              <label className="text-white text-md ml-2">Alamat</label>
              <p className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded pl-3">
                {props.profile.alamat}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
