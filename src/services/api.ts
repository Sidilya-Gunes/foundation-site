
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1337/api';

export const getArticles = async (query?: string) => {
  try {
    let url = `${API_URL}/articles?populate=*`;
    if (query) {
      url += `&filters[$or][0][title][$contains]=${query}&filters[$or][1][content][$contains]=${query}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export const getReports = async (query?: string) => {
  try {
    let url = `${API_URL}/reports?populate=*`;
    if (query) {
      url += `&filters[$or][0][title][$contains]=${query}&filters[$or][1][description][$contains]=${query}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    return [];
  }
};

export const getArticleBySlug = async (slug: string) => {
  try {
    const response = await fetch(`${API_URL}/articles?filters[slug][$eq]=${slug}&populate=*`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.data && data.data.length > 0) {
      return data.data[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
};

export const searchContent = async (query: string) => {
  const [articles, reports] = await Promise.all([
    getArticles(query),
    getReports(query)
  ]);
  
  return [
    ...articles.map((a: any) => ({ ...a, type: 'article' })), 
    ...reports.map((r: any) => ({ ...r, type: 'report' }))
  ];
};

export const sendMessage = async (messageData: { name: string; email: string; subject: string; body: string }) => {
  try {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: messageData }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Mesaj gönderilemedi.');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
