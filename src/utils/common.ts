export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

export const pixel = (v: number) => (!isNaN(v) ? v + 'px' : v || '');
