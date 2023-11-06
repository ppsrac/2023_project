import BackBtn from "../../commponents/Base/BackBtn";
import "./Policy.css";

function Policy() {
  return (
    <>
      <BackBtn />
      <div className="P_container_outer">
        <div className="P_container">
          <div>
            <div className="P_title">개인정보 처리방침</div>
            <div className="P_title_info">
              본 개인정보 처리방침은 귀하의 개인정보를 수집, 사용, 관리,
              보호하는 방법을 설명합니다. 귀하의 개인정보를 보호하기 위해 최선을
              다하겠습니다. 이 개인정보 처리방침은 귀하의 서비스 이용과 관련하여
              정보를 수집하는 경우 적용됩니다. 아래에서는 수집되는 정보, 정보의
              사용 방법, 보호 및 관리 방법 등을 설명하고 있습니다.
            </div>
          </div>
          <div className="P_inBox">
            <div className="P_subtitle">수집하는 정보</div>
            <div>
              <div className="P_outertxt">
                사용자가 서비스를 이용하는 동안, 서비스 관련 정보를 제공하거나
                등록할 때, 다음과 같은 정보가 수집될 수 있습니다:
              </div>
              <div className="P_innertxt">
                개인정보: 이름, 이메일 주소, 전화번호 등
              </div>
              <div className="P_innertxt">
                기기 정보: 사용한 기기의 정보, IP 주소, 브라우징 정보 등
              </div>
              <div className="P_innertxt">
                기록 정보: 사용자가 등록한 전시회 및 작품에 대한 기록 및 데이터
              </div>
            </div>
          </div>
          <div className="P_inBox">
            <div className="P_subtitle">정보의 사용</div>
            <div>
              <div className="P_outertxt">
                수집한 정보는 다음과 같은 목적으로 사용될 수 있습니다
              </div>
              <div className="P_innertxt">
                서비스 제공: 사용자의 기기를 통해 등록된 작품 및 기록을 조회하고
                관리하는 서비스 제공
              </div>
              <div className="P_innertxt">
                고객 지원: 문의나 요청에 대한 응답 및 지원 제공
              </div>
              <div className="P_innertxt">
                서비스 개선: 서비스의 품질 향상을 위한 통계 및 분석 활용
              </div>
              <div className="P_innertxt">
                마케팅: 사용자에게 관련된 정보와 프로모션 소식 전달
              </div>
            </div>
          </div>
          <div className="P_inBox">
            <div className="P_subtitle">정보의 보호</div>
            <div>
              <div className="P_outertxt">
                귀하의 개인정보는 관련 법규와 산업 표준을 준수하여 보호됩니다.
              </div>
              <div className="P_innertxt">
                데이터 보안 조치: 귀하의 개인정보를 보호하기 위해 적절한 보안
                조치를 취하며, 데이터 액세스 제어 및 암호화 등을 포함합니다.
              </div>
              <div className="P_innertxt">
                제3자 제공: 귀하의 개인정보는 법적인 의무가 없는 한 제3자와
                공유되지 않습니다. 다만, 귀하의 동의를 받거나 법적 규정에 따라
                제3자와 공유될 수 있습니다.
              </div>
            </div>
          </div>
          <div className="P_inBox">
            <div className="P_subtitle">개인정보 관리</div>
            <div>
              <div className="P_innertxt">
                열람 및 수정: 귀하는 등록된 개인정보를 열람하고 수정할 수
                있습니다.
              </div>
              <div className="P_innertxt">
                삭제: 귀하의 요청에 따라 등록된 개인정보를 삭제할 수 있습니다.
                단, 삭제 시 서비스 이용에 필요한 정보가 손실될 수 있습니다.
              </div>
              <div className="P_innertxt">
                선택권: 귀하는 마케팅 관련 정보를 수신하지 않도록 선택할 수
                있습니다.
              </div>
            </div>
          </div>
          <div className="P_inBox">
            <div className="P_subtitle">쿠키 및 추적 기술</div>
            <div>
              <div className="P_innertxt">
                쿠키 사용: 쿠키는 사용자 경험을 향상시키고 서비스를 개선하기
                위해 사용될 수 있습니다.
              </div>
              <div className="P_innertxt">
                거부 옵션: 사용자는 쿠키 사용에 동의하지 않을 수 있습니다. 다만,
                쿠키를 거부할 경우 일부 서비스 기능을 이용할 수 없을 수
                있습니다.
              </div>
            </div>
          </div>
          <div className="P_inBox">
            <div className="P_subtitle">변경된 개인정보 처리방침</div>
            <div className="P_outertxt">
              개인정보 처리방침은 변경될 수 있으며, 변경 사항은 웹사이트를 통해
              알릴 것입니다.
            </div>
          </div>
          <div className="P_inBox">
            <div className="P_subtitle">문의</div>
            <div>
              <div className="P_outertxt">
                개인정보 처리방침에 대한 질문이나 요청 사항은 아래 연락처로
                문의하십시오:
              </div>
              <div className="P_innertxt">
                <div>[연락처 정보]</div>
                <div>CS Team : geon4415@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Policy;
