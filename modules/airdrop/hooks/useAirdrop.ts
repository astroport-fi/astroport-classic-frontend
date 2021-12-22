import { useMemo } from "react";
import { useQuery } from "react-query";

export const useAirdrop = (address: string | undefined) => {
  // const [value, setValue] = useState(null);

  const query = useQuery(["airdrop", 1], async () => {
    const res = await fetch("/airdrop/airdrop.json");
    return res.json();
  });

  // const query2 = useQuery(["airdrop", 2], async () => {
  //   const res = await fetch("/airdrop/airdrop2.json");
  //   return res.json();
  // });

  return useMemo(() => {
    if (query.isLoading) {
      return {
        isLoading: true,
        data: null,
      };
    }

    const data = [...query.data].find((item) => {
      return item.address === address;
    });

    return {
      isLoading: false,
      data,
    };
  }, [query.isLoading]);
};

export default useAirdrop;
