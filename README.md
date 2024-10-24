[ advanced/components/templates/AlertPopUp.tsx ] 

  alert()이 아니라 실제 서비스라면 팝업 컴포넌트를 만들어야 할 것 같아서
  따로 컴포넌트로 분리했다.

[ advanced/hooks/interval/useLightningDiscount.ts ]

  AlertPopUp 컴포넌트에서 쓰는 인터벌 hook

[ advanced/utils/intervalManger.ts ]

  interval 관리 유틸 Map에 등록하고 해제하는 과정

문제: 

useLightningDiscount 훅에서 lightningInterval 함수를 반환해준다.

AlertPopUp 컴포넌트에서 lightningInterval함수 호출해 인터벌 등록을 한다.

이떄, useLightningDiscount 생성시에 redux의 productList를 가져와 항목의 할인가를 적용하는 로직이 있는데
클로저때문에 redux의 productList를 못가져오고 그 전에 가져온 값으로 할인 적용을 하기 때문에
중복 할인이 안된다. 

예를 들면, 이름: 제품 1 ,가격: 10,000원, 할인률: 0.1 인경우, 
특정 시간 후 가격 => 9000원
특정 시간 후 가격 => 8900원
특정 시간 후 가격 => 8100원
이런 식으로 특정 시간이 지난 후, 10%가격이 할인 되어야 하는데 

이전 데이터를 바라보기 때문에 아무리 시간이 지나도
특정 시간 후 가격 => 9000원
특정 시간 후 가격 => 9000원
특정 시간 후 가격 => 9000원

10,000원에서 0.1할인율을 적용한 값이 나온다.

해결

useLightningInterval훅 인자에 products와 dispatch를 넘겨준다.

useLightningInterval 에서 useRef로 products값을 받고
useEffect로 productList값이 바뀌면 useRef값을 업데이트해준다.

의존성 배열이 없는 useEffect에 interval 로직을 실행한다.

* useRef를 안쓰면 productList 업데이트가 되지 않고 useEffect의 의존성 배열에 넣으면 interval의 시간주기에 영향이 간다.
* 
