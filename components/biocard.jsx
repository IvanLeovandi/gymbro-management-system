import React, { Fragment, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Biocard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (!session) {
    router.replace('/');
    return;
  }

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/profile")
      .then((response) => response.json())
      .then((data) => {
        setProfile(data.user);
        setLoading(false);
      });
  }, []);

  

  return (
    <Fragment>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div>
          <div className="bg-gray-600   rounded-md overflow-hidden shadow-md max-w-7xl mx-auto mt-10s w-11/12 max-h">
            <div className="grid grid-cols-3 mx-2.5 mt-2">
              <label classname="text-white text-5xl">Nama</label>
              <label classname="text-white text-5xl">Jenis Kelamin</label>
              <label classname="text-white text-5xl">Usia</label>
            </div>
            <div className="grid grid-cols-3 mx-2.5">
              <p className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded pl-2.5">
                {profile.nama}
              </p>
              <p className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded px-1">
                {profile.jenisKelamin}
              </p>
              <p className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded pl-2.5">
                {profile.usia}
              </p>
            </div>
            <div className="mx-2.5">
              <label classname="pl-3 text-white text-5xl">Nomor Telefon</label>
              <p className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded pl-3">
                {profile.telepon}
              </p>
            </div>
            <div className="mx-2.5">
              <label classname="text-white text-5xl ml-9">Email</label>
              <p className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded pl-3">
                {session.user.email}
              </p>
            </div>
            <div className="mx-2.5 mb-5">
              <label classname="text-white text-5xl ml-9">Alamat</label>
              <p className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded pl-3">
                {profile.alamat}
              </p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
