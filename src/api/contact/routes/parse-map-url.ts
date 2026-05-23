export default {
  routes: [
    {
      method: "POST",
      path: "/contact/parse-map-url",
      handler: "contact.parseMapUrl",
      config: {
        auth: false,
      },
    },
  ],
};
