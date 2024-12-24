import React, { useEffect, useState } from "react";
import "./Recommended.css";
import { API_KEY, value_converter } from "../../data";

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const related_vid = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(related_vid)
      .then((res) => res.json())
      .then((data) => setApiData(data.items));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="recommended">
      {apiData.map((item, index) => {
        return (
          <div className="side-video-list" key={index}>
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <div>
                <p>{item.snippet.channelTitle}</p>
                <p>{value_converter(item.statistics.viewCount)} Views</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Recommended;
