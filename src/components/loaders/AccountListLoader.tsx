export default function AccountListLoader() {
  return (
    <div className="d-flex flex-column gap-1 placeholder-glow">
      {[...Array(10).keys()].map((item) => (
        <span
          key={item}
          className="placeholder rounded-1"
          style={{
            height: '4rem',
          }}
        />
      ))}
    </div>
  );
}
