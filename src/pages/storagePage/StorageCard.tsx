import "./storage.css";

interface StorageCardProps {
  id: string;
  year: number;
  month: number;
  imgSrc: string;
  letterNum: number;
}

const StorageCard: React.FC<StorageCardProps> = ({
  id,
  year,
  month,
  imgSrc,
  letterNum,
}) => {
  return (
    <div
      className="box"
      onClick={() => {
        document.location.href = `${id}/${year}/${month}`;
      }}
    >
      <div className="imgBox">
        <img src={imgSrc} alt="" />
        <h2>{month}월</h2>
      </div>
      <div className="content">
        <span>
          {letterNum}개의
          <br />
          편지가
          <br />
          있어요!
        </span>
      </div>
    </div>
  );
};

export default StorageCard;
