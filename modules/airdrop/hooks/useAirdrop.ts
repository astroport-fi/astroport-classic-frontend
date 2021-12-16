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

  // TODO: change to api call
  if (query.isLoading) {
    return {
      isLoading: true,
      data: null,
    };
  }

  const data = [...query.data].find((item) => {
    return item.address === address;
  });

  // useEffect(() => {
  //   if (data != null) {
  //   }
  // }, [data]);

  return {
    isLoading: false,
    data,
  };
};

export default useAirdrop;
