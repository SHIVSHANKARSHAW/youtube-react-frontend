import React, { useState, useEffect } from "react";
import "./Playvideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";

const Playvideo = ({ videoId }) => {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  };

  const fetchChannelData = async () => {
    const channelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelDetails_url)
      .then((res) => res.json())
      .then((data) => setChannelData(data.items[0]));
  };

  const fetchCommentData = async () => {
    const commentDetails_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=60&videoId=${videoId}&key=${API_KEY}`;
    await fetch(commentDetails_url)
      .then((res) => res.json())
      .then((data) => setCommentData(data.items));
  };

  useEffect(() => {
    fetchVideoData();
  }, []);

  useEffect(() => {
    fetchChannelData();
    fetchCommentData();
  }, [apiData]);

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted></video> */}

      <iframe
        height={550}
        width={960}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : "Error In Fetching Title"}</h3>
      <div className="play-video-info">
        <p>
          {apiData
            ? value_converter(apiData.statistics.viewCount)
            : "Error 6969"}{" "}
          views &bull;{" "}
          {apiData
            ? moment(apiData.snippet.publishedAt).fromNow()
            : "Error 6969"}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData
              ? value_converter(apiData.statistics.likeCount)
              : "Error 6969"}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={
            channelData
              ? channelData.snippet.thumbnails.default.url
              : "Error 6969"
          }
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "Error 6969"}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : "Error 6969"}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData ? apiData.snippet.description : "Error 6969"}</p>
        <hr />
        <h4>
          {apiData
            ? value_converter(apiData.statistics.commentCount)
            : "Error 6969"}
          comments
        </h4>
        {commentData.map((item, index) => {
          return (
            <div className="comments" key={index}>
              <img
                src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt=""
              />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}
                  <span>1 day ago</span>
                </h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playvideo;