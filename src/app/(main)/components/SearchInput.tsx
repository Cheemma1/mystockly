import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  handleSearch: () => void;
  placeholder?: string;
}

const SearchInput = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  placeholder,
}: SearchProps) => {
  return (
    <div className="flex w-full sm:w-auto border rounded-md overflow-hidden mb-6">
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent rounded-none rounded-l-md "
      />
      <Button
        className="bg-blue-700 rounded-none rounded-r-md px-4 cursor-pointer"
        onClick={handleSearch}
      >
        <Search />
      </Button>
    </div>
  );
};

export default SearchInput;
