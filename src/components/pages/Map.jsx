import Topbar from "../interface/Topbar";
import Nav from "../interface/Nav";

export default function Map() {
  return (
    <>
      <div className="app">
        <Nav />
        <main className="content">
          <Topbar />
          <h1>Hello Map</h1>
        </main>
      </div>
    </>
  );
}
