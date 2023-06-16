import styled from "@emotion/styled";

const Notice = () => {
  return (
    <Container>
      <h3>📢 안내 사항</h3>
      <div>
        <div>
          <p className="title">🎨 편지지 선택</p>
          <p>원하는 편지지를 클릭해서 편지지 스타일을 지정해주세요.</p>
        </div>
        <div>
          <p className="title">📝 편지 내용</p>
          <p>텍스트 에디터를 통해 편지지를 꾸며주세요.</p>
        </div>
        <div>
          <p className="title">💕 보내는이</p>
          <p>
            이름, 별명 자유롭게 작성하여 편지를 받는이에게 본임임을 알려주세요.
          </p>
        </div>
        <div>
          <p className="title">📅 날짜</p>
          <p>
            날짜를 지정하여 해당 날짜에 편지를 볼 수 있도록 날짜를 지정해주세요.{" "}
            생일편지를 미리 보낼 수도 있고, 10년뒤 타임캡슐 편지도 가능하겠죠?
          </p>
        </div>
        <div>
          <p className="title">💌 편지보내기 클릭</p>
          <p>마음을 담은 편지를 편지보내기 버튼을 클릭하여 보내기 완료!</p>
        </div>
      </div>
    </Container>
  );
};

export default Notice;

const Container = styled.div`
  margin-top: 20px;
  h3 {
    margin-bottom: 10px;
    text-align: center;
  }
  div {
    margin-top: 20px;
  }
  p {
    margin-top: 5px;
  }
  .title {
    color: #93ba7b;
    font-weight: 900;
    animation: shake 0.5s ease-in-out infinite;

  @keyframes shake {
    from {
      transform: rotate(0.5deg);
    }
    to {
      transform: rotate(0deg);
  }
  
}
`;
