import Image from "next/image";

const Katsu = () => {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        transform: "translate(-50%, -100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "auto",
      }}
    >
      <Image
        src="/images/Katsu.png"
        alt="Katsu marker"
        width={32}
        height={32}
        style={{
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default Katsu;
