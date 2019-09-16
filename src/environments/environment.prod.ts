<<<<<<< HEAD
const url: string = "10.0.4.89:8080";
=======
const url: string = "192.168.137.243:8080";
>>>>>>> 6115ea88986270af0ad488e9a38aa1e5d32bd995

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
