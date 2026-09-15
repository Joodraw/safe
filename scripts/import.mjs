import fs from 'node:fs';
const lines=fs.readFileSync(new URL('../source.md',import.meta.url),'utf8').split(/\r?\n/);
let year,round,subject,card;const cards=[];
function flush(){if(card){card.body=card.body.join('\n').trim();cards.push(card);card=null;}}
for(const line of lines){
 const exam=line.match(/^# 산업안전기사 필기 — (\d{4})년 ([\d·]+)회차/);
 if(exam){flush();year=+exam[1];round=exam[2];subject='';continue;}
 const sub=line.match(/^## (\d)과목\.\s*(.*?)(?:\s*\(|$)/);
 if(sub){flush();subject=sub[2].trim();continue;}
 const q=line.match(/^\*\*([\d·ㆍ,\s]+)\.\s*(.*?)\*\*(.*)$/);
 if(q&&year){flush();card={id:`${year}-${round}-${q[1].trim()}`,year,round,subject,numbers:q[1].trim(),title:q[2],body:[q[3].replace(/^\s*[—–-]\s*/, '')]};continue;}
 if(card){if(line.startsWith('---')||line.startsWith('#')||line.startsWith('>')||/^이 20문항/.test(line)){flush();}else card.body.push(line);}
}
flush();
if(new Set(cards.map(c=>c.id)).size!==cards.length)throw Error('Duplicate IDs');
if(cards.some(c=>!c.body||!c.subject))throw Error('Missing content');
const exams=[...new Set(cards.map(c=>`${c.year}년 ${c.round}회차`))];
fs.writeFileSync(new URL('../public/data/cards.json',import.meta.url),JSON.stringify(cards));
const report={cards:cards.length,exams:exams.map(exam=>({exam,cards:cards.filter(c=>`${c.year}년 ${c.round}회차`===exam).length}))};
fs.writeFileSync(new URL('../public/data/import-report.json',import.meta.url),JSON.stringify(report,null,2));
console.log(report);
