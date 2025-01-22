import { Link } from "react-router";

export default function Aside() {
  return (
    <aside className="w-36 bg-blue-700 h-full py-4">
      <ul className="text-white flex flex-col items-center">
        <Link to="tableros">Tableros</Link>
      </ul>
    </aside>
  );
}
