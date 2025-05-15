export const SearchComponent = ({ setSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search inventory..."
        className="bg-gray-800 text-gray-200 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
