import { useState, useEffect } from "react";
import { TNS } from "@tns-money/tns.js";

const tns = new TNS();

/**
 * Get TNS name for a given wallet address
 * @param address TNS address
 */
const useTNS = (address?: string): string | null => {
  const [name, setName] = useState(null);

  useEffect(() => {
    if (!address) {
      return;
    }

    async function fetchTNSName(address: string) {
      const name = await tns.getName(address);
      setName(name);
    }

    fetchTNSName(address);
  }, [address]);

  return name;
};

export default useTNS;
