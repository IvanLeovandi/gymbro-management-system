import Image from "next/image";
import Card from "../public/card.png";
import Img_dum from "../public/image_dummy.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";
import ActionClassButton from "./ActionClassButton";

const ClassCard = (props) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => response.json())
      .then((data) => {
        setProfile(data.user);
      });
  }, []);

  const jadwalKelas = new Date(props.jadwal);
  const tahunKelas = jadwalKelas.getFullYear();
  const bulanKelas = jadwalKelas.getMonth();
  const tanggalKelas = jadwalKelas.getDate();
  const jamKelas = jadwalKelas.getHours();
  const menitKelas =
    (jadwalKelas.getMinutes() < 10 ? "0" : "") + jadwalKelas.getMinutes();

  const jadwalfix = `${tanggalKelas}-${bulanKelas}-${tahunKelas} ${jamKelas}:${menitKelas}`;

  return (
    <div key={props.id} className="flex ml-auto mr-auto mt-[30px]">
      <div className="relative">
        <Image
          src={Card}
          alt="Card"
          className="w-[420px] md:w-[480px] h-[620px]"
        />
        <div className="absolute top-[20px] left-[30px] md:left-[40px] w-[360px] md:w-[400px]">
          <Image
            src={props.gambar}
            alt="image fitnes"
            width={1000}
            height={1000}
            className="w-[360px] md:w-[400px]  h-[300px]  py-[5px] ml-auto mr-auto"
          />
          <div className="flex justify-between items-center my-2">
            <div className="">
              <h3 className=" text-xl font-bold">{props.judul}</h3>
            </div>
            <p className="text-sm">{jadwalfix}</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-sm">{props.tipe}</p>
            <p className="text-sm">{props.instruktur}</p>
          </div>
          <hr className=" w-[360px] h-[1.5px] my-4 bg-gradient-to-r from-transparent via-white to-transparent" />
          <p className="mt-[5px] h-[70px]">{props.deskripsi}</p>

          <div className="flex">
            <div className="flex-col">
              <p className="font-bold">Harga</p>
              <p className="mb-[10px] text-md">Rp {props.harga}</p>
            </div>

            <div className="flex-col ml-[100px]">
              <p className="font-bold">Kuota</p>
              <p className="mb-[10px] text-md">
                {props.user}/{props.kapasitas}
              </p>
            </div>
          </div>

          {/* bukan admin dan menangani kapasitas berlebih */}
          {/* admin dan munculin delete + ilangin register button*/}

          {/* {props.user === props.kapasitas ? (
            <Button
              type="button"
              variant="destructive"
              size="lg"
              className="ml-[180px] md:ml-[200px] w-1/2 mt-[10px]"
            >
              Kelas Penuh
            </Button>
          ) : (
            {profile && (<ActionClassButton props={props} profile={profile}/>)}
          )} */}
          {props.user === props.kapasitas && (
            <Button
            type="button"
            variant="destructive"
            size="lg"
            className="ml-[180px] md:ml-[200px] w-1/2 mt-[10px]"
          >
            Kelas Penuh
          </Button>
          )}
          {profile && <ActionClassButton props={props} profile={profile}/> }
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
