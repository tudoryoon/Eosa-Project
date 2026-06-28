/**
 * 대한민국 제22대 국회의원 현역 명부 데이터셋
 *
 * 기준일: 2026-06-05 국회 변동표 기준
 * 출처:
 * - 지역구 기본 당선자: 위키백과 지역별 제22대 국회의원 선거 결과표
 * - 비례대표 기본 당선자: 위키백과 제22대 국회의원 선거 비례대표 결과표
 * - 의원직 상실, 사퇴, 비례 승계, 재보궐, 당적 변동: 위키백과 제22대 대한민국 국회 변동표
 *
 * 의정 활동 세부자료는 app.js의 공식 출처 링크를 통해 원문 확인합니다.
 */

const assemblyMembers = [
  {
    "name": "권성동",
    "party": "국민의힘",
    "constituency": "강원 강릉시",
    "is_proportional": false,
    "id": 1
  },
  {
    "name": "이철규",
    "party": "국민의힘",
    "constituency": "강원 동해시·태백시·삼척시·정선군",
    "is_proportional": false,
    "id": 2
  },
  {
    "name": "이양수",
    "party": "국민의힘",
    "constituency": "강원 속초시·인제군·고성군·양양군",
    "is_proportional": false,
    "id": 3
  },
  {
    "name": "박정하",
    "party": "국민의힘",
    "constituency": "강원 원주시 갑",
    "is_proportional": false,
    "id": 4
  },
  {
    "name": "송기헌",
    "party": "더불어민주당",
    "constituency": "강원 원주시 을",
    "is_proportional": false,
    "id": 5
  },
  {
    "name": "허영",
    "party": "더불어민주당",
    "constituency": "강원 춘천시·철원군·화천군·양구군 갑",
    "is_proportional": false,
    "id": 6
  },
  {
    "name": "한기호",
    "party": "국민의힘",
    "constituency": "강원 춘천시·철원군·화천군·양구군 을",
    "is_proportional": false,
    "id": 7
  },
  {
    "name": "유상범",
    "party": "국민의힘",
    "constituency": "강원 홍천군·횡성군·영월군·평창군",
    "is_proportional": false,
    "id": 8
  },
  {
    "name": "김성회",
    "party": "더불어민주당",
    "constituency": "경기 고양시 갑",
    "is_proportional": false,
    "id": 9
  },
  {
    "name": "이기헌",
    "party": "더불어민주당",
    "constituency": "경기 고양시 병",
    "is_proportional": false,
    "id": 10
  },
  {
    "name": "한준호",
    "party": "더불어민주당",
    "constituency": "경기 고양시 을",
    "is_proportional": false,
    "id": 11
  },
  {
    "name": "김영환",
    "party": "더불어민주당",
    "constituency": "경기 고양시 정",
    "is_proportional": false,
    "id": 12
  },
  {
    "name": "임오경",
    "party": "더불어민주당",
    "constituency": "경기 광명시 갑",
    "is_proportional": false,
    "id": 13
  },
  {
    "name": "김남희",
    "party": "더불어민주당",
    "constituency": "경기 광명시 을",
    "is_proportional": false,
    "id": 14
  },
  {
    "name": "소병훈",
    "party": "더불어민주당",
    "constituency": "경기 광주시 갑",
    "is_proportional": false,
    "id": 15
  },
  {
    "name": "안태준",
    "party": "더불어민주당",
    "constituency": "경기 광주시 을",
    "is_proportional": false,
    "id": 16
  },
  {
    "name": "윤호중",
    "party": "더불어민주당",
    "constituency": "경기 구리시",
    "is_proportional": false,
    "id": 17
  },
  {
    "name": "이학영",
    "party": "더불어민주당",
    "constituency": "경기 군포시",
    "is_proportional": false,
    "id": 18
  },
  {
    "name": "김주영",
    "party": "더불어민주당",
    "constituency": "경기 김포시 갑",
    "is_proportional": false,
    "id": 19
  },
  {
    "name": "박상혁",
    "party": "더불어민주당",
    "constituency": "경기 김포시 을",
    "is_proportional": false,
    "id": 20
  },
  {
    "name": "최민희",
    "party": "더불어민주당",
    "constituency": "경기 남양주시 갑",
    "is_proportional": false,
    "id": 21
  },
  {
    "name": "김용민",
    "party": "더불어민주당",
    "constituency": "경기 남양주시 병",
    "is_proportional": false,
    "id": 22
  },
  {
    "name": "김병주",
    "party": "더불어민주당",
    "constituency": "경기 남양주시 을",
    "is_proportional": false,
    "id": 23
  },
  {
    "name": "정성호",
    "party": "더불어민주당",
    "constituency": "경기 동두천시·양주시·연천군 갑",
    "is_proportional": false,
    "id": 24
  },
  {
    "name": "김성원",
    "party": "국민의힘",
    "constituency": "경기 동두천시·양주시·연천군 을",
    "is_proportional": false,
    "id": 25
  },
  {
    "name": "서영석",
    "party": "더불어민주당",
    "constituency": "경기 부천시 갑",
    "is_proportional": false,
    "id": 26
  },
  {
    "name": "이건태",
    "party": "더불어민주당",
    "constituency": "경기 부천시 병",
    "is_proportional": false,
    "id": 27
  },
  {
    "name": "김기표",
    "party": "더불어민주당",
    "constituency": "경기 부천시 을",
    "is_proportional": false,
    "id": 28
  },
  {
    "name": "안철수",
    "party": "국민의힘",
    "constituency": "경기 성남시 분당구 갑",
    "is_proportional": false,
    "id": 29
  },
  {
    "name": "김은혜",
    "party": "국민의힘",
    "constituency": "경기 성남시 분당구 을",
    "is_proportional": false,
    "id": 30
  },
  {
    "name": "김태년",
    "party": "더불어민주당",
    "constituency": "경기 성남시 수정구",
    "is_proportional": false,
    "id": 31
  },
  {
    "name": "이수진",
    "party": "더불어민주당",
    "constituency": "경기 성남시 중원구",
    "is_proportional": false,
    "id": 32
  },
  {
    "name": "김승원",
    "party": "더불어민주당",
    "constituency": "경기 수원시 갑",
    "is_proportional": false,
    "id": 33
  },
  {
    "name": "염태영",
    "party": "더불어민주당",
    "constituency": "경기 수원시 무",
    "is_proportional": false,
    "id": 34
  },
  {
    "name": "김영진",
    "party": "더불어민주당",
    "constituency": "경기 수원시 병",
    "is_proportional": false,
    "id": 35
  },
  {
    "name": "백혜련",
    "party": "더불어민주당",
    "constituency": "경기 수원시 을",
    "is_proportional": false,
    "id": 36
  },
  {
    "name": "김준혁",
    "party": "더불어민주당",
    "constituency": "경기 수원시 정",
    "is_proportional": false,
    "id": 37
  },
  {
    "name": "문정복",
    "party": "더불어민주당",
    "constituency": "경기 시흥시 갑",
    "is_proportional": false,
    "id": 38
  },
  {
    "name": "조정식",
    "party": "무소속",
    "constituency": "경기 시흥시 을",
    "is_proportional": false,
    "id": 39
  },
  {
    "name": "김남국",
    "party": "더불어민주당",
    "constituency": "경기 안산시 갑",
    "is_proportional": false,
    "id": 40
  },
  {
    "name": "박해철",
    "party": "더불어민주당",
    "constituency": "경기 안산시 병",
    "is_proportional": false,
    "id": 41
  },
  {
    "name": "김현",
    "party": "더불어민주당",
    "constituency": "경기 안산시 을",
    "is_proportional": false,
    "id": 42
  },
  {
    "name": "윤종군",
    "party": "더불어민주당",
    "constituency": "경기 안성시",
    "is_proportional": false,
    "id": 43
  },
  {
    "name": "민병덕",
    "party": "더불어민주당",
    "constituency": "경기 안양시 동안구 갑",
    "is_proportional": false,
    "id": 44
  },
  {
    "name": "이재정",
    "party": "더불어민주당",
    "constituency": "경기 안양시 동안구 을",
    "is_proportional": false,
    "id": 45
  },
  {
    "name": "강득구",
    "party": "더불어민주당",
    "constituency": "경기 안양시 만안구",
    "is_proportional": false,
    "id": 46
  },
  {
    "name": "김선교",
    "party": "국민의힘",
    "constituency": "경기 여주시·양평군",
    "is_proportional": false,
    "id": 47
  },
  {
    "name": "차지호",
    "party": "더불어민주당",
    "constituency": "경기 오산시",
    "is_proportional": false,
    "id": 48
  },
  {
    "name": "이상식",
    "party": "더불어민주당",
    "constituency": "경기 용인시 갑",
    "is_proportional": false,
    "id": 49
  },
  {
    "name": "부승찬",
    "party": "더불어민주당",
    "constituency": "경기 용인시 병",
    "is_proportional": false,
    "id": 50
  },
  {
    "name": "손명수",
    "party": "더불어민주당",
    "constituency": "경기 용인시 을",
    "is_proportional": false,
    "id": 51
  },
  {
    "name": "이언주",
    "party": "더불어민주당",
    "constituency": "경기 용인시 정",
    "is_proportional": false,
    "id": 52
  },
  {
    "name": "이소영",
    "party": "더불어민주당",
    "constituency": "경기 의왕시·과천시",
    "is_proportional": false,
    "id": 53
  },
  {
    "name": "박지혜",
    "party": "더불어민주당",
    "constituency": "경기 의정부시 갑",
    "is_proportional": false,
    "id": 54
  },
  {
    "name": "이재강",
    "party": "더불어민주당",
    "constituency": "경기 의정부시 을",
    "is_proportional": false,
    "id": 55
  },
  {
    "name": "송석준",
    "party": "국민의힘",
    "constituency": "경기 이천시",
    "is_proportional": false,
    "id": 56
  },
  {
    "name": "윤후덕",
    "party": "더불어민주당",
    "constituency": "경기 파주시 갑",
    "is_proportional": false,
    "id": 57
  },
  {
    "name": "박정",
    "party": "더불어민주당",
    "constituency": "경기 파주시 을",
    "is_proportional": false,
    "id": 58
  },
  {
    "name": "홍기원",
    "party": "더불어민주당",
    "constituency": "경기 평택시 갑",
    "is_proportional": false,
    "id": 59
  },
  {
    "name": "김현정",
    "party": "더불어민주당",
    "constituency": "경기 평택시 병",
    "is_proportional": false,
    "id": 60
  },
  {
    "name": "유의동",
    "party": "국민의힘",
    "constituency": "경기 평택시 을",
    "is_proportional": false,
    "id": 61
  },
  {
    "name": "김용태",
    "party": "국민의힘",
    "constituency": "경기 포천시·가평군",
    "is_proportional": false,
    "id": 62
  },
  {
    "name": "이광재",
    "party": "더불어민주당",
    "constituency": "경기 하남시 갑",
    "is_proportional": false,
    "id": 63
  },
  {
    "name": "김용만",
    "party": "더불어민주당",
    "constituency": "경기 하남시 을",
    "is_proportional": false,
    "id": 64
  },
  {
    "name": "송옥주",
    "party": "더불어민주당",
    "constituency": "경기 화성시 갑",
    "is_proportional": false,
    "id": 65
  },
  {
    "name": "권칠승",
    "party": "더불어민주당",
    "constituency": "경기 화성시 병",
    "is_proportional": false,
    "id": 66
  },
  {
    "name": "이준석",
    "party": "개혁신당",
    "constituency": "경기 화성시 을",
    "is_proportional": false,
    "id": 67
  },
  {
    "name": "전용기",
    "party": "더불어민주당",
    "constituency": "경기 화성시 정",
    "is_proportional": false,
    "id": 68
  },
  {
    "name": "서일준",
    "party": "국민의힘",
    "constituency": "경남 거제시",
    "is_proportional": false,
    "id": 69
  },
  {
    "name": "민홍철",
    "party": "더불어민주당",
    "constituency": "경남 김해시 갑",
    "is_proportional": false,
    "id": 70
  },
  {
    "name": "김정호",
    "party": "더불어민주당",
    "constituency": "경남 김해시 을",
    "is_proportional": false,
    "id": 71
  },
  {
    "name": "박상웅",
    "party": "국민의힘",
    "constituency": "경남 밀양시·의령군·함안군·창녕군",
    "is_proportional": false,
    "id": 72
  },
  {
    "name": "서천호",
    "party": "국민의힘",
    "constituency": "경남 사천시·남해군·하동군",
    "is_proportional": false,
    "id": 73
  },
  {
    "name": "신성범",
    "party": "국민의힘",
    "constituency": "경남 산청군·함양군·거창군·합천군",
    "is_proportional": false,
    "id": 74
  },
  {
    "name": "윤영석",
    "party": "국민의힘",
    "constituency": "경남 양산시 갑",
    "is_proportional": false,
    "id": 75
  },
  {
    "name": "김태호",
    "party": "국민의힘",
    "constituency": "경남 양산시 을",
    "is_proportional": false,
    "id": 76
  },
  {
    "name": "박대출",
    "party": "국민의힘",
    "constituency": "경남 진주시 갑",
    "is_proportional": false,
    "id": 77
  },
  {
    "name": "강민국",
    "party": "국민의힘",
    "constituency": "경남 진주시 을",
    "is_proportional": false,
    "id": 78
  },
  {
    "name": "최형두",
    "party": "국민의힘",
    "constituency": "경남 창원시 마산합포구",
    "is_proportional": false,
    "id": 79
  },
  {
    "name": "윤한홍",
    "party": "국민의힘",
    "constituency": "경남 창원시 마산회원구",
    "is_proportional": false,
    "id": 80
  },
  {
    "name": "허성무",
    "party": "더불어민주당",
    "constituency": "경남 창원시 성산구",
    "is_proportional": false,
    "id": 81
  },
  {
    "name": "김종양",
    "party": "국민의힘",
    "constituency": "경남 창원시 의창구",
    "is_proportional": false,
    "id": 82
  },
  {
    "name": "이종욱",
    "party": "국민의힘",
    "constituency": "경남 창원시 진해구",
    "is_proportional": false,
    "id": 83
  },
  {
    "name": "정점식",
    "party": "국민의힘",
    "constituency": "경남 통영시·고성군",
    "is_proportional": false,
    "id": 84
  },
  {
    "name": "조지연",
    "party": "국민의힘",
    "constituency": "경북 경산시",
    "is_proportional": false,
    "id": 85
  },
  {
    "name": "김석기",
    "party": "국민의힘",
    "constituency": "경북 경주시",
    "is_proportional": false,
    "id": 86
  },
  {
    "name": "정희용",
    "party": "국민의힘",
    "constituency": "경북 고령군·성주군·칠곡군",
    "is_proportional": false,
    "id": 87
  },
  {
    "name": "구자근",
    "party": "국민의힘",
    "constituency": "경북 구미시 갑",
    "is_proportional": false,
    "id": 88
  },
  {
    "name": "강명구",
    "party": "국민의힘",
    "constituency": "경북 구미시 을",
    "is_proportional": false,
    "id": 89
  },
  {
    "name": "송언석",
    "party": "국민의힘",
    "constituency": "경북 김천시",
    "is_proportional": false,
    "id": 90
  },
  {
    "name": "임이자",
    "party": "국민의힘",
    "constituency": "경북 상주시·문경시",
    "is_proportional": false,
    "id": 91
  },
  {
    "name": "김형동",
    "party": "국민의힘",
    "constituency": "경북 안동시·예천군",
    "is_proportional": false,
    "id": 92
  },
  {
    "name": "임종득",
    "party": "국민의힘",
    "constituency": "경북 영주시·영양군·봉화군",
    "is_proportional": false,
    "id": 93
  },
  {
    "name": "이만희",
    "party": "국민의힘",
    "constituency": "경북 영천시·청도군",
    "is_proportional": false,
    "id": 94
  },
  {
    "name": "박형수",
    "party": "국민의힘",
    "constituency": "경북 의성군·청송군·영덕군·울진군",
    "is_proportional": false,
    "id": 95
  },
  {
    "name": "이상휘",
    "party": "국민의힘",
    "constituency": "경북 포항시 남구·울릉군",
    "is_proportional": false,
    "id": 96
  },
  {
    "name": "김정재",
    "party": "국민의힘",
    "constituency": "경북 포항시 북구",
    "is_proportional": false,
    "id": 97
  },
  {
    "name": "박균택",
    "party": "더불어민주당",
    "constituency": "광주 광산구 갑",
    "is_proportional": false,
    "id": 98
  },
  {
    "name": "임문영",
    "party": "더불어민주당",
    "constituency": "광주 광산구 을",
    "is_proportional": false,
    "id": 99
  },
  {
    "name": "정진욱",
    "party": "더불어민주당",
    "constituency": "광주 동구·남구 갑",
    "is_proportional": false,
    "id": 100
  },
  {
    "name": "안도걸",
    "party": "더불어민주당",
    "constituency": "광주 동구·남구 을",
    "is_proportional": false,
    "id": 101
  },
  {
    "name": "정준호",
    "party": "더불어민주당",
    "constituency": "광주 북구 갑",
    "is_proportional": false,
    "id": 102
  },
  {
    "name": "전진숙",
    "party": "더불어민주당",
    "constituency": "광주 북구 을",
    "is_proportional": false,
    "id": 103
  },
  {
    "name": "조인철",
    "party": "더불어민주당",
    "constituency": "광주 서구 갑",
    "is_proportional": false,
    "id": 104
  },
  {
    "name": "양부남",
    "party": "더불어민주당",
    "constituency": "광주 서구 을",
    "is_proportional": false,
    "id": 105
  },
  {
    "name": "유영하",
    "party": "국민의힘",
    "constituency": "대구 달서구 갑",
    "is_proportional": false,
    "id": 106
  },
  {
    "name": "권영진",
    "party": "국민의힘",
    "constituency": "대구 달서구 병",
    "is_proportional": false,
    "id": 107
  },
  {
    "name": "윤재옥",
    "party": "국민의힘",
    "constituency": "대구 달서구 을",
    "is_proportional": false,
    "id": 108
  },
  {
    "name": "이진숙",
    "party": "국민의힘",
    "constituency": "대구 달성군",
    "is_proportional": false,
    "id": 109
  },
  {
    "name": "최은석",
    "party": "국민의힘",
    "constituency": "대구 동구·군위군 갑",
    "is_proportional": false,
    "id": 110
  },
  {
    "name": "강대식",
    "party": "국민의힘",
    "constituency": "대구 동구·군위군 을",
    "is_proportional": false,
    "id": 111
  },
  {
    "name": "우재준",
    "party": "국민의힘",
    "constituency": "대구 북구 갑",
    "is_proportional": false,
    "id": 112
  },
  {
    "name": "김승수",
    "party": "국민의힘",
    "constituency": "대구 북구 을",
    "is_proportional": false,
    "id": 113
  },
  {
    "name": "김상훈",
    "party": "국민의힘",
    "constituency": "대구 서구",
    "is_proportional": false,
    "id": 114
  },
  {
    "name": "주호영",
    "party": "국민의힘",
    "constituency": "대구 수성구 갑",
    "is_proportional": false,
    "id": 115
  },
  {
    "name": "이인선",
    "party": "국민의힘",
    "constituency": "대구 수성구 을",
    "is_proportional": false,
    "id": 116
  },
  {
    "name": "김기웅",
    "party": "국민의힘",
    "constituency": "대구 중구·남구",
    "is_proportional": false,
    "id": 117
  },
  {
    "name": "박정현",
    "party": "더불어민주당",
    "constituency": "대전 대덕구",
    "is_proportional": false,
    "id": 118
  },
  {
    "name": "장철민",
    "party": "더불어민주당",
    "constituency": "대전 동구",
    "is_proportional": false,
    "id": 119
  },
  {
    "name": "장종태",
    "party": "더불어민주당",
    "constituency": "대전 서구 갑",
    "is_proportional": false,
    "id": 120
  },
  {
    "name": "박범계",
    "party": "더불어민주당",
    "constituency": "대전 서구 을",
    "is_proportional": false,
    "id": 121
  },
  {
    "name": "조승래",
    "party": "더불어민주당",
    "constituency": "대전 유성구 갑",
    "is_proportional": false,
    "id": 122
  },
  {
    "name": "황정아",
    "party": "더불어민주당",
    "constituency": "대전 유성구 을",
    "is_proportional": false,
    "id": 123
  },
  {
    "name": "박용갑",
    "party": "더불어민주당",
    "constituency": "대전 중구",
    "is_proportional": false,
    "id": 124
  },
  {
    "name": "김도읍",
    "party": "국민의힘",
    "constituency": "부산 강서구",
    "is_proportional": false,
    "id": 125
  },
  {
    "name": "백종헌",
    "party": "국민의힘",
    "constituency": "부산 금정구",
    "is_proportional": false,
    "id": 126
  },
  {
    "name": "정동만",
    "party": "국민의힘",
    "constituency": "부산 기장군",
    "is_proportional": false,
    "id": 127
  },
  {
    "name": "박수영",
    "party": "국민의힘",
    "constituency": "부산 남구",
    "is_proportional": false,
    "id": 128
  },
  {
    "name": "서지영",
    "party": "국민의힘",
    "constituency": "부산 동래구",
    "is_proportional": false,
    "id": 129
  },
  {
    "name": "정성국",
    "party": "국민의힘",
    "constituency": "부산 부산진구 갑",
    "is_proportional": false,
    "id": 130
  },
  {
    "name": "이헌승",
    "party": "국민의힘",
    "constituency": "부산 부산진구 을",
    "is_proportional": false,
    "id": 131
  },
  {
    "name": "한동훈",
    "party": "무소속",
    "constituency": "부산 북구 갑",
    "is_proportional": false,
    "id": 132
  },
  {
    "name": "박성훈",
    "party": "국민의힘",
    "constituency": "부산 북구 을",
    "is_proportional": false,
    "id": 133
  },
  {
    "name": "김대식",
    "party": "국민의힘",
    "constituency": "부산 사상구",
    "is_proportional": false,
    "id": 134
  },
  {
    "name": "이성권",
    "party": "국민의힘",
    "constituency": "부산 사하구 갑",
    "is_proportional": false,
    "id": 135
  },
  {
    "name": "조경태",
    "party": "국민의힘",
    "constituency": "부산 사하구 을",
    "is_proportional": false,
    "id": 136
  },
  {
    "name": "곽규택",
    "party": "국민의힘",
    "constituency": "부산 서구·동구",
    "is_proportional": false,
    "id": 137
  },
  {
    "name": "정연욱",
    "party": "국민의힘",
    "constituency": "부산 수영구",
    "is_proportional": false,
    "id": 138
  },
  {
    "name": "김희정",
    "party": "국민의힘",
    "constituency": "부산 연제구",
    "is_proportional": false,
    "id": 139
  },
  {
    "name": "조승환",
    "party": "국민의힘",
    "constituency": "부산 중구·영도구",
    "is_proportional": false,
    "id": 140
  },
  {
    "name": "주진우",
    "party": "국민의힘",
    "constituency": "부산 해운대구 갑",
    "is_proportional": false,
    "id": 141
  },
  {
    "name": "김미애",
    "party": "국민의힘",
    "constituency": "부산 해운대구 을",
    "is_proportional": false,
    "id": 142
  },
  {
    "name": "서명옥",
    "party": "국민의힘",
    "constituency": "서울 강남구 갑",
    "is_proportional": false,
    "id": 143
  },
  {
    "name": "고동진",
    "party": "국민의힘",
    "constituency": "서울 강남구 병",
    "is_proportional": false,
    "id": 144
  },
  {
    "name": "박수민",
    "party": "국민의힘",
    "constituency": "서울 강남구 을",
    "is_proportional": false,
    "id": 145
  },
  {
    "name": "진선미",
    "party": "더불어민주당",
    "constituency": "서울 강동구 갑",
    "is_proportional": false,
    "id": 146
  },
  {
    "name": "이해식",
    "party": "더불어민주당",
    "constituency": "서울 강동구 을",
    "is_proportional": false,
    "id": 147
  },
  {
    "name": "천준호",
    "party": "더불어민주당",
    "constituency": "서울 강북구 갑",
    "is_proportional": false,
    "id": 148
  },
  {
    "name": "한민수",
    "party": "더불어민주당",
    "constituency": "서울 강북구 을",
    "is_proportional": false,
    "id": 149
  },
  {
    "name": "강선우",
    "party": "무소속",
    "constituency": "서울 강서구 갑",
    "is_proportional": false,
    "id": 150
  },
  {
    "name": "한정애",
    "party": "더불어민주당",
    "constituency": "서울 강서구 병",
    "is_proportional": false,
    "id": 151
  },
  {
    "name": "진성준",
    "party": "더불어민주당",
    "constituency": "서울 강서구 을",
    "is_proportional": false,
    "id": 152
  },
  {
    "name": "박민규",
    "party": "더불어민주당",
    "constituency": "서울 관악구 갑",
    "is_proportional": false,
    "id": 153
  },
  {
    "name": "정태호",
    "party": "더불어민주당",
    "constituency": "서울 관악구 을",
    "is_proportional": false,
    "id": 154
  },
  {
    "name": "이정헌",
    "party": "더불어민주당",
    "constituency": "서울 광진구 갑",
    "is_proportional": false,
    "id": 155
  },
  {
    "name": "고민정",
    "party": "더불어민주당",
    "constituency": "서울 광진구 을",
    "is_proportional": false,
    "id": 156
  },
  {
    "name": "이인영",
    "party": "더불어민주당",
    "constituency": "서울 구로구 갑",
    "is_proportional": false,
    "id": 157
  },
  {
    "name": "윤건영",
    "party": "더불어민주당",
    "constituency": "서울 구로구 을",
    "is_proportional": false,
    "id": 158
  },
  {
    "name": "최기상",
    "party": "더불어민주당",
    "constituency": "서울 금천구",
    "is_proportional": false,
    "id": 159
  },
  {
    "name": "우원식",
    "party": "더불어민주당",
    "constituency": "서울 노원구 갑",
    "is_proportional": false,
    "id": 160
  },
  {
    "name": "김성환",
    "party": "더불어민주당",
    "constituency": "서울 노원구 을",
    "is_proportional": false,
    "id": 161
  },
  {
    "name": "김재섭",
    "party": "국민의힘",
    "constituency": "서울 도봉구 갑",
    "is_proportional": false,
    "id": 162
  },
  {
    "name": "오기형",
    "party": "더불어민주당",
    "constituency": "서울 도봉구 을",
    "is_proportional": false,
    "id": 163
  },
  {
    "name": "안규백",
    "party": "더불어민주당",
    "constituency": "서울 동대문구 갑",
    "is_proportional": false,
    "id": 164
  },
  {
    "name": "장경태",
    "party": "무소속",
    "constituency": "서울 동대문구 을",
    "is_proportional": false,
    "id": 165
  },
  {
    "name": "김병기",
    "party": "무소속",
    "constituency": "서울 동작구 갑",
    "is_proportional": false,
    "id": 166
  },
  {
    "name": "나경원",
    "party": "국민의힘",
    "constituency": "서울 동작구 을",
    "is_proportional": false,
    "id": 167
  },
  {
    "name": "조정훈",
    "party": "국민의힘",
    "constituency": "서울 마포구 갑",
    "is_proportional": false,
    "id": 168
  },
  {
    "name": "정청래",
    "party": "더불어민주당",
    "constituency": "서울 마포구 을",
    "is_proportional": false,
    "id": 169
  },
  {
    "name": "김동아",
    "party": "더불어민주당",
    "constituency": "서울 서대문구 갑",
    "is_proportional": false,
    "id": 170
  },
  {
    "name": "김영호",
    "party": "더불어민주당",
    "constituency": "서울 서대문구 을",
    "is_proportional": false,
    "id": 171
  },
  {
    "name": "조은희",
    "party": "국민의힘",
    "constituency": "서울 서초구 갑",
    "is_proportional": false,
    "id": 172
  },
  {
    "name": "신동욱",
    "party": "국민의힘",
    "constituency": "서울 서초구 을",
    "is_proportional": false,
    "id": 173
  },
  {
    "name": "김영배",
    "party": "더불어민주당",
    "constituency": "서울 성북구 갑",
    "is_proportional": false,
    "id": 174
  },
  {
    "name": "김남근",
    "party": "더불어민주당",
    "constituency": "서울 성북구 을",
    "is_proportional": false,
    "id": 175
  },
  {
    "name": "박정훈",
    "party": "국민의힘",
    "constituency": "서울 송파구 갑",
    "is_proportional": false,
    "id": 176
  },
  {
    "name": "남인순",
    "party": "더불어민주당",
    "constituency": "서울 송파구 병",
    "is_proportional": false,
    "id": 177
  },
  {
    "name": "배현진",
    "party": "국민의힘",
    "constituency": "서울 송파구 을",
    "is_proportional": false,
    "id": 178
  },
  {
    "name": "황희",
    "party": "더불어민주당",
    "constituency": "서울 양천구 갑",
    "is_proportional": false,
    "id": 179
  },
  {
    "name": "이용선",
    "party": "더불어민주당",
    "constituency": "서울 양천구 을",
    "is_proportional": false,
    "id": 180
  },
  {
    "name": "채현일",
    "party": "더불어민주당",
    "constituency": "서울 영등포구 갑",
    "is_proportional": false,
    "id": 181
  },
  {
    "name": "김민석",
    "party": "더불어민주당",
    "constituency": "서울 영등포구 을",
    "is_proportional": false,
    "id": 182
  },
  {
    "name": "권영세",
    "party": "국민의힘",
    "constituency": "서울 용산구",
    "is_proportional": false,
    "id": 183
  },
  {
    "name": "박주민",
    "party": "더불어민주당",
    "constituency": "서울 은평구 갑",
    "is_proportional": false,
    "id": 184
  },
  {
    "name": "김우영",
    "party": "더불어민주당",
    "constituency": "서울 은평구 을",
    "is_proportional": false,
    "id": 185
  },
  {
    "name": "곽상언",
    "party": "더불어민주당",
    "constituency": "서울 종로구",
    "is_proportional": false,
    "id": 186
  },
  {
    "name": "전현희",
    "party": "더불어민주당",
    "constituency": "서울 중구·성동구 갑",
    "is_proportional": false,
    "id": 187
  },
  {
    "name": "박성준",
    "party": "더불어민주당",
    "constituency": "서울 중구·성동구 을",
    "is_proportional": false,
    "id": 188
  },
  {
    "name": "서영교",
    "party": "더불어민주당",
    "constituency": "서울 중랑구 갑",
    "is_proportional": false,
    "id": 189
  },
  {
    "name": "박홍근",
    "party": "더불어민주당",
    "constituency": "서울 중랑구 을",
    "is_proportional": false,
    "id": 190
  },
  {
    "name": "김종민",
    "party": "무소속",
    "constituency": "세종 갑",
    "is_proportional": false,
    "id": 191
  },
  {
    "name": "강준현",
    "party": "더불어민주당",
    "constituency": "세종 을",
    "is_proportional": false,
    "id": 192
  },
  {
    "name": "김태규",
    "party": "국민의힘",
    "constituency": "울산 남구 갑",
    "is_proportional": false,
    "id": 193
  },
  {
    "name": "김기현",
    "party": "국민의힘",
    "constituency": "울산 남구 을",
    "is_proportional": false,
    "id": 194
  },
  {
    "name": "김태선",
    "party": "더불어민주당",
    "constituency": "울산 동구",
    "is_proportional": false,
    "id": 195
  },
  {
    "name": "윤종오",
    "party": "진보당",
    "constituency": "울산 북구",
    "is_proportional": false,
    "id": 196
  },
  {
    "name": "서범수",
    "party": "국민의힘",
    "constituency": "울산 울주군",
    "is_proportional": false,
    "id": 197
  },
  {
    "name": "박성민",
    "party": "국민의힘",
    "constituency": "울산 중구",
    "is_proportional": false,
    "id": 198
  },
  {
    "name": "유동수",
    "party": "더불어민주당",
    "constituency": "인천 계양구 갑",
    "is_proportional": false,
    "id": 199
  },
  {
    "name": "김남준",
    "party": "더불어민주당",
    "constituency": "인천 계양구 을",
    "is_proportional": false,
    "id": 200
  },
  {
    "name": "맹성규",
    "party": "더불어민주당",
    "constituency": "인천 남동구 갑",
    "is_proportional": false,
    "id": 201
  },
  {
    "name": "이훈기",
    "party": "더불어민주당",
    "constituency": "인천 남동구 을",
    "is_proportional": false,
    "id": 202
  },
  {
    "name": "허종식",
    "party": "더불어민주당",
    "constituency": "인천 동구·미추홀구 갑",
    "is_proportional": false,
    "id": 203
  },
  {
    "name": "윤상현",
    "party": "국민의힘",
    "constituency": "인천 동구·미추홀구 을",
    "is_proportional": false,
    "id": 204
  },
  {
    "name": "노종면",
    "party": "더불어민주당",
    "constituency": "인천 부평구 갑",
    "is_proportional": false,
    "id": 205
  },
  {
    "name": "박선원",
    "party": "더불어민주당",
    "constituency": "인천 부평구 을",
    "is_proportional": false,
    "id": 206
  },
  {
    "name": "김교흥",
    "party": "더불어민주당",
    "constituency": "인천 서구 갑",
    "is_proportional": false,
    "id": 207
  },
  {
    "name": "모경종",
    "party": "더불어민주당",
    "constituency": "인천 서구 병",
    "is_proportional": false,
    "id": 208
  },
  {
    "name": "이용우",
    "party": "더불어민주당",
    "constituency": "인천 서구 을",
    "is_proportional": false,
    "id": 209
  },
  {
    "name": "송영길",
    "party": "더불어민주당",
    "constituency": "인천 연수구 갑",
    "is_proportional": false,
    "id": 210
  },
  {
    "name": "정일영",
    "party": "더불어민주당",
    "constituency": "인천 연수구 을",
    "is_proportional": false,
    "id": 211
  },
  {
    "name": "배준영",
    "party": "국민의힘",
    "constituency": "인천 중구·강화군·옹진군",
    "is_proportional": false,
    "id": 212
  },
  {
    "name": "문금주",
    "party": "더불어민주당",
    "constituency": "전남 고흥군·보성군·장흥군·강진군",
    "is_proportional": false,
    "id": 213
  },
  {
    "name": "신정훈",
    "party": "더불어민주당",
    "constituency": "전남 나주시·화순군",
    "is_proportional": false,
    "id": 214
  },
  {
    "name": "이개호",
    "party": "더불어민주당",
    "constituency": "전남 담양군·함평군·영광군·장성군",
    "is_proportional": false,
    "id": 215
  },
  {
    "name": "김원이",
    "party": "더불어민주당",
    "constituency": "전남 목포시",
    "is_proportional": false,
    "id": 216
  },
  {
    "name": "김문수",
    "party": "더불어민주당",
    "constituency": "전남 순천시·광양시·곡성군·구례군 갑",
    "is_proportional": false,
    "id": 217
  },
  {
    "name": "권향엽",
    "party": "더불어민주당",
    "constituency": "전남 순천시·광양시·곡성군·구례군 을",
    "is_proportional": false,
    "id": 218
  },
  {
    "name": "주철현",
    "party": "더불어민주당",
    "constituency": "전남 여수시 갑",
    "is_proportional": false,
    "id": 219
  },
  {
    "name": "조계원",
    "party": "더불어민주당",
    "constituency": "전남 여수시 을",
    "is_proportional": false,
    "id": 220
  },
  {
    "name": "서삼석",
    "party": "더불어민주당",
    "constituency": "전남 영암군·무안군·신안군",
    "is_proportional": false,
    "id": 221
  },
  {
    "name": "박지원",
    "party": "더불어민주당",
    "constituency": "전남 해남군·완도군·진도군",
    "is_proportional": false,
    "id": 222
  },
  {
    "name": "김의겸",
    "party": "더불어민주당",
    "constituency": "전북 군산시·김제시·부안군 갑",
    "is_proportional": false,
    "id": 223
  },
  {
    "name": "박지원",
    "party": "더불어민주당",
    "constituency": "전북 군산시·김제시·부안군 을",
    "is_proportional": false,
    "id": 224
  },
  {
    "name": "박희승",
    "party": "더불어민주당",
    "constituency": "전북 남원시·장수군·임실군·순창군",
    "is_proportional": false,
    "id": 225
  },
  {
    "name": "안호영",
    "party": "더불어민주당",
    "constituency": "전북 완주군·진안군·무주군",
    "is_proportional": false,
    "id": 226
  },
  {
    "name": "이춘석",
    "party": "무소속",
    "constituency": "전북 익산시 갑",
    "is_proportional": false,
    "id": 227
  },
  {
    "name": "한병도",
    "party": "더불어민주당",
    "constituency": "전북 익산시 을",
    "is_proportional": false,
    "id": 228
  },
  {
    "name": "김윤덕",
    "party": "더불어민주당",
    "constituency": "전북 전주시 갑",
    "is_proportional": false,
    "id": 229
  },
  {
    "name": "정동영",
    "party": "더불어민주당",
    "constituency": "전북 전주시 병",
    "is_proportional": false,
    "id": 230
  },
  {
    "name": "이성윤",
    "party": "더불어민주당",
    "constituency": "전북 전주시 을",
    "is_proportional": false,
    "id": 231
  },
  {
    "name": "윤준병",
    "party": "더불어민주당",
    "constituency": "전북 정읍시·고창군",
    "is_proportional": false,
    "id": 232
  },
  {
    "name": "김성범",
    "party": "더불어민주당",
    "constituency": "제주 서귀포시",
    "is_proportional": false,
    "id": 233
  },
  {
    "name": "문대림",
    "party": "더불어민주당",
    "constituency": "제주 제주시 갑",
    "is_proportional": false,
    "id": 234
  },
  {
    "name": "김한규",
    "party": "더불어민주당",
    "constituency": "제주 제주시 을",
    "is_proportional": false,
    "id": 235
  },
  {
    "name": "박수현",
    "party": "국민의힘",
    "constituency": "충남 공주시·부여군·청양군",
    "is_proportional": false,
    "id": 236
  },
  {
    "name": "황명선",
    "party": "더불어민주당",
    "constituency": "충남 논산시·계룡시·금산군",
    "is_proportional": false,
    "id": 237
  },
  {
    "name": "어기구",
    "party": "더불어민주당",
    "constituency": "충남 당진시",
    "is_proportional": false,
    "id": 238
  },
  {
    "name": "장동혁",
    "party": "국민의힘",
    "constituency": "충남 보령시·서천군",
    "is_proportional": false,
    "id": 239
  },
  {
    "name": "성일종",
    "party": "국민의힘",
    "constituency": "충남 서산시·태안군",
    "is_proportional": false,
    "id": 240
  },
  {
    "name": "복기왕",
    "party": "더불어민주당",
    "constituency": "충남 아산시 갑",
    "is_proportional": false,
    "id": 241
  },
  {
    "name": "전은수",
    "party": "더불어민주당",
    "constituency": "충남 아산시 을",
    "is_proportional": false,
    "id": 242
  },
  {
    "name": "문진석",
    "party": "더불어민주당",
    "constituency": "충남 천안시 갑",
    "is_proportional": false,
    "id": 243
  },
  {
    "name": "이정문",
    "party": "더불어민주당",
    "constituency": "충남 천안시 병",
    "is_proportional": false,
    "id": 244
  },
  {
    "name": "이재관",
    "party": "더불어민주당",
    "constituency": "충남 천안시 을",
    "is_proportional": false,
    "id": 245
  },
  {
    "name": "강승규",
    "party": "국민의힘",
    "constituency": "충남 홍성군·예산군",
    "is_proportional": false,
    "id": 246
  },
  {
    "name": "박덕흠",
    "party": "국민의힘",
    "constituency": "충북 보은군·옥천군·영동군·괴산군",
    "is_proportional": false,
    "id": 247
  },
  {
    "name": "엄태영",
    "party": "국민의힘",
    "constituency": "충북 제천시·단양군",
    "is_proportional": false,
    "id": 248
  },
  {
    "name": "임호선",
    "party": "더불어민주당",
    "constituency": "충북 증평군·진천군·음성군",
    "is_proportional": false,
    "id": 249
  },
  {
    "name": "이강일",
    "party": "더불어민주당",
    "constituency": "충북 청주시 상당구",
    "is_proportional": false,
    "id": 250
  },
  {
    "name": "이광희",
    "party": "더불어민주당",
    "constituency": "충북 청주시 서원구",
    "is_proportional": false,
    "id": 251
  },
  {
    "name": "송재봉",
    "party": "더불어민주당",
    "constituency": "충북 청주시 청원구",
    "is_proportional": false,
    "id": 252
  },
  {
    "name": "이연희",
    "party": "더불어민주당",
    "constituency": "충북 청주시 흥덕구",
    "is_proportional": false,
    "id": 253
  },
  {
    "name": "이종배",
    "party": "국민의힘",
    "constituency": "충북 충주시",
    "is_proportional": false,
    "id": 254
  },
  {
    "name": "강경숙",
    "party": "조국혁신당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 255
  },
  {
    "name": "강선영",
    "party": "국민의힘",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 256
  },
  {
    "name": "김건",
    "party": "국민의힘",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 257
  },
  {
    "name": "김민전",
    "party": "국민의힘",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 258
  },
  {
    "name": "김선민",
    "party": "조국혁신당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 259
  },
  {
    "name": "김소희",
    "party": "국민의힘",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 260
  },
  {
    "name": "김예지",
    "party": "국민의힘",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 261
  },
  {
    "name": "김위상",
    "party": "국민의힘",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 262
  },
  {
    "name": "김윤",
    "party": "더불어민주당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 263
  },
  {
    "name": "김장겸",
    "party": "국민의힘",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 264
  },
  {
    "name": "김재원",
    "party": "조국혁신당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 265
  },
  {
    "name": "김준형",
    "party": "조국혁신당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 266
  },
  {
    "name": "김준환",
    "party": "더불어민주당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 267
  },
  {
    "name": "박은정",
    "party": "조국혁신당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 268
  },
  {
    "name": "박준태",
    "party": "국민의힘",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 269
  },
  {
    "name": "박충권",
    "party": "국민의힘",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 270
  },
  {
    "name": "박홍배",
    "party": "더불어민주당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 271
  },
  {
    "name": "백선희",
    "party": "조국혁신당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 272
  },
  {
    "name": "백승아",
    "party": "더불어민주당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 273
  },
  {
    "name": "서미화",
    "party": "더불어민주당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 274
  },
  {
    "name": "서왕진",
    "party": "조국혁신당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 275
  },
  {
    "name": "손솔",
    "party": "진보당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 276
  },
  {
    "name": "신장식",
    "party": "조국혁신당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 277
  },
  {
    "name": "안상훈",
    "party": "국민의힘",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 278
  },
  {
    "name": "오세희",
    "party": "더불어민주당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 279
  },
  {
    "name": "용혜인",
    "party": "기본소득당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 280
  },
  {
    "name": "유용원",
    "party": "국민의힘",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 281
  },
  {
    "name": "이달희",
    "party": "국민의힘",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 282
  },
  {
    "name": "이소희",
    "party": "국민의힘",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 283
  },
  {
    "name": "이주영",
    "party": "개혁신당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 284
  },
  {
    "name": "이주희",
    "party": "더불어민주당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 285
  },
  {
    "name": "이해민",
    "party": "조국혁신당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 286
  },
  {
    "name": "임미애",
    "party": "더불어민주당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 287
  },
  {
    "name": "전종덕",
    "party": "진보당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 288
  },
  {
    "name": "정춘생",
    "party": "조국혁신당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 289
  },
  {
    "name": "정혜경",
    "party": "진보당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 290
  },
  {
    "name": "조배숙",
    "party": "국민의힘",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 291
  },
  {
    "name": "진종오",
    "party": "국민의힘",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 292
  },
  {
    "name": "차규근",
    "party": "조국혁신당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 293
  },
  {
    "name": "천하람",
    "party": "개혁신당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 294
  },
  {
    "name": "최보윤",
    "party": "국민의힘",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 295
  },
  {
    "name": "최수진",
    "party": "국민의힘",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 296
  },
  {
    "name": "최혁진",
    "party": "무소속",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 297
  },
  {
    "name": "한지아",
    "party": "국민의힘",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 298
  },
  {
    "name": "한창민",
    "party": "사회민주당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 299
  },
  {
    "name": "황운하",
    "party": "조국혁신당",
    "constituency": "비례대표",
    "is_proportional": true,
    "id": 300
  }
];

export default assemblyMembers;
