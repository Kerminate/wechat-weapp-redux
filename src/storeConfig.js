let storeConfig = {
  name: 'store'
};

const customStoreConfig = {
  set(key, value) {
    storeConfig[key] = value;
  },
  get(key) {
    return storeConfig[key];
  }
}

export default customStoreConfig;