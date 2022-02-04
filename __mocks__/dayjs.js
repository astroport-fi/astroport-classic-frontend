// This mocks the dayjs plugin with the original extended with the UTC plugin
// Simply importing dayjs isn't enough in node envs (i.e. jest)
// More info: https://github.com/iamkun/dayjs/issues/593#issuecomment-757341124

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);

export default dayjs;
