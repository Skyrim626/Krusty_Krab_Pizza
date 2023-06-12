import Topbar from "../interface/Topbar";
import Nav from "../interface/Nav";

export default function Table() {
  return (
    <>
      <div className="app">
        <Nav />
        <main className="content">
          <Topbar />
          <h1>Hello Table</h1>
        </main>
      </div>
    </>
  );
}
