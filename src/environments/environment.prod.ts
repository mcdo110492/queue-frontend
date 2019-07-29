const url: string = "192.168.1.75:8000";

export const environment = {
  production: false,
  ftp: `http://${url}/storage`,
  baseApi: `http://${url}/api`,
  pusher: {
    key: "f630319ba09a2fc10e69",
    cluster: "mt1",
    authEndpoint: `http://${url}/broadcasting/auth`
  }
};
