const url: string = "10.0.4.89:8080";

export const environment = {
  production: false,
  ftp: `http://${url}/storage`,
  baseApi: `http://${url}/api`,
  pusher: {
    key: "lsa9zdrrfh",
    cluster: "mt1",
    authEndpoint: `http://${url}/broadcasting/auth`
  }
};
