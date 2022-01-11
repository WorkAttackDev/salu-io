import { PlusIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { linksObj } from "../../core/data/links";

const AddProjectFloatButton = () => {
  return (
    <Link href={linksObj.editProject.url}>
      <a
        title={linksObj.editProject.label}
        className='group fixed bottom-12 right-12 flex p-6  rounded-xl duration-300 shadow-[0_0_2rem_transparent] bg-brand hover:shadow-brand/40 hover:rotate-45'
      >
        <PlusIcon className='w-8 h-8 duration-300 group-hover:-rotate-45' />
      </a>
    </Link>
  );
};

export default AddProjectFloatButton;
