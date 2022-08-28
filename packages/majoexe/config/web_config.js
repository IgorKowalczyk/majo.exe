module.exports = {
 api: {
  show_endpoints_list: false, // Display endpoints after successfull load
 },
 dashboard: {
  privacy_policy_page: true, // Enable privacy policy page
  terms_of_service_page: true, // Enable TOS page
  google_analitics: process.env.ANALYTICS, // Google Analytics ID
  arc_token: "oFnnmBwr", // Arc.io token
  status_page: {
   no_embed: false, // Display only link to external status page
   embed: "https://wl.hetrixtools.com/r/b327a38f4c3d4cdb1068dfe61e1b2144/", // External status page link
  },
 },
 web: {
  secure_connection: true, // Redirect from http to https
  google_verification: "-wuCsk4qLolXEPSUTGX7YBxywcyNNf5HS2ClzgEWxNY", // Google site verification token
  domain: process.env.DOMAIN,
 },
};
