interface Props {
  error: string;
}

const Error = ({ error }: Props) => {
  return (
    <div>
      {" "}
      <div>{error != "" && <p style={{ color: "red" }}>{error}</p>}</div>
    </div>
  );
};

export default Error;
