import React, { useEffect, useState } from "react";
import "./FeedItem.scss";
import { FeedItemType } from "../../types/FeedItemType";
import classNames from "classnames";
import { ReactComponent as LikeIc } from "../../assets/thumbs-up.svg";
import { ReactComponent as LikeGreenIc } from "../../assets/like.svg";
import { ReactComponent as CommentIc } from "../../assets/comment-ic.svg";
import { getFeedItemTime } from "../../utils/FeedUtils";

interface FeedItemProps {
  feedItem: FeedItemType;
}

const FeedItem: React.FC<FeedItemProps> = ({ feedItem }) => {
  const feedItemTime = getFeedItemTime(feedItem.date);
  const [isLiked, setIsLiked] = useState(feedItem.didLike);
  const [likes, setLikes] = useState(feedItem.likes);
  const likeBtnClasses = classNames("btn", {
    liked: isLiked,
  });
  const imageWrapperClasses = classNames("image-wrapper", {
    multi: feedItem.images.length > 1,
  });

  const handleLikeToggle = async () => {
    if (!isLiked) {
      setLikes((prev) => prev + 1);
    } else {
      setLikes((prev) => prev - 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="FeedItem">
      <div className="post-header">
        <img className="avatar" src={feedItem.avatar} />
        <div className="user-details">
          <span>{feedItem.username}</span>
          <span>
            {feedItem.shopName}
            {feedItem.shopName && { feedItemTime } && <span> · </span>}
            <span>{feedItemTime}</span>
          </span>
        </div>
      </div>
      <span className="text">{feedItem.text}</span>
      {feedItem.images.length > 0 && (
        <div className={imageWrapperClasses}>
          {feedItem.images.slice(0, 2).map((imageSrc,index) => {
            return <img src={imageSrc} key={index} alt={`image-post-${index}`}/>;
          })}
        </div>
      )}

      <div className="action-btns-details">
        <div>
          <LikeGreenIc />
          <span>{likes} likes</span>
        </div>
        <div>
          <span>{feedItem.comments} comments</span>
        </div>
      </div>
      <div className="action-btns">
        <button className={likeBtnClasses} onClick={handleLikeToggle} aria-label="like button">
          <LikeIc />
          <span>Like</span>
        </button>
        <button aria-label="comment button">
          <CommentIc />
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
};

export default FeedItem;
