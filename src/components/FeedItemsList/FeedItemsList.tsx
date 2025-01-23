import React, { useEffect, useRef, useState } from "react";
import "./FeedItemsList.scss";
import { FeedItemType } from "../../types/FeedItemType";
import FeedItem from "../FeedItem/FeedItem";
import InfinitieScroll from "react-infinite-scroll-component";
const FeedItemsList = () => {
  const [feed, setFeed] = useState<FeedItemType[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const feedItemsPerPage = 6;
  const viewedList = useRef<Set<string>>(new Set());
  const observer = useRef<IntersectionObserver | null>(null);
  const fetchFeed = async () => {
    try {
      const response = await fetch(
        `https://backend.tedooo.com/hw/feed.json?skip=${skip}`
      );
      const data = await response.json();

      if (!data.hasMore) {
        setHasMore(false);
      }
      const updatedFeed = [...feed, ...data.data];
      setFeed(updatedFeed);
      const updatedSkip = skip + feedItemsPerPage;
      setSkip(updatedSkip);
    } catch (error) {
      console.error("faild to fetch data");
    }
  };

  const sendImpression = async (id: string) => {
    if (!viewedList.current.has(id)) {
      viewedList.current.add(id);
      try {
        const response = await fetch(
          `https://backend.tedooo.com/?itemId=${id}`
        );
      } catch (error) {
        console.error("impression failed for id", id, error);
      }
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const listItems = document.querySelectorAll(".feed-wrapper li");
      listItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemHeight = rect.bottom - rect.top;
        const visibleHeight =
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        if (visibleHeight / itemHeight >= 0.7) {
          const id = item.getAttribute("feed-item-id");
          if (id) {
            sendImpression(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [feed]);

  const loader = <div className="loader">Loading</div>;

  return (
    <InfinitieScroll
      loader={loader}
      hasMore={hasMore}
      next={fetchFeed}
      dataLength={feed.length}
      className="feed-wrapper"
    >
      <ul aria-label="feed items">
        {feed.map((feedItem, index) => {
          return (
            <li key={index} feed-item-id={feedItem.id}>
              <FeedItem feedItem={feedItem} />
            </li>
          );
        })}
      </ul>
    </InfinitieScroll>
  );
};

export default FeedItemsList;
