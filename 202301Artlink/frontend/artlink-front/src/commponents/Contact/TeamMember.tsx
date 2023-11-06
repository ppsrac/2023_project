import Styles from "./Team.module.css";
import src1 from "../../assets/member1.png";
import src2 from "../../assets/member2.png";
import src3 from "../../assets/member3.png";
import src4 from "../../assets/member4.png";
import src5 from "../../assets/member5.png";
import src6 from "../../assets/member6.png";

interface MarginTopInputProps {
  pk: number;
}
interface MemberInfo {
  [key: number]: {
    name: string;
    role: string;
    comment: string;
    src: string;
  };
}
const memberInfo: MemberInfo = {
  1: {
    name: "김수현",
    role: "<장고, 스프링 서버 개발>",
    comment: "납작 복숭아 아이스티를 좋아합니다.",
    src: src1,
  },
  2: {
    name: "김진현",
    role: "<스프링 서버 개발>",
    comment: "삼성전자 MX 사업부 취업 성공",
    src: src2,
  },
  3: {
    name: "박건희 / Team Leader",
    role: "<임베디드 Iot 개발>",
    comment: "팀장은 제 적성인 것 같습니다.",
    src: src3,
  },
  4: {
    name: "배정원",
    role: "<웹 프론트 및 키오스크 개발>",
    comment: "스스로 무엇을 할 지 아는 사람이 되겠다.",
    src: src4,
  },
  5: {
    name: "조재웅",
    role: "<기획 총괄 및 임베디드 Iot 개발/ Docker 관리>",
    comment: "역삼 is my Home",
    src: src5,
  },
  6: {
    name: "조준하",
    role: "<웹 프론트 개발 및 디자인 담당>",
    comment: "부족하지만 빠르게 배우고 정확하게 작업하겠습니다.",
    src: src6,
  },
};

const TeamMember: React.FC<MarginTopInputProps> = ({ pk }) => {
  return (
    <>
      <img src={memberInfo[pk].src} alt="" className={Styles.teamImg} />
      <div className={Styles.infoName}>{memberInfo[pk].name}</div>
      <div className={Styles.infoRole}>{memberInfo[pk].role}</div>
      <div className={Styles.infoComment}>{memberInfo[pk].comment}</div>
    </>
  );
};

export default TeamMember;
