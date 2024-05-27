const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div>
        <h1 className="text-2xl font-bold">내 정보</h1>
        <p className="text-gray-500">네이버 클라우드 대쉬보드</p>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-l border"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-r">
          Search
        </button>
        <img
          src="avatar.png"
          alt="Avatar"
          className="w-10 h-10 rounded-full ml-4"
        />
      </div>
    </header>
  );
};

export default Header;
