import { ChangeEvent } from 'react';

import { optionType } from '../types';
import Suggestions from './Suggestions';
import MaginifyingGlass from './Icons/MaginifyingGlass';

type Props = {
  search: string
  options: []
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  onOptionSelect: (option: optionType) => void
  handleSubmit: () => void
}

const Search = ({ search, options, handleChange, onOptionSelect, handleSubmit }: Props): JSX.Element => {
  return (
    <div className="relative flex m-8 md:mt-0">
      <input
        type="text"
        placeholder="Enter a city"
        value={search}
        onChange={handleChange}
        className="relative w-[350px] py-2 pl-4 pr-3 border-2 border-gray-200 rounded-full"
      />

      <Suggestions options={options} onSelect={onOptionSelect} />

      <button
        onClick={handleSubmit}
        className="absolute right-[2px] top-[2px] bottom-[2px] m-[2px] py-1 px-3 bg-teal-200 hover:bg-cyan-300/60 text-gray-500 hover:text-gray-400 rounded-full transition-all ease-in duration-300"
      >
        <MaginifyingGlass />
      </button>
    </div>
  );
};

export default Search;