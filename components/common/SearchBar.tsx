import { useState } from "react";

import SearchList from '@/components/common/SearchList';
import SearchIcon from "@/components/svg/SearchIcon";

import { useSearchKatsuPlaces } from "@/lib/hook/useSeacrKatsuPlace";
import { useSideBarState } from '@/store/useSideBarState';
import { useMapState } from "@/store/useMapState";
import type { Place } from "@/lib/hook/useKatsuPlaces";

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const { openSideBar } = useSideBarState();
  const { moveMap } = useMapState();

  const { data: searchedPlaces} = useSearchKatsuPlaces(query);

  const handleSearch = () => {
    if (!keyword.trim()) return;
    setQuery(keyword);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleItemClick = (place: Place) => {
    openSideBar(place.id);
    moveMap(place.lat, place.lng);
    setKeyword(''); 
    setQuery(''); 
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="가게이름/지역 검색 (예: 합정)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-5 py-3 pr-12 text-base bg-white border border-gray-200 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div
          onClick={handleSearch}
          className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
        >
          <SearchIcon />
        </div>
      </div>

      {query && searchedPlaces && (
        <div className="absolute w-full mt-2">
          <SearchList places={searchedPlaces} onItemClick={handleItemClick} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
