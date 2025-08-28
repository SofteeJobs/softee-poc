const REQUIRED_SKILL = "QuickBooks";

const jobs = [
  { id:"job-1", title:"Staff Accountant", company:"Acme Retail Group", location:"San Diego, CA", requiredSkills:[REQUIRED_SKILL,"Excel"], niceToHave:["Payroll","GAAP"] },
  { id:"job-2", title:"AP Specialist", company:"Coastal Franchise, LLC", location:"Carlsbad, CA", requiredSkills:[REQUIRED_SKILL], niceToHave:["Bill.com","NetSuite"] }
];

const candidates = [
  { id:"cand-1", name:"Jordan Blake", skills:["QuickBooks","Excel","Payroll"], years:4, verified:false },
  { id:"cand-2", name:"Riley Chen", skills:["NetSuite","Excel"], years:3, verified:false },
  { id:"cand-3", name:"Sam Patel", skills:["QuickBooks","Bill.com"], years:5, verified:false }
];

const jobList=document.getElementById("jobList");
const candidateList=document.getElementById("candidateList");
function tag(t){return `<span class="tag">${t}</span>`;}
function renderJobs(){jobList.innerHTML=jobs.map(j=>`<div class="item"><h3>${j.title} — ${j.company}</h3><div>${j.location}</div><div>Required: ${j.requiredSkills.map(tag).join(" ")}</div><div>Nice: ${j.niceToHave.map(tag).join(" ")}</div><button data-skill="${REQUIRED_SKILL}" class="btn-quiz">Quiz ${REQUIRED_SKILL}</button></div>`).join("")}
function renderCandidates(list=candidates){const f=list.filter(c=>c.skills.includes(REQUIRED_SKILL));candidateList.innerHTML=f.map(c=>`<div class="item"><h3>${c.name}${c.verified?'<span class="badge">Softee Verified™</span>':""}</h3><div>Exp: ${c.years} years</div><div>${c.skills.map(tag).join(" ")}</div><button data-cand="${c.id}" data-skill="${REQUIRED_SKILL}" class="btn-quiz">Verify ${REQUIRED_SKILL}</button></div>`).join("")}
renderJobs();renderCandidates();
document.addEventListener("click",e=>{const b=e.target.closest(".btn-quiz");if(!b)return;openQuiz(b.dataset.skill)});
window.applyVerification=(score,max)=>{if(score/max>=0.7){const idx=candidates.findIndex(c=>c.skills.includes(REQUIRED_SKILL)&&!c.verified);if(idx>=0)candidates[idx].verified=true;renderCandidates();}};