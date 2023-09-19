import "./messaging_init_in_sw";

function App() {
  return (
    <div className="App">
      <h1
        style={{
          backgroundColor: "#00dcff",
          textAlign: "center",
          height: 50,
          lineHeight: 1.5,
          borderRadius: 12,
        }}
      >
        Well come back!!!
      </h1>

      <div
        style={{
          display: "flex",
          margin: "auto",
          width: "100%",
          gap: 10,
          padding: 0,
        }}
      >
        <h3
          style={{
            width: "50%",
            height: 100,
            padding: 10,
            borderRadius: 12,
            backgroundColor: "#00dcff",
          }}
        >
          1
        </h3>
        <h3
          style={{
            width: "50%",
            height: 100,
            padding: 10,
            borderRadius: 12,
            backgroundColor: "#00dcff",
          }}
        >
          2
        </h3>
      </div>
    </div>
  );
}

export default App;
