import { useState, useEffect } from "react";
import { TNS } from "@tns-money/tns.js";

const tns = new TNS();

/**
 * Get TNS name for a given wallet address
 * @param address TNS address
 */
const useTNS = (address?: string) => {
  const [name, setName] = useState(null);

  useEffect(() => {
    async function fetchTNSName() {
      const name = await tns.getName(address);
      setName(name);
    }

    if (address != null) {
      fetchTNSName();
    }
  }, [address]);

  return name;
};

export default useTNS;
