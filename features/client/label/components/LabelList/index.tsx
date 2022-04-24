import React, { useEffect } from "react";
import { MyLabel } from "../../../../shared/models/MyLabel";
import useLabel from "../../hooks/useLabel";

type Props = {
  labels?: MyLabel[];
  load?: boolean;
  currLabel?: MyLabel;
  onClick?: (label?: MyLabel) => void;
};

const LabelList = ({
  labels = [],
  load = false,
  onClick,
  currLabel,
}: Props) => {
  const { handleGetLabels, labels: globalLabels } = useLabel();

  useEffect(() => {
    load && handleGetLabels();
  }, []);

  const handleOnClick = (label: MyLabel) => {
    onClick?.(label === currLabel ? undefined : label);
  };

  return (
    <div className='flex flex-wrap -pr-4 -pb-4'>
      {(load ? globalLabels : labels).map((label) => (
        <p
          role={onClick ? "button" : undefined}
          title={label.name}
          key={label.name}
          className={`whitespace-nowrap py-1 px-2 rounded-full text-base border duration-200 border-brand-gray-1 mr-4 mb-4 ${
            onClick ? "cursor-pointer" : ""
          } ${
            currLabel ? (currLabel.name === label.name ? "" : "opacity-50") : ""
          }`}
          style={{ backgroundColor: label.color }}
          onClick={() => handleOnClick(label)}
        >
          {label.name}
        </p>
      ))}
    </div>
  );
};

export default LabelList;
