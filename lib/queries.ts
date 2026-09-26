export const homepageQuery = `*[_type == "homePage"][0]{
  heroHeading,
  heroDescription,
  introductionHeading,
  approachHeading,
  servicesHeading
}`;

export const servicesQuery = `*[_type == "service"]{
  _id,
  heading,
  description
}`;