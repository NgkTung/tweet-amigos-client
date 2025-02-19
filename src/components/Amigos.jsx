import AmigosListItem from "./AmigosListItem";
import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const Amigos = ({ data, isFetching, followBtn = false }) => {
  return (
    <div>
      {isFetching ? (
        <div>
          {[...Array(6)].map((__, index) => (
            <div
              key={index}
              className="flex items-center space-x-5 p-4 border-b dark:bg-[#444]"
            >
              <Skeleton
                variant="circular"
                animation="wave"
                width={55}
                height={55}
              />
              <div>
                <Skeleton
                  width={index % 2 === 1 ? 200 : 250}
                  height={30}
                  animation="wave"
                />
                <Skeleton width={150} height={20} animation="wave" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {data.length === 0 ? (
            <></>
          ) : (
            <>
              {data.map((user) => (
                <AmigosListItem
                  key={user.id}
                  user={user}
                  followBtn={followBtn}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

Amigos.propTypes = {
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  followBtn: PropTypes.bool,
};

export default Amigos;
