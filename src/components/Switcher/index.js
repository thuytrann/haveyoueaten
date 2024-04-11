import { languages } from "../../../i18n/settings";
import Image from "next/image";
import { useTranslation } from "../../../i18n";
import seflag from "@/assets/icons/seflag.png";
import enflag from "@/assets/icons/enflag.png";
import classes from "./index.module.css";
import SwitchLink from "./switchingLink";

export const Switcher = async ({ lng }) => {
  const { t } = await useTranslation(lng, "switcher");

  return (
    <div className={classes.switcher}>
      {lng === "en" ? <Image src={enflag} /> : <Image src={seflag} />}
      {languages
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && " or "}
              <SwitchLink newLng={l === "en" ? "en" : "sv"} />
            </span>
          );
        })}
    </div>
  );
};
