import Topbar from "../interface/Topbar";
import Nav from "../interface/Nav";

export default function Help() {
  return (
    <>
      <div className="app">
        <Nav />
        <main className="content">
          <Topbar />
          <h1>Hello Help</h1>
        </main>
      </div>
    </>
  );
}
