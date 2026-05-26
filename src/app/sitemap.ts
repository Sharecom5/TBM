import { MetadataRoute } from "next";
import { getAllArticleSlugs } from "@/lib/markdown";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thebharatmirror.com";

  const staticRoutes = [
    "",
    "/tools",
    "/tools/green-energy/pm-surya-ghar-calculator",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/articles",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" || route === "/tools" ? 1 : 0.8,
  }));

  const articleSlugs = getAllArticleSlugs();
  const articleRoutes = articleSlugs.map((slugObj) => ({
    url: `${baseUrl}/articles/${slugObj.params.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
