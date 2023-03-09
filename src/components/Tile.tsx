import Feels from './Icons/Feels';
import Humidity from './Icons/Humidity';
import Pop from './Icons/Pop';
import Wind from './Icons/Wind';

type Props = {
  icon: 'wind' | 'feels' | 'humidity' | 'pop'
  title: string
  info: string | JSX.Element
  unit: string
  description: string
}

const icons = {
  wind: Wind,
  feels: Feels,
  humidity: Humidity,
  pop: Pop
}

const Tile = ({ icon, title, info, unit, description }: Props): JSX.Element => {
  const Icon = icons[icon];

  return (
    <article className="mx-3 flex flex-col justify-center items-center">
      <Icon />
      <h3 className="my-2 font-semibold text-2xl">{info}<sup className="text-base font-semibold">{unit}</sup></h3>
      <p className="mb-2 text-xs md:text-sm">{description}</p>
      <h6>{title}</h6>
    </article>
  );
};

export default Tile;