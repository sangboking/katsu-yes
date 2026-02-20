import Image from 'next/image';

import type { Place } from '@/lib/hook/useKatsuPlaces';

interface SearchListProps {
  places: Place[];
  onItemClick: (place: Place) => void;
}

const SearchList = ({ places, onItemClick }: SearchListProps) => {
  if (places.length === 0) {
    return (
      <div className="mt-2 w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-5 text-center text-gray-500">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <ul className="mt-2 w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-y-auto max-h-[50vh]">
      {places.map((place) => (
        <li
          key={place.id}
          onClick={() => onItemClick(place)}
          className="flex items-center p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
        >
          <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0 mr-4">
            {place.banner_img ? (
              <Image src={place.banner_img} alt={place.name} fill style={{ objectFit: 'cover' }} />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-500">No Img</span>
              </div>
            )}
          </div>
          <div className="flex-grow">
            <h3 className="font-semibold text-md">{place.name}</h3>
            <p className="text-gray-500 text-sm">{place.address}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchList;
