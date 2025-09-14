import videoTestData from "../data/videos.json";
const fetchVideos = async (url: string) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  
  const BASE_URL = "https://youtube.googleapis.com/youtube/v3";
  const response = await fetch(`${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`);

  return await response.json();

};
export  const  getCommonVideos =  async (url: string) => {

  try { 
    const isDev = process.env.DEVELOPMENT;
    const data = isDev ? videoTestData : await fetchVideos(url);
    if (data?.error) {
      console.log("YouTube API Error", data.error);

      return [];
    }
    return data?.items.map((item: any) => {
      return {
        title: item?.snippet.title,
        description: item?.snippet.description,
        videoId: item?.id.videoId??item.id,
        imgUrl: item?.snippet.thumbnails.high.url,
        publishedAt: item?.snippet.publishedAt,
        channelTitle: item?.snippet.channelTitle,
        statistics: item?.snippet?.statistics ? item.snippet.statistics
          : {
            viewCount: 0
          },
      };
    });
  }
  catch(error) {
    console.log("🚀 ~ getVideos ~ error:", error);
    return [];
  }
};

export const getVideos = (searchQuery: string) => {
  const URL = `search?part=snippet&maxResults=25&q=${searchQuery}&type=video`;

  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL = "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=EG";
  return getCommonVideos(URL);
};

export const getYoutubeVideoById = (id: string) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`;
  return getCommonVideos(URL);
};
