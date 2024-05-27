const MainContent = () => {
  return (
    <main className="p-8">
      <img
        src="profile.png"
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <div className="bg-white shadow rounded p-6">
        <div className="mb-4">
          <span className="font-bold">이름</span>
          <span className="ml-4">나이</span>
        </div>
        <div className="mb-4">
          <span className="font-bold">TEL</span>
          <span className="ml-4">010-1234-1234</span>
        </div>
        <div className="mb-4">
          <span className="font-bold">Email</span>
          <span className="ml-4">bitcamp@gmail.com</span>
        </div>
        {/* ... */}
      </div>
      <button className="mt-8 px-4 py-2 bg-blue-500 text-white rounded">
        정보 수정
      </button>
    </main>
  );
};

export default MainContent;
