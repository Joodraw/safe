type Explanation = { match: string; meaning: string; tip: string };
// Editorial explanations paraphrase the supplied study notes; they are not a legal update.
const concepts: Explanation[] = [
  {match:'참모식',meaning:'안전 전문가가 조사하고 조언하는 조직 형태입니다. 조언하는 역할과 직접 명령하는 역할을 구분하면 이해하기 쉽습니다.',tip:'참모식 = 전문가의 조언. 생산 라인을 통한 신속한 지시는 라인형의 특징으로 구분하세요.'},
  {match:'억측판단',meaning:'확인된 근거 대신 “괜찮겠지”라는 자신에게 유리한 추측으로 판단하는 것입니다.',tip:'근거 없는 낙관은 억측판단, 시간을 줄이려고 위험한 길을 택하는 것은 지름길반응으로 구분하세요.'},
  {match:'학습경험 조직',meaning:'가르칠 경험을 어떤 순서와 관계로 배치할지 정하는 것입니다. 내용을 고르는 단계와, 고른 내용을 배열하는 단계를 나누어 생각해 보세요.',tip:'원문의 계속성·계열성·통합성은 조직 원리이고, 기회의 원리는 선정 원리입니다.'},
  {match:'관리도',meaning:'시간에 따른 변화가 관리 범위를 벗어나는지 살펴보는 그림입니다. 원문의 “상한선·하한선”이 구분 단서입니다.',tip:'관리도는 변화 추이, 파레토도는 크기순 비교, 특성요인도는 원인분석이라는 단서를 연결하세요.'},
  {match:'버즈',meaning:'많은 참가자를 작은 모둠으로 나누어 짧게 토의하게 하는 방식입니다.',tip:'원문의 6-6 회의는 6명씩 나누어 6분간 토의한다는 연결로 기억하세요.'},
  {match:'서징',meaning:'이 카드에서는 현상 이름만 외우기보다, 원문이 제시한 방지 방법과 잘못된 설치 방법을 구분하는 것이 중요합니다.',tip:'원문의 “멀리 설치”와 “가깝게 설치”처럼 서로 반대인 표현을 짝으로 정리해 보세요.'},
  {match:'AND 게이트',meaning:'조건이 모두 성립할 때 결과가 생기는 관계입니다. 원문 사례처럼 두 안전장치가 모두 작동하지 않아야 사고가 발생한다면 “둘 다”가 핵심입니다.',tip:'AND는 모든 조건을 함께 확인합니다. 조건 하나만으로 충분하다고 바꾸어 읽지 않도록 주의하세요.'},
  {match:'플레임어레스터',meaning:'원문에서는 화염이 퍼져 나가는 것을 막는 장치로 설명합니다. 압력을 방출하는 장치와 역할이 다릅니다.',tip:'화염 전파 차단과 과잉 압력 방출을 별개의 기능으로 구분하세요.'},
  {match:'압성토공',meaning:'비탈면 아래쪽에 흙을 더하는 방법입니다. 원문의 “하단에 성토”를 위치와 행동으로 나누어 기억하면 됩니다.',tip:'어디에? 비탈면 하단. 무엇을? 흙을 더함. 목적은? 붕괴 방지.'},
  {match:'파열판',meaning:'원문에서 한 번 파열되면 교환해야 하는 장치로 설명합니다. 정상 상태의 판과, 이미 파열된 판을 구분해서 생각하세요.',tip:'재사용 가능 여부가 핵심 비교점입니다. “한 번 설치하면 교환 불필요”라는 표현과 대비하세요.'},
  {match:'르샤틀리에',meaning:'혼합가스 계산에서는 각 성분의 비율과 그 성분의 폭발하한계를 짝지어 대입합니다. 숫자만 외우기보다 어느 성분의 값인지 먼저 표시해 보세요.',tip:'원문 식의 각 분자·분모에 성분명을 적고 계산 순서를 따라가세요. 최종 값의 단위도 함께 확인하세요.'},
  {match:'플리커',meaning:'원문에서는 점멸하는 빛을 구별하는 특성의 변화를 피로도 측정과 연결합니다.',tip:'검사 이름과 측정 목적을 한 쌍으로 기억하세요: 플리커 검사 → 피로도 측정.'},
];
function Rich({text}:{text:string}){return <>{text.split(/(\*\*.*?\*\*)/g).map((s,i)=>s.startsWith('**')?<strong key={i}>{s.slice(2,-2)}</strong>:s)}</>}
export function StudyExplanation({title,body}:{title:string;body:string}){
 const relevant=concepts.filter(c=>(title+' '+body).includes(c.match)).slice(0,3);
 const highlights=[...new Set([...body.matchAll(/\*\*(.+?)\*\*/g)].map(m=>m[1]))].slice(0,6);
 const negative=/틀린|옳지|아닌|부적절|부적합/.test(title);
 return <div className="explanation-stack">
   <section className="answer"><small>원문 해설</small><p><Rich text={body}/></p></section>
   {highlights.length>0&&<section className="explanation-section"><h3>원문 강조 내용</h3><ul>{highlights.map(h=><li key={h}>{h}</li>)}</ul><small>오답 표현도 포함될 수 있으니 해설의 문맥과 함께 읽으세요.</small></section>}
   {relevant.length>0&&<section className="explanation-section easy"><h3>쉽게 이해하기</h3>{relevant.map(c=><article key={c.match}><h4>{c.match}</h4><p>{c.meaning}</p><p className="memory-tip">기억할 점 · {c.tip}</p></article>)}<small>제공 자료를 바탕으로 덧붙인 학습용 설명입니다.</small></section>}
   <details className="explanation-section"><summary>스스로 확인하기</summary><p>{negative?'이 항목은 틀린 내용이나 예외를 구분하는 주제입니다. 잘못된 표현을 먼저 찾고, 원문의 올바른 표현으로 고쳐 말해 보세요.':'해설을 가리고 이 주제를 자신의 말로 설명해 보세요. 수치가 있다면 조건과 단위까지 함께 말해 보세요.'}</p></details>
 </div>
}
