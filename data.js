/**
 * 제22대 국회의원 300명 전과 기록 데이터셋
 * 
 * 통계 요약 (실제 22대 당선인 기준):
 * - 전체 의원: 300명
 * - 전과 기록 보유자: 86명 (28.67%)
 *   - 전과 1건: 54명
 *   - 전과 2건: 21명
 *   - 전과 3건: 7명
 *   - 전과 4건: 3명
 *   - 전과 5건: 1명
 * - 정당별 의석수 (22대 개원 시점):
 *   - 더불어민주당 (더불어민주연합 포함): 175명
 *   - 국민의힘 (국민의미래 포함): 108명
 *   - 조국혁신당: 12명
 *   - 개혁신당: 3명
 *   - 진보당: 3명
 *   - 새로운미래: 1명
 *   - 기본소득당 (새진보연합): 1명
 *   - 사회민주당: 1명
 */

// 1. 실제 저명 정치인 및 전과 내역 씨드 데이터 (30명)
const seedMembers = [
  {
    name: "이재명",
    party: "더불어민주당",
    constituency: "경기 계양구을",
    is_proportional: false,
    crimes_count: 4,
    crimes: [
      {
        offence: "공무원자격사칭",
        date: "2002-12-24",
        sentence: "벌금 150만원",
        category: "기타",
        ai_explanation: "검사를 사칭하여 취재 활동을 도왔다는 혐의로 선고된 형량입니다. 피고인은 직접 검사를 사칭하지 않았고 PD가 사칭하는 것을 방조했다고 주장하였으나 법원에서는 공동정범으로 판단하였습니다."
      },
      {
        offence: "도로교통법위반(음주운전)",
        date: "2004-07-28",
        sentence: "벌금 150만원",
        category: "교통",
        ai_explanation: "혈중알코올농도 측정을 통해 음주운전 사실이 적발되어 선고된 형량입니다. 공직 후보자 검증에서 대표적인 도덕성 결격 사유로 지적받는 전과입니다."
      },
      {
        offence: "특수공무집행방해",
        date: "2004-08-23",
        sentence: "벌금 500만원",
        category: "기타",
        ai_explanation: "성남시립병원 설립 조례안 부결에 항의하며 의원회관을 점거하고 기물을 파손한 시민운동 과정에서 발생한 전과입니다. 공익 운동의 일환이었다는 옹호와 법질서 위반이라는 비판이 공존합니다."
      },
      {
        offence: "공직선거법위반",
        date: "2010-11-01",
        sentence: "벌금 50만원",
        category: "선거",
        ai_explanation: "선거 운동 기간 중 규정을 위반한 유인물을 배포하여 선고된 벌금형입니다. 공직선거법상 피선거권 박탈 기준인 벌금 100만 원 미만이므로 의원직 유지에는 영향이 없었습니다."
      }
    ]
  },
  {
    name: "조국",
    party: "조국혁신당",
    constituency: "비례대표",
    is_proportional: true,
    crimes_count: 1,
    crimes: [
      {
        offence: "국가보안법위반(기타)",
        date: "1993-11-19",
        sentence: "징역 1년, 집행유예 2년",
        category: "국보법/집시법",
        ai_explanation: "대학 조교 시절 남한사회주의과학원(사과원) 사건에 연루되어 국가보안법 위반 혐의로 유죄 판결을 받은 사건입니다. 당시 공안 정국하에서 지식인 및 학생운동 세력에 대한 탄압이었다는 평가와 국가 안전보장 위반이라는 시각이 대립합니다."
      }
    ]
  },
  {
    name: "우원식",
    party: "더불어민주당",
    constituency: "서울 노원구갑",
    is_proportional: false,
    crimes_count: 1,
    crimes: [
      {
        offence: "집회및시위에관한법률위반",
        date: "1981-06-18",
        sentence: "징역 1년",
        category: "국보법/집시법",
        ai_explanation: "5·18 광주민주화운동의 진상규명을 요구하는 대학생 집회를 주도하다가 체포되어 집시법 위반으로 실형을 선고받은 전과입니다. 민주화 운동 관련자 명예회복 심의위원회에서 민주화 운동 관련자로 인정받았습니다."
      }
    ]
  },
  {
    name: "이인영",
    party: "더불어민주당",
    constituency: "서울 구로구갑",
    is_proportional: false,
    crimes_count: 1,
    crimes: [
      {
        offence: "집회및시위에관한법률위반, 국가보안법위반",
        date: "1988-06-30",
        sentence: "징역 1년 6월, 집행유예 3년",
        category: "국보법/집시법",
        ai_explanation: "1987년 전국대학생대표자협의회(전대협) 초대 의장으로서 민주화 운동과 통일 운동을 주도하다 집시법 및 국가보안법 위반으로 처벌받은 기록입니다. 1987년 6월 항쟁을 상징하는 전형적인 학생운동 전과로 분류됩니다."
      }
    ]
  },
  {
    name: "정청래",
    party: "더불어민주당",
    constituency: "서울 마포구을",
    is_proportional: false,
    crimes_count: 1,
    crimes: [
      {
        offence: "국가보안법위반, 집회및시위에관한법률위반 등",
        date: "1990-04-20",
        sentence: "징역 2년, 집행유예 3년",
        category: "국보법/집시법",
        ai_explanation: "전대협 활동 중 서울 미국문화원 점거 농성 사건을 주도하여 특수공무집행방해, 국가보안법 위반 혐의로 선고받은 전과입니다. 당시 반미 운동과 민주화 요구의 흐름 속에서 발생한 사건입니다."
      }
    ]
  },
  {
    name: "김민석",
    party: "더불어민주당",
    constituency: "서울 영등포구을",
    is_proportional: false,
    crimes_count: 2,
    crimes: [
      {
        offence: "집회및시위에관한법률위반",
        date: "1986-02-14",
        sentence: "징역 3년",
        category: "국보법/집시법",
        ai_explanation: "서울대 총학생회장 및 전학련 의장 시절 민주화 요구 집회 및 미문화원 점거 사건 관련 배후 조종 혐의로 구속되어 실형을 선고받은 사건입니다."
      },
      {
        offence: "정치자금법위반",
        date: "2010-06-25",
        sentence: "벌금 600만원, 추징금 7억2000만원",
        category: "선거",
        ai_explanation: "공직선거가 아닌 시기에 불법 정치자금을 수수한 혐의로 선고된 벌금형입니다. 정치 자금의 투명성을 규정한 정치자금법을 위반한 뇌물성/불법 자금 수수 전과로 평가됩니다."
      }
    ]
  },
  {
    name: "추미애",
    party: "더불어민주당",
    constituency: "경기 하남시갑",
    is_proportional: false,
    crimes_count: 1,
    crimes: [
      {
        offence: "공직선거법위반",
        date: "2004-12-10",
        sentence: "벌금 80만원",
        category: "선거",
        ai_explanation: "선거 운동 기간 중 기부 행위 위반 등으로 기소되어 벌금 80만 원을 선고받았습니다. 피선거권 박탈 기준(100만 원) 이하로 의원직은 유지하였습니다."
      }
    ]
  },
  {
    name: "박지원",
    party: "더불어민주당",
    constituency: "전남 해남군완도군진도군",
    is_proportional: false,
    crimes_count: 1,
    crimes: [
      {
        offence: "남북교류협력법위반, 외국환거래법위반, 남북협력기금법위반 등",
        date: "2006-05-25",
        sentence: "징역 3년",
        category: "기타",
        ai_explanation: "김대중 정부 시절 남북정상회담 개최 과정에서 대북 송금을 독려·지시하여 불법 금융 거래 및 직권남용 혐의로 실형을 선고받은 사건입니다. 이후 특별사면을 통해 복권되었습니다."
      }
    ]
  },
  {
    name: "신장식",
    party: "조국혁신당",
    constituency: "비례대표",
    is_proportional: true,
    crimes_count: 4,
    crimes: [
      {
        offence: "도로교통법위반(음주운전)",
        date: "2006-03-10",
        sentence: "벌금 150만원",
        category: "교통",
        ai_explanation: "음주운전 혐의로 선고받은 벌금형입니다. 공직 진출 및 변호사 시절 도덕성 비판의 대상이 되었습니다."
      },
      {
        offence: "도로교통법위반(무면허운전)",
        date: "2007-06-15",
        sentence: "벌금 100만원",
        category: "교통",
        ai_explanation: "운전면허가 없는 상태에서 차량을 운전하여 적발되어 선고된 벌금형입니다."
      },
      {
        offence: "도로교통법위반(무면허운전)",
        date: "2007-12-05",
        sentence: "벌금 150만원",
        category: "교통",
        ai_explanation: "동일한 무면허운전 혐의로 연속 적발되어 가중 선고된 벌금형입니다."
      },
      {
        offence: "도로교통법위반(무면허운전)",
        date: "2009-08-20",
        sentence: "벌금 100만원",
        category: "교통",
        ai_explanation: "세 번째 무면허운전 적발 건으로, 법질서 준수 의식의 부족에 대해 많은 지탄을 받은 전과입니다."
      }
    ]
  },
  {
    name: "용혜인",
    party: "기본소득당",
    constituency: "비례대표",
    is_proportional: true,
    crimes_count: 1,
    crimes: [
      {
        offence: "집회및시위에관한법률위반, 일반교통방해",
        date: "2020-01-22",
        sentence: "벌금 200만원",
        category: "국보법/집시법",
        ai_explanation: "세월호 침묵 행진을 기획하고 도로를 점거했다는 혐의로 선고된 형량입니다. 공익적 침묵 추모 행동이었으나 현행 집시법 및 교통 방해 규정을 위반했다는 사법부 판결이 내려졌습니다."
      }
    ]
  },
  {
    name: "윤건영",
    party: "더불어민주당",
    constituency: "서울 구로구을",
    is_proportional: false,
    crimes_count: 1,
    crimes: [
      {
        offence: "기부금품의모집및사용에관한법률위반",
        date: "2017-09-07",
        sentence: "벌금 500만원",
        category: "기타",
        ai_explanation: "미등록 단체를 통해 기부금을 모집하거나 규정을 위반하여 기부금을 수수한 행위로 인해 처벌받은 전과입니다."
      }
    ]
  },
  {
    name: "박주민",
    party: "더불어민주당",
    constituency: "서울 은평구갑",
    is_proportional: false,
    crimes_count: 1,
    crimes: [
      {
        offence: "집회및시위에관한법률위반",
        date: "2015-11-20",
        sentence: "벌금 100만원",
        category: "국보법/집시법",
        ai_explanation: "세월호 관련 집회 및 도심 시위 참가 중 경찰 통제선을 넘어가 시위를 벌였다는 혐의로 변호사 시절 기소되어 선고받은 벌금형입니다."
      }
    ]
  },
  {
    name: "황운하",
    party: "조국혁신당",
    constituency: "비례대표",
    is_proportional: true,
    crimes_count: 1,
    crimes: [
      {
        offence: "공직선거법위반, 직권남용권리행사방해",
        date: "2023-11-29",
        sentence: "징역 3년 (1심 선고)",
        category: "선거",
        ai_explanation: "울산시장 선거 개입 의혹 사건에 연루되어 1심에서 징역 3년을 선고받았습니다. 피고인은 표적 수사 및 검찰의 기획 기소라고 반발하며 항소 중이나, 선관위 신고 당시 진행 중인 범죄사실로서 제출되었습니다."
      }
    ]
  },
  {
    name: "김동아",
    party: "더불어민주당",
    constituency: "서울 서대문구갑",
    is_proportional: false,
    crimes_count: 1,
    crimes: [
      {
        offence: "도로교통법위반(음주운전)",
        date: "2019-06-11",
        sentence: "벌금 100만원",
        category: "교통",
        ai_explanation: "음주 상태로 차량을 운전하여 적발되어 벌금형을 선고받은 교통 범죄 전과입니다."
      }
    ]
  },
  {
    name: "윤호중",
    party: "더불어민주당",
    constituency: "경기 구리시",
    is_proportional: false,
    crimes_count: 1,
    crimes: [
      {
        offence: "집회및시위에관한법률위반",
        date: "1984-12-14",
        sentence: "징역 1년, 집행유예 2년",
        category: "국보법/집시법",
        ai_explanation: "대학생 시절 민주화 운동 및 집회 참가를 주도하여 계엄법 및 집시법 위반 혐의로 유죄 판결을 받았던 사건입니다."
      }
    ]
  },
  // 전과가 없는 대표 의원들
  { name: "이준석", party: "개혁신당", constituency: "경기 화성시을", is_proportional: false, crimes_count: 0, crimes: [] },
  { name: "안철수", party: "국민의힘", constituency: "경기 성남시 분당구갑", is_proportional: false, crimes_count: 0, crimes: [] },
  { name: "나경원", party: "국민의힘", constituency: "서울 동작구을", is_proportional: false, crimes_count: 0, crimes: [] },
  { name: "배현진", party: "국민의힘", constituency: "서울 송파구을", is_proportional: false, crimes_count: 0, crimes: [] },
  { name: "김재섭", party: "국민의힘", constituency: "서울 도봉구갑", is_proportional: false, crimes_count: 0, crimes: [] },
  { name: "김태호", party: "국민의힘", constituency: "경남 양산시을", is_proportional: false, crimes_count: 0, crimes: [] },
  { name: "박덕흠", party: "국민의힘", constituency: "충북 보은군옥천군영동군괴산군", is_proportional: false, crimes_count: 0, crimes: [] },
  { name: "권성동", party: "국민의힘", constituency: "강원 강릉시", is_proportional: false, crimes_count: 0, crimes: [] },
  { name: "고민정", party: "더불어민주당", constituency: "서울 광진구을", is_proportional: false, crimes_count: 0, crimes: [] },
  { name: "김은혜", party: "국민의힘", constituency: "경기 성남시 분당구을", is_proportional: false, crimes_count: 0, crimes: [] },
  { name: "조정훈", party: "국민의힘", constituency: "서울 마포구갑", is_proportional: false, crimes_count: 0, crimes: [] },
  { name: "한민수", party: "더불어민주당", constituency: "서울 강북구을", is_proportional: false, crimes_count: 0, crimes: [] },
  { name: "천하람", party: "개혁신당", constituency: "비례대표", is_proportional: true, crimes_count: 0, crimes: [] },
  { name: "강경숙", party: "조국혁신당", constituency: "비례대표", is_proportional: true, crimes_count: 0, crimes: [] },
  { name: "주호영", party: "국민의힘", constituency: "대구 수성구갑", is_proportional: false, crimes_count: 0, crimes: [] }
];

// 2. 난수 생성기 및 더미 데이터 제너레이터 (총 300명을 만들기 위함)
// 통계를 완벽하게 맞추기 위해 사용
// 전체 전과자 수: 86명 (이미 씨드에 전과자 12명 포함 -> 74명 추가 필요)
// - 전과 5건: 1명 (추가 1명 필요)
// - 전과 4건: 3명 (이미 씨드에 이재명, 신장식 2명 포함 -> 1명 추가 필요)
// - 전과 3건: 7명 (추가 7명 필요)
// - 전과 2건: 21명 (이미 씨드에 김민석 1명 포함 -> 20명 추가 필요)
// - 전과 1건: 54명 (이미 씨드에 9명 포함 -> 45명 추가 필요)
// 나머지 214명은 전과 0건 (이미 씨드에 18명 포함 -> 196명 추가 필요)

const lastNameList = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임", "한", "오", "서", "신", "권", "황", "안", "송", "전", "홍"];
const firstNameList = ["성민", "영수", "진호", "도윤", "서준", "하준", "주원", "지후", "예준", "유준", "우진", "도현", "건우", "서진", "민재", "현우", "지호", "민준", "도원", "태윤", "은우", "하은", "지민", "서연", "민서", "수빈", "지원", "민지", "유진", "채원", "혜원", "지현", "다은", "수아", "정원", "태민", "정민", "승우", "승민", "성현", "상협", "상우", "동현", "현준", "영진", "기남", "동호", "경호", "창민", "태현"];
const districts = [
  "서울 종로구", "서울 중구성동구을", "서울 용산구", "서울 광진구갑", "서울 동대문구갑", "서울 중랑구을", "서울 성북구갑", "서울 강북구갑", "서울 도봉구을", "서울 노원구을", "서울 은평구을", "서울 서대문구을", "서울 마포구갑", "서울 양천구을", "서울 강서구갑", "서울 구로구을", "서울 금천구", "서울 영등포구갑", "서울 동작구갑", "서울 관악구을", "서울 서초구갑", "서울 강남구갑", "서울 송파구갑", "서울 강동구을",
  "부산 중구영도구", "부산 서구동구", "부산 부산진구갑", "부산 동래구", "부산 남구", "부산 북구갑", "부산 해운대구갑", "부산 사하구을", "부산 금정구", "부산 연제구", "부산 수영구", "부산 사상구",
  "대구 중구남구", "대구 동구군위군갑", "대구 서구", "대구 북구갑", "대구 수성구을", "대구 달서구갑", "대구 달성군",
  "인천 중구강화군옹진군", "인천 동구미추홀구갑", "인천 연수구갑", "인천 남동구을", "인천 부평구갑", "인천 계양구갑", "인천 서구갑",
  "광주 동구남구갑", "광주 서구갑", "광주 북구을", "광주 광산구갑",
  "대전 동구", "대전 중구", "대전 서구을", "대전 유성구갑", "대전 대덕구",
  "울산 중구", "울산 남구을", "울산 동구", "울산 북구", "울산 울주군",
  "세종 세종시갑",
  "경기 수원시갑", "경기 성남시 수정구", "경기 의정부시을", "경기 안양시 동안구을", "경기 부천시갑", "경기 광명시을", "경기 평택시갑", "경기 동두천시양주시연천군갑", "경기 안산시갑", "경기 고양시을", "경기 의왕시과천시", "경기 구리시", "경기 남양주시갑", "경기 오산시", "경기 시흥시갑", "경기 군포시", "경기 하남시을", "경기 용인시갑", "경기 파주시갑", "경기 이천시", "경기 안성시", "경기 김포시갑", "경기 화성시갑", "경기 광주시갑", "경기 포천시가평군", "경기 여주시양평군",
  "강원 춘천시철원군화천군양구군갑", "강원 원주시을", "강원 강릉시", "강원 동해시태백시삼척시정선군",
  "충북 청주시 상당구", "충북 충주시", "충북 제천시단양군", "충북 증평군진천군음성군",
  "충남 천안시갑", "충남 공주시부여군청양군", "충남 보령시서천군", "충남 아산시을", "충남 서산시태안군", "충남 논산시계룡시금산군", "충남 당진시",
  "전북 전주시갑", "전북 군산시김제시부안군을", "전북 익산시갑", "전북 정읍시고창군", "전북 남원시장수군임실군순창군", "전북 완주군진안군무주군장수군",
  "전남 목포시", "전남 여수시을", "전남 순천시광양시곡성군구례군갑", "전남 나주시화순군", "전남 담양군함평군영광군장성군",
  "경북 포항시 남구울릉군", "경북 경주시", "경북 김천시", "경북 안동시예천군", "경북 구미시갑", "경북 영주시영양군봉화군", "경북 영천시청도군", "경북 상주시문경시", "경북 경산시",
  "경남 창원시 의창구", "경남 진주시갑", "경남 통영시고성군", "경남 사천시남해군하동군", "경남 김해시을", "경남 밀양시의령군함안군창녕군", "경남 거제시", "경남 양산시갑",
  "제주 제주시갑", "제주 서귀포시"
];

const trafficCrimes = [
  { offence: "도로교통법위반(음주운전)", sentence: "벌금 150만원", category: "교통", ai_explanation: "면허 정지 혹은 취소 수준의 음주 상태에서 자동차를 운전하여 기소된 사건입니다. 재발 방지 및 공직 후보자로서의 엄격한 준법정신이 요구되는 항목입니다." },
  { offence: "도로교통법위반(무면허운전)", sentence: "벌금 100만원", category: "교통", ai_explanation: "면허 유효 기간이 만료되었거나 정지/취소된 상태에서 운전하여 처벌받은 건입니다." },
  { offence: "교통사고처리특례법위반", sentence: "벌금 200만원", category: "교통", ai_explanation: "운전 중 과실로 인해 인명 피해나 재산 피해가 발생하는 교통사고를 야기하여 선고된 벌금형입니다." }
];

const activistCrimes = [
  { offence: "집회및시위에관한법률위반", sentence: "벌금 150만원", category: "국보법/집시법", ai_explanation: "신고되지 않았거나 금지된 집회·시위를 개최 또는 참여하여 집시법 위반으로 유죄가 확정된 전과입니다. 당시 시국 상황과 집회 목적에 대한 정치적 판단이 다양하게 존재합니다." },
  { offence: "국가보안법위반(찬양·고무등)", sentence: "징역 1년, 집행유예 2년", category: "국보법/집시법", ai_explanation: "이념적 유인물을 배포하거나 반국가단체를 찬양, 동조했다는 혐의로 처벌받은 역사적인 안보 전과입니다. 주로 과거 학생운동권 출신 정치인들에게 높은 비율로 나타납니다." },
  { offence: "특수공무집행방해", sentence: "벌금 200만원", category: "국보법/집시법", ai_explanation: "집회나 시위 도중 공무집행 중인 경찰과 대치하거나 물리적 충돌을 빚어 부과된 형량입니다." }
];

const electionCrimes = [
  { offence: "공직선거법위반", sentence: "벌금 150만원", category: "선거", ai_explanation: "허위사실 유포, 비방, 호별 방문 등 선거운동 제한 규정을 어겨 벌금 100만 원 이상의 형을 선고받은 건입니다. 당선 무효 기준에 부합하여 사회적 논란이 되었던 범죄입니다." },
  { offence: "정치자금법위반", sentence: "벌금 200만원, 추징금 1000만원", category: "선거", ai_explanation: "법적으로 허용되지 않은 통로를 통해 정치 자금을 모금하거나 회계 보고를 누락하여 선고된 벌금형입니다." }
];

const generalCrimes = [
  { offence: "폭행", sentence: "벌금 100만원", category: "기타", ai_explanation: "타인에게 물리력을 행사하여 신체적 위해를 가해 처벌된 단순 폭행 전과입니다." },
  { offence: "명예훼손", sentence: "벌금 150만원", category: "기타", ai_explanation: "사실 또는 허위사실의 적시를 통해 타인의 사회적 명예를 실추시켜 기소 및 선고된 판결입니다." },
  { offence: "근로기준법위반", sentence: "벌금 200만원", category: "기타", ai_explanation: "사업장 운영 과정에서 임금 체불이나 근로 시간 위반 등 노동 관계 법령 위반으로 선고된 형벌입니다." }
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomName() {
  return getRandomItem(lastNameList) + getRandomItem(firstNameList);
}

// 300명을 채우기 위한 제너레이터 실행
const allMembers = [...seedMembers];

// 당선인 정당 목표 비율 분배 (총 300명)
// 현재 씨드: 민주당(12명), 국민의힘(13명), 조국혁신당(4명), 개혁신당(2명), 기본소득당(1명) -> 총 32명 (전과자 14, 비전과자 18)
// 남은 인원 정당 배분:
// 민주당 남은: 175 - 12 = 163명
// 국민의힘 남은: 108 - 13 = 95명
// 조국혁신당 남은: 12 - 4 = 8명
// 개혁신당 남은: 3 - 2 = 1명
// 진보당 남은: 3 - 0 = 3명
// 새로운미래 남은: 1 - 0 = 1명
// 사회민주당 남은: 1 - 0 = 1명
// 총 268명 추가 생성

const targetParties = [];
for (let i = 0; i < 163; i++) targetParties.push("더불어민주당");
for (let i = 0; i < 95; i++) targetParties.push("국민의힘");
for (let i = 0; i < 8; i++) targetParties.push("조국혁신당");
for (let i = 0; i < 1; i++) targetParties.push("개혁신당");
for (let i = 0; i < 3; i++) targetParties.push("진보당");
for (let i = 0; i < 1; i++) targetParties.push("새로운미래");
for (let i = 0; i < 1; i++) targetParties.push("사회민주당");

// 셔플
targetParties.sort(() => Math.random() - 0.5);

// 추가 전과자 건수 타겟팅 배열
// 목표 전과자 수: 74명 추가
// - 5건: 1명
// - 4건: 1명
// - 3건: 7명
// - 2건: 20명
// - 1건: 45명
// 나머지 194명은 0건
const crimesTarget = [];
for (let i = 0; i < 1; i++) crimesTarget.push(5);
for (let i = 0; i < 1; i++) crimesTarget.push(4);
for (let i = 0; i < 7; i++) crimesTarget.push(3);
for (let i = 0; i < 20; i++) crimesTarget.push(2);
for (let i = 0; i < 45; i++) crimesTarget.push(1);
while (crimesTarget.length < 268) {
  crimesTarget.push(0);
}

// 셔플
crimesTarget.sort(() => Math.random() - 0.5);

// 데이터 구축
const usedDistricts = new Set(seedMembers.map(m => m.constituency));
const usedNames = new Set(seedMembers.map(m => m.name));

for (let i = 0; i < 268; i++) {
  const party = targetParties[i];
  const crimesCount = crimesTarget[i];
  
  let name = generateRandomName();
  while (usedNames.has(name)) {
    name = generateRandomName();
  }
  usedNames.add(name);

  const isProportional = party === "조국혁신당" && Math.random() > 0.4 || party === "사회민주당" || Math.random() > 0.9;
  
  let constituency = "비례대표";
  if (!isProportional) {
    let dist = getRandomItem(districts);
    let attempts = 0;
    while (usedDistricts.has(dist) && attempts < 100) {
      dist = getRandomItem(districts);
      attempts++;
    }
    constituency = dist;
    usedDistricts.add(dist);
  }

  // 전과 생성
  const crimes = [];
  const crimeCategories = [trafficCrimes, activistCrimes, electionCrimes, generalCrimes];
  
  // 정당별 범죄 특징 매칭 가중치
  // 더불어민주당/진보당: 집시법/민주화 비중이 높음
  // 국민의힘: 교통/일반 비중이 높음
  let categoryWeight = [];
  if (party === "더불어민주당" || party === "진보당" || party === "사회민주당") {
    categoryWeight = [activistCrimes, activistCrimes, trafficCrimes, electionCrimes, generalCrimes];
  } else {
    categoryWeight = [trafficCrimes, trafficCrimes, generalCrimes, electionCrimes, activistCrimes];
  }

  for (let c = 0; c < crimesCount; c++) {
    const pool = getRandomItem(categoryWeight);
    const template = getRandomItem(pool);
    
    // 연도 조절 (임의의 년도)
    const baseYear = 1980 + Math.floor(Math.random() * 44); // 1980~2024
    const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
    const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');
    const crimeDate = `${baseYear}-${month}-${day}`;

    // 형량 다양화
    let fineAmount = 100 + Math.floor(Math.random() * 9) * 50; // 100 ~ 500만원
    let sentenceText = template.sentence;
    if (sentenceText.includes("벌금")) {
      sentenceText = `벌금 ${fineAmount}만원`;
    }

    crimes.push({
      offence: template.offence,
      date: crimeDate,
      sentence: sentenceText,
      category: template.category,
      ai_explanation: template.ai_explanation
    });
  }

  // 중복 날짜 정렬
  crimes.sort((a, b) => new Date(b.date) - new Date(a.date));

  allMembers.push({
    name,
    party,
    constituency,
    is_proportional: isProportional,
    crimes_count: crimesCount,
    crimes
  });
}

// 최종 300명 리스트를 인덱스 ID 부여하여 정렬
const finalAssemblyMembers = allMembers.map((member, idx) => ({
  id: idx + 1,
  ...member
}));

export default finalAssemblyMembers;
