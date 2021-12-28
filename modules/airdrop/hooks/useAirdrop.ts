import { useMemo } from "react";
import { useQuery } from "react-query";

export const useAirdrop = (address: string | undefined) => {
  const query = useQuery(["airdrop", 1], async () => {
    const res = await fetch("/airdrop/airdrop.json");
    return res.json();
  });

  const query2 = useQuery(["airdrop", 2], async () => {
    const res = await fetch("/airdrop/airdrop2.json");
    return res.json();
  });

  const query3 = useQuery(["airdrop", 3], async () => {
    const res = await fetch("/airdrop/airdrop3.json");
    return res.json();
  });

  return useMemo(() => {
    if (query.isLoading || query2.isLoading || query3.isLoading) {
      return {
        isLoading: true,
        data: null,
      };
    }

    const data = [...query.data, ...query2.data, ...query3.data].find(
      (item) => {
        return item.address === address;
      }
    );

    return {
      isLoading: false,
      data,
    };
  }, [query.isLoading, query2.isLoading, query3.isLoading]);
};

export default useAirdrop;
