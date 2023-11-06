# 모달 사용법

1.  Button.tsx
    CardModal.tsx
    modal.css
    Modal.tsx
    ModalBase.tsx

파일 묶음 이동

2.  Modal.tsx 에서 원하는 출력 상태 저장

3.  임포트할 컴포넌트에서

`return ( Modal sendActive={isModalActive} /> )`

의 형태로 인서트후

`const [isModalActive, setisModalActive] = useState(false);`

상태를 세팅후 원하는 상황시

`setisModalActive(true);`

를 해주면 된다
