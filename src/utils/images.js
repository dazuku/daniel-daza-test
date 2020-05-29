const avatarEndpoint = 'https://ui-avatars.com/api/';
const gifEndpoint = 'https://api.giphy.com/v1/gifs/';

const toDtoGif = (raw) => ({
  url: raw.image_url,
  alt: raw.caption || raw.title,
});

export const avatarUrlByUsername = (username) => `${avatarEndpoint}?background=eeeeee&color=0f0f0f&name=${username.replace(/\s/g, '+')}`;
export const getGifByTag = async (tag) => {
  const response = await fetch(`${gifEndpoint}random?api_key=cHuezmxGygeqPfQ63lAvzDrcMIY6fgXt&tag=${tag}&rating=G`);
  const { data } = await response.json();

  return toDtoGif(data);
};
