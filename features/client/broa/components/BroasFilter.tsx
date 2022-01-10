import { BroaSortBy } from "../../../shared/broas.types";
import Dropdown from "../../core/components/Dropdown";
import { useBroasStore } from "../stores/useBroasStore";

type Props = {
  className?: string;
  onChange?: (value: BroaSortBy) => void;
};

type FilterOption = {
  label: string;
  value: BroaSortBy;
};

type Filter = {
  title: string;
  options: FilterOption[];
};

const filters: Filter[] = [
  {
    title: "organizar por",
    options: [
      {
        label: "mais recentes",
        value: "recent",
      },
      {
        label: "mais antigas",
        value: "oldest",
      },
      {
        label: "mais risadas",
        value: "smiles",
      },
    ],
  },
];

export const BroasFilter = ({ className = "", onChange }: Props) => {
  const broaFilter = useBroasStore((s) => s.broaFilter);
  return (
    <Dropdown
      title={filters[0].title}
      options={filters[0].options}
      defaultOption={filters[0].options.find(
        (option) => option.value === broaFilter.sortBy
      )}
      onSelectOption={(option) => onChange?.(option.value as BroaSortBy)}
    />

    // <section
    //   className={`grid gap-4 p-8 bg-white rounded-base shadow-sm text-xl ${className}`}
    // >
    //   {filters.map((filter) => (
    //     <article key={filter.title}>
    //       <h2 className='font-bold text-2xl mb-4 text-brand-gray-2'>
    //         {filter.title}
    //       </h2>
    //       <ul className='grid gap-4'>
    //         {filter.options.map((option) => (
    //           <li key={option.value} className='flex items-center'>
    //             <input
    //               type='radio'
    //               id={option.value}
    //               name='filter'
    //               checked={broaFilter.sortBy === option.value}
    //               onChange={(e) => onChange?.(option.value)}
    //               className='peer mr-4 accent-[#8f7900]'
    //             />
    //             <label
    //               htmlFor={option.value}
    //               className='peer-checked:text-brand-primary-dark peer-checked:font-semibold'
    //             >
    //               {option.label}
    //             </label>
    //           </li>
    //         ))}
    //       </ul>
    //     </article>
    //   ))}
    // </section>
  );
};
