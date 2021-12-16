import { useMemo } from "react";

import { Route } from "modules/common";

type Params = {
  routes: Route[] | null;
  from: string | null;
  to: string | null;
};

export const useSwapRoute = ({ routes, from, to }: Params): Route[] | null => {
  return useMemo(() => {
    let result: Route[] = [];
    let done = false;
    const path: {
      [key: string]: Route[];
    } = {};

    if (routes == null || from == null || to == null) {
      return null;
    }

    function traverse(route: Route, key: string): void {
      route.children.forEach((child) => {
        if (!done) {
          if (child.to === to) {
            //if we found our target push it to the path
            path[key].push(child);
            //set result to the completed path
            result = path[key];
            //set done to true to exit the search
            done = true;
          } else {
            path[key].push(child);

            return traverse(child, key);
          }
        }
      });
      //if we leave our for loop but we are not done that means we failed to find our target
      //in this branch, as a result we need to pop each node out of our path before we return
      if (!done) {
        path[key].pop();
      }
    }

    //set an array of the root nodes of our product tree. These are super-categories that are
    //not saved in the item schema, possibly representing types of items, i.e. different schemas.
    const filteredRoutes = routes.filter((route) => {
      return route.from === from;
    });

    filteredRoutes.forEach((child) => {
      path[child.to] = [child];

      if (child.to === to) {
        //set result to the completed path
        result = path[child.to];
        //set done to true to exit the search
        done = true;

        return;
      }

      traverse(child, child.to);
    });

    console.log("1");
    console.log("from", from);
    console.log("to", to);

    return result;
  }, [routes, from, to]);
};

export default useSwapRoute;
