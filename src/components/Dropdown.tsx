import { Listbox, Transition } from "@headlessui/react";
import { BsChevronDown, BsCheck } from "react-icons/bs";
import { Fragment } from "react";

interface Props {
  setter: (value: { name: string } | undefined) => void;
  value: { name: string } | undefined;
  list: { name: string }[];
  mobile?: boolean;
}

export const DropDown = (props: Props) => {
  const { setter: setSelected, value: selected, list, mobile } = props;
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative z-10 mt-1 w-full cursor-pointer">
        <Listbox.Button
          className={`relative h-20 w-full ${
            mobile ? "rounded-lg" : "rounded-l-lg"
          } bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary sm:text-sm`}
        >
          <span className="block truncate text-lg">{selected?.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <BsChevronDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {list.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-red-100 text-brand-primary" : "text-gray-900"
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "text-lg font-medium" : "text-lg font-normal"
                      }`}
                    >
                      {person.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-primary">
                        <BsCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
