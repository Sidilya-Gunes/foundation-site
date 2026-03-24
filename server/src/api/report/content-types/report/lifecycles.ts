const slugify = (text: string): string => {
  const trMap: Record<string, string> = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u',
  };
  
  return text
    .replace(/[çğıöşüÇĞİÖŞÜ]/g, match => trMap[match])
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export default {
  beforeCreate(event: any) {
    const { data } = event.params;
    if (data.title && !data.slug) {
      data.slug = slugify(data.title);
    }
  },

  beforeUpdate(event: any) {
    const { data } = event.params;
    if (data.title && !data.slug) {
      data.slug = slugify(data.title);
    }
  },
};
