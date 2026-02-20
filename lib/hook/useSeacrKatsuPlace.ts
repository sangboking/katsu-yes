import { supabase } from '@/lib/supabase'; 
import { useQuery } from '@tanstack/react-query';

const searchKatsuPlaces = async (keyword: string) => {
  if (!keyword.trim()) return [];

  const { data, error } = await supabase
    .from('places')
    .select('*')
    // name에 포함되어 있거나 address에 포함되어 있는 경우 (대소문자 무시 ilike)
    .or(`name.ilike.%${keyword}%,address.ilike.%${keyword}%`);

  if (error) {
    console.error('검색 중 에러 발생:', error.message);
    throw error;
  }

  return data;
};

export const useSearchKatsuPlaces = (keyword: string) => {
  return useQuery({
    queryKey: ['searchKatsuPlaces', keyword],
    queryFn: () => searchKatsuPlaces(keyword),
    enabled: !!keyword.trim(),
    staleTime: 1000 * 60,
  });
};
