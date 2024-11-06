interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mb-8">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Pokémon (min. 3 characters)..."
        className="w-full max-w-md mx-auto block px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {value.length > 0 && value.length < 3 && (
        <p className="text-red-500 text-sm text-center mt-2">
          Please enter at least 3 characters to search
        </p>
      )}
    </div>
  );
}