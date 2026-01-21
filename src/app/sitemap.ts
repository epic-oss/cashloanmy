export default function sitemap() {
  const baseUrl = 'https://refinancehomeloanmy.com';
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
    {
      url: `${baseUrl}/cash-out-calculator`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Bahasa Malaysia pages
    {
      url: `${baseUrl}/bank-terbaik-refinance-rumah`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kelebihan-keburukan-refinance-rumah`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contoh-kiraan-refinance-rumah`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dokumen-refinance-rumah`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/berapa-tahun-boleh-refinance-rumah`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // English pages
    {
      url: `${baseUrl}/en/best-refinance-banks`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/pros-cons-refinancing`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/refinance-calculation-examples`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/documents-required`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/when-to-refinance`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Chinese pages
    {
      url: `${baseUrl}/cn/shenme-shi-refinance`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cn/refinance-haochu-huaichu`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cn/refinance-xuyao-ziliao`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cn/duojiu-keyi-refinance`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cn/zuijia-refinance-yinhang`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Cash out refinance
    {
      url: `${baseUrl}/cash-out-refinance-malaysia`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Debt consolidation
    {
      url: `${baseUrl}/debt-consolidation-malaysia`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Bank-specific pages
    {
      url: `${baseUrl}/maybank-refinance-home-loan`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cimb-refinance-home-loan`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/public-bank-refinance-home-loan`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rhb-refinance-home-loan`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hong-leong-refinance-home-loan`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ambank-refinance-home-loan`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
