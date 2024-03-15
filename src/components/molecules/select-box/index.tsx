import style from './style.module.css';
import {IOption} from "@/components/organisms/SelectModelMenu";
import SelectOptions from "@/components/molecules/select-options";
import React from "react";

export default function SelectBox({ icon, label, value, options, click } : {
  icon: React.ReactNode,
  label: React.ReactNode,
  click: (value: string) => void;
  options: IOption[];
  value?: string,
}) {
  return (
    <div className={style.toggle}>
      <input type="checkbox" id='toggle'/>
      <label htmlFor="toggle" className="flex items-center justify-center hover:bg-gray-100 rounded-xl p-2 mb-2 cursor-pointer">
        <div className="inline-flex items-center justify-center pr-2 text-center font-medium rounded-xl">
          { label }
        </div>
        { icon }
      </label>
      <section className="relative">
        <label htmlFor="toggle" className="absolute">
          <SelectOptions options={options} click={click} />
        </label>
      </section>
    </div>
  );
}
