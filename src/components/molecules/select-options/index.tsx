import {IOption} from "@/components/organisms/SelectModelMenu";

export default function SelectOptions({ click, options } : {
  click: (value: string) => void;
  options: IOption[];
}) {
  return (
    <div className="w-max border rounded-xl bg-white overflow-hidden">
      {
        options.map((option, index) => (
          <div key={index} className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2" onClick={(e) => click(option.value)}>
            { option.icon && <option.icon className="w-6 h-6" /> }
            <dl className="flex-col">
              <dt className="content-start justify-start">
                {option.name}
              </dt>
              <dd className="content-start justify-start text-gray-400">
                {option.description}
              </dd>
            </dl>
          </div>
        ))
      }
    </div>
  );
};
