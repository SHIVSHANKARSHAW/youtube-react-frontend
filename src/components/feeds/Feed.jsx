import React, { useEffect, useState } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import { API_KEY,value_converter} from "../../data";
import moment from "moment";
const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
    await fetch(video_url)
      .then((response) => response.json())
      .then((data) => setData(data.items));
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.map((items, index) => {
        return (
          <Link to={`video/${items.snippet.categoryId}/${items.id}`} className="card" key={index}>
            <img src={items.snippet.thumbnails.medium.url} alt="" />
            <h2>{items.snippet.title}</h2>
            <h3>{items.snippet.channelTitle}</h3>
            <p>{value_converter(items.statistics.viewCount)} views &bull; {moment(items.snippet.publishedAt).fromNow()}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;
