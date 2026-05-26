import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thebharatmirror.com";

  const staticRoutes = [
    "",
    "/calculators",
    "/calculators/pm-surya-ghar-subsidy-calculator",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" || route === "/calculators" ? 1 : 0.8,
  }));

  return staticRoutes;
}
