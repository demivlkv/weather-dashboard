const Degree = ({ temp }: { temp: number}): JSX.Element => (
  <>
    <span>
      {temp}
      <sup>
        &deg;F
      </sup>
    </span>
  </>
);

export default Degree