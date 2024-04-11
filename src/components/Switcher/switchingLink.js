"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import seflag from "@/assets/icons/seflag.png";
import enflag from "@/assets/icons/enflag.png";

export default function SwitchLink({ newLng }) {
  const path = usePathname();
  let pathArray = path.split("/");
  pathArray[1] = newLng;

  const onNewPath = () => {
    let tempPath = "";
    pathArray.forEach((e) => {
      tempPath = `${tempPath}${e}/`;
    });
    return tempPath;
  };
  const newPath = onNewPath();

  return (
    <Link href={newPath} style={{ textDecoration: "none" }}>
      {newLng === "en" ? <Image src={enflag} /> : <Image src={seflag} />}
    </Link>
  );
}
