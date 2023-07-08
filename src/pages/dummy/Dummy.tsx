interface DummyProps {
  data: string;
}
function Dummy({ data }: DummyProps) {
  return <>{data}</>;
}
export default Dummy;
