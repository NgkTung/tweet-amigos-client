import PropTypes from "prop-types";
import TweetListItem from "./TweetListItem";
import { Skeleton } from "@mui/material";

const TweetList = ({ tweets, isFetching }) => {
  // Render the tweets
  return (
    <div className="mb-20">
      {isFetching ? (
        <div>
          {[...Array(6)].map((_, index) => (
            <div className="border-b dark:bg-[#444]" key={index}>
              <div className="flex py-4 px-4 space-x-5">
                <div className="w-1/6">
                  <Skeleton
                    variant="circular"
                    width={55}
                    height={55}
                    animation="wave"
                  />
                </div>
                <div className="w-full">
                  <div className="mb-2">
                    <Skeleton
                      animation="wave"
                      width={index % 2 === 1 ? 250 : 200}
                      height={30}
                    />
                    <Skeleton animation="wave" width={150} height={20} />
                  </div>
                  <p>
                    {[...Array(index % 2 === 1 ? 3 : 2)].map((_, index) => (
                      <Skeleton
                        animation="wave"
                        height={20}
                        className="w-full"
                        key={index}
                      />
                    ))}
                  </p>
                  {index % 4 === 0 && (
                    <div className="w-full h-[300px] mt-5">
                      <Skeleton
                        variant="rectangular"
                        className="w-full"
                        animation="wave"
                        height={300}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        tweets.map((tweet) => (
          <div key={tweet.id}>
            <TweetListItem tweet={tweet} />
          </div>
        ))
      )}
    </div>
  );
};

TweetList.propTypes = {
  tweets: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default TweetList;
