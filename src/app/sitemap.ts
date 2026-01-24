export default function sitemap() {
  const baseUrl = 'https://cashloanmy.com';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}
