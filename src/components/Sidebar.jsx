const Sidebar = () => {
  return (
<aside className="w-1/5 bg-gray-100 flex flex-col">
  <div className="py-4 px-6 bg-white">
    <img src="logo.png" alt="Logo" className="w-32" />
  </div>
  <nav className="flex-1 p-4 overflow-auto">
    <ul>
      <li className="mb-2">
        <a href="#" className="block py-2 px-4 hover:bg-gray-200">Dashboard</a>
      </li>
      <li className="mb-2">
        <a href="#" className="block py-2 px-4 hover:bg-gray-200">Website Design</a>
      </li>
      {/* ... */}
    </ul>
  </nav>
</aside>
  );
};

export default Sidebar;
