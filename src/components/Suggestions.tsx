import { optionType } from '../types';

type componentProps = {
  options: []
  onSelect: (option: optionType) => void
}

const Suggestions = ({ options, onSelect }: componentProps): JSX.Element => {
  return (
    <ul className="absolute left-5 top-[42px] bg-white rounded-bl-md rounded-br-md">
      {options.map((option: optionType, index: number) => (
        <li key={option.name + '-' + index}>
          <button
            className="w-full py-2 px-4 text-left hover:bg-zinc-600 hover:text-white cursor-pointer"
            onClick={() => onSelect(option)}
          >
            {option.name}, {option.country}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Suggestions;