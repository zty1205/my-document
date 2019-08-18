import directive from "./directive";
import keepAlive from "./keep-alive";
import transition from "./transition";
import isComponents from "./isComponts";
import store from "./store";

export default [
  ...directive,
  ...keepAlive,
  ...transition,
  ...isComponents,
  ...store
];
